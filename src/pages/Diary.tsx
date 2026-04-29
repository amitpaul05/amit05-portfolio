import { useRef, useState, useEffect, type CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllEntries, type DiaryEntry } from '@/lib/diary';

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

function SidebarList({ groups }: { groups: Record<string, DiaryEntry[]> }) {
  return (
    <div className="space-y-5">
      {Object.entries(groups).map(([monthKey, monthEntries]) => (
        <div key={monthKey}>
          <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-2">
            {formatMonthLabel(monthKey)}
          </p>
          <ul className="space-y-1.5">
            {monthEntries.map((entry) => (
              <li key={entry.slug}>
                <button
                  onClick={() => scrollToEntry(entry.slug)}
                  className="font-diary text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left leading-snug"
                >
                  {formatShortDate(entry.date)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
  const entries = getAllEntries();
  const groups = groupByMonth(entries);
  const sectionRef = useRef<HTMLElement>(null);
  const [sidebarState, setSidebarState] = useState<SidebarState>('pre');
  const [unlockedTop, setUnlockedTop] = useState(0);
  const prevStateRef = useRef<SidebarState>('pre');

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
    <section ref={sectionRef} className="relative">
      <aside
        className="hidden xl:block w-28 z-40 diary-sidebar max-h-[calc(100vh-4rem)] overflow-y-auto"
        style={sidebarStyle}
      >
        <SidebarList groups={groups} />
      </aside>
      <div className="max-w-[860px] mx-auto px-4 pt-6 pb-16 space-y-16">
        {entries.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-diary text-xl text-muted-foreground">No entries yet.</p>
          </div>
        ) : (
          entries.map((entry) => <EntryCard key={entry.slug} entry={entry} />)
        )}
      </div>
    </section>
  );
};

export default Diary;
