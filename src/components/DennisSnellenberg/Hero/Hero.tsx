import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../Magnetic";

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

      xPercentRef.current += 0.065 * directionRef.current;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Scroll trigger to accelerate and sync with scroll direction
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
      {/* Top Location & Dennis Snellenberg Header Arrow/Role Layout */}
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
          <div className="ds-hero-location-text">
            <span>Located</span>
            <span>in India</span>
          </div>
        </div>

        {/* Dennis Snellenberg Signature Arrow & Role Tag */}
        <div className="ds-hero-role-wrapper">
          <div className="ds-hero-role-arrow">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 13L13 1M13 1H4M13 1V10" />
            </svg>
          </div>
          <h4 className="ds-hero-role-title">
            <span>Systems Engineer</span> &amp; AI Architect
          </h4>
        </div>
      </div>

      {/* Centerpiece Minimalist Editorial Headline (Replaces photo) */}
      <div className="ds-hero-center-editorial">
        <div className="ds-hero-brand-callout">
          <span className="ds-hero-dot" />
          <span>Agnihotri Labs • Build. Automate. Secure.</span>
        </div>
        <h1 className="ds-hero-center-heading">
          Engineering Intelligent Systems<br />
          &amp; Interactive Platforms.
        </h1>
        <div className="ds-hero-cta-line">
          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={scrollToWork}
              className="ds-pill-button"
              aria-label="Scroll to Work"
            >
              <div className="ds-pill-fill" />
              <span>Explore Selected Work</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 1v10M6 11l4-4M6 11L2 7" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Dennis Snellenberg Dual Text Infinite Slider */}
      <div className="ds-hero-slider-wrap">
        <div ref={slider} className="ds-hero-slider">
          <p ref={firstText} className="ds-hero-slider-text">
            Akshat Agnihotri — Systems Engineer &amp; Designer —&nbsp;
          </p>
          <p ref={secondText} className="ds-hero-slider-text">
            Akshat Agnihotri — Systems Engineer &amp; Designer —&nbsp;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
