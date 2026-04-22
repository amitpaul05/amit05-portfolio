import { useRef, useState } from 'react';
import { Settings, Eye, EyeOff, CheckCircle, Loader2, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { commitResume } from '@/lib/github';
import { toast } from 'sonner';
import GlassSurface from '@/components/GlassSurface';

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="min-h-screen bg-background text-foreground dark flex flex-col items-center justify-center px-4"
      >
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
              <span className="text-xl font-bold text-foreground">Update Resume</span>
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

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mt-16">
          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            {file ? (
              <p className="text-sm font-medium text-foreground text-center break-all">{file.name}</p>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
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
            <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
              <CheckCircle className="w-4 h-4" />
              Resume committed — Netlify will rebuild in ~1 min.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !file}
            className="w-full py-3 rounded border border-primary/50 text-foreground bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-40 flex items-center justify-center gap-2 text-base font-medium"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Committing...' : 'Commit resume'}
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default ResumeUpload;
