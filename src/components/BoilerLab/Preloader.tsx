import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onComplete, 800);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div id="preloader" className={hidden ? "preloader-hidden" : ""} aria-hidden="true">
      <div className="preloader-glow"></div>
      <div className="preloader-brand">
        <img
          src="/brand-logo.png"
          alt="Agnihotri Labs"
          className="preloader-logo"
          draggable="false"
        />
        <div className="preloader-title">AGNIHOTRI LABS</div>
        <div className="preloader-tagline">BUILD. AUTOMATE. SECURE.</div>
      </div>
    </div>
  );
};

export default Preloader;
