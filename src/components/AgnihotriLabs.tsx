import "./styles/AgnihotriLabs.css";
import { MdArrowDownward, MdTerminal, MdAutoMode, MdSecurity, MdAnalytics, MdCode, MdLaptopMac, MdPsychology, MdMemory } from "react-icons/md";

const capabilities = [
  {
    num: "01",
    title: "WEB & SOFTWARE",
    desc: "Modern websites, web applications, APIs and custom software systems.",
    icon: <MdTerminal />,
    tags: ["React / TypeScript", "FastAPI / Node", "REST APIs", "Modern UI Architecture"],
  },
  {
    num: "02",
    title: "AI & AUTOMATION",
    desc: "AI-powered tools, LLM applications, RAG systems and business automation.",
    icon: <MdAutoMode />,
    tags: ["Local LLMs / Ollama", "RAG Pipelines", "Workflow Scripts", "Agentic Systems"],
  },
  {
    num: "03",
    title: "CYBERSECURITY",
    desc: "Security-focused software, analysis tools and cybersecurity engineering.",
    icon: <MdSecurity />,
    tags: ["Vulnerability Analysis", "Network Telemetry", "Risk Modeling", "Security Engineering"],
  },
  {
    num: "04",
    title: "DATA & ENGINEERING",
    desc: "Data workflows, dashboards, integrations and engineering systems.",
    icon: <MdAnalytics />,
    tags: ["Data Pipelines", "Interactive Dashboards", "Systems Integration", "Telemetry"],
  },
];

const services = [
  {
    title: "WEBSITES",
    desc: "Custom responsive websites and landing pages.",
    icon: <MdLaptopMac />,
  },
  {
    title: "WEB APPLICATIONS",
    desc: "Full-stack applications and internal tools.",
    icon: <MdCode />,
  },
  {
    title: "AI SYSTEMS",
    desc: "LLM-powered applications, RAG and AI assistants.",
    icon: <MdPsychology />,
  },
  {
    title: "AUTOMATION",
    desc: "Business workflows, integrations and repetitive-task automation.",
    icon: <MdAutoMode />,
  },
  {
    title: "SECURITY TOOLS",
    desc: "Security analysis and engineering tools.",
    icon: <MdMemory />,
  },
];

const AgnihotriLabs = () => {
  return (
    <section className="labs-section" id="labs">
      <div className="section-container">
        {/* Personal to Studio Relationship Visual */}
        <div className="relationship-wrapper">
          <div className="relationship-card founder-side">
            <span className="rel-role">FOUNDER / BUILDER</span>
            <h4 className="rel-name">AKSHAT AGNIHOTRI</h4>
            <p className="rel-desc">AI • Software • Security Engineering</p>
          </div>

          <div className="relationship-connector">
            <span className="connector-label">ESTABLISHED</span>
            <div className="connector-line">
              <MdArrowDownward />
            </div>
          </div>

          <div className="relationship-card studio-side">
            <span className="rel-role">INDEPENDENT TECHNOLOGY STUDIO</span>
            <h4 className="rel-name">AGNIHOTRI LABS</h4>
            <p className="rel-desc">Practical AI, Automation & Software</p>
          </div>
        </div>

        {/* Studio Introduction Header */}
        <div className="labs-header">
          <div className="section-label">
            <span className="label-dot"></span>
            TECHNOLOGY STUDIO
          </div>
          <h2 className="labs-title">
            AGNIHOTRI <span>LABS</span>
          </h2>
          <div className="labs-tagline">BUILD. AUTOMATE. SECURE.</div>
          <p className="labs-description">
            An independent technology studio building practical software, AI systems and
            automation tools for modern businesses.
          </p>
        </div>

        {/* What Agnihotri Labs Builds (4 Areas) */}
        <div className="capabilities-grid">
          {capabilities.map((cap, idx) => (
            <div className="cap-card" key={idx}>
              <div className="cap-top">
                <span className="cap-num">{cap.num}</span>
                <span className="cap-icon">{cap.icon}</span>
              </div>
              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-desc">{cap.desc}</p>
              <div className="cap-tags">
                {cap.tags.map((tag, tIdx) => (
                  <span className="cap-tag" key={tIdx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Services: What We Can Build */}
        <div className="services-section">
          <div className="services-header">
            <div className="section-label">
              <span className="label-dot"></span>
              PRACTICAL ENGINEERING
            </div>
            <h3 className="services-title">WHAT WE CAN BUILD</h3>
            <p className="services-subtitle">
              Engineered with clean code, modern architectures, and reliable deployment practices.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, idx) => (
              <div className="service-card" key={idx}>
                <div className="service-icon">{svc.icon}</div>
                <h4 className="service-title">{svc.title}</h4>
                <p className="service-desc">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgnihotriLabs;
