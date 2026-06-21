import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Download, User, FolderGit2, GraduationCap, Award, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import resume from "../assets/Amit_Paul_s_Resume.pdf";

const NAV = [
  { label: "About", tab: "About", to: "/about", icon: User },
  { label: "Projects", tab: "Projects", to: "/projects", icon: FolderGit2 },
  { label: "Academic", tab: "Academic", to: "/academic", icon: GraduationCap },
  { label: "Certificates", tab: "Certs", to: "/certificates", icon: Award },
  { label: "Diary", tab: "Diary", to: "/diary", icon: NotebookPen },
];

// Single source of truth for the Resume button colour — desktop pill and mobile
// menu button share this so their background + text colour are always identical.
const RESUME_BTN_COLOR = "bg-primary text-on-primary hover:opacity-90";

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Active when the path matches (or is nested under) the item — and "/" maps to About
  const isItemActive = (to: string) =>
    pathname === to ||
    pathname.startsWith(to + "/") ||
    (pathname === "/" && to === "/about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[70] bg-background nav-grain transition-all duration-300",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <div className="relative z-10 flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <NavLink
            to="/"
            className="font-sans font-bold text-headline-sm text-primary tracking-tight"
          >
            Amit Paul
          </NavLink>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "font-sans text-label-md tracking-wide pb-1 transition-colors",
                  isItemActive(item.to)
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 font-sans text-label-md rounded-lg transition-opacity",
                RESUME_BTN_COLOR
              )}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>

            <ThemeToggle />

            {/* Hamburger + circular menu replaced by the bottom tab bar (kept for reference).
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden relative z-[70] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span
                className={cn(
                  "block w-6 h-0.5 bg-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                  open && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                  open && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
            */}
          </div>
        </div>
      </header>

      {/* Hamburger circular-expansion menu — disabled (replaced by the bottom tab bar), kept for reference */}
      {false && (
      <div
        className="fixed left-3 right-3 top-20 bottom-3 z-[60] lg:hidden bg-surface-container-lowest rounded-[28px] border border-outline-variant/30 shadow-2xl overflow-hidden"
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 28px) 24px)"
            : "circle(0% at calc(100% - 28px) 24px)",
          transition: "clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="mx-auto mt-3 mb-1 h-1.5 w-10 rounded-full bg-outline-variant/60" />
        <nav className="flex flex-col gap-3 px-7 pt-5 pb-8">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
              className={({ isActive }) =>
                cn(
                  "font-sans text-headline-md py-3 transition-all duration-300",
                  open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  isActive
                    ? "text-primary border-l-4 border-primary pl-4"
                    : "text-on-surface-variant pl-4"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${180 + NAV.length * 60}ms` : "0ms" }}
            className={cn(
              "mt-8 inline-flex items-center justify-center gap-2 py-4 font-sans text-headline-sm rounded-xl transition-all duration-300",
              RESUME_BTN_COLOR,
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            <Download className="h-5 w-5" />
            Resume
          </a>
        </nav>
      </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full z-[70] lg:hidden">
        <div className="flex items-stretch h-16 bg-surface/85 backdrop-blur-md border-x border-t border-outline-variant/30 rounded-t-3xl">
          {NAV.map((item) => {
            const active = isItemActive(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative flex flex-1 flex-col items-center justify-center active:scale-90 transition-transform duration-150"
              >
                <span
                  className={cn(
                    "flex flex-col items-center gap-1",
                    active
                      ? "-translate-y-1.5 text-primary animate-tab-bounce"
                      : "text-on-surface-variant transition-transform duration-300"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-sans text-[10px] tracking-wide">{item.tab}</span>
                </span>
                <span
                  className={cn(
                    "absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    active ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                />
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
