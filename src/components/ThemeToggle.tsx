import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const switchTheme = () => {
    const next = isDark ? "light" : "dark";
    const toDark = next === "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    // to dark = sunset (reveal from top) · to light = sunrise (reveal from bottom)
    root.classList.add(toDark ? "vt-sunset" : "vt-sunrise");

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      // sunset: mask slides 100%→0% (opaque top band drops in); sunrise: 0%→100%
      const from = toDark ? "0% 100%" : "0% 0%";
      const to = toDark ? "0% 0%" : "0% 100%";
      const anim = root.animate(
        {
          maskPosition: [from, to],
          WebkitMaskPosition: [from, to],
        },
        {
          duration: 1200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      anim.finished.finally(() => root.classList.remove("vt-sunset", "vt-sunrise"));
    });
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={switchTheme}
      className="p-2 rounded-full text-primary hover:bg-surface-container-high transition-colors"
    >
      {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
