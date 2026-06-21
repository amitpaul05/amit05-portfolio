import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import resume from "../assets/Amit_Paul_s_Resume.pdf";

const NAV = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Academic", to: "/academic" },
  { label: "Certificates", to: "/certificates" },
  { label: "Diary", to: "/diary" },
];

// Single source of truth for the Resume button colour — desktop pill and mobile
// menu button share this so their background + text colour are always identical.
const RESUME_BTN_COLOR = "bg-primary text-on-primary hover:opacity-90";

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      "font-sans text-label-md tracking-wide pb-1 transition-colors",
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-on-surface-variant hover:text-primary"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[70] bg-surface/80 backdrop-blur-md transition-all duration-300",
          scrolled ? "shadow-md h-14" : "shadow-sm h-16"
        )}
      >
        <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <NavLink
            to="/"
            className="font-sans font-bold text-headline-sm text-primary tracking-tight"
          >
            Amit Paul
          </NavLink>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={desktopLink}>
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
                "hidden sm:inline-flex items-center gap-2 px-4 py-2 font-sans text-label-md rounded-lg transition-opacity",
                RESUME_BTN_COLOR
              )}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>

            <ThemeToggle />

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
          </div>
        </div>
      </header>

      {/* Mobile menu — circular expansion from the hamburger button */}
      <div
        className="fixed inset-0 z-[60] lg:hidden bg-surface"
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 36px) 36px)"
            : "circle(0% at calc(100% - 36px) 36px)",
          transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col gap-2 px-margin-mobile pt-28">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
              className={({ isActive }) =>
                cn(
                  "font-sans text-headline-md py-2 transition-all duration-300",
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
              "mt-6 inline-flex items-center justify-center gap-2 py-4 font-sans text-headline-sm rounded-lg transition-all duration-300",
              RESUME_BTN_COLOR,
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            <Download className="h-5 w-5" />
            Resume
          </a>
        </nav>
      </div>
    </>
  );
};

export default TopNav;
