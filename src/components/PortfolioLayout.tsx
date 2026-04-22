import { useEffect, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Hero from "./Hero";
import Contact from "./Contact";
import useScrollAnimation from "./ScrollAnimations";

const sections = ["about", "academic", "projects", "certificates", "diary"];

const PortfolioLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const activeRoute = sections.find((s) => location.pathname === `/${s}`) ?? '';

  useScrollAnimation([location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('section').forEach((section, i) => {
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

  return (
    <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <Hero />

      <div className="bg-background" ref={contentRef}>
        <Outlet />
      </div>

      {activeRoute && (
        <div className="flex w-full mt-8 px-8">
          <div className="flex w-full mt-8">
            <div className="flex-1 flex justify-center px-2">
              {prevSection && (
                <button
                  onClick={() => navigate(`/${prevSection}`)}
                  className="group relative flex items-center justify-center
                            lg:h-16 lg:w-48 rounded-2xl
                            backdrop-blur-xl
                            bg-gradient-to-br from-background/30 via-background/50 to-background/30
                            border border-white/20
                            shadow-2xl
                            overflow-hidden
                            transition-all duration-300
                            hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                            hover:border-primary/30
                            before:absolute before:inset-0 before:rounded-2xl
                            before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                            before:blur-sm
                            hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20
                            text-white font-bold
                            md:h-16 md:w-48 md:text-base
                            h-14 w-40 text-sm"
                >
                  <span className="absolute left-8 opacity-0 group-hover:opacity-100 transform translate-x-28 lg:group-hover:translate-x-12 group-hover:translate-x-10 transition-all duration-300 whitespace-nowrap font-bold">
                    {prevSection.charAt(0).toUpperCase() + prevSection.slice(1)}
                  </span>
                  <ChevronLeft
                    className="z-10 w-7 h-7 group-hover:-translate-x-12 transition-transform duration-300"
                    strokeWidth={5}
                  />
                </button>
              )}
            </div>

            <div className="flex-1 flex justify-center px-2">
              {nextSection && (
                <button
                  onClick={() => navigate(`/${nextSection}`)}
                  className="group relative flex items-center justify-center
                            lg:h-16 lg:w-48 rounded-2xl
                            backdrop-blur-xl
                            bg-gradient-to-br from-background/30 via-background/50 to-background/30
                            border border-white/20
                            shadow-2xl
                            overflow-hidden
                            transition-all duration-300
                            hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                            hover:border-primary/30
                            before:absolute before:inset-0 before:rounded-2xl
                            before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                            before:blur-sm
                            hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20
                            text-white font-bold
                            md:h-16 md:w-48 md:text-base
                            h-14 w-40 text-sm"
                >
                  <span className="absolute left-8 opacity-0 group-hover:opacity-100 transform -translate-x-16 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap font-bold">
                    {nextSection.charAt(0).toUpperCase() + nextSection.slice(1)}
                  </span>
                  <ChevronRight
                    className="z-10 w-7 h-7 group-hover:translate-x-10 transition-transform duration-300"
                    strokeWidth={5}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Contact />
    </div>
  );
};

export default PortfolioLayout;
