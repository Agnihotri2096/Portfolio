import { useState } from 'react';
import { FiArrowUpRight, FiArrowDown, FiMenu, FiX, FiSun, FiMoon, FiGithub, FiCode, FiCpu, FiShield, FiLayers } from 'react-icons/fi';
import { SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiPython, SiMongodb } from 'react-icons/si';
import Work from './Work';
import StudioDetails from './StudioDetails';
import './studio.css';

export function Brand() {
  return <a className="brand" href="#home" aria-label="Agnihotri Labs home"><img className="brand-logo" src="/agnihotri-labs-logo.png" alt="" /><span>agnihotri<span className="brand-labs">labs</span></span></a>;
}

export default function Studio() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className={`studio ${light ? 'studio-light' : ''}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><Brand /><nav aria-label="Main navigation" className={menuOpen ? 'nav-open' : ''}>{[['Home', 'home'], ['About', 'about'], ['Work', 'work'], ['Expertise', 'expertise']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><div className="header-actions"><button className="theme-button" aria-label={`Switch to ${light ? 'dark' : 'light'} theme`} onClick={() => setLight(!light)}>{light ? <FiMoon /> : <FiSun />}</button><a href="#contact" className="button button-small">Let&apos;s talk <FiArrowUpRight /></a><button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button></div></header>
    <main id="main">
      <section className="hero" id="home">
        <div className="hero-beams" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} />)}</div>
        <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="status-dot" /> INDEPENDENT TECHNOLOGY STUDIO</div><h1>Ideas into <em>intelligence.</em><br /><em>Built</em> for the real world.</h1><p>Software. AI. Automation. Security.<br />Thoughtfully engineered. Purposefully different.</p><div className="hero-buttons"><a className="button" href="#contact">Build with us <FiArrowUpRight /></a><a className="button button-outline" href="#work">Explore our work <FiArrowDown /></a></div><div className="hero-signature">FOUNDED BY AKSHAT AGNIHOTRI <span>·</span> BUILT WITH CURIOSITY</div></div>
        <div className="lab-window"><div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>AGNIHOTRI LABS / THE WORKSPACE</span><span className="window-live"><span className="status-dot" /> SYSTEMS ONLINE</span></div><div className="workspace"><aside><span className="tiny-label">EXPLORER</span>{[[FiLayers, 'The lab'], [FiCode, 'Software engineering'], [FiCpu, 'Intelligent systems'], [FiShield, 'Security & research']].map(([Icon, title], i) => { const ItemIcon = Icon as typeof FiCode; return <a className={i === 0 ? 'active' : ''} href={i === 0 ? '#about' : '#expertise'} key={String(title)}><ItemIcon />{String(title)}</a>; })}<div className="workspace-note"><span className="status-dot" /> Always experimenting.</div></aside><div className="workspace-center"><div className="orbital" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><img className="orbital-logo" src="/agnihotri-labs-logo.png" alt="Agnihotri Labs" /><span className="orbit-point" /></div><span className="workspace-title">A little curiosity. <em>Infinite possibilities.</em></span><span className="tiny-label">BUILD. AUTOMATE. SECURE.</span></div><div className="workspace-spec"><span className="tiny-label">OUR DNA</span><p>Curiosity <span>Limitless</span></p><p>Approach <span>Hands-on</span></p><p>Focus <span>Real-world</span></p><div className="code-note"><span>const</span> possibility =<br />&nbsp; curiosity<br />&nbsp; + engineering;<br /><br /><span>build</span>(possibility);</div><a href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">Explore the source <FiGithub /></a></div></div><div className="window-footer"><span>FROM FIRST PRINCIPLES TO WHAT&apos;S NEXT</span><span>01 — THE LAB</span></div></div>
      </section>
      <section className="stack-section" aria-label="Technology stack"><p>GOOD IDEAS. THE RIGHT TOOLS.</p><div>{[[SiReact, 'React'], [SiNextdotjs, 'Next.js'], [SiTypescript, 'TypeScript'], [SiPython, 'Python'], [SiNodedotjs, 'Node.js'], [SiMongodb, 'MongoDB']].map(([Icon, label]) => { const TechIcon = Icon as typeof SiReact; return <span key={String(label)}><TechIcon />{String(label)}</span>; })}</div></section>
      <StudioDetails section="about" />
      <Work />
      <StudioDetails section="expertise" />
      <section className="contact-section" id="contact"><div className="eyebrow"><span className="status-dot" /> LET&apos;S BUILD SOMETHING MEANINGFUL</div><h2>Your next idea.<br /><em>Our next obsession.</em></h2><p>Have a challenge, a collaboration, or a spark of an idea?<br />Let&apos;s see where it takes us.</p><a className="button" href="mailto:hello@agnihotrilabs.tech">Let&apos;s start a conversation <FiArrowUpRight /></a><a className="contact-email" href="mailto:hello@agnihotrilabs.tech">hello@agnihotrilabs.tech</a></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><Brand /><p>An independent lab.<br />A world of possibilities.</p><div><a href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href="https://linkedin.com/in/akshat-agnihotri" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href="https://akshat-agnihotri.netlify.app/" target="_blank" rel="noreferrer">Founder&apos;s portfolio <FiArrowUpRight /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Agnihotri Labs</span><span>Crafted with intention. Built with curiosity.</span><a href="#home">Back to top ↑</a></div></footer>
  </div>;
}
