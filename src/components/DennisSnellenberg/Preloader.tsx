import React, { useEffect, useState, useRef } from "react";
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
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  };

  useEffect(() => {
    if (index === words.length - 1) {
      // Once we reach the last greeting ("Hallo"), wait briefly then slide up
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 400);

      // Failsafe timeout to ensure page unlocks even if animation event is missed
      const failsafeTimer = setTimeout(() => {
        triggerComplete();
      }, 1500);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(failsafeTimer);
      };
    }

    const timeout = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 800 : 150
    );

    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const slideUp: Variants = {
    initial: { top: 0 },
    animate: isExiting
      ? {
          top: "-100vh",
          transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 },
        }
      : { top: 0 },
  };

  const curveVariants: Variants = {
    initial: { d: initialPath },
    animate: isExiting
      ? {
          d: targetPath,
          transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const },
        }
      : { d: initialPath },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => {
        if (isExiting) {
          triggerComplete();
        }
      }}
      className="ds-preloader"
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 1 }}
            className="ds-preloader-content"
          >
            <span className="ds-preloader-dot" />
            <span>{words[index]}</span>
          </motion.div>

          <svg className="ds-preloader-svg">
            <motion.path
              variants={curveVariants}
              initial="initial"
              animate="animate"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
