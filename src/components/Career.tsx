import "./styles/Career.css";

const journeySteps = [
  {
    step: "01",
    title: "ENGINEERING",
    subtitle: "Core Foundations",
    description:
      "Algorithms, data structures, operating systems, and computer science fundamentals. Building a rigorous engineering base.",
  },
  {
    step: "02",
    title: "AI & DATA",
    subtitle: "Machine Learning & Local Models",
    description:
      "Practical machine learning, neural architectures, data processing pipelines, and local LLM orchestration with Ollama.",
  },
  {
    step: "03",
    title: "SOFTWARE",
    subtitle: "Full-Stack & Systems",
    description:
      "Modern responsive web applications, REST APIs, Linux system configuration, and performance engineering.",
  },
  {
    step: "04",
    title: "CYBERSECURITY",
    subtitle: "Security & Risk Intelligence",
    description:
      "FAIR cyber risk quantification, network telemetry analysis, vulnerability assessment, and defense architectures.",
  },
  {
    step: "05",
    title: "REAL PROJECTS",
    subtitle: "Practical Implementations",
    description:
      "Translating skills into usable platforms: CyberRisk IQ risk platform, NetSonar telemetry sonification, and deployed tools.",
  },
  {
    step: "06",
    title: "AGNIHOTRI LABS",
    subtitle: "Independent Studio",
    description:
      "Unifying engineering, automation, AI, and software development into an independent technology studio for modern businesses.",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container" id="journey">
      <div className="career-container">
        <h2>
          THE <span>JOURNEY</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {journeySteps.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.title}</h4>
                  <h5>{item.subtitle}</h5>
                </div>
                <h3>{item.step}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
