import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../Magnetic";
import { MdArrowDownward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const xPercentRef = useRef(0);
  const directionRef = useRef(-1);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (xPercentRef.current <= -100) {
        xPercentRef.current = 0;
      }
      if (xPercentRef.current > 0) {
        xPercentRef.current = -100;
      }

      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercentRef.current });
        gsap.set(secondText.current, { xPercent: xPercentRef.current });
      }

      xPercentRef.current += 0.06 * directionRef.current;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Scroll trigger to accelerate and sync with scroll
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        directionRef.current = self.direction === 1 ? -1.8 : 1.2;
        setTimeout(() => {
          directionRef.current = -1;
        }, 150);
      },
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, []);

  const scrollToWork = () => {
    const el = document.querySelector("#work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="ds-hero">
      {/* Top Location & Role Information */}
      <div className="ds-hero-top-info">
        <div className="ds-hero-location">
          <svg
            className="ds-globe-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>Located in India • Available Worldwide</span>
        </div>

        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={scrollToWork}
            className="ds-pill-button"
            style={{ cursor: "pointer", border: "1px solid rgba(28,29,32,0.15)" }}
            aria-label="Scroll to Work"
          >
            <div className="ds-pill-fill" />
            <span>Explore Work</span>
            <MdArrowDownward size={16} />
          </button>
        </Magnetic>
      </div>

      {/* Central Portrait Visual */}
      <div className="ds-hero-portrait-wrapper">
        <div className="ds-hero-portrait-frame">
          <img
            src="/images/brand-logo.jpg"
            alt="Akshat Agnihotri / Agnihotri Labs"
            className="ds-hero-portrait-img"
          />
        </div>
      </div>

      {/* Dennis Snellenberg Dual Text Infinite Slider */}
      <div className="ds-hero-slider-wrap">
        <div ref={slider} className="ds-hero-slider">
          <p ref={firstText} className="ds-hero-slider-text">
            Akshat Agnihotri — Systems Engineer & Designer —&nbsp;
          </p>
          <p ref={secondText} className="ds-hero-slider-text">
            Akshat Agnihotri — Systems Engineer & Designer —&nbsp;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
