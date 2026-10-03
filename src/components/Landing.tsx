import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-content-wrap">
            <div className="landing-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">AKSHAT AGNIHOTRI</span>
              <span className="badge-sep">/</span>
              <span className="badge-role">FOUNDER & BUILDER</span>
            </div>

            <h1 className="landing-title">
              I BUILD DIGITAL
              <br />
              <span className="title-accent">THINGS.</span>
            </h1>

            <div className="landing-tags">
              <span>AI</span>
              <span className="dot">•</span>
              <span>SOFTWARE</span>
              <span className="dot">•</span>
              <span>SECURITY</span>
            </div>

            <p className="landing-support">
              Engineering student and independent builder creating AI systems,
              software applications, automation tools and security-focused projects.
            </p>

            <div className="landing-actions">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("work");
                }}
                className="hero-btn primary-btn"
                data-cursor="disable"
              >
                EXPLORE MY WORK
              </a>
              <a
                href="#labs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("labs");
                }}
                className="hero-btn secondary-btn"
                data-cursor="disable"
              >
                AGNIHOTRI LABS <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
