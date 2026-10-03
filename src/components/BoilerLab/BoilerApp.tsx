import { useState, useEffect, useRef, useCallback } from "react";
import StarCanvas, { StarCanvasHandle } from "./StarCanvas";
import Preloader from "./Preloader";
import SiteHeader from "./SiteHeader";
import FooterNav from "./FooterNav";

import MissionSlide from "./Slides/MissionSlide";
import AboutSlide from "./Slides/AboutSlide";
import NumbersSlide from "./Slides/NumbersSlide";
import PartnersSlide from "./Slides/PartnersSlide";
import ProductsSlide from "./Slides/ProductsSlide";
import InPressSlide from "./Slides/InPressSlide";
import ContactsSlide from "./Slides/ContactsSlide";

import "./styles/boilerlab.css";

const TOTAL_SLIDES = 7;

interface SlideTransition {
  from: number;
  to: number;
  fromClass: string;
  toClass: string;
  duration: number;
}

const HASH_MAP: Record<string, number> = {
  mission: 0,
  about: 1,
  manifesto: 1,
  numbers: 2,
  partners: 3,
  ecosystem: 3,
  products: 4,
  work: 4,
  press: 5,
  insights: 5,
  contacts: 6,
  contact: 6,
};

const HASHES = [
  "mission",
  "manifesto",
  "lab",
  "stack",
  "work",
  "insights",
  "contact",
];

const BoilerApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState<SlideTransition | null>(null);
  const [isContactsArriving, setIsContactsArriving] = useState(false);
  const [isPartnersLeaving, setIsPartnersLeaving] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const starCanvasRef = useRef<StarCanvasHandle | null>(null);
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const goToSlide = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES) return;
    if (isTransitioningRef.current) return;
    if (targetIndex === currentSlide) return;

    isTransitioningRef.current = true;
    const from = currentSlide;
    const to = targetIndex;
    const direction = to > from ? 1 : -1;

    let fromClass = "";
    let toClass = "";
    let duration = 1150;

    // Choreograph transition classes based on BoilerLab mechanics
    if (from === 3 && to === 4) {
      // Ecosystem -> Products
      fromClass = "partners-leaving slide-out-top";
      toClass = "slide-in-fade-after";
      duration = 1220;
      starCanvasRef.current?.triggerWarp(680, 1);
    } else if (from === 4 && to === 3) {
      // Products -> Ecosystem
      fromClass = "slide-out-bottom";
      toClass = "slide-in-top";
      duration = 1180;
      starCanvasRef.current?.triggerWarp(680, -1);
    } else if (from >= 3 && to >= 3) {
      // Vertical transitions between Partners, Products, Insights, Contacts
      if (direction > 0) {
        fromClass = "slide-out-top";
        toClass = to === 4 ? "slide-in-fade" : "slide-in-bottom";
        duration = 1180;
        starCanvasRef.current?.triggerWarp(680, 1);
      } else {
        fromClass = "slide-out-bottom";
        toClass = "slide-in-top";
        duration = 1180;
        starCanvasRef.current?.triggerWarp(680, -1);
      }
    } else {
      // Horizontal 3D fly-through (Mission, Manifesto, Numbers, Ecosystem)
      if (direction > 0) {
        fromClass = "slide-out-fwd-center";
        toClass = "slide-in-fwd-center";
      } else {
        fromClass = "slide-out-bwd-center";
        toClass = "slide-in-bwd-center";
      }
      duration = 1150;
      starCanvasRef.current?.triggerWarp(1500, direction);
    }

    // Hide stars on Products (4) and Contacts (6) for focal clarity
    if (to === 4 || to === 6) {
      starCanvasRef.current?.setHidden(true);
    } else {
      starCanvasRef.current?.setHidden(false);
    }

    // Trigger moon horizon arrival on contacts
    if (to === 6) {
      setIsContactsArriving(true);
      setTimeout(() => {
        setIsContactsArriving(false);
      }, 2400);
    }

    // Trigger partners leaving state
    if (from === 3) {
      setIsPartnersLeaving(true);
    }

    // Update URL hash
    if (HASHES[to]) {
      window.history.replaceState(null, "", `#${HASHES[to]}`);
    }

    setTransition({
      from,
      to,
      fromClass,
      toClass,
      duration,
    });

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      setCurrentSlide(to);
      setTransition(null);
      setIsPartnersLeaving(false);
      isTransitioningRef.current = false;
    }, duration);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Master wheel listener (delegates when inside Products deck)
  useEffect(() => {
    let accumulatedDelta = 0;
    let wheelTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      // When on Products slide (4), ProductsSlide handles internal card deck navigation
      if (currentSlide === 4) return;

      accumulatedDelta += e.deltaY;
      clearTimeout(wheelTimer);

      if (Math.abs(accumulatedDelta) >= 50) {
        if (accumulatedDelta > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        accumulatedDelta = 0;
      } else {
        wheelTimer = setTimeout(() => {
          accumulatedDelta = 0;
        }, 150);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimer);
    };
  }, [currentSlide, nextSlide, prevSlide]);

  // Mobile / tablet touch gestures (delegates on Products)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      if (isTransitioningRef.current) return;
      if (currentSlide === 4) return; // handled by ProductsSlide

      const touchEndY = e.changedTouches[0]?.clientY;
      if (touchEndY === undefined) return;

      const diff = touchStartYRef.current - touchEndY;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      touchStartYRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide, nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentSlide === 4) return; // handled by ProductsSlide

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide]);

  // Sync with initial URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash in HASH_MAP) {
      const idx = HASH_MAP[hash];
      setCurrentSlide(idx);
      if (idx === 4 || idx === 6) {
        starCanvasRef.current?.setHidden(true);
      }
    }
  }, []);

  // Compute slide classes
  const getSlideMeta = (index: number) => {
    let className = "";
    if (transition) {
      if (transition.from === index) {
        className = transition.fromClass;
      } else if (transition.to === index) {
        className = transition.toClass;
      }
    }
    const isActive = transition ? transition.to === index : currentSlide === index;
    return { className, isActive };
  };

  const navSlide = transition ? transition.to : currentSlide;

  return (
    <div className="boiler-root">
      {/* Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Warp Starfield Background */}
      <StarCanvas ref={starCanvasRef} />

      {/* Fixed Site Header */}
      <SiteHeader onGoHome={() => goToSlide(0)} />

      {/* 3D Slides Viewport */}
      <main className="slides-viewport">
        <MissionSlide
          isActive={getSlideMeta(0).isActive}
          className={getSlideMeta(0).className}
          onExplore={() => goToSlide(1)}
          onViewProjects={() => goToSlide(4)}
        />
        <AboutSlide
          isActive={getSlideMeta(1).isActive}
          className={getSlideMeta(1).className}
        />
        <NumbersSlide
          isActive={getSlideMeta(2).isActive}
          className={getSlideMeta(2).className}
        />
        <PartnersSlide
          isActive={getSlideMeta(3).isActive}
          className={getSlideMeta(3).className}
          isLeaving={isPartnersLeaving}
        />
        <ProductsSlide
          isActive={getSlideMeta(4).isActive}
          className={getSlideMeta(4).className}
          onDeckBoundary={(dir) => {
            if (dir === "up") prevSlide();
            if (dir === "down") nextSlide();
          }}
        />
        <InPressSlide
          isActive={getSlideMeta(5).isActive}
          className={getSlideMeta(5).className}
        />
        <ContactsSlide
          isActive={getSlideMeta(6).isActive}
          className={getSlideMeta(6).className}
          isArriving={isContactsArriving || transition?.to === 6}
        />
      </main>

      {/* Bottom Floating Navigation */}
      <FooterNav currentSlide={navSlide} onNavigate={goToSlide} />
    </div>
  );
};

export default BoilerApp;
