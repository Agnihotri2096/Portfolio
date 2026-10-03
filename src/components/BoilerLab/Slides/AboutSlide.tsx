import TypewriterText from "../TypewriterText";

interface AboutSlideProps {
  isActive: boolean;
  className?: string;
}

const AboutSlide = ({ isActive, className = "" }: AboutSlideProps) => {
  return (
    <section
      id="about"
      className={`slide mission-slide stars-slide ${className} ${isActive ? "present" : ""}`}
    >
      <div className="slide-inner">
        <div className="mission-content">
          <p
            className="hero-tagline"
            style={{ letterSpacing: "0.25em", marginBottom: "0.25rem", color: "var(--primary-accent)" }}
          >
            MANIFESTO
          </p>

          <p>
            <TypewriterText
              text="GOOD SOFTWARE SHOULD SOLVE SOMETHING. AI SHOULD BE USEFUL. AUTOMATION SHOULD REMOVE FRICTION. SECURITY SHOULD BE BUILT IN. EXPERIMENTS SHOULD BECOME SYSTEMS."
              isActive={isActive}
              delayOffset={0}
              speedMs={12}
            />
          </p>

          <p>
            <TypewriterText
              text="Agnihotri Labs exists to explore ideas, engineer useful systems and turn experiments into technology that works."
              isActive={isActive}
              delayOffset={200}
              speedMs={12}
            />
          </p>

          <p className="mission-brand-callout">
            <TypewriterText
              text="WE BUILD SYSTEMS THAT DO SOMETHING."
              isActive={isActive}
              delayOffset={320}
              speedMs={18}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSlide;
