import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const projects = [
  { name: "CyberRisk IQ", type: "AI / SECURITY", status: "In Development", description: "An AI-assisted cyber risk platform connecting vulnerability intelligence, asset criticality, financial risk estimation, and security investment optimization.", tools: ["Python", "FastAPI", "NVD", "AI"] },
  { name: "NetSonar", type: "NETWORKING / AUDIO", status: "Experimental", description: "An experimental project exploring how network traffic can be translated into sound using packet analysis and audio mapping.", tools: ["Python", "Scapy", "Linux", "Audio"] },
  { name: "Local AI Workbench", type: "AI / RESEARCH", status: "Research / Experimentation", description: "An exploration of local language models and grounded AI workflows for useful, private, practical automation.", tools: ["Ollama", "Python", "SQLite", "Linux"] },
];
const capabilities = ["AI Engineering", "Software Development", "Business Automation", "Security-Focused Engineering"];
const services = ["Web Applications", "AI and Automation", "Custom Software"];
const technologies = ["Python", "React", "TypeScript", "Next.js", "Node.js", "FastAPI", "SQLite", "Ollama", "Linux", "Docker", "Scapy"];

function SectionLabel({ children }: { children: string }) { return <div className="section-label"><span>✳</span>{children}</div>; }
function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => scrollTo("top")}><span className="brand-mark">A</span><span>AGNIHOTRI<br />LABS</span></a>
      <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button>
      <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
        <a href="#work" onClick={() => scrollTo("work")}>Work</a><a href="#studio" onClick={() => scrollTo("studio")}>Studio</a><a href="#services" onClick={() => scrollTo("services")}>Services</a><a href="#contact" onClick={() => scrollTo("contact")}>Contact</a>
      </nav>
      <a className="header-cta" href="mailto:hello@agnihotrilabs.tech">Start a project <Arrow /></a>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
          <SectionLabel>INDEPENDENT TECHNOLOGY STUDIO</SectionLabel>
          <h1>We build<br /><em>useful</em><br />technology.</h1>
          <p>AI systems, software applications, and practical automation engineered to solve real problems.</p>
          <div className="hero-actions"><button className="button button-dark" onClick={() => scrollTo("work")}>Explore projects <Arrow /></button><a className="text-link" href="mailto:hello@agnihotrilabs.tech">Discuss a project <Arrow /></a></div>
        </motion.div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .9 }} aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="art-core">A<span>/</span>L</div><div className="art-caption">BUILD.<br />AUTOMATE.<br />SECURE.</div></motion.div>
      </section>

      <section id="studio" className="intro section-wrap two-col"><SectionLabel>01 / THE STUDIO</SectionLabel><div><h2>Technology should make<br /><em>things clearer.</em></h2><p>Agnihotri Labs is an independent technology studio focused on AI engineering, software development, automation, and security-conscious engineering.</p><p>We work from first principles, turning complex problems into focused systems that are useful, understandable, and built to last.</p></div></section>

      <section id="work" className="work section-wrap"><div className="section-heading"><SectionLabel>02 / SELECTED WORK</SectionLabel><span>Projects in progress</span></div><div className="project-grid"><div className="project-index">{projects.map((project, index) => <button className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)} key={project.name}><span>0{index + 1}</span><b>{project.name}</b><Arrow /></button>)}</div><motion.article className="project-feature" key={projects[activeProject].name} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35 }}><div className="feature-top"><span>{projects[activeProject].type}</span><span>{projects[activeProject].status}</span></div><div><h3>{projects[activeProject].name}</h3><p>{projects[activeProject].description}</p></div><div className="tool-list">{projects[activeProject].tools.map(tool => <span key={tool}>{tool}</span>)}</div></motion.article></div></section>

      <section className="capabilities section-wrap"><SectionLabel>03 / CAPABILITIES</SectionLabel><div className="capability-list">{capabilities.map((capability, index) => <div key={capability}><span>0{index + 1}</span><h3>{capability}</h3><Arrow /></div>)}</div></section>

      <section id="services" className="services section-wrap two-col"><SectionLabel>04 / SERVICES</SectionLabel><div><h2>From first idea<br />to <em>working system.</em></h2><div className="service-list">{services.map(service => <div key={service}><span>{service}</span><Arrow /></div>)}</div><a className="button button-light" href="mailto:hello@agnihotrilabs.tech">Talk to the studio <Arrow /></a></div></section>

      <section className="stack section-wrap"><div className="section-heading"><SectionLabel>05 / TECHNOLOGIES</SectionLabel><span>Tools we use to build</span></div><div className="tech-cloud">{technologies.map((technology, index) => <span key={technology} style={{ "--i": index } as React.CSSProperties}>{technology}</span>)}</div></section>

      <section id="contact" className="contact section-wrap"><SectionLabel>06 / CONTACT</SectionLabel><h2>Have a problem<br /><em>worth solving?</em></h2><div className="contact-bottom"><p>Tell us what you are trying to build, automate, or understand.</p><a className="contact-email" href="mailto:hello@agnihotrilabs.tech">hello@agnihotrilabs.tech <Arrow /></a></div></section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} AGNIHOTRI LABS</span><div><a href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">GitHub</a><a href="https://agnihotrilabs.tech/" target="_blank" rel="noreferrer">Website</a><a href="mailto:hello@agnihotrilabs.tech">Email</a></div><span>BUILD. AUTOMATE. SECURE.</span></footer>
  </div>;
}

export { projects };
export const apps = [];
