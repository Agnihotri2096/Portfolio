import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { smoother } from "./Navbar";

const Landing = ({ children }: PropsWithChildren) => {
  const handleScrollToLab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#agnihotri-labs", true, "top top");
    } else {
      const el = document.getElementById("agnihotri-labs");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              AKSHAT
              <br />
              <span>AGNIHOTRI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>I BUILD DIGITAL THINGS.</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI • SOFTWARE</div>
              <div className="landing-h2-2">SECURITY</div>
            </h2>
            <h2>
              <div className="landing-h2-info">SECURITY</div>
              <div className="landing-h2-info-1">AI • SOFTWARE</div>
            </h2>
            <div className="landing-studio-tag">
              Founder of <span>AGNIHOTRI LABS</span>
            </div>
            <a
              href="#agnihotri-labs"
              className="landing-lab-cta"
              onClick={handleScrollToLab}
              data-cursor="disable"
            >
              EXPLORE THE LAB &rarr;
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
