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
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function EntryCard({ entry }: { entry: DiaryEntry }) {
  const moodEmoji = MOOD_EMOJI[entry.mood] ?? '';

  return (
    <article className="relative">
      <div className="diary-paper rounded shadow-2xl relative overflow-hidden">
        {/* Spiral binding holes */}
        <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-8 pointer-events-none z-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full border-2 border-diary-rule shadow-inner"
              style={{ backgroundColor: 'hsl(var(--diary-paper))' }}
            />
          ))}
        </div>

        {/* Date badge top-right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="font-diary text-sm text-diary-ink-muted inline-block -rotate-2 border border-diary-rule/40 px-2 py-0.5 rounded bg-diary-paper/80 whitespace-nowrap">
            {formatDate(entry.date)}
          </span>
        </div>

        {/* Content area with left margin */}
        <div className="pl-14 pr-6 pt-6 pb-8 relative">
          {/* Red margin rule */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
          />

          {/* Mood + tags row */}
          <div className="font-diary text-sm text-diary-ink-muted mb-2 flex flex-wrap items-center gap-2 leading-[1.875rem]">
            {moodEmoji && <span>{moodEmoji} {entry.mood}</span>}
            {entry.tags.map((tag) => (
              <span key={tag} className="text-xs border border-diary-rule/40 px-1.5 py-px rounded-sm">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-diary text-2xl font-bold text-diary-ink mb-4 leading-[1.875rem] pr-28">
            {entry.title}
          </h2>

          {/* Body */}
          <div className="font-diary text-base leading-[1.875rem] text-diary-ink diary-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}

const Diary = () => {
  const entries = getAllEntries();

  return (
    <section>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16 space-y-14">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-diary text-3xl font-bold text-foreground">Dev Journal</h1>
          <span className="text-sm text-muted-foreground">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
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
