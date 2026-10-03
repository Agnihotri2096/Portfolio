import {
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiReact,
  SiTypescript,
  SiFastapi,
  SiNodedotjs,
  SiThreedotjs,
  SiKalilinux,
  SiLinux,
  SiDocker,
  SiGit,
  SiCloudflare,
} from "react-icons/si";

interface PartnersSlideProps {
  isActive: boolean;
  className?: string;
  isLeaving?: boolean;
}

const technologies = [
  // AI
  { name: "Python", cat: "AI", icon: <SiPython /> },
  { name: "PyTorch", cat: "AI", icon: <SiPytorch /> },
  { name: "scikit-learn", cat: "AI", icon: <SiScikitlearn /> },
  { name: "Ollama", cat: "AI", icon: <SiPython /> },
  { name: "LLMs", cat: "AI", icon: <SiPytorch /> },
  // SOFTWARE
  { name: "React", cat: "SOFTWARE", icon: <SiReact /> },
  { name: "TypeScript", cat: "SOFTWARE", icon: <SiTypescript /> },
  { name: "FastAPI", cat: "SOFTWARE", icon: <SiFastapi /> },
  { name: "Node.js", cat: "SOFTWARE", icon: <SiNodedotjs /> },
  { name: "Three.js", cat: "SOFTWARE", icon: <SiThreedotjs /> },
  // SECURITY
  { name: "Scapy", cat: "SECURITY", icon: <SiPython /> },
  { name: "MITRE ATT&CK", cat: "SECURITY", icon: <SiKalilinux /> },
  { name: "NVD", cat: "SECURITY", icon: <SiLinux /> },
  { name: "CISA KEV", cat: "SECURITY", icon: <SiKalilinux /> },
  // INFRASTRUCTURE
  { name: "Linux", cat: "INFRASTRUCTURE", icon: <SiLinux /> },
  { name: "Docker", cat: "INFRASTRUCTURE", icon: <SiDocker /> },
  { name: "Git", cat: "INFRASTRUCTURE", icon: <SiGit /> },
  { name: "Cloudflare", cat: "INFRASTRUCTURE", icon: <SiCloudflare /> },
];

const PartnersSlide = ({ isActive, className = "", isLeaving = false }: PartnersSlideProps) => {
  return (
    <section
      id="partners"
      className={`slide stars-slide ${className} ${isActive ? "present partners-open" : ""} ${
        isLeaving ? "partners-leaving" : ""
      }`}
    >
      <div className="slide-inner partners-content">
        <div className="partners-hero-copy">
          <p className="subtitle">ENGINEERED SYSTEMS &amp; INFRASTRUCTURE</p>
          <h2 className="eyebrow" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
            THE LAB<br />STACK
          </h2>
          <p className="subtitle">Core technologies across AI, Software, Security &amp; Infrastructure</p>
        </div>

        <div className="partners-showcase-frame">
          <div className="partners-showcase">
            <span className="partners-node partners-node-top-left" aria-hidden="true" />
            <span className="partners-node partners-node-top-right" aria-hidden="true" />
            <span className="partners-node partners-node-bottom-left" aria-hidden="true" />
            <span className="partners-node partners-node-bottom-right" aria-hidden="true" />

            <p className="partners-label">AI &bull; SOFTWARE &bull; SECURITY &bull; INFRASTRUCTURE</p>

            <div className="partners-logos-viewport">
              <div className="partners-logos-track">
                {/* 3 copies for completely seamless infinite loop */}
                {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
                  <div className="tech-badge-item" key={idx}>
                    <span style={{ fontSize: "1.1rem", display: "flex", color: "#5eead4" }}>
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                    <span style={{ fontSize: "0.68rem", opacity: 0.55, letterSpacing: "0.1em" }}>
                      [{tech.cat}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlide;
