import React, { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import Magnetic from "../Magnetic";

interface Project {
  id: string;
  title: string;
  domain: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: "cyberrisk-iq",
    title: "CyberRisk IQ",
    domain: "AI & Cyber Risk",
    year: "2026",
    image: "/images/cyberrisk-iq.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "netsonar",
    title: "NetSonar",
    domain: "Network Sound Synthesis",
    year: "2025",
    image: "/images/preview.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "aiml-engineering",
    title: "AI / ML Systems",
    domain: "Local LLMs & Machine Learning",
    year: "2025",
    image: "/images/radix.png",
    link: "https://github.com/Agnihotri-Labs",
  },
  {
    id: "prithvipath",
    title: "PrithviPath",
    domain: "Spatial Telemetry & Routing",
    year: "2025",
    image: "/images/prithvipath.png",
    link: "https://v0-new2ndoctmain2-ljo35283k-akshat-agnihotris-projects-0a8dae8b.vercel.app",
  },
  {
    id: "cse-society",
    title: "CSE Society Hub",
    domain: "Engineering Portal",
    year: "2024",
    image: "/images/cse-society.png",
    link: "https://agnihotri2096.github.io/Society-Website/",
  },
  {
    id: "solidx",
    title: "Solidx Network",
    domain: "Decentralized Architecture",
    year: "2024",
    image: "/images/Solidx.png",
    link: "https://github.com/Agnihotri-Labs",
  },
];

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] as const } },
};

export const Projects: React.FC = () => {
  const [modal, setModal] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // QuickTo position tracking for the floating modal and cursor badge
    const moveModalX = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const moveModalY = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const moveLabelX = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const moveLabelY = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      moveModalX(clientX);
      moveModalY(clientY);
      moveLabelX(clientX);
      moveLabelY(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="work" className="ds-projects-section">
      <p className="ds-projects-header">Recent Work</p>

      <div
        className="ds-projects-list"
        onMouseLeave={() => setModal({ active: false, index: modal.index })}
      >
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="ds-project-row"
            onMouseEnter={() => setModal({ active: true, index })}
          >
            <h3 className="ds-project-title">{project.title}</h3>
            <div className="ds-project-meta">
              <span>{project.domain}</span>
              <span>{project.year}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="ds-projects-footer">
        <Magnetic strength={0.35}>
          <a
            href="https://github.com/Agnihotri-Labs"
            target="_blank"
            rel="noreferrer"
            className="ds-round-button"
            aria-label="View more work on GitHub"
          >
            <div className="ds-round-button-fill" />
            <span>More work</span>
          </a>
        </Magnetic>
      </div>

      {/* Floating Project Modal (Dennis Snellenberg signature) */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
        className="ds-project-modal-container"
      >
        <div
          style={{ top: `${modal.index * -100}%` }}
          className="ds-project-modal-slider"
        >
          {projects.map((project) => (
            <div key={project.id} className="ds-project-modal-card">
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Cursor Pill "View" */}
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
        className="ds-project-cursor-pill"
      >
        View
      </motion.div>
    </section>
  );
};

export default Projects;
