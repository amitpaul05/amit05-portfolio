import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Settings, Eye, EyeOff, CheckCircle, Loader2, ArrowLeft, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { commitDiaryEntry } from '@/lib/github';
import { getAllEntries, getEntryBySlug, type DiaryEntry } from '@/lib/diary';
import { toast } from 'sonner';
import GlassSurface from '@/components/GlassSurface';

const PAT_KEY = 'diary_pat';

const MOODS = ['motivated', 'focused', 'pumped', 'reflective', 'tired', 'frustrated', 'relaxed', 'happy', 'anxious'];
const MOOD_EMOJI: Record<string, string> = {
  motivated: '🔥', focused: '🎯', pumped: '⚡', reflective: '🤔',
  tired: '😴', frustrated: '😤', relaxed: '😌', happy: '😊', anxious: '😰',
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function GlassNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
      <nav className="relative px-6 py-2.5 rounded-full shadow-2xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <GlassSurface
            width="100%" height="100%" borderRadius={50} borderWidth={0}
            brightness={50} opacity={0.93} blur={10} displace={0.5}
            backgroundOpacity={0.1} saturation={1} distortionScale={-180}
            redOffset={0} greenOffset={10} blueOffset={20}
          />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          {children}
        </div>
      </nav>
    </div>
  );
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
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DiaryEditList() {
  const navigate = useNavigate();
  const entries = getAllEntries();

  return (
    <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <GlassNav>
        <button
          onClick={() => navigate('/diary')}
          className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm md:text-base font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Journal
        </button>
        <span className="text-lg font-bold text-foreground">Edit entries</span>
        <span className="w-16" />
      </GlassNav>

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-10">
        <div className="diary-paper rounded shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
            style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
          />
          <div className="pl-14 pr-10 pt-8 pb-8">
            {entries.length === 0 ? (
              <p className="font-diary text-diary-ink-muted leading-8">No entries yet.</p>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.slug}
                  className="flex items-center justify-between border-b border-diary-rule/40 last:border-0"
                >
                  <div className="leading-8">
                    <span className="font-diary text-sm text-diary-ink">{formatDate(entry.date)}</span>
                    <span className="font-diary text-xs text-diary-ink-muted ml-2">
                      {entry.moods.map((m) => MOOD_EMOJI[m] ?? '•').join(' ')}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/diary/${entry.slug}/edit`)}
                    className="font-diary text-xs text-diary-ink-muted hover:text-diary-ink transition-colors flex items-center gap-1 leading-8"
                  >
                    <Pencil className="w-3 h-3" />
                    edit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DiaryEditForm({ entry }: { entry: DiaryEntry }) {
  const navigate = useNavigate();
  const [showPAT, setShowPAT] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const [form, setForm] = useState({
    date: entry.date,
    moods: entry.moods.length ? entry.moods : ['motivated'],
    body: entry.content,
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

  function handleBack() {
    setIsLeaving(true);
    setTimeout(() => navigate('/diary/edit'), 320);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pat = localStorage.getItem(PAT_KEY);
    if (!pat) { setShowPAT(true); return; }
    if (!form.body.trim()) { toast.error('Entry body is required'); return; }

    setSubmitting(true);
    try {
      await commitDiaryEntry({ date: form.date, moods: form.moods, body: form.body.trim() }, pat);
      setDone(true);
    } catch (err) {
      toast.error((err as Error).message ?? 'Commit failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <CheckCircle className="w-12 h-12 text-diary-accent mx-auto" />
          <p className="text-2xl font-bold text-diary-ink">Entry updated!</p>
          <p className="text-base text-diary-ink-muted">
            Netlify will rebuild in ~1 min and your changes will go live.
          </p>
          <button
            onClick={() => navigate('/diary/edit')}
            className="text-base text-diary-ink-muted hover:text-diary-ink underline transition-colors"
          >
            Back to entries
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showPAT && <PATModal onClose={() => setShowPAT(false)} />}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isLeaving ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen bg-background text-foreground dark overflow-x-hidden"
      >
        <GlassNav>
          <button
            onClick={handleBack}
            disabled={isLeaving}
            className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm md:text-base font-medium"
          >
            <motion.span
              className="flex items-center gap-1.5"
              whileHover={{ x: -4 }}
              whileTap={{ x: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Entries
            </motion.span>
          </button>
          <span className="text-xl font-bold text-foreground">Edit Entry</span>
          <button
            onClick={() => setShowPAT(true)}
            className="text-foreground/60 hover:text-foreground transition-colors"
            title="GitHub token settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </GlassNav>

        <main className="max-w-2xl mx-auto px-4 pt-24 pb-10">
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
                {submitting ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </main>
      </motion.div>
    </>
  );
}

const DiaryEdit = () => {
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();

  if (!date) return <DiaryEditList />;

  const entry = getEntryBySlug(date);
  if (!entry) {
    return (
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">Entry not found.</p>
          <button onClick={() => navigate('/diary/edit')} className="text-muted-foreground hover:text-foreground underline">
            ← Back to entries
          </button>
        </div>
      </div>
    );
  }

  return <DiaryEditForm entry={entry} />;
};

export default DiaryEdit;
