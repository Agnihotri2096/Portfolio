import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "CyberRisk IQ",
    category: "AI-Powered Cyber Risk Platform",
    type: "LAB PROJECT",
    description:
      "Enterprise cyber risk quantification and investment optimization platform utilizing FAIR methodology and local LLM analyst support.",
    tools: "React, TypeScript, FastAPI, SQLite, Ollama",
    image: "/images/cyberrisk-iq.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "NetSonar",
    category: "Network Telemetry Sonification",
    type: "EXPERIMENT",
    description:
      "Real-time network traffic analysis and telemetry sonification system transforming live packet signatures into spatial audio cues.",
    tools: "Python, Scapy, NumPy, PipeWire, Linux",
    image: "/images/preview.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "AI / ML Engineering",
    category: "Intelligent Workflows & Local Models",
    type: "EXPERIMENT",
    description:
      "Experimental model fine-tuning, local inference automation, agent workflows, and data processing pipelines.",
    tools: "Python, PyTorch, scikit-learn, Ollama, Jupyter",
    image: "/images/radix.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "PrithviPath",
    category: "Geospatial Routing & Web Application",
    type: "CLIENT WORK",
    description:
      "Interactive geospatial routing and pathfinding web platform designed for sustainable navigation and tracking.",
    tools: "Next.js, TypeScript, TailwindCSS, Vercel",
    image: "/images/prithvipath.png",
    link: "https://v0-new2ndoctmain2-ljo35283k-akshat-agnihotris-projects-0a8dae8b.vercel.app",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <span className="carousel-tag">{project.type}</span>
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-desc">
                          {project.description}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} link={project.link} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
