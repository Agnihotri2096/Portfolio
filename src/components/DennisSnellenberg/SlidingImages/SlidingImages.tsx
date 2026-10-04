import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const slider1 = [
  { color: "#e3e5e7", src: "/images/cyberrisk-iq.png", alt: "CyberRisk IQ" },
  { color: "#d6d7dc", src: "/images/Maxlife.png", alt: "Maxlife" },
  { color: "#e3e3e3", src: "/images/radix.png", alt: "Radix" },
  { color: "#21242b", src: "/images/cse-society.png", alt: "CSE Society" },
];

const slider2 = [
  { color: "#d4e3ec", src: "/images/prithvipath.png", alt: "PrithviPath" },
  { color: "#e5e0e1", src: "/images/Solidx.png", alt: "Solidx" },
  { color: "#d7d4cf", src: "/images/bond.png", alt: "Bond" },
  { color: "#e1dad6", src: "/images/preview.png", alt: "NetSonar" },
];

export const SlidingImages: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={container} className="ds-sliding-gallery">
      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="ds-sliding-row">
        {slider1.map((project, idx) => (
          <div
            key={idx}
            className="ds-sliding-card"
            style={{ backgroundColor: project.color }}
          >
            <img src={project.src} alt={project.alt} />
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="ds-sliding-row">
        {slider2.map((project, idx) => (
          <div
            key={idx}
            className="ds-sliding-card"
            style={{ backgroundColor: project.color }}
          >
            <img src={project.src} alt={project.alt} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlidingImages;
