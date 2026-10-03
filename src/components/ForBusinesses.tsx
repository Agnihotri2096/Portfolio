import "./styles/ForBusinesses.css";
import { smoother } from "./Navbar";

const services = [
  {
    num: "01",
    title: "WEBSITES",
    desc: "Modern websites and landing pages.",
  },
  {
    num: "02",
    title: "AUTOMATION",
    desc: "Connect forms, data and repetitive workflows.",
  },
  {
    num: "03",
    title: "AI TOOLS",
    desc: "Practical AI systems built around real workflows.",
  },
];

const ForBusinesses = () => {
  const handleTalkProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#contact", true, "top top");
    } else {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="for-businesses-section" id="for-businesses">
      <div className="for-businesses-container section-container">
        <div className="for-businesses-header">
          <div className="for-businesses-badge">
            <span className="badge-dot"></span>
            SERVICES & EXPERTISE
          </div>
          <h2>NEED SOMETHING BUILT?</h2>
          <p className="for-businesses-subhead">
            Websites, automation and practical software for businesses that want to work smarter.
          </p>
        </div>

        <div className="for-businesses-grid">
          {services.map((item, index) => (
            <div className="for-businesses-card" key={index}>
              <div className="card-num">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="for-businesses-cta-wrapper">
          <a
            href="#contact"
            className="for-businesses-cta"
            onClick={handleTalkProject}
            data-cursor="disable"
          >
            TALK ABOUT YOUR PROJECT &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForBusinesses;
