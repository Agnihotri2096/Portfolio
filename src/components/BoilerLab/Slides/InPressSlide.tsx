import { useState, useEffect, useRef } from "react";

interface InPressSlideProps {
  isActive: boolean;
  className?: string;
}

interface NoteCard {
  num: string;
  author: string;
  handle: string;
  quote: string;
  tag: string;
  left: string;
  top: string;
  width: string;
  delay: string;
  duration: string;
  rotate: string;
}

const notes: NoteCard[] = [
  {
    num: "01",
    author: "BUILDING CYBERRISK IQ",
    handle: "research/cyberrisk-iq",
    quote: "Exploring AI-powered cyber risk quantification, financial risk modeling and security intelligence.",
    tag: "SECURITY / AI",
    left: "22%",
    top: "18%",
    width: "18rem",
    delay: "-1.2s",
    duration: "8s",
    rotate: "-1deg",
  },
  {
    num: "02",
    author: "NETSONAR",
    handle: "research/netsonar",
    quote: "Turning network traffic into sound through packet analysis and real-time audio synthesis.",
    tag: "EXPERIMENT / AUDIO",
    left: "72%",
    top: "22%",
    width: "19rem",
    delay: "-2.8s",
    duration: "9s",
    rotate: "1.5deg",
  },
  {
    num: "03",
    author: "LOCAL AI",
    handle: "research/local-ai",
    quote: "Exploring local LLM systems, Ollama and privacy-focused AI workflows.",
    tag: "AI SYSTEMS",
    left: "16%",
    top: "68%",
    width: "19.5rem",
    delay: "-4.2s",
    duration: "9.5s",
    rotate: "-0.8deg",
  },
  {
    num: "04",
    author: "ENGINEERING NOTES",
    handle: "research/engineering-notes",
    quote: "Experiments across AI, software engineering, Linux and cybersecurity.",
    tag: "SYSTEMS & DEV",
    left: "76%",
    top: "65%",
    width: "18.5rem",
    delay: "-3.5s",
    duration: "8.5s",
    rotate: "1.2deg",
  },
];

const InPressSlide = ({ isActive, className = "" }: InPressSlideProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseOffset({ x: x * 15, y: y * 15 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive]);

  return (
    <section id="in-press" className={`slide in-press-slide ${className} ${isActive ? "present" : ""}`}>
      <div className="slide-inner in-press-content" ref={containerRef}>
        <div className="in-press-orbit">
          <div className="in-press-title">
            <p
              className="subtitle"
              style={{
                color: "#5eead4",
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
              }}
            >
              PERSPECTIVES &amp; RESEARCH
            </p>
            <h2 className="eyebrow" style={{ fontSize: "clamp(2.4rem, 5vw, 4.8rem)", margin: 0 }}>
              FIELD NOTES &amp;<br />INSIGHTS
            </h2>
          </div>

          {notes.map((card, i) => (
            <div
              className="in-press-card"
              key={i}
              style={
                {
                  top: card.top,
                  left: card.left,
                  "--press-index": i,
                  "--press-width": card.width,
                  "--press-delay": card.delay,
                  "--press-duration": card.duration,
                  "--press-rotate": card.rotate,
                  "--press-parallax-x": `${mouseOffset.x * (i % 2 === 0 ? 1 : -0.8)}px`,
                  "--press-parallax-y": `${mouseOffset.y * (i % 2 === 0 ? 0.8 : -1)}px`,
                } as React.CSSProperties
              }
            >
              <div className="in-press-card-surface">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.2rem" }}>
                  <strong>{card.author}</strong>
                  <span style={{ fontFamily: "var(--mono-font)", color: "var(--primary-accent)", fontSize: "0.75rem", fontWeight: 600 }}>
                    {card.num}
                  </span>
                </div>
                <span className="in-press-handle">{card.handle}</span>
                <p>{card.quote}</p>
                <span className="in-press-tag">{card.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InPressSlide;
