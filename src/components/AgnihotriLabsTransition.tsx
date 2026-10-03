import "./styles/AgnihotriLabsTransition.css";
import { smoother } from "./Navbar";

const AgnihotriLabsTransition = () => {
  const handleEnterLab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#for-businesses", true, "top top");
    } else {
      const el = document.getElementById("for-businesses");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="labs-transition-section" id="agnihotri-labs">
      <div className="labs-transition-container section-container">
        <div className="labs-transition-badge">
          <span className="labs-badge-dot"></span>
          CHAPTER 02 // STUDIO
        </div>

        <h2 className="labs-transition-title">
          AGNIHOTRI <span>LABS</span>
        </h2>

        <div className="labs-transition-tagline">
          BUILD. AUTOMATE. SECURE.
        </div>

        <p className="labs-transition-desc">
          An independent technology studio building practical software, AI tools and automation for modern businesses.
        </p>

        <div className="labs-transition-action">
          <a
            href="#for-businesses"
            className="labs-transition-cta"
            onClick={handleEnterLab}
            data-cursor="disable"
          >
            ENTER THE LAB &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default AgnihotriLabsTransition;
