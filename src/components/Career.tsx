import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineering Student</h4>
                <h5>Academics</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Exploring software architecture, algorithms, and computing technologies.
              Building a strong foundation in Data Structures, OS, DBMS, and Networks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Active Contributor</h4>
                <h5>Hackathons & Tech Societies</h5>
              </div>
              <h3>ONGOING</h3>
            </div>
            <p>
              Engaging in collaborative environments and working with project teams.
              Applying theoretical concepts to create impactful real-world solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Tech Enthusiast</h4>
                <h5>Independent Learning</h5>
              </div>
              <h3>ONGOING</h3>
            </div>
            <p>
              Continuously improving technical skill set through practical learning.
              Focusing on Web Development, APIs, Linux systems, and performance tuning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
