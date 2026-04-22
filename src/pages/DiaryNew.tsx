import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Eye, EyeOff, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { commitDiaryEntry } from '@/lib/github';
import { toast } from 'sonner';
import GlassSurface from '@/components/GlassSurface';

const PAT_KEY = 'diary_pat';

const MOODS = ['motivated', 'focused', 'pumped', 'reflective', 'tired', 'frustrated'];

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

  const [form, setForm] = useState({
    date: today(),
    title: '',
    mood: 'motivated',
    tags: '',
    body: '',
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pat = localStorage.getItem(PAT_KEY);
    if (!pat) {
      setShowPAT(true);
      return;
    }

    if (!form.title.trim() || !form.body.trim()) {
      toast.error('Title and entry body are required');
      return;
    }

    setSubmitting(true);
    try {
      await commitDiaryEntry(
        {
          date: form.date,
          title: form.title.trim(),
          mood: form.mood,
          tags: form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
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
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <CheckCircle className="w-12 h-12 text-diary-accent mx-auto" />
          <p className="text-2xl font-bold text-diary-ink">Entry committed!</p>
          <p className="text-base text-diary-ink-muted">
            Netlify will rebuild in ~1 min and your entry will go live.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => { setDone(false); setForm({ date: today(), title: '', mood: 'motivated', tags: '', body: '' }); }}
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

      <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
        {/* Glassmorphic pill nav */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
          <nav className="relative px-6 py-3 rounded-full shadow-2xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={50}
                borderWidth={0}
                brightness={50}
                opacity={0.93}
                blur={10}
                displace={0.5}
                backgroundOpacity={0.1}
                saturation={1}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
              />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <button
                onClick={() => navigate('/diary')}
                className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm md:text-base font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Journal
              </button>
              <span className="text-xl font-bold text-foreground">New Entry</span>
              <button
                onClick={() => setShowPAT(true)}
                className="text-foreground/60 hover:text-foreground transition-colors"
                title="GitHub token settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>

        <main className="max-w-2xl mx-auto px-4 pt-24 pb-10">
          <form onSubmit={handleSubmit}>
            <div className="diary-paper rounded shadow-2xl relative overflow-hidden">
              {/* Spiral holes */}
              <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-8 pointer-events-none z-10">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border-2 border-diary-rule shadow-inner"
                    style={{ backgroundColor: 'hsl(var(--diary-paper))' }}
                  />
                ))}
              </div>

              <div className="pl-14 pr-6 pt-6 pb-8 relative space-y-0">
                {/* Red margin rule */}
                <div
                  className="absolute top-0 bottom-0 w-px"
                  style={{ left: '3rem', backgroundColor: 'hsl(var(--diary-rule-margin) / 0.55)' }}
                />

                {/* Date + mood row */}
                <div className="flex flex-wrap gap-4 items-center leading-[1.875rem] mb-1">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    className="text-sm text-diary-ink-muted bg-transparent border-b border-diary-rule/40 outline-none focus:border-diary-accent pb-0 cursor-pointer"
                  />
                  <select
                    value={form.mood}
                    onChange={(e) => set('mood', e.target.value)}
                    className="text-sm text-diary-ink-muted bg-transparent border-b border-diary-rule/40 outline-none focus:border-diary-accent cursor-pointer"
                  >
                    {MOODS.map((m) => (
                      <option key={m} value={m} style={{ backgroundColor: 'hsl(var(--diary-paper))' }}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="leading-[1.875rem]">
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set('tags', e.target.value)}
                    placeholder="tags: dsa, system-design, ..."
                    className="w-full text-sm text-diary-ink-muted bg-transparent outline-none placeholder:text-diary-ink-muted/50"
                  />
                </div>

                {/* Title */}
                <div className="leading-[1.875rem]">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => set('title', e.target.value)}
                    placeholder="Today's entry title..."
                    required
                    className="w-full text-2xl font-bold text-diary-ink bg-transparent outline-none placeholder:text-diary-ink/30 pr-8"
                  />
                </div>

                {/* Body */}
                <textarea
                  value={form.body}
                  onChange={(e) => set('body', e.target.value)}
                  placeholder="Write your entry here... markdown is supported."
                  required
                  rows={14}
                  className="w-full text-base leading-[1.875rem] text-diary-ink bg-transparent outline-none resize-none placeholder:text-diary-ink/30 mt-0"
                />
              </div>
            </div>

            {/* Submit */}
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
