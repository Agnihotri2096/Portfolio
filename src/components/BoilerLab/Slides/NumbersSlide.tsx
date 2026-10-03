interface NumbersSlideProps {
  isActive: boolean;
  className?: string;
}

const stats = [
  {
    val: "2026",
    label: "ACTIVE YEAR",
    desc: "Independent technology studio operating at the intersection of AI, systems, and security.",
  },
  {
    val: "04",
    label: "CORE DOMAINS",
    desc: "AI Systems, Software Engineering, Security Research & Automation.",
  },
  {
    val: "03",
    label: "ACTIVE PROJECTS",
    desc: "CyberRisk IQ, NetSonar & AI / ML Engineering implementations.",
  },
  {
    val: "01",
    label: "INDEPENDENT LAB",
    desc: "Founded and built by Akshat Agnihotri.",
  },
];

const NumbersSlide = ({ isActive, className = "" }: NumbersSlideProps) => {
  return (
    <section id="numbers" className={`slide stars-slide ${className} ${isActive ? "present" : ""}`}>
      <div className="slide-inner">
        <div className="hero-content" style={{ marginBottom: "2.5rem" }}>
          <p
            className="hero-tagline"
            style={{ color: "var(--primary-accent)", letterSpacing: "0.25em" }}
          >
            DIGITAL ENGINEERING
          </p>
          <h2 className="eyebrow" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            LAB STATUS
          </h2>
          <p className="subtitle">Factual overview of active lab initiatives and operational metrics</p>
        </div>

        <div className="numbers-grid">
          {stats.map((s, idx) => (
            <div className="number-card" key={idx}>
              <div className="number-val">{s.val}</div>
              <div className="number-label">{s.label}</div>
              <p className="number-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersSlide;
