import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Description from "./Description/Description";
import Projects from "./Projects/Projects";
import SlidingImages from "./SlidingImages/SlidingImages";
import Footer from "./Footer/Footer";
import "./styles/dennis.css";

export const DennisApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="ds-app">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Header />
      <main>
        <Hero />
        <Description />
        <Projects />
        <SlidingImages />
      </main>
      <Footer />
    </div>
  );
};

export default DennisApp;
