import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react';
import { getAllEntries, type DiaryEntry } from '@/lib/diary';

type Rect = { left: number; top: number; width: number; height: number };

type OpenCtx = {
  entries: DiaryEntry[];
  index: number;
  openRect: Rect; // the tapped card's on-screen rect (morph origin)
  centerRect: Rect; // the stack's centred-card rect (collapse / re-expand target)
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

function PaperPage({ entry }: { entry: DiaryEntry }) {
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
      <div className="pl-14 pr-10 pt-8 pb-10">
        <div className="font-diary text-sm text-diary-ink-muted flex flex-wrap items-center gap-3 leading-8">
          {entry.moods.map((m) => (
            <span key={m}>{MOOD_EMOJI[m] ?? '•'} {m}</span>
          ))}
        </div>
        <div className="font-diary text-base leading-8 text-diary-ink diary-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--diary-paper)), transparent)' }}
      />
    </div>
  );
}

// Gesture-driven reader. Vertical swipe shrinks the page back onto the stack (close);
// horizontal swipe drags a 3-card track so the prev/next page slides in under the finger.
const GAP = 24;

function DiaryReader({ ctx, onClose }: { ctx: OpenCtx; onClose: () => void }) {
  const [index, setIndex] = useState(ctx.index);
  const morphRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const natural = useRef<Rect | null>(null);
  const busy = useRef(false);
  const g = useRef({ x: 0, y: 0, axis: null as null | 'h' | 'v', on: false });

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

  // Open: morph the page out from the tapped card; measure the natural rect once.
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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Release with no commit: settle the page and the track back to rest.
  const spring = () => {
    const m = morphRef.current;
    const tr = trackRef.current;
    if (m) {
      m.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s';
      m.style.transform = 'none';
      m.style.opacity = '1';
    }
    if (tr) {
      tr.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1)';
      tr.style.transform = 'none';
    }
    setBackdrop(1, 200);
  };

  // Vertical dismiss: shrink the page down into its slot on the stack, then unmount.
  const close = () => {
    const m = morphRef.current;
    if (busy.current || !m) return;
    busy.current = true;
    m.style.transition = 'transform 0.3s cubic-bezier(0.4,0,1,1), opacity 0.3s';
    m.style.transform = tf(ctx.centerRect);
    m.style.opacity = '0.15';
    setBackdrop(0, 300);
    window.setTimeout(onClose, 300);
  };

  // Horizontal commit: slide the track one card over so the neighbour lands centred.
  const commit = (dir: -1 | 1) => {
    const target = index + dir;
    const tr = trackRef.current;
    if (busy.current || !tr || target < 0 || target >= ctx.entries.length) {
      spring();
      return;
    }
    busy.current = true;
    const step = (natural.current?.width ?? 0) + GAP;
    tr.style.transition = 'transform 0.32s cubic-bezier(0.22,1,0.36,1)';
    tr.style.transform = `translateX(${-dir * step}px)`;
    window.setTimeout(() => {
      ctx.setActive(target);
      setIndex(target);
      tr.style.transition = 'none';
      tr.style.transform = 'none';
      busy.current = false;
    }, 320);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    g.current = { x: e.clientX, y: e.clientY, axis: null, on: true };
    morphRef.current?.setPointerCapture(e.pointerId);
    if (morphRef.current) morphRef.current.style.transition = 'none';
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.on) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.axis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) s.axis = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    if (s.axis === 'v') {
      const m = morphRef.current;
      if (!m) return;
      m.style.transform = `translateY(${dy}px) scale(${Math.max(0.85, 1 - Math.abs(dy) / 1400)})`;
      setBackdrop(Math.max(0, 1 - Math.abs(dy) / 480));
    } else if (s.axis === 'h') {
      const tr = trackRef.current;
      if (!tr) return;
      // resist at the ends where there is no neighbour to pull in
      const atStart = index === 0 && dx > 0;
      const atEnd = index === ctx.entries.length - 1 && dx < 0;
      tr.style.transform = `translateX(${atStart || atEnd ? dx * 0.3 : dx}px)`;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.on) return;
    s.on = false;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.axis === 'v' && Math.abs(dy) > 110) return close();
    if (s.axis === 'h' && Math.abs(dx) > 70) return commit(dx < 0 ? 1 : -1);
    spring();
  };

  return (
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
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div
          ref={morphRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={spring}
          className="relative pointer-events-auto w-full max-w-[720px] lg:max-w-[900px] h-[calc(100vh-7rem)] touch-none cursor-grab active:cursor-grabbing will-change-transform"
        >
          <div ref={trackRef} className="absolute inset-0 will-change-transform">
            {[-1, 0, 1].map((slot) => {
              const i = index + slot;
              if (i < 0 || i >= ctx.entries.length) return null;
              return (
                <div
                  key={ctx.entries[i].slug}
                  className="absolute inset-0"
                  style={{ transform: `translateX(calc((100% + ${GAP}px) * ${slot}))` }}
                >
                  <PaperPage entry={ctx.entries[i]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
      const rectFor = (o: number): Rect => {
        const sc = Math.max(0.62, 1 - Math.abs(o) * 0.13);
        const w = cardW * sc;
        const h = rect.height * sc;
        return { left: rect.left + rect.width / 2 + o * peek - w / 2, top: rect.top + (rect.height - h) / 2, width: w, height: h };
      };
      onOpen({ entries, index: hit, openRect: rectFor(hit - active), centerRect: rectFor(0), setActive });
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
