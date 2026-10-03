import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

export const getSmoother = () => smoother;

const Navbar = () => {
  const [activeContext, setActiveContext] = useState<"personal" | "labs">("personal");

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a, .nav-context-btn");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLAnchorElement;
        const section = target.getAttribute("data-href");
        if (section) {
          if (section === "#labs") {
            setActiveContext("labs");
          } else if (section === "#landingDiv" || section === "#about") {
            setActiveContext("personal");
          }
          if (window.innerWidth > 1024 && smoother) {
            e.preventDefault();
            smoother.scrollTo(section, true, "top top");
          } else {
            const el = document.querySelector(section);
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleContextClick = (context: "personal" | "labs", targetId: string) => {
    setActiveContext(context);
    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo(targetId, true, "top top");
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="header">
        <div className="navbar-left">
          <a href="#landingDiv" data-href="#landingDiv" className="navbar-brand" data-cursor="disable">
            <span className="brand-primary">AKSHAT AGNIHOTRI</span>
            <span className="brand-badge">LABS</span>
          </a>

          {/* Subtle Desktop Context Switcher */}
          <div className="nav-context-pill">
            <button
              type="button"
              className={`nav-context-btn ${activeContext === "personal" ? "active" : ""}`}
              onClick={() => handleContextClick("personal", "#landingDiv")}
              data-cursor="disable"
            >
              Akshat
            </button>
            <button
              type="button"
              className={`nav-context-btn ${activeContext === "labs" ? "active" : ""}`}
              onClick={() => handleContextClick("labs", "#labs")}
              data-cursor="disable"
            >
              Labs
            </button>
          </div>
        </div>

        <a
          href="mailto:hello@agnihotrilabs.tech"
          className="navbar-connect"
          data-cursor="disable"
        >
          hello@agnihotrilabs.tech
        </a>

        <ul>
          <li>
            <a data-href="#landingDiv" href="#landingDiv">
              <HoverLinks text="AKSHAT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#labs" href="#labs">
              <HoverLinks text="LABS" />
            </a>
          </li>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
