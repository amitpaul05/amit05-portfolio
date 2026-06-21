import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Eye, EyeOff, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { commitDiaryEntry } from '@/lib/github';
import { toast } from 'sonner';
import ThemeToggle from '@/components/ThemeToggle';

const PAT_KEY = 'diary_pat';

const MOODS = ['motivated', 'focused', 'pumped', 'reflective', 'tired', 'frustrated', 'relaxed', 'happy', 'anxious'];
const MOOD_EMOJI: Record<string, string> = {
  motivated: '🔥', focused: '🎯', pumped: '⚡', reflective: '🤔',
  tired: '😴', frustrated: '😤', relaxed: '😌', happy: '😊', anxious: '😰',
};

function today() {
  return new Date().toISOString().split('T')[0];
}

function PATModal({ onClose }: { onClose: () => void }) {
  const [val, setVal] = useState(() => localStorage.getItem(PAT_KEY) ?? '');
  const [show, setShow] = useState(false);

  function save() {
    localStorage.setItem(PAT_KEY, val.trim());
    toast.success('Token saved');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-sm mx-4 p-6 border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-1">GitHub Token</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Fine-grained PAT · Repository Contents: Read &amp; write
        </p>

        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="github_pat_..."
            className="w-full bg-background border border-border text-foreground font-mono text-sm rounded px-3 py-2 pr-10 outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={save}
            className="flex-1 text-sm font-medium bg-primary/20 hover:bg-primary/30 text-foreground border border-primary/40 rounded py-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const DiaryNew = () => {
  const navigate = useNavigate();
  const [showPAT, setShowPAT] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleBack() {
    navigate('/diary');
  }

  const [form, setForm] = useState({
    date: today(),
    moods: ['motivated'] as string[],
    body: '',
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleMood(m: string) {
    setForm((f) => ({
      ...f,
      moods: f.moods.includes(m) ? f.moods.filter((x) => x !== m) : [...f.moods, m],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pat = localStorage.getItem(PAT_KEY);
    if (!pat) {
      setShowPAT(true);
      return;
    }

    if (!form.body.trim()) {
      toast.error('Entry body is required');
      return;
    }

    setSubmitting(true);
    try {
      await commitDiaryEntry(
        {
          date: form.date,
          moods: form.moods,
          body: form.body.trim(),
        },
        pat,
      );
      setDone(true);
    } catch (err) {
      toast.error((err as Error).message ?? 'Commit failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <CheckCircle className="w-12 h-12 text-diary-accent mx-auto" />
          <p className="text-2xl font-bold text-diary-ink">Entry committed!</p>
          <p className="text-base text-diary-ink-muted">
            Netlify will rebuild in ~1 min and your entry will go live.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => { setDone(false); setForm({ date: today(), moods: ['motivated'], body: '' }); }}
              className="text-base text-diary-ink-muted hover:text-diary-ink underline transition-colors"
            >
              Write another
            </button>
            <button
              onClick={() => navigate('/diary')}
              className="text-base text-diary-ink-muted hover:text-diary-ink underline transition-colors"
            >
              View journal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showPAT && <PATModal onClose={() => setShowPAT(false)} />}

      <div className="min-h-screen text-foreground overflow-x-hidden">
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-sans text-label-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Journal
            </button>
            <span className="font-sans font-semibold text-primary">New Entry</span>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setShowPAT(true)}
                className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                title="GitHub token settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 pt-8 pb-10">
          <form onSubmit={handleSubmit}>
            <div className="diary-paper rounded shadow-2xl relative overflow-hidden">
              <div
                className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
                style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
              />

              <div className="pl-14 pr-10 pt-8 pb-8">
                <div className="leading-8">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    className="text-sm text-diary-ink-muted bg-transparent border-b border-diary-rule/40 outline-none focus:border-diary-accent cursor-pointer leading-8"
                  />
                </div>

                <div className="flex flex-wrap gap-2 leading-8">
                  {MOODS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMood(m)}
                      className={`text-xs px-2 rounded border transition-colors leading-8 ${
                        form.moods.includes(m)
                          ? 'border-diary-ink/50 text-diary-ink bg-diary-ink/10'
                          : 'border-diary-rule/50 text-diary-ink-muted'
                      }`}
                    >
                      {MOOD_EMOJI[m]} {m}
                    </button>
                  ))}
                </div>

                <textarea
                  value={form.body}
                  onChange={(e) => set('body', e.target.value)}
                  placeholder="Write your entry here... markdown is supported."
                  required
                  rows={18}
                  className="w-full text-base leading-8 text-diary-ink bg-transparent outline-none resize-none placeholder:text-diary-ink/30"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="text-lg px-8 py-2 rounded border border-diary-accent/50 text-diary-ink bg-diary-accent/10 hover:bg-diary-accent/20 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Committing...' : 'Commit entry'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default DiaryNew;
