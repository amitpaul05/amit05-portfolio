import { useLayoutEffect, useRef } from "react";

const HEADER_HEIGHT = 56;
const LIP = 3;
const STREAM_RUN = 24;
const MIN_GAP = 48;
const MOBILE = "(max-width: 767px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Drives the pour from scroll position, writing `--paint` (0 → 1) and the measured
 * geometry onto the root element. No React state, so nothing re-renders per frame.
 */
export const usePaintPour = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Layout effect: measuring after paint would flash a frame of the stylesheet's
  // fallback geometry.
  useLayoutEffect(() => {
    const mobile = window.matchMedia(MOBILE);
    const reduced = window.matchMedia(REDUCED);

    let raf = 0;
    let detach = () => {};

    const measure = () => {
      const root = rootRef.current;
      const desc = descRef.current;
      const bg = bgRef.current;
      if (!root || !desc || !bg) return;

      // Puts the zone's top edge at document y = 0, so the portrait runs up behind
      // the header and every offset below is a plain document coordinate.
      root.style.setProperty("--zone-top", `${(desc.getBoundingClientRect().top + window.scrollY).toFixed(2)}px`);

      const bgTop = bg.getBoundingClientRect().top;
      const descBottom = desc.getBoundingClientRect().bottom - bgTop;

      // The image ends at the lip, or at the fold if the lip sits higher — an
      // image that visibly ends on the first screen breaks the illusion, so the
      // seam is pushed off-screen instead.
      const lip = desc.querySelector("[data-paint-lip]") ?? desc.lastElementChild;
      const lipEnd = lip ? lip.getBoundingClientRect().bottom - bgTop + LIP : 0;
      const washEnd = Math.max(lipEnd, window.innerHeight);
      root.style.setProperty("--wash-end", `${washEnd.toFixed(2)}px`);

      // Doubles as the stream's run and the frame's top margin, which is what puts
      // the frame one run below the wash's end — below the fold on a tall phone.
      const gap = Math.max(MIN_GAP, washEnd + STREAM_RUN - descBottom);
      root.style.setProperty("--gap", `${gap.toFixed(2)}px`);
    };

    const update = () => {
      const root = rootRef.current;
      const frame = frameRef.current;
      if (!root || !frame) return;

      // Finishes with the frame vertically centred rather than up against the
      // header, so the last of the paint lands while the canvas is framed by the
      // layout.
      const rect = frame.getBoundingClientRect();
      const target = Math.max(HEADER_HEIGHT + 16, (window.innerHeight - rect.height) / 2);
      const travel = rect.top + window.scrollY - target;
      const paint = travel > 0 ? Math.min(Math.max(window.scrollY / travel, 0), 1) : 1;
      root.style.setProperty("--paint", paint.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const resync = () => {
      measure();
      update();
    };

    const attach = () => {
      resync();
      // Catches what `resize` misses — the web-font swap re-flowing the copy, and
      // with it the lip.
      const ro = new ResizeObserver(resync);
      if (descRef.current) ro.observe(descRef.current);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", resync);
      detach = () => {
        ro.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resync);
      };
    };

    const sync = () => {
      detach();
      detach = () => {};
      cancelAnimationFrame(raf);
      if (mobile.matches && !reduced.matches) {
        attach();
        return;
      }
      // Falls back to `var(--paint, 1)` — the finished state — rather than holding
      // a stale mid-pour value if the viewport widens mid-scroll.
      rootRef.current?.style.removeProperty("--paint");
    };

    sync();
    mobile.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      mobile.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      detach();
      cancelAnimationFrame(raf);
    };
  }, []);

  return { rootRef, descRef, bgRef, frameRef };
};
