import { useRef, useState, useEffect, useMemo, type CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getAllEntries, type DiaryEntry } from '@/lib/diary';

const SKELETON_WIDTHS = ['90%','85%','95%','70%','80%','88%','75%','92%','65%','85%','90%','72%','88%','60%','78%'];

function SkeletonCard() {
  return (
    <div className="diary-paper rounded shadow-2xl relative h-[1088px] overflow-hidden">
      <div
        className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
        style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
      />
      <div className="absolute top-2 right-5 z-20">
        <div className="diary-shimmer-bar h-8 w-36 rounded" />
      </div>
      <div className="pl-14 pr-10 pt-8 pb-8">
        <div className="flex items-center gap-3 h-8">
          <div className="diary-shimmer-bar h-4 w-16 rounded" />
          <div className="diary-shimmer-bar h-4 w-20 rounded" />
          <div className="diary-shimmer-bar h-4 w-14 rounded" />
        </div>
        <div>
          {SKELETON_WIDTHS.map((w, i) => (
            <div key={i} className="flex items-center h-8">
              <div className="diary-shimmer-bar h-4 rounded" style={{ width: w }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

function formatShortDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
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

function scrollToEntry(slug: string) {
  document.getElementById(`entry-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SidebarList({
  groups,
  expandedMonth,
  activeSlug,
  onMonthClick,
}: {
  groups: Record<string, DiaryEntry[]>;
  expandedMonth: string;
  activeSlug: string;
  onMonthClick: (month: string) => void;
}) {
  return (
    <div className="space-y-3">
      {Object.entries(groups).map(([monthKey, monthEntries]) => {
        const isOpen = monthKey === expandedMonth;
        return (
          <div key={monthKey}>
            <button
              onClick={() => onMonthClick(monthKey)}
              className={`flex items-center justify-between w-full text-left px-2 py-1 rounded transition-colors duration-200 ${
                isOpen ? 'bg-surface-container-high' : 'hover:bg-surface-container'
              }`}
            >
              <span
                className={`font-sans text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  isOpen ? 'text-on-surface' : 'text-on-surface-variant/60'
                }`}
              >
                {formatMonthLabel(monthKey)}
              </span>
              <ChevronDown
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-0 text-on-surface-variant' : '-rotate-90 text-on-surface-variant/50'
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <ul className="min-h-0 overflow-hidden space-y-1.5 mt-1 ml-3 pl-2 border-l border-outline-variant/40">
                {monthEntries.map((entry) => (
                  <li key={entry.slug}>
                    <button
                      onClick={() => scrollToEntry(entry.slug)}
                      className={`font-diary text-sm w-full text-left leading-snug flex items-center gap-1 px-1 py-0.5 rounded transition-colors duration-200 ${
                        entry.slug === activeSlug
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                      }`}
                    >
                      <ChevronRight className={`w-2.5 h-2.5 shrink-0 transition-colors duration-200 ${
                        entry.slug === activeSlug ? 'text-on-secondary-container/70' : 'text-on-surface-variant/40'
                      }`} />
                      {formatShortDate(entry.date)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EntryCard({ entry }: { entry: DiaryEntry }) {
  return (
    <article id={`entry-${entry.slug}`} className="scroll-mt-8">
      {/*
        Page height = pt-8(32) + 32 lines × 32px + pb-8(32) = 1088 px.
        overflow-hidden clips cleanly at the last ruled line — no internal scroll.
      */}
      <div className="diary-paper rounded shadow-2xl relative h-[1088px] overflow-hidden">

        {/* Red margin rule */}
        <div
          className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
          style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
        />

        {/* Date badge */}
        <div className="absolute top-2 right-5 z-20">
          <span
            className="font-diary text-sm text-diary-ink-muted inline-block -rotate-2 border border-diary-rule/40 px-2 py-0 rounded whitespace-nowrap leading-8"
            style={{ backgroundColor: 'hsl(var(--diary-paper) / 0.9)' }}
          >
            {formatDate(entry.date)}
          </span>
        </div>

        {/* Content — pt-8/pb-8 aligns to 32 px grid; no overflow-y */}
        <div className="pl-14 pr-10 pt-8 pb-8">

          {/* Moods row */}
          <div className="font-diary text-sm text-diary-ink-muted flex flex-wrap items-center gap-3 leading-8">
            {entry.moods.map((m) => (
              <span key={m}>{MOOD_EMOJI[m] ?? '•'} {m}</span>
            ))}
          </div>

          {/* Body — every element uses leading-8; prose margins are 2rem multiples */}
          <div className="font-diary text-base leading-8 text-diary-ink diary-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
          </div>
        </div>

      </div>
    </article>
  );
}

const NAVBAR_HEIGHT = 64;

type SidebarState = 'pre' | 'fixed' | 'unlocked';

const Diary = () => {
  const entries = useMemo(() => getAllEntries(), []);
  const groups = useMemo(() => groupByMonth(entries), [entries]);
  const sectionRef = useRef<HTMLElement>(null);
  const [sidebarState, setSidebarState] = useState<SidebarState>('pre');
  const [unlockedTop, setUnlockedTop] = useState(0);
  const prevStateRef = useRef<SidebarState>('pre');
  const [loading, setLoading] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState(() => entries[0]?.date.slice(0, 7) ?? '');
  const [activeSlug, setActiveSlug] = useState(() => entries[0]?.slug ?? '');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (changes) => {
        const entering = changes
          .filter(c => c.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (entering.length === 0) return;
        const slug = entering[0].target.id.replace('entry-', '');
        const found = entries.find(e => e.slug === slug);
        if (found) {
          setExpandedMonth(found.date.slice(0, 7));
          setActiveSlug(found.slug);
        }
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px -30% 0px`, threshold: 0 },
    );
    document.querySelectorAll('article[id^="entry-"]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    function update() {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const contact = document.getElementById('contact-section');
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;

      let next: SidebarState;
      if (sectionTop > NAVBAR_HEIGHT) {
        next = 'pre';
      } else if (contactTop >= window.innerHeight) {
        next = 'fixed';
      } else {
        next = 'unlocked';
      }

      // Compute the absolute offset only on the transition into 'unlocked',
      // so the sidebar appears to continue from its locked position and
      // then drifts away naturally with the page as you scroll into the footer.
      if (next === 'unlocked' && prevStateRef.current !== 'unlocked') {
        setUnlockedTop(NAVBAR_HEIGHT - sectionTop);
      }

      prevStateRef.current = next;
      setSidebarState(next);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const sidebarStyle: CSSProperties =
    sidebarState === 'fixed'
      ? { position: 'fixed', top: NAVBAR_HEIGHT, left: 32 }
      : sidebarState === 'unlocked'
      ? { position: 'absolute', top: unlockedTop, left: 32 }
      : { position: 'absolute', top: 0, left: 32 };

  return (
    <section ref={sectionRef} className="relative" data-no-animate>
      <aside
        className="hidden xl:block w-28 z-40 diary-sidebar max-h-[calc(100vh-4rem)] overflow-y-auto"
        style={sidebarStyle}
      >
        <SidebarList groups={groups} expandedMonth={expandedMonth} activeSlug={activeSlug} onMonthClick={setExpandedMonth} />
      </aside>
      <div className="max-w-[860px] mx-auto px-4 pt-6 pb-16">
        <header className="mb-10">
          <span className="block font-sans text-label-md uppercase tracking-widest text-secondary mb-2">
            System Logs &amp; Musings
          </span>
          <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
            The Engineering Diary
          </h1>
          <p className="font-serif text-body-md text-on-surface-variant leading-relaxed">
            A running log of technical challenges, architectural decisions, and late-night
            breakthroughs — documented as they happen.
          </p>
        </header>

        <div className="space-y-16">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : entries.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-diary text-xl text-on-surface-variant">No entries yet.</p>
            </div>
          ) : (
            entries.map((entry) => <EntryCard key={entry.slug} entry={entry} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Diary;
