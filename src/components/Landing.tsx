import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { smoother } from "./utils/smoother";

const Landing = ({ children }: PropsWithChildren) => {
  const handleScrollToLab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#what-we-build", true, "top top");
    } else {
      const el = document.getElementById("what-we-build");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>BUILD. AUTOMATE. SECURE.</h2>
            <h1>
              AGNIHOTRI
              <br />
              <span>LABS</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Digital Engineering</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI • Software</div>
              <div className="landing-h2-2">Security</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Security</div>
              <div className="landing-h2-info-1">AI • Software</div>
            </h2>
            <div className="landing-studio-tag">
              Founded by <span>Akshat Agnihotri</span>
            </div>
            <a
              href="#what-we-build"
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
