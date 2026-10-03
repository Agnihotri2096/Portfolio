import { useState, useCallback, useEffect, useRef } from "react";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";

interface ProductsSlideProps {
  isActive: boolean;
  className?: string;
  onDeckBoundary?: (direction: "up" | "down") => void;
}

interface Product {
  id: string;
  num: string;
  title: string;
  category: string;
  tags: string[];
  headline: string;
  desc: string;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    id: "cyberrisk-iq",
    num: "01",
    title: "CyberRisk IQ",
    category: "SECURITY / AI",
    tags: ["React", "TypeScript", "FastAPI", "SQLite", "Ollama", "AI / ML"],
    headline: "AI-Powered Cyber Risk Quantification",
    desc: "An AI-powered platform for quantifying cyber risk in financial terms and connecting technical security telemetry with business impact.",
    image: "/images/cyberrisk-iq.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "netsonar",
    num: "02",
    title: "NetSonar",
    category: "EXPERIMENT / NETWORKING",
    tags: ["Python", "Scapy", "NumPy", "PipeWire", "Linux"],
    headline: "Network Traffic → Sound",
    desc: "An experimental system that transforms network traffic into an audio experience using packet analysis and real-time sound generation.",
    image: "/images/preview.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "aiml-engineering",
    num: "03",
    title: "AI / ML Engineering",
    category: "AI / ENGINEERING",
    tags: ["Python", "scikit-learn", "PyTorch", "Jupyter", "LLMs"],
    headline: "Machine Learning & Local Systems",
    desc: "A collection of experiments and implementations exploring machine learning, AI systems and local LLMs.",
    image: "/images/radix.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "prithvipath",
    num: "04",
    title: "PrithviPath",
    category: "SOFTWARE",
    tags: ["AI", "Spatial APIs", "TypeScript", "Vercel"],
    headline: "Eco-Routing & Spatial Intelligence",
    desc: "A spatial intelligence platform analyzing road network telemetry, elevation profiles, and carbon footprints to compute eco-optimized traversal routes in real time.",
    image: "/images/prithvipath.png",
    link: "https://v0-new2ndoctmain2-ljo35283k-akshat-agnihotris-projects-0a8dae8b.vercel.app",
  },
  {
    id: "cse-society",
    num: "05",
    title: "CSE Society Hub",
    category: "SOFTWARE",
    tags: ["React", "TypeScript", "GitHub Pages", "TailwindCSS"],
    headline: "Engineering Community Platform",
    desc: "Collaborative portal and project hub serving university engineers, organizing hackathons, technical roadmaps, and collaborative project repositories.",
    image: "/images/cse-society.png",
    link: "https://agnihotri2096.github.io/Society-Website/",
  },
];

const ProductsSlide = ({ isActive, className = "", onDeckBoundary }: ProductsSlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isCooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const prevCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((c) => c - 1);
    } else {
      onDeckBoundary?.("up");
    }
  }, [currentIndex, onDeckBoundary]);

  const nextCard = useCallback(() => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex((c) => c + 1);
    } else {
      onDeckBoundary?.("down");
    }
  }, [currentIndex, onDeckBoundary]);

  // Wheel interception inside the products slide deck
  useEffect(() => {
    if (!isActive) return;

    let accumulatedDelta = 0;
    let wheelTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      if (isCooldownRef.current) return;

      accumulatedDelta += e.deltaY;
      clearTimeout(wheelTimer);

      if (Math.abs(accumulatedDelta) >= 45) {
        isCooldownRef.current = true;
        if (accumulatedDelta > 0) {
          nextCard();
        } else {
          prevCard();
        }
        accumulatedDelta = 0;
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 320);
      } else {
        wheelTimer = setTimeout(() => {
          accumulatedDelta = 0;
        }, 150);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimer);
    };
  }, [isActive, nextCard, prevCard]);

  // Touch swipe support on products deck
  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || isCooldownRef.current) return;
      const touchEndY = e.changedTouches[0]?.clientY;
      if (touchEndY === undefined) return;

      const diff = touchStartYRef.current - touchEndY;
      if (Math.abs(diff) > 40) {
        isCooldownRef.current = true;
        if (diff > 0) {
          nextCard();
        } else {
          prevCard();
        }
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 320);
      }
      touchStartYRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, nextCard, prevCard]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevCard();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, prevCard, nextCard]);

  // Card transform math matching BoilerLab Catmull-Rom deck
  const getCardStyle = (idx: number) => {
    const diff = idx - currentIndex;
    if (diff === 0) {
      return {
        transform: "translate3d(-50%, -50%, 0px) scale(1)",
        opacity: 1,
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
        zIndex: 10,
        visibility: "visible" as const,
      };
    } else if (diff > 0) {
      // Cards waiting behind
      const yOffset = -diff * 14;
      const zOffset = -diff * 80;
      const scale = Math.max(0.85, 1 - diff * 0.04);
      const opacity = diff === 1 ? 0.85 : diff === 2 ? 0.45 : 0;
      const blur = Math.min(8, diff * 3);
      return {
        transform: `translate3d(-50%, calc(-50% + ${yOffset}px), ${zOffset}px) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
        pointerEvents: "none" as const,
        zIndex: 10 - diff,
        visibility: opacity <= 0.01 ? ("hidden" as const) : ("visible" as const),
      };
    } else {
      // Cards passed forward and dropped down
      return {
        transform: "translate3d(-50%, calc(50vh + 50px), 0px) scale(0.9)",
        opacity: 0,
        filter: "blur(6px)",
        pointerEvents: "none" as const,
        zIndex: 0,
        visibility: "hidden" as const,
      };
    }
  };

  return (
    <section id="products" className={`slide ${className} ${isActive ? "present" : ""}`}>
      <div className="slide-inner" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p
            className="subtitle"
            style={{ color: "#5eead4", fontSize: "0.8rem", letterSpacing: "0.2em" }}
          >
            LAB PRODUCTS &amp; SYSTEMS
          </p>
          <h2 className="eyebrow" style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", margin: 0 }}>
            FEATURED WORK
          </h2>
        </div>

        <div className="product-content">
          {products.map((item, idx) => {
            const cardStyle = getCardStyle(idx);
            return (
              <article
                className="product-card"
                key={item.id}
                style={cardStyle}
                aria-hidden={idx !== currentIndex}
              >
                <div className="product-copy">
                  <div className="product-header">
                    <div className="product-heading">
                      <span className="product-num">{item.num}</span>
                      <span>{item.title}</span>
                    </div>

                    <a
                      className="button primary-button default"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Explore</span>
                      <MdArrowOutward />
                    </a>
                  </div>

                  <div className="product-info">
                    <ul className="product-tags">
                      {item.tags.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>

                    <h3>{item.headline}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>

                <div className="product-visual">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              </article>
            );
          })}

          <div className="deck-controls">
            <button
              className="deck-nav-btn"
              onClick={prevCard}
              disabled={currentIndex === 0}
              aria-label="Previous card"
            >
              <MdArrowBack />
            </button>

            <div className="deck-dots">
              {products.map((_, i) => (
                <button
                  key={i}
                  className={`deck-dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="deck-nav-btn"
              onClick={nextCard}
              disabled={currentIndex === products.length - 1}
              aria-label="Next card"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlide;
