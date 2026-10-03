import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Our journey <span>&</span>
          <br /> milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Agnihotri Labs</h4>
                <h5>Independent Studio</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Founded by Akshat Agnihotri. Building practical software architectures,
              intelligent AI integrations, automated workflows, and security-hardened technology.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Architecture</h4>
                <h5>Engineering & R&D</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Architecting full-stack web platforms, threat analysis tooling, and
              integrating modern ML pipelines with high performance and reliability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Foundations & Core CS</h4>
                <h5>Academics & Community</h5>
              </div>
              <h3>ROOTS</h3>
            </div>
            <p>
              Deep grounding in Data Structures, OS, DBMS, Networks, and collaborative
              engineering through hackathons and university developer societies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
