import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DownloadSimple } from "@/lib/icons";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import resume from "../assets/Amit_Paul_s_Resume.pdf";
// Tab bar imports both Solar variants per icon: linear (outline) at rest, bold (filled) when
// active — the macOS-style outline→filled swap. Solar components have no weight prop, so the
// two variants are distinct components picked per active state.
import UserLinear from "~icons/solar/user-rounded-linear";
import UserBold from "~icons/solar/user-rounded-bold";
import FolderLinear from "~icons/solar/folder-linear";
import FolderBold from "~icons/solar/folder-bold";
import CapLinear from "~icons/solar/square-academic-cap-linear";
import CapBold from "~icons/solar/square-academic-cap-bold";
import DiplomaLinear from "~icons/solar/diploma-linear";
import DiplomaBold from "~icons/solar/diploma-bold";
import NotebookLinear from "~icons/solar/notebook-linear";
import NotebookBold from "~icons/solar/notebook-bold";

// Desktop nav renders labels; the mobile tab bar renders `icon` (outline) → `iconActive` (filled).
const NAV = [
  { label: "About", tab: "About", to: "/about", icon: UserLinear, iconActive: UserBold },
  { label: "Projects", tab: "Projects", to: "/projects", icon: FolderLinear, iconActive: FolderBold },
  { label: "Academic", tab: "Academic", to: "/academic", icon: CapLinear, iconActive: CapBold },
  { label: "Certificates", tab: "Certs", to: "/certificates", icon: DiplomaLinear, iconActive: DiplomaBold },
  { label: "Diary", tab: "Diary", to: "/diary", icon: NotebookLinear, iconActive: NotebookBold },
];

// Single source of truth for the Resume button colour — desktop pill and mobile
// menu button share this so their background + text colour are always identical.
const RESUME_BTN_COLOR = "bg-primary text-on-primary hover:opacity-90";

// The anchor keeps opening the PDF in a new tab (a bare `download` attribute would
// suppress that), so we trigger the save via a throwaway anchor click alongside it.
export const downloadResume = () => {
  const a = document.createElement("a");
  a.href = resume;
  a.download = "Amit_Paul_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Active when the path matches (or is nested under) the item — and "/" maps to About
  const isItemActive = (to: string) =>
    pathname === to ||
    pathname.startsWith(to + "/") ||
    (pathname === "/" && to === "/about");

  const activeIndex = NAV.findIndex((item) => isItemActive(item.to));

  // The sliding indicator dot is driven by two root CSS vars so PortfolioLayout can
  // move it imperatively during a swipe (like the page) without re-rendering TopNav.
  // TopNav owns the resting value; a committed swipe / click just lands on activeIndex.
  const dotInit = useRef(true);
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tab-pos", String(activeIndex < 0 ? 0 : activeIndex));
    root.style.setProperty("--tab-pos-ms", dotInit.current ? "0ms" : "550ms");
    dotInit.current = false;
  }, [activeIndex]);

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
          "fixed top-0 left-0 w-full z-[70] transition-all duration-300",
          // Transparent at rest below md so the About portrait runs up behind it
          // and the first screen reads as one flat sheet. It only takes a
          // surface — and with it the paper grain — once content is actually
          // passing underneath. The grain has to arrive *with* the background:
          // over a transparent header it would tile on top of body::before and
          // the doubled texture reads as a banded strip across the top.
          scrolled
            ? "h-14 bg-background nav-grain"
            : "h-16 bg-transparent md:bg-background md:nav-grain"
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
              onClick={downloadResume}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 font-sans text-label-md rounded-lg transition-opacity",
                RESUME_BTN_COLOR
              )}
            >
              <DownloadSimple className="h-4 w-4" />
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
            onClick={() => {
              downloadResume();
              setOpen(false);
            }}
            style={{ transitionDelay: open ? `${180 + NAV.length * 60}ms` : "0ms" }}
            className={cn(
              "mt-8 inline-flex items-center justify-center gap-2 py-4 font-sans text-headline-sm rounded-xl transition-all duration-300",
              RESUME_BTN_COLOR,
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            <DownloadSimple className="h-5 w-5" />
            Resume
          </a>
        </nav>
      </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full z-[70] lg:hidden">
        <div className="relative flex items-stretch h-16 rounded-t-3xl border-x border-t border-outline-variant/60 bg-surface/85 backdrop-blur-xl shadow-[0_-8px_28px_-6px_rgba(0,0,0,0.22)]">
          {/* Single shared indicator dot: it slides to the active tab and, on a swipe,
              follows the finger — both driven by the --tab-pos / --tab-pos-ms root vars.
              Positioned with translateX (GPU-composited) so the swipe-follow stays smooth. */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-1.5 left-0 h-1.5 w-1.5 rounded-full bg-primary will-change-transform",
              activeIndex < 0 && "opacity-0"
            )}
            style={{
              transform: `translateX(calc((var(--tab-pos, ${activeIndex < 0 ? 0 : activeIndex}) + 0.5) * ${100 / NAV.length}vw - 3px))`,
              transition:
                "transform var(--tab-pos-ms, 550ms) cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease",
            }}
          />
          {NAV.map((item, i) => {
            const active = i === activeIndex;
            const Icon = active ? item.iconActive : item.icon;
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
                  <Icon className="h-6 w-6" />
                  <span className="font-sans text-[10px] tracking-wide">{item.tab}</span>
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
