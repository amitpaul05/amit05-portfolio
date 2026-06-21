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

// Prev/next chevron buttons (section pages only) — tab-bar order, no diary
const sections = ["about", "projects", "academic", "certificates"];
// Swipe order = full tab-bar order, including diary
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
  // Page-enter rise plays on desktop only; on mobile every tab change is instant
  // (the target reads as already-stacked-underneath, whether reached by tap or swipe).
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

  // Detect tab→tab navigation; on mobile clicks (not swipe commits) play the slide-off transition.
  useLayoutEffect(() => {
    const newKey = location.pathname === '/' ? 'about' : location.pathname.slice(1);
    const oldKey = prevRef.current;
    const bothTabs = tabOrder.includes(oldKey) && tabOrder.includes(newKey);
    if (!committedRef.current && !isDesktop && bothTabs && oldKey !== newKey) {
      const dir = tabOrder.indexOf(newKey) > tabOrder.indexOf(oldKey) ? 'next' : 'prev';
      setLeaving({ key: oldKey, dir });
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

  // ── Mobile swipe between tabs (finger-tracking, with the target page revealed underneath) ──
  const tabIndex = tabOrder.indexOf(normalizedPath.slice(1));
  const swipePrev = tabIndex > 0 ? tabOrder[tabIndex - 1] : null;
  const swipeNext = tabIndex >= 0 && tabIndex < tabOrder.length - 1 ? tabOrder[tabIndex + 1] : null;

  const touch = useRef<{ x: number; y: number; axis: "h" | "v" | null } | null>(null);
  // Drag offset is driven imperatively (no per-move re-render) for a smooth 60fps swipe.
  const dragXRef = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [swipeKey, setSwipeKey] = useState<string | null>(null);

  const applyDrag = (px: number) => {
    dragXRef.current = px;
    if (topRef.current) topRef.current.style.transform = px ? `translateX(${px}px)` : "";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (tabIndex < 0) return; // only on the tab pages
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, axis: null };
    if (topRef.current) topRef.current.style.transition = "none";
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
      // rubber-band when there's no tab in that direction
      const resist = (dx < 0 && !swipeNext) || (dx > 0 && !swipePrev);
      const px = resist ? dx * 0.25 : dx;
      applyDrag(px);
      const tk = px < 0 ? swipeNext : px > 0 ? swipePrev : null;
      if (tk !== swipeKey) setSwipeKey(tk); // only fires when direction flips
    }
  };

  const endDrag = () => {
    setDragging(false);
    setSwipeKey(null);
  };

  const onTouchEnd = () => {
    const axis = touch.current?.axis;
    const dx = dragXRef.current;
    touch.current = null;

    const goNext = dx <= -SWIPE_THRESHOLD && swipeNext;
    const goPrev = dx >= SWIPE_THRESHOLD && swipePrev;

    if (axis === "h" && (goNext || goPrev)) {
      // Committed: target already showing underneath → navigate (remount clears the transform)
      committedRef.current = true;
      applyDrag(0);
      endDrag();
      navigate(`/${goNext ? swipeNext : swipePrev}`);
    } else if (axis === "h") {
      // Cancelled: ease back to center, keep the underneath mounted until it settles
      const el = topRef.current;
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

  // Target page revealed underneath during a horizontal drag (static — no rise/scale)
  const TargetPage = swipeKey ? PAGE_BY_KEY[swipeKey] : null;

  // Old page that slides off on a mobile click transition
  const LeavingPage = leaving ? PAGE_BY_KEY[leaving.key] : null;

  // Desktop: page-enter rise on every navigation. Mobile: no entrance animation at all
  // (tap or swipe both read as the target already sitting underneath).
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
          {/* Target page stacked underneath, statically revealed as the current page slides away */}
          {dragging && TargetPage && (
            <div className="absolute inset-0 bg-background page-grain overflow-hidden pointer-events-none">
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                <TargetPage />
              </Suspense>
            </div>
          )}

          {/* Current page (base). Opaque + grain while dragging so it covers the layer below.
              Transform/transition are set imperatively in the touch handlers (no per-move re-render). */}
          <div
            ref={(el) => {
              contentRef.current = el;
              topRef.current = el;
            }}
            key={normalizedPath}
            className={cn(
              "relative",
              enterClass,
              dragging && "bg-background page-grain shadow-[0_0_48px_rgba(0,0,0,0.22)]"
            )}
          >
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Outlet />
            </Suspense>
          </div>

          {/* Click transition: the page just left slides off on top, revealing the new page underneath */}
          {LeavingPage && (
            <div
              className={cn(
                "absolute inset-0 bg-background page-grain overflow-hidden",
                leaving!.dir === "next" ? "animate-slide-out-left" : "animate-slide-out-right"
              )}
              style={{ boxShadow: "0 0 48px rgba(0,0,0,0.22)" }}
              onAnimationEnd={() => setLeaving(null)}
            >
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                <LeavingPage />
              </Suspense>
            </div>
          )}
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
