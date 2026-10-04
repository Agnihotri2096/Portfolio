import React, { useState } from "react";
import Magnetic from "../Magnetic";
import NavDrawer from "./NavDrawer";

export const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="ds-header">
        <Magnetic strength={0.25}>
          <a
            href="#hero"
            className="ds-header-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
          >
            <span>©</span>
            <span className="ds-header-logo-text">
              <span className="ds-header-logo-inner">
                <span>Code by Akshat</span>
                <br />
                <span>Agnihotri Labs</span>
              </span>
            </span>
          </a>
        </Magnetic>

        <nav>
          <ul className="ds-header-nav">
            <li>
              <Magnetic strength={0.3}>
                <a
                  href="#work"
                  className="ds-header-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#work");
                  }}
                >
                  Work
                </a>
              </Magnetic>
            </li>
            <li>
              <Magnetic strength={0.3}>
                <a
                  href="#about"
                  className="ds-header-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#about");
                  }}
                >
                  About
                </a>
              </Magnetic>
            </li>
            <li>
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  className="ds-header-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                >
                  Contact
                </a>
              </Magnetic>
            </li>
          </ul>
        </nav>
      </header>

      {/* Floating Magnetic Burger Trigger */}
      <div className="ds-burger-trigger-wrap">
        <Magnetic strength={0.4}>
          <button
            type="button"
            className={`ds-burger-btn ${isDrawerOpen ? "active" : ""}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="ds-burger-btn-fill" />
            <span className="ds-burger-line" />
            <span className="ds-burger-line" />
          </button>
        </Magnetic>
      </div>

      <NavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default Header;
