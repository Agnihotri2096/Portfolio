import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const projects = [
  { title: 'CyberRisk IQ', category: 'AI & Security', kind: 'AI-powered cyber risk intelligence', image: '/images/cyberrisk-iq.png', year: '2026', link: 'https://github.com/Agnihotri-Labs' },
  { title: 'PrithviPath', category: 'Software', kind: 'Spatial telemetry & intelligent routing', image: '/images/prithvipath.png', year: '2025', link: 'https://v0-new2ndoctmain2-ljo35283k-akshat-agnihotris-projects-0a8dae8b.vercel.app' },
  { title: 'NetSonar', category: 'Experiments', kind: 'Exploring network sound synthesis', image: '/images/preview.png', year: '2025', link: 'https://github.com/Agnihotri-Labs' },
  { title: 'AI / ML Systems', category: 'AI & Security', kind: 'Local LLMs & machine learning', image: '/images/radix.png', year: '2025', link: 'https://github.com/Agnihotri-Labs' },
  { title: 'CSE Society Hub', category: 'Software', kind: 'A home for the engineering community', image: '/images/cse-society.png', year: '2024', link: 'https://agnihotri2096.github.io/Society-Website/' },
  { title: 'Solidx Network', category: 'Experiments', kind: 'Exploring decentralized architecture', image: '/images/Solidx.png', year: '2024', link: 'https://github.com/Agnihotri-Labs' },
];
export default function Work() {
  const [filter, setFilter] = useState('All work');
  return <section className="section work-section" id="work"><div className="section-heading"><div><div className="eyebrow">02 / SELECTED WORK</div><h2>Less talk.<br /><em>More building.</em></h2></div><p>A collection of ideas turned into working systems.<br />Each one an experiment. Each one a step forward.</p></div><div className="work-filters" aria-label="Filter projects">{['All work', 'Software', 'AI & Security', 'Experiments'].map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>06</span>}</button>)}</div><div className="project-grid">{projects.filter(p => filter === 'All work' || p.category === filter).map((p, i) => <a className={`project-card project-color-${i % 3}`} key={p.title} href={p.link} target="_blank" rel="noreferrer"><div className="project-image"><span className="project-tag">{p.category}</span><img src={p.image} alt={`${p.title} project preview`} loading="lazy" /><span className="project-visit" aria-label="Open project"><FiArrowUpRight /></span></div><div className="project-title"><h3>{p.title}</h3><span>{p.year}</span></div><p>{p.kind}</p></a>)}</div><a className="text-link" href="https://github.com/Agnihotri-Labs" target="_blank" rel="noreferrer">More experiments on GitHub <FiArrowUpRight /></a></section>;
}
