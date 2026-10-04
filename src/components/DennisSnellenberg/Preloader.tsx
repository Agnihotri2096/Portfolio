import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Guten Tag",
  "Hallo",
];

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;

    const timeout = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 1000 : 150
    );

    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curveVariants: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  const slideUp: Variants = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      onAnimationComplete={onComplete}
      className="ds-preloader"
    >
      {dimension.width > 0 && (
        <>
          <div className="ds-preloader-content">
            <span className="ds-preloader-dot" />
            <span>{words[index]}</span>
          </div>

          <svg className="ds-preloader-svg">
            <motion.path
              variants={curveVariants}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
