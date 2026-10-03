import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface StarCanvasHandle {
  triggerWarp: (duration?: number, direction?: number) => void;
  setHidden: (hidden: boolean) => void;
}

interface Star {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  dvx: number;
  dvy: number;
  radius: number;
  alpha: number;
  white: boolean;
  twinklePhase: number;
  twinkleRate: number;
  depth: number;
  warpPhase: number;
}

const StarCanvas = forwardRef<StarCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const isHiddenRef = useRef<boolean>(false);
  const warpStartRef = useRef<number>(-1);
  const warpDurationRef = useRef<number>(1200);
  const warpDirectionRef = useRef<number>(1);
  const warpEnergyRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; lastMove: number }>({
    x: -1000,
    y: -1000,
    lastMove: 0,
  });

  useImperativeHandle(ref, () => ({
    triggerWarp: (duration = 1200, direction = 1) => {
      warpStartRef.current = performance.now();
      warpDurationRef.current = duration;
      warpDirectionRef.current = direction >= 0 ? 1 : -1;
    },
    setHidden: (hidden: boolean) => {
      isHiddenRef.current = hidden;
      if (canvasRef.current) {
        if (hidden) {
          canvasRef.current.classList.add("stars-hidden");
        } else {
          canvasRef.current.classList.remove("stars-hidden");
        }
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    const numStars = Math.min(Math.floor((width * height) / 3200), 500);
    const stars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      const isWhite = Math.random() < 0.4;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const angle = Math.random() * Math.PI * 2;
      const driftSpeed = 0.05 + Math.random() * 0.15;
      stars.push({
        x,
        y,
        hx: x,
        hy: y,
        vx: 0,
        vy: 0,
        dvx: Math.cos(angle) * driftSpeed,
        dvy: Math.sin(angle) * driftSpeed,
        radius: Math.pow(Math.random(), 2.5) * (isWhite ? 1.6 : 1.1) + 0.4,
        alpha: isWhite ? 0.6 + Math.random() * 0.4 : 0.25 + Math.random() * 0.35,
        white: isWhite,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleRate: (Math.random() * 0.6 + 0.3) * 0.003,
        depth: Math.random(),
        warpPhase: Math.random(),
      });
    }
    starsRef.current = stars;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update warp energy
      let warpEnergy = 0;
      if (warpStartRef.current >= 0) {
        const progress = (now - warpStartRef.current) / warpDurationRef.current;
        if (progress >= 1) {
          warpStartRef.current = -1;
          warpEnergy = 0;
        } else {
          // Bell curve for warp acceleration then deceleration
          warpEnergy = Math.sin(progress * Math.PI);
        }
      }
      warpEnergyRef.current = warpEnergy;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const mouse = mouseRef.current;
      const isMouseActive = now - mouse.lastMove < 2000;

      // Draw subtle warp radial glow if in warp
      if (warpEnergy > 0.01) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(width, height) * 0.45);
        glow.addColorStop(0, `rgba(198, 214, 255, ${warpEnergy * 0.12})`);
        glow.addColorStop(0.35, `rgba(94, 234, 212, ${warpEnergy * 0.05})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw stars and trails
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Drift
        s.hx += s.dvx * dt * 60;
        s.hy += s.dvy * dt * 60;
        if (s.hx < -10) s.hx = width + 10;
        if (s.hx > width + 10) s.hx = -10;
        if (s.hy < -10) s.hy = height + 10;
        if (s.hy > height + 10) s.hy = -10;

        // Mouse gentle repulsion
        let dx = s.hx - s.x;
        let dy = s.hy - s.y;
        if (isMouseActive) {
          const pmx = s.x - mouse.x;
          const pmy = s.y - mouse.y;
          const distSq = pmx * pmx + pmy * pmy;
          if (distSq < 180 * 180 && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 180) * 15;
            dx += (pmx / dist) * force;
            dy += (pmy / dist) * force;
          }
        }

        s.vx = (s.vx + dx * 0.05) * 0.85;
        s.vy = (s.vy + dy * 0.05) * 0.85;
        s.x += s.vx;
        s.y += s.vy;

        // Twinkle
        const twinkle = 0.8 + Math.sin(now * s.twinkleRate + s.twinklePhase) * 0.2;
        const currentAlpha = Math.min(1, s.alpha * twinkle);

        if (warpEnergy > 0.02) {
          // Warp streaks
          const dxCenter = s.x - cx;
          const dyCenter = s.y - cy;
          const distFromCenter = Math.hypot(dxCenter, dyCenter) || 1;
          const ux = dxCenter / distFromCenter;
          const uy = dyCenter / distFromCenter;
          const dir = warpDirectionRef.current;

          const streakLen = warpEnergy * (24 + s.depth * 65) * dir;
          const tailX = s.x - ux * streakLen;
          const tailY = s.y - uy * streakLen;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          const col = s.white ? "225, 235, 255" : "94, 234, 212";
          grad.addColorStop(0, `rgba(${col}, 0)`);
          grad.addColorStop(1, `rgba(${col}, ${currentAlpha * (0.6 + warpEnergy * 0.4)})`);

          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, s.radius * (1 + s.depth * 0.8));
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          // Bright star head dot
          ctx.fillStyle = s.white ? "#ffffff" : "#a5f3fc";
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * (0.8 + warpEnergy * 0.4), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Normal point star
          ctx.fillStyle = s.white ? "#ffffff" : "#a5f3fc";
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas id="star-canvas" ref={canvasRef} aria-hidden="true" />;
});

StarCanvas.displayName = "StarCanvas";

export default StarCanvas;
