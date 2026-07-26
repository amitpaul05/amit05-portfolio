import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePaintPour } from "./usePaintPour";
import "./paint-pour.css";

type PaintPourProps = {
  src: string;
  alt: string;
  /** Text block. Mark the element the wash stops at with `data-paint-lip`. */
  children: ReactNode;
  className?: string;
};

/**
 * Text block beside a portrait frame. Below 768px the portrait also backs the text
 * and pours into the frame on scroll; from 768px up, and under reduced motion, it
 * is the plain two-column layout.
 */
const PaintPour = ({ src, alt, children, className }: PaintPourProps) => {
  const { rootRef, descRef, bgRef, frameRef } = usePaintPour();

  return (
    <div
      ref={rootRef}
      className={cn("paint-pour flex flex-col md:flex-row items-center md:gap-12", className)}
      style={{ "--paint-img": `url(${src})` } as CSSProperties}
    >
      <div ref={descRef} className="paint-desc relative flex-1 w-full">
        <div ref={bgRef} className="paint-bg" aria-hidden>
          <div className="paint-wash">
            <img src={src} alt="" />
          </div>
          <div className="paint-neck">
            <img src={src} alt="" />
          </div>
          <div className="paint-stream paint-stream-head" />
        </div>

        {children}
      </div>

      <div
        ref={frameRef}
        className="paint-frame w-2/3 sm:w-1/2 md:w-1/3 shrink-0 aspect-[3/4] relative rounded-lg overflow-hidden border border-outline-variant/30 material-card group"
      >
        <div className="paint-primed" aria-hidden />
        <div className="paint-pool">
          <img
            src={src}
            alt={alt}
            className="md:grayscale-[0.35] md:transition-[filter] md:duration-300 md:group-hover:grayscale-0"
          />
        </div>
        <div
          className="hidden md:block absolute inset-0 z-10 bg-primary/5 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"
          aria-hidden
        />
        <div className="paint-stream paint-stream-canvas" aria-hidden />
        <div className="paint-stream paint-head-canvas" aria-hidden />
        <div className="paint-stream paint-splash" aria-hidden />
      </div>
    </div>
  );
};

export default PaintPour;
