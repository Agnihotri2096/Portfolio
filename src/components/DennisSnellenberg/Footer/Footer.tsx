import React, { useState, useEffect } from "react";
import Magnetic from "../Magnetic";
import { MdArrowOutward } from "react-icons/md";

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST / local time
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeStr(`${formatted} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="ds-footer-wrapper">
      {/* Dennis Snellenberg Curved Top SVG Divider */}
      <div className="ds-footer-curve-wrap">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" />
        </svg>
      </div>

      <div className="ds-footer">
        <div className="ds-footer-top">
          <div className="ds-footer-heading-wrap">
            <div className="ds-footer-heading-row">
              <div className="ds-footer-avatar">
                <img src="/images/brand-logo.jpg" alt="Agnihotri Labs" />
              </div>
              <h2 className="ds-footer-title">Let’s work</h2>
            </div>
            <h2 className="ds-footer-title">together</h2>
          </div>

          <div className="ds-footer-cta-container">
            <Magnetic strength={0.4}>
              <a
                href="mailto:hello@agnihotrilabs.tech"
                className="ds-round-button dark"
                style={{ width: "180px", height: "180px" }}
                aria-label="Get in touch"
              >
                <div className="ds-round-button-fill" />
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  Get in touch
                  <MdArrowOutward size={18} />
                </span>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="mailto:hello@agnihotrilabs.tech"
                className="ds-pill-button dark"
                aria-label="Email Agnihotri Labs"
              >
                <div className="ds-pill-fill" />
                <span>hello@agnihotrilabs.tech</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="https://akshat-agnihotri.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="ds-pill-button dark"
                aria-label="Personal Portfolio"
              >
                <div className="ds-pill-fill" />
                <span>Portfolio</span>
                <MdArrowOutward size={16} />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="ds-footer-divider" />

        <div className="ds-footer-bottom">
          <div className="ds-footer-bottom-group">
            <span className="ds-footer-bottom-label">Version</span>
            <span>2026 © Edition</span>
          </div>

          <div className="ds-footer-bottom-group">
            <span className="ds-footer-bottom-label">Local Time</span>
            <span>{timeStr || "09:30 PM GMT+5:30"}</span>
          </div>

          <div className="ds-footer-bottom-group">
            <span className="ds-footer-bottom-label">Socials</span>
            <ul className="ds-footer-socials-list">
              <li>
                <a
                  href="https://github.com/Agnihotri-Labs"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/akshat-agnihotri"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://akshat-agnihotri.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
