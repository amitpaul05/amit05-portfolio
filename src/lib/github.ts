const OWNER = 'amitpaul05';
const REPO = 'amit05-portfolio';
const BRANCH = 'main';

export interface DiaryPayload {
  date: string;
  title: string;
  mood: string;
  tags: string[];
  body: string;
}

function buildMarkdown({ date, title, mood, tags, body }: DiaryPayload): string {
  return `---\ndate: ${date}\ntitle: "${title}"\nmood: ${mood}\ntags: [${tags.join(', ')}]\n---\n\n${body}`;
}

export async function commitDiaryEntry(payload: DiaryPayload, pat: string): Promise<void> {
  const path = `src/content/diary/${payload.date}.md`;
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // btoa can't handle non-latin chars directly; encodeURIComponent + unescape handles Unicode
  const content = btoa(unescape(encodeURIComponent(buildMarkdown(payload))));

  const body: Record<string, string> = {
    message: `diary: ${payload.date} — ${payload.title}`,
    content,
    branch: BRANCH,
  };

  // If a file already exists for this date, we need its sha to update it
  const check = await fetch(url, { headers });
  if (check.ok) {
    const existing = await check.json();
    body.sha = existing.sha;
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `GitHub API error ${res.status}`);
  }
}
