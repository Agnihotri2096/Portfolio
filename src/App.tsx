import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

type Project = {
  no: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  status: string;
  tone: "teal" | "blue" | "violet";
  problem: string;
  approach: string;
  github?: string;
};

const projects: Project[] = [
  { no: "01", name: "CYBERRISK IQ", category: "CYBERSECURITY / RISK INTELLIGENCE", description: "An AI-assisted cyber risk platform connecting security findings, asset criticality, financial exposure, and risk-reduction priorities.", tags: ["VULNERABILITY INTELLIGENCE", "CVSS", "GROUNDED AI"], status: "IN DEVELOPMENT", tone: "teal", problem: "Security findings are often disconnected from the business decisions they should inform.", approach: "A risk intelligence layer that maps technical signals to asset criticality, exposure, controls, and investment priorities. Sample figures shown in the preview are illustrative.", github: "https://github.com/Agnihotri-Labs" },
  { no: "02", name: "NETSONAR", category: "NETWORKING / AUDIO EXPERIMENT", description: "An experimental application that translates network traffic activity into sound, exploring a different way to experience network behavior.", tags: ["PYTHON", "SCAPY", "PIPEWIRE"], status: "EXPERIMENTAL", tone: "blue", problem: "Network activity is rich with patterns, but those patterns are usually experienced only through visual dashboards.", approach: "A simulated packet stream becomes protocol-aware audio events, creating another lens for exploring traffic. The visualizer is demo data, not a live connection.", github: "https://github.com/Agnihotri-Labs" },
  { no: "03", name: "LOCAL AI WORKBENCH", category: "ARTIFICIAL INTELLIGENCE", description: "Experiments with locally hosted language models and AI-assisted workflows for private, practical, locally executed applications.", tags: ["OLLAMA", "PYTHON", "LOCAL MODELS"], status: "RESEARCH / EXPERIMENTATION", tone: "violet", problem: "Useful AI workflows should not always require sending sensitive context to a hosted service.", approach: "A small runtime for testing local models, API integrations, and task-focused workflows while keeping experimentation close to the machine.", github: "https://github.com/Agnihotri-Labs" },
];

const capabilities = [
  ["01", "SOFTWARE ENGINEERING", "Responsive websites, web applications, internal tools, and custom software.", ["Business websites", "Interactive applications", "Dashboards", "API integrations"]],
  ["02", "AI SYSTEMS", "Practical AI features and locally hosted workflows designed around useful tasks rather than hype.", ["LLM integrations", "Document Q&A", "Local models", "AI utilities"]],
  ["03", "BUSINESS AUTOMATION", "Thoughtful automation that reduces repetitive work and connects existing business workflows.", ["Workflow automation", "Data processing", "Reporting tools", "Custom utilities"]],
  ["04", "SECURITY / NETWORK INTELLIGENCE", "Security-focused tools, network analysis, and technical experimentation.", ["Network visibility", "Security analysis", "Vulnerability intelligence", "Defensive tooling"]],
];

const tech = {
  "AI / ML": ["Python", "PyTorch", "scikit-learn", "Ollama", "LLMs"],
  "SOFTWARE": ["React", "TypeScript", "Next.js", "Node.js", "FastAPI", "SQLite"],
  "SECURITY": ["Scapy", "NVD", "CISA KEV", "MITRE ATT&CK"],
  "INFRASTRUCTURE": ["Linux", "Docker", "Git", "Cloudflare", "Vercel"],
};

const labModules = {
  "CYBERRISK IQ": { title: "Risk Intelligence", rows: [["Vulnerability analysis", "Implemented prototype functionality"], ["Financial modeling", "FAIR-aligned estimation approach"], ["Intelligence sources", "NVD / CISA KEV integrations"], ["Current state", "In development"]], code: "risk_signal = map(finding, asset_criticality)" },
  NETSONAR: { title: "Network Sonification", rows: [["Packet categories", "TCP / UDP / ICMP"], ["Input", "Network traffic"], ["Output", "Audio events"], ["Current state", "Experimental"]], code: "packet_event = sonify(protocol, intensity)" },
  "LOCAL AI": { title: "Local Model Runtime", rows: [["Runtime", "Ollama"], ["Execution", "Local machine"], ["Purpose", "Private AI experimentation"], ["Current state", "Active experimentation"]], code: "response = local_model.generate(context)" },
};

function Mark() { return <span className="mark" aria-hidden="true"><i /><i /><i /></span>; }
function SectionLabel({ children, number }: { children: string; number: string }) { return <motion.div className="section-label" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}><span>{number}</span><span>{children}</span></motion.div>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

function NodeMap() {
  const [active, setActive] = useState("AGNIHOTRI LABS");
  const nodes = ["AI SYSTEMS", "SOFTWARE", "AUTOMATION", "SECURITY"];
  const descriptions: Record<string, string> = { "AGNIHOTRI LABS": "Independent technology studio", "AI SYSTEMS": "Useful intelligence, locally and practically", SOFTWARE: "Products that solve real problems", AUTOMATION: "Less repetition, more leverage", SECURITY: "Defensive tools and network insight" };
  return <div className="node-map" aria-label="Agnihotri Labs disciplines visualization">
    <svg viewBox="0 0 600 480" role="img" aria-label="Connected technology disciplines">
      <defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#67e8d0" stopOpacity=".7" /><stop offset="1" stopColor="#7aa2ff" stopOpacity=".15" /></linearGradient></defs>
      <path className="connect" d="M300 238 L145 95 M300 238 L455 95 M300 238 L145 380 M300 238 L455 380" />
      <circle className="orbit" cx="300" cy="238" r="95" />
      <circle className="core-pulse" cx="300" cy="238" r="52" />
    </svg>
    <div className="node node-core" onMouseEnter={() => setActive("AGNIHOTRI LABS")}><b><Mark />AGNIHOTRI<br />LABS</b><span className="node-dot" /></div>
    {nodes.map((node, i) => <button key={node} className={`node node-${i}`} onMouseEnter={() => setActive(node)} onFocus={() => setActive(node)}><span className="node-dot" />{node}</button>)}
    <div className="node-tooltip"><small>FOCUS / {active}</small><strong>{descriptions[active]}</strong></div>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("studio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [labTab, setLabTab] = useState<keyof typeof labModules>("CYBERRISK IQ");
  const [paused, setPaused] = useState(false);
  const [techTab, setTechTab] = useState<keyof typeof tech>("AI / ML");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24); const max = document.documentElement.scrollHeight - window.innerHeight; document.documentElement.style.setProperty("--scroll-progress", `${max > 0 ? window.scrollY / max : 0}`); const ids = ["studio", "work", "lab", "capabilities", "contact"]; const current = ids.find((id) => { const el = document.getElementById(id); return el && el.getBoundingClientRect().top > -180 && el.getBoundingClientRect().top < 340; }); if (current) setActiveSection(current); };
    window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenuOpen(false); setSelectedProject(null); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const lab = labModules[labTab];
  const nav = ["studio", "work", "lab", "capabilities", "contact"];
  const copyEmail = async () => { await navigator.clipboard?.writeText("hello@agnihotrilabs.tech"); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <div className="site-shell">
    <div className="grid-bg" /><div className="grain" /><div className="scroll-progress" aria-hidden="true" />
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}><button className="brand" onClick={() => scrollTo("top")}><Mark /><span>AGNIHOTRI<br /><b>LABS</b></span></button><nav className={menuOpen ? "open" : ""}>{nav.map((id) => <button key={id} className={activeSection === id ? "active" : ""} onClick={() => scrollTo(id)}>{id === "studio" ? "STUDIO" : id.toUpperCase()}</button>)}</nav><div className="nav-status"><span className="live-dot" /> LAB STATUS: ACTIVE</div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button></header>

    <main id="top">
      <section className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span>INDEPENDENT TECHNOLOGY STUDIO</span><span>EST. 2026</span><span>AI / SOFTWARE / AUTOMATION / SECURITY</span></div><motion.h1 initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .12 } } }}>{["BUILD.", "AUTOMATE.", "SECURE."].map((word) => <motion.span key={word} variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: .7 } } }}>{word}</motion.span>)}</motion.h1><p className="hero-intro">We build practical AI systems, software applications, automation tools, and security-focused technology for real-world problems.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("work")}>EXPLORE PROJECTS <Arrow /></button><button className="button button-ghost" onClick={() => scrollTo("contact")}>GET IN TOUCH <Arrow /></button></div><div className="status-panel"><div><small>SYSTEM STATUS</small><b><span className="live-dot" /> OPERATIONAL</b></div><div><small>CORE DISCIPLINES</small><b>04</b></div><div><small>ACTIVE PROJECTS</small><b>02+</b></div><div><small>FOCUS</small><b>BUILDING USEFUL SYSTEMS</b></div></div></div><NodeMap /><div className="scroll-cue"><span /> SCROLL TO EXPLORE</div></section>

      <section id="studio" className="section-wrap studio-section"><SectionLabel number="01 /">THE STUDIO</SectionLabel><div className="split-heading"><h2>GOOD SOFTWARE<br /><em>SHOULD SOLVE SOMETHING.</em></h2><div><p className="lead">Agnihotri Labs is an independent technology studio focused on turning ideas into useful software, practical AI systems, and reliable technical tools.</p><p>We experiment, engineer, test, and iterate—with an emphasis on solutions that work beyond the demo.</p></div></div><div className="principles">{[["01", "ENGINEER", "Build dependable applications and systems with a clear purpose."], ["02", "AUTOMATE", "Reduce repetitive work with practical, thoughtfully designed automation."], ["03", "EXPLORE", "Experiment with AI, network intelligence, and emerging technologies."]].map(([no, title, text]) => <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} viewport={{ once: true }} className="principle" key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></motion.div>)}</div></section>

      <section id="work" className="section-wrap work-section"><SectionLabel number="02 /">SELECTED WORK</SectionLabel><div className="section-head"><div><h2>BUILT IN<br /><em>THE LAB.</em></h2></div><p>A selection of engineering projects exploring risk intelligence, network visualization, and practical AI.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} onOpen={() => setSelectedProject(project)} />)}</div></section>

      <section id="lab" className="section-wrap lab-section"><SectionLabel number="03 /">LIVE LAB</SectionLabel><div className="section-head"><div><h2>EXPERIMENTS<br /><em>IN PROGRESS.</em></h2></div><p>A lightweight workstation for exploring current directions. Everything here is local demo data—not a live connection.</p></div><div className="lab-window"><div className="lab-tabs">{Object.keys(labModules).map((tab) => <button className={labTab === tab ? "selected" : ""} key={tab} onClick={() => setLabTab(tab as keyof typeof labModules)}>{tab}<span /></button>)}</div><div className="lab-content"><div className="lab-main"><div className="demo-label"><span className="live-dot" /> DEMO DATA / SIMULATED VISUALIZATION</div><h3>{lab.title}</h3><div className={`signal-visual ${paused ? "paused" : ""}`}>{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ height: `${18 + ((i * 37) % 60)}%`, animationDelay: `${i * -.08}s` }} />)}</div><div className="lab-controls"><button onClick={() => setPaused(!paused)}>{paused ? "RESUME STREAM" : "PAUSE STREAM"}</button><button onClick={() => setPaused(false)}>RESET VISUALIZATION</button></div></div><div className="lab-data"><div className="data-rows">{lab.rows.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div><div className="code-sample"><small>EXAMPLE / LOCAL DEMO</small><code>{lab.code}</code><button onClick={() => navigator.clipboard?.writeText(lab.code)}>COPY</button></div></div></div></div></section>

      <section id="capabilities" className="section-wrap capabilities-section"><SectionLabel number="04 /">CAPABILITIES</SectionLabel><div className="section-head"><h2>FROM IDEA TO<br /><em>WORKING SYSTEM.</em></h2><p>Focused technical capability for teams and people with a problem worth solving.</p></div><div className="capability-grid">{capabilities.map(([no, title, text, items]) => <details className="capability" key={String(title)}><summary><span>{no}</span><h3>{title}</h3><b>+</b></summary><p>{text}</p><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></details>)}</div><button className="text-link" onClick={() => scrollTo("contact")}>DISCUSS A PROJECT <Arrow /></button><p className="fine-print">Security testing and analysis is performed only with explicit authorization.</p></section>

      <section className="section-wrap technology-section"><SectionLabel number="05 /">TECHNOLOGY</SectionLabel><div className="section-head"><h2>TOOLS FOR<br /><em>BUILDING REAL THINGS.</em></h2><p>A configurable toolkit, selected for the problem—not a list of meaningless proficiency scores.</p></div><div className="tech-explorer"><div className="tech-tabs">{Object.keys(tech).map((tab) => <button className={techTab === tab ? "selected" : ""} key={tab} onClick={() => setTechTab(tab as keyof typeof tech)}>{tab}</button>)}</div><div className="tech-list">{tech[techTab].map((item, i) => <motion.div layout key={item} className="tech-chip"><span>0{i + 1}</span>{item}<i>↗</i></motion.div>)}</div></div></section>

      <section className="section-wrap process-section"><SectionLabel number="06 /">PROCESS</SectionLabel><div className="section-head"><h2>THOUGHTFUL BY DESIGN.<br /><em>PRACTICAL BY DEFAULT.</em></h2></div><div className="process-line">{[["01", "DISCOVER", "Understand the problem, users, constraints, and desired outcome."], ["02", "DESIGN", "Define the architecture, experience, and implementation strategy."], ["03", "BUILD", "Develop the solution using appropriate tools and maintainable components."], ["04", "TEST", "Validate behavior, usability, performance, and reliability."], ["05", "DEPLOY & ITERATE", "Release, observe, refine, and improve."]].map(([no, title, text]) => <div className="process-step" key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="section-wrap founder-section"><SectionLabel number="07 /">THE FOUNDER</SectionLabel><div className="founder-grid"><div><h2>BUILT WITH<br /><em>CURIOSITY.</em><br />ENGINEERED<br /><em>WITH INTENT.</em></h2></div><div className="founder-copy"><span className="coordinate">28°36' N / 77°13' E</span><h3>AKSHAT AGNIHOTRI</h3><small>FOUNDER / ENGINEER</small><p>I build and experiment across software engineering, artificial intelligence, automation, and cybersecurity.</p><p>Agnihotri Labs is where those experiments become practical tools, engineering projects, and ideas worth developing further.</p><div className="focus-list">{["Software Engineering", "AI / Machine Learning", "Cybersecurity", "Network Intelligence"].map((x) => <span key={x}>{x}</span>)}</div><a className="text-link" href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">VISIT GITHUB ORGANIZATION <Arrow /></a></div></div></section>

      <section id="contact" className="section-wrap contact-section"><SectionLabel number="08 /">CONTACT</SectionLabel><div className="contact-card"><div><h2>HAVE A PROBLEM<br /><em>WORTH SOLVING?</em></h2><p>Have a project idea, a workflow that needs automation, or a technical challenge worth exploring? Let&apos;s discuss what can be built.</p></div><div className="contact-actions"><a className="button button-primary" href="mailto:hello@agnihotrilabs.tech">START A CONVERSATION <Arrow /></a><button className="copy-button" onClick={copyEmail}>{copied ? "COPIED" : "hello@agnihotrilabs.tech"} <span>⧉</span></button></div></div></section>
    </main>
    <footer><div><button className="brand footer-brand" onClick={() => scrollTo("top")}><Mark /><span>AGNIHOTRI<br /><b>LABS</b></span></button><p>BUILD. AUTOMATE. SECURE.</p></div><div className="footer-links">{["work", "lab", "capabilities", "contact"].map((id) => <button key={id} onClick={() => scrollTo(id)}>{id.toUpperCase()}</button>)}<a href="https://agnihotrilabs.tech" target="_blank" rel="noreferrer">WEBSITE ↗</a><a href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">GITHUB ↗</a></div><div className="footer-meta"><span>INDEPENDENT TECHNOLOGY STUDIO</span><span>DESIGNED TO BUILD USEFUL SYSTEMS</span><span>© {new Date().getFullYear()} AGNIHOTRI LABS</span><button onClick={() => scrollTo("top")}>BACK TO TOP ↑</button></div></footer>

    <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedProject(null)}><motion.div className="project-modal" initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 22, opacity: 0 }} onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button><span className="eyebrow">PROJECT / {selectedProject.no}</span><h2>{selectedProject.name}</h2><small>{selectedProject.category}</small><div className="modal-columns"><div><h4>THE PROBLEM</h4><p>{selectedProject.problem}</p></div><div><h4>THE APPROACH</h4><p>{selectedProject.approach}</p></div></div><div className="tag-list">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{selectedProject.github && <a className="text-link" href={selectedProject.github} target="_blank" rel="noreferrer">VIEW ORGANIZATION ON GITHUB <Arrow /></a>}</motion.div></motion.div>}</AnimatePresence>
  </div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) { return <motion.article className={`project-card ${project.tone}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8 }} tabIndex={0} onClick={onOpen} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(); }}><div className="project-preview"><div className="preview-top"><span>{project.no} / {project.category.split(" /")[0]}</span><span className="live-dot" /></div><div className="preview-graphic">{project.tone === "teal" ? <><div className="risk-ring">72<small>RISK</small></div><div className="mini-bars"><i /><i /><i /><i /></div></> : project.tone === "blue" ? <><div className="wave">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ height: `${20 + ((i * 23) % 72)}%` }} />)}</div><span className="packet">TCP&nbsp; 184.22.4.16</span></> : <><div className="terminal"><span>model / llama3.2</span><b>▮▮▮ ready</b><small>private runtime / local</small></div></>}</div><span className="preview-label">ILLUSTRATIVE PREVIEW</span></div><div className="project-info"><span className="project-number">{project.no}</span><div><div className="project-status"><span className="live-dot" /> {project.status}</div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={(e) => { e.stopPropagation(); onOpen(); }}>VIEW DETAILS <Arrow /></button></div></div></motion.article>; }

export default App;
