import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "CYBERRISK IQ",
    category: "AI Cyber Risk Platform",
    type: "AGNIHOTRI LABS PROJECT",
    description:
      "AI-powered cyber risk quantification and investment optimization platform. Features continuous vulnerability intelligence, FAIR modeling, and LLM analyst decision support.",
    tools: "React • TypeScript • FastAPI • SQLite • Ollama • AI/ML",
    image: "/images/cyberrisk-iq.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "NETSONAR",
    category: "Network Telemetry Sonification",
    type: "PERSONAL PROJECT",
    description:
      "Experimental network visualization system that transforms live network traffic into music using packet sniffing, frequency modulation, and PipeWire audio graphs.",
    tools: "Python • Scapy • NumPy • PipeWire • Linux",
    image: "/images/netsonar.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "AI / ML ENGINEERING",
    category: "Machine Learning & Local LLMs",
    type: "PERSONAL PROJECT",
    description:
      "Selected AI and machine-learning experiments exploring deep learning architectures, automated model evaluation, and local LLM deployment pipelines.",
    tools: "Python • scikit-learn • PyTorch • Jupyter • LLMs",
    image: "/images/aiml.png",
    link: "https://github.com/Agnihotri2096",
  },
  {
    title: "PRITHVIPATH",
    category: "Spatial Web Application",
    type: "PERSONAL PROJECT",
    description:
      "High-performance geospatial pathfinding and routing platform designed for seamless map rendering and responsive exploration.",
    tools: "React • Vercel • Spatial Routing",
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
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-wrap">
          <div className="section-label">
            <span className="label-dot"></span>
            PORTFOLIO SHOWCASE
          </div>
          <h2>
            Selected <span>Work</span>
          </h2>
          <p className="work-subtitle">
            A curated selection of software platforms, AI systems, and engineering experiments.
          </p>
        </div>

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
                        <span
                          className={`project-type-tag ${
                            project.type === "AGNIHOTRI LABS PROJECT"
                              ? "tag-labs"
                              : "tag-personal"
                          }`}
                        >
                          {project.type}
                        </span>
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Technology & Stack</span>
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
    </section>
  );
};

export default Work;
