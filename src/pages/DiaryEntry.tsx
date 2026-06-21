import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getEntryBySlug } from '@/lib/diary';
import ThemeToggle from '@/components/ThemeToggle';

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
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const DiaryEntry = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const entry = date ? getEntryBySlug(date) : undefined;

  if (!entry) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-diary text-2xl text-on-surface-variant">Entry not found.</p>
          <button
            onClick={() => navigate('/diary')}
            className="font-sans text-on-surface-variant hover:text-primary underline transition-colors"
          >
            ← Back to journal
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/diary')}
            className="group inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-sans text-label-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Journal
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-8 pb-16">
        <article className="relative">
          <div className="diary-paper rounded shadow-2xl relative h-[1088px] overflow-hidden">

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

            <div className="pl-14 pr-10 pt-8 pb-8">
              <div className="font-diary text-sm text-diary-ink-muted flex flex-wrap items-center gap-3 leading-8">
                {entry.moods.map((m) => (
                  <span key={m}>{MOOD_EMOJI[m] ?? '•'} {m}</span>
                ))}
              </div>

              <div className="font-diary text-base leading-8 text-diary-ink diary-prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default DiaryEntry;
