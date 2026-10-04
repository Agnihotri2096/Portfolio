import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { title: "Home", href: "#hero" },
  { title: "Work", href: "#work" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

const socialLinks = [
  { title: "GitHub", href: "https://github.com/Agnihotri-Labs" },
  { title: "Portfolio", href: "https://akshat-agnihotri.netlify.app/" },
  { title: "LinkedIn", href: "https://linkedin.com/in/akshat-agnihotri" },
  { title: "Twitter", href: "https://x.com" },
];

export const NavDrawer: React.FC<NavDrawerProps> = ({ isOpen, onClose }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

  const menuSlide: Variants = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  };

  const curveVariants: Variants = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  };

  const handleLinkClick = (href: string) => {
    onClose();
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div
        className={`ds-drawer-backdrop ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="ds-drawer-wrap active"
          >
            <div className="ds-drawer-body">
              <div>
                <p className="ds-drawer-nav-label">Navigation</p>
                <ul className="ds-drawer-links">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.title}
                      className="ds-drawer-link-item"
                      initial={{ x: 80, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.6, delay: 0.1 + idx * 0.08, ease: [0.76, 0, 0.24, 1] as const },
                      }}
                      exit={{
                        x: 80,
                        opacity: 0,
                        transition: { duration: 0.4, delay: (navItems.length - idx) * 0.04 },
                      }}
                    >
                      <span className="ds-drawer-link-dot" />
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        }}
                      >
                        {item.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="ds-drawer-socials">
                <p className="ds-drawer-socials-label">Socials & Links</p>
                <ul className="ds-drawer-social-links">
                  {socialLinks.map((s) => (
                    <li key={s.title}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <svg className="ds-drawer-svg">
              <motion.path
                variants={curveVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavDrawer;
