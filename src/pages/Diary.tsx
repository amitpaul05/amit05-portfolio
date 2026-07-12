import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllEntries, type DiaryEntry } from '@/lib/diary';

type Rect = { left: number; top: number; width: number; height: number };

type OpenCtx = {
  entries: DiaryEntry[];
  index: number;
  openRect: Rect; // the tapped card's on-screen rect (morph origin)
  rectFor: (offset: number) => Rect; // on-screen rect of the card `offset` steps from the stack's centre
  setActive: (i: number) => void; // keep the underlying stack in sync
};

const MOOD_EMOJI: Record<string, string> = {
  motivated: '🔥',
  focused: '🎯',
  tired: '😴',
  frustrated: '😤',
  pumped: '⚡',
  reflective: '🤔',
  relaxed: '😌',
  happy: '😊',
  anxious: '😰',
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatMonthLabel(key: string) {
  const [year, month] = key.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function groupByMonth(entries: DiaryEntry[]) {
  const groups: Record<string, DiaryEntry[]> = {};
  for (const entry of entries) {
    const key = entry.date.slice(0, 7);
    (groups[key] ??= []).push(entry);
  }
  return groups;
}

// `scrollable` turns the copy into an internal scroll region so a long entry can be read
// in full in the reader; the stack cards leave it off and keep the clipped-with-fade look.
// `scrollRef` lets the reader read the scroll position to arbitrate swipe-vs-close.
function PaperPage({
  entry,
  scrollable = false,
  scrollRef,
}: {
  entry: DiaryEntry;
  scrollable?: boolean;
  scrollRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="relative diary-paper rounded-xl border border-diary-rule/30 h-full shadow-2xl overflow-hidden">
      <div
        className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
        style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
      />
      <div className="absolute top-2 right-5 z-20">
        <span
          className="font-diary text-sm text-diary-ink-muted inline-block -rotate-2 border border-diary-rule/40 px-2 py-0 rounded whitespace-nowrap leading-8"
          style={{ backgroundColor: 'hsl(var(--diary-paper) / 0.9)' }}
        >
          {formatDate(entry.date)}
        </span>
      </div>
      <div
        ref={scrollRef}
        className={cn('pl-14 pr-10 pt-8', scrollable ? 'h-full overflow-y-auto no-scrollbar pb-16' : 'pb-10')}
        style={scrollable ? { touchAction: 'none' } : undefined}
      >
        <div className="font-diary text-sm text-diary-ink-muted flex flex-wrap items-center gap-3 leading-8">
          {entry.moods.map((m) => (
            <span key={m}>{MOOD_EMOJI[m] ?? '•'} {m}</span>
          ))}
        </div>
        <div className="font-diary text-base leading-8 text-diary-ink diary-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
        </div>
      </div>
      {!scrollable && (
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, hsl(var(--diary-paper)), transparent)' }}
        />
      )}
    </div>
  );
}

// Gesture- and arrow-driven reader. Only ever one page is enlarged for reading; the rest
// stay in the real SwipeStack behind the backdrop. Opening lifts the tapped card out of
// that stack; navigating sends the current page back down into its slot on the stack while
// the neighbour is lifted out of the stack in its place — so every transition reads as
// "off the stack / onto the stack", never a separate carousel.
//
// Vertical swipe shrinks the page down into its slot to close. Horizontal swipe (mobile)
// or the side arrows / arrow keys (PC) flick between entries.
const NAV_MS = 440;

function DiaryReader({ ctx, onClose }: { ctx: OpenCtx; onClose: () => void }) {
  const [index, setIndex] = useState(ctx.index);
  const [incoming, setIncoming] = useState<number | null>(null); // page being lifted out of the stack mid-nav
  const morphRef = useRef<HTMLDivElement>(null); // the current, front page
  const inRef = useRef<HTMLDivElement>(null); // the incoming page during a nav
  const backdropRef = useRef<HTMLDivElement>(null);
  const natural = useRef<Rect | null>(null); // full reading rect, measured once
  const incomingFrom = useRef<Rect | null>(null); // stack slot the incoming page rises from
  const scrollRef = useRef<HTMLDivElement>(null); // active page's scroll region
  const busy = useRef(false);
  const g = useRef({ x: 0, y: 0, lastY: 0, dismiss: 0, axis: null as null | 'h' | 'v', on: false });
  const indexRef = useRef(ctx.index);
  const last = ctx.entries.length - 1;

  const setBackdrop = (o: number, ms = 0) => {
    const b = backdropRef.current;
    if (!b) return;
    b.style.transition = ms ? `opacity ${ms}ms ease-out` : 'none';
    b.style.opacity = String(o);
  };

  const tf = (r: Rect) => {
    const f = natural.current;
    if (!f) return 'none';
    const dx = r.left + r.width / 2 - (f.left + f.width / 2);
    const dy = r.top + r.height / 2 - (f.top + f.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${r.width / f.width}, ${r.height / f.height})`;
  };

  // Open: lift the page out of the tapped stack card; measure the natural rect once.
  useLayoutEffect(() => {
    const m = morphRef.current;
    if (!m) return;
    natural.current = m.getBoundingClientRect();
    m.style.transform = tf(ctx.openRect);
    m.style.opacity = '0.4';
    setBackdrop(0);
    requestAnimationFrame(() => {
      m.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s';
      m.style.transform = 'none';
      m.style.opacity = '1';
      setBackdrop(1, 300);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Incoming page: start it collapsed on its stack slot, then lift it up to the reading rect.
  useLayoutEffect(() => {
    if (incoming == null) return;
    const el = inRef.current;
    if (!el || !incomingFrom.current) return;
    el.style.transition = 'none';
    el.style.transform = tf(incomingFrom.current);
    el.style.opacity = '0.4';
    requestAnimationFrame(() => {
      el.style.transition = `transform ${NAV_MS}ms cubic-bezier(0.22,1,0.36,1), opacity 0.3s`;
      el.style.transform = 'none';
      el.style.opacity = '1';
    });
  }, [incoming]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate: drop the current page back onto its stack slot while lifting the neighbour
  // out of the stack. After the shuffle, the neighbour becomes the resting front page.
  const go = (dir: -1 | 1) => {
    if (busy.current) return;
    const from = indexRef.current;
    const target = from + dir;
    if (target < 0 || target > last) {
      spring();
      return;
    }
    busy.current = true;
    indexRef.current = target;
    ctx.setActive(target);

    const m = morphRef.current;
    if (m) {
      // -dir is where the outgoing card lands once the stack re-centres on the target
      m.style.transition = `transform ${NAV_MS}ms cubic-bezier(0.22,1,0.36,1), opacity 0.3s`;
      m.style.transform = tf(ctx.rectFor(-dir));
      m.style.opacity = '0.2';
    }
    incomingFrom.current = ctx.rectFor(dir);
    setIncoming(target);

    window.setTimeout(() => {
      setIndex(target);
      setIncoming(null);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      const mm = morphRef.current;
      if (mm) {
        mm.style.transition = 'none';
        mm.style.transform = 'none';
        mm.style.opacity = '1';
      }
      busy.current = false;
    }, NAV_MS);
  };

  // Release with no commit: settle the page back to the reading rect.
  const spring = () => {
    const m = morphRef.current;
    if (m) {
      m.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s';
      m.style.transform = 'none';
      m.style.opacity = '1';
    }
    setBackdrop(1, 200);
  };

  // Vertical dismiss: shrink the page down into its slot on the stack, then unmount.
  const close = () => {
    const m = morphRef.current;
    if (busy.current || !m) return;
    busy.current = true;
    m.style.transition = 'transform 0.3s cubic-bezier(0.4,0,1,1), opacity 0.3s';
    m.style.transform = tf(ctx.rectFor(0));
    m.style.opacity = '0.15';
    setBackdrop(0, 300);
    window.setTimeout(onClose, 300);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    g.current = { x: e.clientX, y: e.clientY, lastY: e.clientY, dismiss: 0, axis: null, on: true };
    morphRef.current?.setPointerCapture(e.pointerId);
    if (morphRef.current) morphRef.current.style.transition = 'none';
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.on || busy.current) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.axis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) s.axis = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    const m = morphRef.current;
    if (!m) return;
    if (s.axis === 'v') {
      // Scroll the page first; only travel past the top/bottom edge feeds the dismiss.
      const delta = e.clientY - s.lastY; // +down / -up
      s.lastY = e.clientY;
      const sc = scrollRef.current;
      if (sc && s.dismiss === 0) {
        const max = Math.max(0, sc.scrollHeight - sc.clientHeight);
        const next = sc.scrollTop - delta; // finger down scrolls content up
        if (next < 0 && delta > 0) {
          sc.scrollTop = 0;
          s.dismiss += -next; // overscrolled past the top → pull down to dismiss
        } else if (next > max && delta < 0) {
          sc.scrollTop = max;
          s.dismiss += max - next; // overscrolled past the bottom → pull up to dismiss
        } else {
          sc.scrollTop = Math.min(max, Math.max(0, next));
        }
      } else {
        s.dismiss += delta;
      }
      if (s.dismiss !== 0) {
        m.style.transform = `translateY(${s.dismiss}px) scale(${Math.max(0.85, 1 - Math.abs(s.dismiss) / 1400)})`;
        setBackdrop(Math.max(0, 1 - Math.abs(s.dismiss) / 480));
      }
    } else if (s.axis === 'h') {
      // drag the page toward its stack slot; resist at the ends where there is no neighbour
      const atEnd = (index === 0 && dx > 0) || (index === last && dx < 0);
      m.style.transform = `translateX(${atEnd ? dx * 0.3 : dx}px)`;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.on) return;
    s.on = false;
    const dx = e.clientX - s.x;
    if (s.axis === 'v' && Math.abs(s.dismiss) > 110) return close();
    if (s.axis === 'h' && Math.abs(dx) > 70) return go(dx < 0 ? 1 : -1);
    spring();
  };

  const arrow = 'fixed z-[90] top-1/2 -translate-y-1/2 hidden md:flex w-11 h-11 rounded-full bg-surface text-on-surface-variant shadow-lg items-center justify-center transition-colors hover:text-primary disabled:opacity-0 disabled:pointer-events-none';

  // Portal to <body>: the routed page sits inside a transformed track in PortfolioLayout,
  // which would otherwise become the containing block for this `fixed` overlay and push it
  // off-screen when the page is scrolled.
  return createPortal(
    <div
      className="fixed inset-0 z-[80]"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div ref={backdropRef} onClick={close} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <button
        aria-label="Close"
        onClick={close}
        className="fixed top-4 right-4 z-[90] w-10 h-10 rounded-full bg-surface text-on-surface-variant hover:text-primary shadow-lg flex items-center justify-center transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      <button aria-label="Previous entry" onClick={() => go(-1)} disabled={index === 0} className={`${arrow} left-4`}>
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button aria-label="Next entry" onClick={() => go(1)} disabled={index === last} className={`${arrow} right-4`}>
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="relative w-full max-w-[720px] lg:max-w-[900px] h-[calc(100vh-7rem)]">
          {incoming != null && (
            <div ref={inRef} className="absolute inset-0 will-change-transform pointer-events-none">
              <PaperPage entry={ctx.entries[incoming]} scrollable />
            </div>
          )}
          <div
            ref={morphRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={spring}
            className="absolute inset-0 pointer-events-auto touch-none cursor-grab active:cursor-grabbing will-change-transform"
          >
            <PaperPage entry={ctx.entries[index]} scrollable scrollRef={scrollRef} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// iOS App-Switcher style stack: overlapping page-cards, drag to flick through, tap to open.
function SwipeStack({ entries, onOpen, lifted = false }: { entries: DiaryEntry[]; onOpen: (ctx: OpenCtx) => void; lifted?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardW, setCardW] = useState(320);
  const startX = useRef(0);
  const moved = useRef(false);
  const cardWRef = useRef(cardW);
  cardWRef.current = cardW;

  useEffect(() => {
    const measure = () => {
      const w = ref.current?.offsetWidth ?? 360;
      setCardW(Math.round(Math.min(380, Math.max(240, w * (w < 640 ? 0.82 : 0.42)))));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const peek = cardW * 0.5;
  const last = entries.length - 1;

  // On-screen rect of the card `offset` steps from the centred one. Geometry-only (depends
  // on offset, not which card sits there), read live so the open reader can reuse it to
  // morph pages back into / out of the stack as it navigates.
  const rectFor = (offset: number): Rect => {
    const el = ref.current;
    const box = el?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
    const cw = cardWRef.current;
    const pk = cw * 0.5;
    const sc = Math.max(0.62, 1 - Math.abs(offset) * 0.13);
    const w = cw * sc;
    const h = box.height * sc;
    return { left: box.left + box.width / 2 + offset * pk - w / 2, top: box.top + (box.height - h) / 2, width: w, height: h };
  };

  const cardAt = (rel: number): number => {
    let hit = -1;
    let bestZ = -1;
    entries.forEach((_, i) => {
      const o = i - active;
      const sc = Math.max(0.62, 1 - Math.abs(o) * 0.13);
      const half = (cardW * sc) / 2;
      const cx = o * peek;
      if (rel >= cx - half && rel <= cx + half) {
        const z = 100 - Math.round(Math.abs(o) * 10);
        if (z > bestZ) { bestZ = z; hit = i; }
      }
    });
    return hit;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
    moved.current = false;
    ref.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 10) moved.current = true;
    let d = -dx / peek;
    const target = active + d;
    if (target < 0) d = -active + target * 0.35;
    else if (target > last) d = last - active + (target - last) * 0.35;
    setDrag(d);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    setDrag(0);
    if (moved.current) {
      setActive(Math.min(last, Math.max(0, Math.round(active + drag))));
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const hit = cardAt(e.clientX - (rect.left + rect.width / 2));
    if (hit >= 0) {
      onOpen({ entries, index: hit, openRect: rectFor(hit - active), rectFor, setActive });
      setActive(hit);
    }
  };
  const onPointerCancel = () => {
    setDragging(false);
    setDrag(0);
  };

  return (
    <div onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="relative h-[62vh] max-h-[560px] select-none touch-pan-y cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: '1400px' }}
      >
        {entries.map((entry, i) => {
          const o = i - active - drag;
          const abs = Math.abs(o);
          const scale = Math.max(0.62, 1 - abs * 0.13);
          const rot = Math.max(-20, Math.min(20, -o * 7));
          return (
            <div
              key={entry.slug}
              className="absolute top-0 left-1/2 pointer-events-none will-change-transform"
              style={{
                width: cardW,
                height: '100%',
                transform: `translateX(calc(-50% + ${o * peek}px)) scale(${scale}) rotateY(${rot}deg)`,
                zIndex: 100 - Math.round(abs * 10),
                opacity: abs > 3 || (lifted && i === active) ? 0 : 1,
                transition: dragging ? 'none' : 'transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
              }}
            >
              <PaperPage entry={entry} />
            </div>
          );
        })}
      </div>

      {entries.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {entries.map((entry, i) => (
            <button
              key={entry.slug}
              aria-label={`Go to entry ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === Math.round(active + drag) ? 'w-6 bg-primary' : 'w-2 bg-outline-variant/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const Diary = () => {
  const entries = useMemo(() => getAllEntries(), []);
  const groups = useMemo(() => groupByMonth(entries), [entries]);
  const [ctx, setCtx] = useState<OpenCtx | null>(null);

  return (
    <section
      data-no-animate
      className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
    >
      <header className="mb-10">
        <span className="block font-sans text-label-md uppercase tracking-widest text-secondary mb-2">
          System Logs &amp; Musings
        </span>
        <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
          The Engineering Diary
        </h1>
        <p className="font-serif text-body-lg text-on-surface-variant leading-relaxed">
          A running log of technical challenges, decisions, and late-night breakthroughs —
          swipe through each month, tap a page to read it.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-diary text-xl text-on-surface-variant">No entries yet.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groups).map(([key, monthEntries]) => (
            <div key={key}>
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="font-sans text-headline-md text-primary">{formatMonthLabel(key)}</h2>
                <span className="font-sans text-label-md text-on-surface-variant">
                  {monthEntries.length} {monthEntries.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>
              <SwipeStack entries={monthEntries} onOpen={setCtx} lifted={ctx?.entries === monthEntries} />
            </div>
          ))}
        </div>
      )}

      {ctx && (
        <DiaryReader
          key={ctx.entries[ctx.index].slug}
          ctx={ctx}
          onClose={() => setCtx(null)}
        />
      )}
    </section>
  );
};

export default Diary;
