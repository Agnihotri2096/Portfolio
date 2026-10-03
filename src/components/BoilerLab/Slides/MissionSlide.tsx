interface MissionSlideProps {
  isActive: boolean;
  className?: string;
  onExplore?: () => void;
  onViewProjects?: () => void;
}

const MissionSlide = ({
  isActive,
  className = "",
  onExplore,
  onViewProjects,
}: MissionSlideProps) => {
  return (
    <section
      id="mission"
      className={`slide hero-slide stars-slide ${className} ${isActive ? "present" : ""}`}
    >
      <div className="slide-inner">
        <div className="hero-content">
          <p className="hero-tagline">AGNIHOTRI LABS</p>
          <h1 className="eyebrow">
            BUILD. AUTOMATE.<br />SECURE.
          </h1>
          <p className="subtitle">
            Independent technology studio building AI systems, software applications, automation tools and security-focused technology.
          </p>
          <div className="founder-pill">
            FOUNDED &amp; BUILT BY <span>AKSHAT AGNIHOTRI</span>
          </div>

          <div className="hero-cta-group">
            <button
              type="button"
              className="button primary-button default"
              onClick={onExplore}
              aria-label="Explore the Lab"
            >
              <span>EXPLORE THE LAB &rarr;</span>
            </button>
            <button
              type="button"
              className="button secondary-button"
              onClick={onViewProjects}
              aria-label="View Projects"
            >
              <span>VIEW PROJECTS &rarr;</span>
            </button>
          </div>

          <p className="scroll-hint">SCROLL DOWN TO EXPLORE &darr;</p>
        </div>
      </div>
    </section>
  );
};

export default MissionSlide;
