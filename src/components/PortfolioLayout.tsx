import { useEffect, useLayoutEffect, useRef, useState, Suspense, lazy } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import TopNav from "./TopNav";
import Contact from "./Contact";
import useScrollAnimation from "./ScrollAnimations";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import AcademicPage from "@/pages/AcademicPage";
import CertificatesPage from "@/pages/CertificatesPage";

const DiaryPreview = lazy(() => import("@/pages/Diary"));

// prev/next chevrons exclude diary; swipe (tabOrder) includes it
const sections = ["about", "projects", "academic", "certificates"];
const tabOrder = ["about", "projects", "academic", "certificates", "diary"];
const PAGE_BY_KEY: Record<string, React.ComponentType> = {
  about: AboutPage,
  projects: ProjectsPage,
  academic: AcademicPage,
  certificates: CertificatesPage,
  diary: DiaryPreview,
};
const SWIPE_THRESHOLD = 70;

const PortfolioLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  // committedRef suppresses the snap-back transition when a swipe is committed.
  const committedRef = useRef(false);
  // On a click navigation (mobile), the page we just left slides off to reveal the
  // target underneath — same look as a swipe. prevRef tracks the page being left.
  const prevRef = useRef<string>(location.pathname === "/" ? "about" : location.pathname.slice(1));
  const [leaving, setLeaving] = useState<{ key: string; dir: "next" | "prev" } | null>(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Index route ("/") renders About — treat it as "/about" for nav + page-transition keying
  const normalizedPath = location.pathname === '/' ? '/about' : location.pathname;
  const activeRoute = sections.find((s) => normalizedPath === `/${s}`) ?? '';

  useLayoutEffect(() => {
    const newKey = location.pathname === '/' ? 'about' : location.pathname.slice(1);
    const oldKey = prevRef.current;
    const bothTabs = tabOrder.includes(oldKey) && tabOrder.includes(newKey);
    if (!committedRef.current && !isDesktop && bothTabs && oldKey !== newKey) {
      const dir = tabOrder.indexOf(newKey) > tabOrder.indexOf(oldKey) ? "next" : "prev";
      setLeaving({ key: oldKey, dir });
      const el = trackRef.current;
      if (el) {
        const startX = dir === "next" ? window.innerWidth : -window.innerWidth;
        el.style.transition = "none";
        el.style.transform = `translateX(${startX}px)`;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.transition = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";
            el.style.transform = "translateX(0)";
          })
        );
        window.setTimeout(() => {
          setLeaving(null);
          if (trackRef.current) trackRef.current.style.transition = "";
        }, 340);
      }
    }
    prevRef.current = newKey;
    committedRef.current = false;
  }, [location.pathname]);

  useScrollAnimation([location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('section:not([data-no-animate])').forEach((section, i) => {
        section.classList.add('animate-on-scroll');
        if (i % 2 === 0) section.classList.add('slide-on-scroll');
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (contentRef.current) {
      const y = contentRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const currentIndex = sections.indexOf(activeRoute);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const tabIndex = tabOrder.indexOf(normalizedPath.slice(1));
  const swipePrev = tabIndex > 0 ? tabOrder[tabIndex - 1] : null;
  const swipeNext = tabIndex >= 0 && tabIndex < tabOrder.length - 1 ? tabOrder[tabIndex + 1] : null;

  const touch = useRef<{ x: number; y: number; axis: "h" | "v" | null } | null>(null);
  // Carousel: current + adjacent page sit flush side-by-side in a track that the
  // finger translates. Transform is set imperatively (GPU composite, no per-move re-render).
  const dragXRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [swipe, setSwipe] = useState<{ key: string; side: "next" | "prev" } | null>(null);

  const setTrackX = (px: number) => {
    dragXRef.current = px;
    if (trackRef.current) trackRef.current.style.transform = px ? `translateX(${px}px)` : "";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (tabIndex < 0) return;
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, axis: null };
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.willChange = "transform";
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (touch.current.axis === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      touch.current.axis = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      if (touch.current.axis === "h") setDragging(true);
    }
    if (touch.current.axis === "h") {
      const resist = (dx < 0 && !swipeNext) || (dx > 0 && !swipePrev);
      const px = resist ? dx * 0.25 : dx;
      setTrackX(px);
      const side = px < 0 ? "next" : px > 0 ? "prev" : null;
      const key = side === "next" ? swipeNext : side === "prev" ? swipePrev : null;
      if (key && side) {
        if (!swipe || swipe.key !== key) setSwipe({ key, side });
      } else if (swipe) {
        setSwipe(null);
      }
    }
  };

  const endDrag = () => {
    setDragging(false);
    setSwipe(null);
    if (trackRef.current) trackRef.current.style.willChange = "";
  };

  const onTouchEnd = () => {
    const axis = touch.current?.axis;
    const dx = dragXRef.current;
    touch.current = null;

    const goNext = dx <= -SWIPE_THRESHOLD && swipeNext;
    const goPrev = dx >= SWIPE_THRESHOLD && swipePrev;
    const el = trackRef.current;

    if (axis === "h" && (goNext || goPrev)) {
      // Committed: glide the track the rest of the way, then navigate (keyed remount resets it)
      committedRef.current = true;
      const endX = goNext ? -window.innerWidth : window.innerWidth;
      if (el) {
        el.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transform = `translateX(${endX}px)`;
      }
      window.setTimeout(() => {
        navigate(`/${goNext ? swipeNext : swipePrev}`);
        endDrag();
      }, 230);
    } else if (axis === "h") {
      // Cancelled: glide back to center
      if (el) {
        el.style.transition = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transform = "translateX(0)";
      }
      dragXRef.current = 0;
      window.setTimeout(endDrag, 300);
    } else {
      endDrag();
    }
  };

  // Page rendered flush beside the current one in the track:
  //  • during a swipe → the target tab (on the side you're dragging toward)
  //  • during a click slide → the page you just left (on the opposite side, sliding out)
  const adjacent = (() => {
    if (dragging && swipe) {
      return { Comp: PAGE_BY_KEY[swipe.key], left: swipe.side === "next" ? "100%" : "-100%" };
    }
    if (leaving) {
      return { Comp: PAGE_BY_KEY[leaving.key], left: leaving.dir === "next" ? "-100%" : "100%" };
    }
    return null;
  })();

  // Page-enter rise is desktop-only; mobile tab changes are instant.
  const enterClass = isDesktop ? "animate-page-enter" : "";

  return (
    <div className="min-h-screen flex flex-col text-foreground overflow-x-hidden pb-16 lg:pb-0">
      <TopNav />

      <main className="flex-grow pt-16">
        <div
          className={cn("relative touch-pan-y lg:touch-auto", (dragging || leaving) && "overflow-hidden")}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={(el) => {
              contentRef.current = el;
              trackRef.current = el;
            }}
            key={normalizedPath}
            className={cn("relative", enterClass)}
          >
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Outlet />
            </Suspense>

            {adjacent && (
              <div className="absolute top-0 w-full" style={{ left: adjacent.left }}>
                <Suspense fallback={<div className="min-h-[60vh]" />}>
                  <adjacent.Comp />
                </Suspense>
              </div>
            )}
          </div>
        </div>

        {activeRoute && (prevSection || nextSection) && (
          <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-16 flex items-center justify-between gap-4">
            {prevSection ? (
              <button
                onClick={() => navigate(`/${prevSection}`)}
                className="group inline-flex items-center gap-2 h-12 px-5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors material-card"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-sans text-label-md">{cap(prevSection)}</span>
              </button>
            ) : (
              <span />
            )}

            {nextSection ? (
              <button
                onClick={() => navigate(`/${nextSection}`)}
                className="group inline-flex items-center gap-2 h-12 px-5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors material-card"
              >
                <span className="font-sans text-label-md">{cap(nextSection)}</span>
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ) : (
              <span />
            )}
          </div>
        )}

        <div id="contact-section">
          <Contact />
        </div>
      </main>

      <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-low">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-label-md text-on-surface-variant text-center md:text-left">
            © {new Date().getFullYear()} Amit Paul · Built with precision.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/amitpaul05"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/amitpaul05/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:amit.paul.ece@gmail.com"
              aria-label="Email"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioLayout;
