import { useEffect, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft, Github, Linkedin, Mail } from "lucide-react";
import TopNav from "./TopNav";
import Contact from "./Contact";
import useScrollAnimation from "./ScrollAnimations";

const sections = ["about", "academic", "projects", "certificates"];

const PortfolioLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const activeRoute = sections.find((s) => location.pathname === `/${s}`) ?? '';

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

  return (
    <div className="min-h-screen flex flex-col text-foreground overflow-x-hidden">
      <TopNav />

      <main className="flex-grow pt-16">
        <div ref={contentRef}>
          <Outlet />
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
