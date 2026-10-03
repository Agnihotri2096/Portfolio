import "./styles/HowWeBuild.css";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand the problem, users and requirements.",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Define the experience, architecture and technical approach.",
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Develop, integrate and test the system.",
  },
  {
    num: "04",
    title: "DEPLOY",
    desc: "Ship the product and make it maintainable.",
  },
  {
    num: "05",
    title: "ITERATE",
    desc: "Improve based on real usage and feedback.",
  },
];

const HowWeBuild = () => {
  return (
    <section className="how-section" id="process">
      <div className="section-container">
        <div className="how-header">
          <div className="section-label">
            <span className="label-dot"></span>
            ENGINEERING WORKFLOW
          </div>
          <h2 className="how-title">
            HOW WE <span>BUILD</span>
          </h2>
          <p className="how-subtitle">
            A disciplined, 5-phase engineering methodology focused on practical value and reliable software.
          </p>
        </div>

        <div className="how-timeline">
          {steps.map((step, idx) => (
            <div className="how-step" key={idx}>
              <div className="step-num-wrap">
                <span className="step-num">{step.num}</span>
                {idx < steps.length - 1 && <div className="step-connector"></div>}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeBuild;
