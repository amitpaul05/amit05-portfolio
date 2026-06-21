import { useRef, useState } from 'react';
import { Settings, Eye, EyeOff, CheckCircle, Loader2, Upload } from 'lucide-react';
import { commitResume } from '@/lib/github';
import { toast } from 'sonner';
import ThemeToggle from '@/components/ThemeToggle';

const PAT_KEY = 'diary_pat';

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

const ResumeUpload = () => {
  const [showPAT, setShowPAT] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    setDone(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error('Select a PDF first');
      return;
    }

    const pat = localStorage.getItem(PAT_KEY);
    if (!pat) {
      setShowPAT(true);
      return;
    }

    setSubmitting(true);
    try {
      await commitResume(file, pat);
      setDone(true);
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      toast.error((err as Error).message ?? 'Commit failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {showPAT && <PATModal onClose={() => setShowPAT(false)} />}

      <div className="min-h-screen text-foreground">
        <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant/30">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="font-sans font-semibold text-primary">Update Resume</span>
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

        <main className="flex flex-col items-center justify-center px-4 py-20">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div
              onClick={() => inputRef.current?.click()}
              className="material-card bg-surface-container-lowest border-2 border-dashed border-outline-variant hover:border-primary/60 rounded-lg p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors"
            >
              <Upload className="w-8 h-8 text-on-surface-variant" />
              {file ? (
                <p className="font-sans text-sm font-medium text-on-surface text-center break-all">{file.name}</p>
              ) : (
                <p className="font-sans text-sm text-on-surface-variant text-center">
                  Click to select PDF
                </p>
              )}
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {done && (
              <div className="flex items-center gap-2 text-primary font-sans text-sm justify-center">
                <CheckCircle className="w-4 h-4" />
                Resume committed — Netlify will rebuild in ~1 min.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !file}
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-sans text-label-md hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Committing...' : 'Commit resume'}
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default ResumeUpload;
