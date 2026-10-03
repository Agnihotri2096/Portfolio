import { useEffect, useRef, useState } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const attachCursorEvents = () => {
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        const element = item as HTMLElement;
        element.onmouseover = (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const mode = element.dataset.cursor;

          if (mode === "icons") {
            cursor.classList.add("cursor-icons");
            gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
            cursor.style.setProperty("--cursorH", `${rect.height}px`);
            hover = true;
          } else if (mode === "disable") {
            cursor.classList.add("cursor-disable");
            setCursorText("");
          } else if (mode === "view") {
            cursor.classList.add("cursor-label");
            setCursorText("VIEW");
          } else if (mode === "open") {
            cursor.classList.add("cursor-label");
            setCursorText("OPEN");
          } else if (mode === "email") {
            cursor.classList.add("cursor-label", "cursor-label-email");
            setCursorText("EMAIL");
          }
        };

        element.onmouseout = () => {
          cursor.classList.remove(
            "cursor-disable",
            "cursor-icons",
            "cursor-label",
            "cursor-label-email"
          );
          setCursorText("");
          hover = false;
        };
      });
    };

    attachCursorEvents();
    const observer = new MutationObserver(attachCursorEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="cursor-main" ref={cursorRef}>
      <span className="cursor-text">{cursorText}</span>
    </div>
  );
};

export default Cursor;
