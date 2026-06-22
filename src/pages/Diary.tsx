import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react';
import { getAllEntries, type DiaryEntry } from '@/lib/diary';

type Rect = { left: number; top: number; width: number; height: number };

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

function PaperPage({ entry, full }: { entry: DiaryEntry; full?: boolean }) {
  return (
    <div className={`relative diary-paper rounded-xl border border-diary-rule/30 ${full ? 'min-h-[calc(100vh-7rem)] shadow-2xl' : 'h-full shadow-2xl overflow-hidden'}`}>
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
      {!full && (
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, hsl(var(--diary-paper)), transparent)' }}
        />
      )}
    </div>
  );
}

// iOS App-Switcher style stack: overlapping page-cards, drag (mouse/touch) to flick
// through, tap the front card to open it. stopPropagation keeps the horizontal drag
// from triggering the layout's tab-swipe.
function SwipeStack({
  entries,
  onOpen,
}: {
  entries: DiaryEntry[];
  onOpen: (slug: string, openRect: Rect, closeRect: Rect) => void;
}) {
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

  // Which card sits in front at a horizontal offset from centre (front-most = highest z)
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
    // tap → open the page actually under the finger (ignore taps on empty space)
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const hit = cardAt(e.clientX - (rect.left + rect.width / 2));
    if (hit >= 0) {
      // On-screen rect of a card at step `o` from centre — for the expand/collapse morph
      const rectFor = (o: number): Rect => {
        const sc = Math.max(0.62, 1 - Math.abs(o) * 0.13);
        const w = cardW * sc;
        const h = rect.height * sc;
        return { left: rect.left + rect.width / 2 + o * peek - w / 2, top: rect.top + (rect.height - h) / 2, width: w, height: h };
      };
      onOpen(entries[hit].slug, rectFor(hit - active), rectFor(0));
      setActive(hit); // focus the tapped page so the modal collapses back to centre
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
                opacity: abs > 3 ? 0 : 1,
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
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openEntry = openSlug ? entries.find((e) => e.slug === openSlug) : null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const rects = useRef<{ open: Rect; close: Rect } | null>(null);

  const openModal = (slug: string, open: Rect, close: Rect) => {
    rects.current = { open, close };
    setOpenSlug(slug);
  };

  // Morph the dialog between a card rect and its centred position (FLIP)
  const morph = (target: Rect, closing: boolean) => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const f = dlg.getBoundingClientRect();
    const dx = target.left + target.width / 2 - (f.left + f.width / 2);
    const dy = target.top + target.height / 2 - (f.top + f.height / 2);
    const sx = target.width / f.width;
    const sy = target.height / f.height;
    const card = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    dlg.animate(
      closing
        ? [{ transform: 'none', opacity: 1 }, { transform: card, opacity: 0.2 }]
        : [{ transform: card, opacity: 0.3 }, { transform: 'none', opacity: 1 }],
      { duration: closing ? 300 : 360, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }
    );
    backdropRef.current?.animate(closing ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      easing: 'ease-out',
      fill: 'both',
    });
  };

  const closeModal = () => {
    if (rects.current && dialogRef.current) {
      morph(rects.current.close, true);
      const done = dialogRef.current.getAnimations().slice(-1)[0];
      if (done) done.onfinish = () => setOpenSlug(null);
      else setOpenSlug(null);
    } else {
      setOpenSlug(null);
    }
  };

  useLayoutEffect(() => {
    if (openSlug && rects.current) morph(rects.current.open, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSlug]);

  useEffect(() => {
    if (!openSlug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSlug]);

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
              <SwipeStack entries={monthEntries} onOpen={openModal} />
            </div>
          ))}
        </div>
      )}

      {/* In-page reader — keeps the Diary list mounted (no reload on close) */}
      {openEntry && (
        <div className="fixed inset-0 z-[80] overflow-y-auto" onClick={closeModal}>
          {/* fixed backdrop covers the viewport even when a tall entry scrolls */}
          <div ref={backdropRef} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <button
            aria-label="Close"
            onClick={closeModal}
            className="fixed top-4 right-4 z-[90] w-10 h-10 rounded-full bg-surface text-on-surface-variant hover:text-primary shadow-lg flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative flex min-h-full justify-center p-4 md:p-8">
            <div
              ref={dialogRef}
              className="w-full max-w-[720px] lg:max-w-[900px] my-auto will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <PaperPage entry={openEntry} full />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Diary;
