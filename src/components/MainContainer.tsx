import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Work from "./Work";
import AgnihotriLabs from "./AgnihotriLabs";
import HowWeBuild from "./HowWeBuild";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <Work />
            <AgnihotriLabs />
            <HowWeBuild />
            <About />
            {isDesktopView && (
              <Suspense fallback={<div className="loading-fallback">Loading focus radar...</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
