import "./styles/About.css";

const interests = [
  "AI & LLM Architecture",
  "Software Engineering",
  "Cybersecurity",
  "Linux & Systems",
  "Telemetry & Networks",
  "Continuous Experimentation",
  "Building Products",
];

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-me">
        <div className="section-label">
          <span className="label-dot"></span>
          BEHIND THE LAB
        </div>
        <h2 className="about-headline">
          BUILT BY <span>AKSHAT.</span>
        </h2>
        <p className="about-lead">
          Agnihotri Labs is an independent technology studio conceived and built by Akshat Agnihotri—an
          engineering student and builder exploring the convergence of intelligent systems, defensive security,
          and robust software engineering.
        </p>
        <p className="para">
          Rather than chasing buzzwords or corporate scale, the studio is rooted in hands-on craftsmanship:
          understanding protocols from the packet level, evaluating machine intelligence with local weights,
          and engineering performant, maintainable software tools.
        </p>
        <div className="about-interests">
          <span className="interests-label">CORE PURSUITS:</span>
          <div className="interests-flex">
            {interests.map((item, idx) => (
              <span className="interest-tag" key={idx}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
