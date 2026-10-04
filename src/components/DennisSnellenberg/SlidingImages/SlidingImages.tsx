import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const slider1 = [
  { color: "#22252a", src: "/images/cyberrisk-iq.png", alt: "CyberRisk IQ" },
  { color: "#1e2229", src: "/images/Maxlife.png", alt: "Maxlife" },
  { color: "#212224", src: "/images/radix.png", alt: "Radix" },
  { color: "#1a1d20", src: "/images/cse-society.png", alt: "CSE Society" },
];

const slider2 = [
  { color: "#202327", src: "/images/prithvipath.png", alt: "PrithviPath" },
  { color: "#24272c", src: "/images/Solidx.png", alt: "Solidx" },
  { color: "#1d2024", src: "/images/bond.png", alt: "Bond" },
  { color: "#191a1d", src: "/images/preview.png", alt: "NetSonar" },
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
