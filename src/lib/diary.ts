export interface DiaryEntry {
  date: string;
  moods: string[];
  content: string;
  slug: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      data[key] = val.replace(/^['"]|['"]$/g, '');
    }
  }

  return { data, content: match[2].trim() };
}

const modules = import.meta.glob<string>('/src/content/diary/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getAllEntries(): DiaryEntry[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const slug = path.split('/').pop()!.replace('.md', '');
      // Support both old `mood: x` (single) and new `moods: [x, y]` (array)
      const rawMoods = data.moods ?? data.mood;
      const moods: string[] = Array.isArray(rawMoods)
        ? (rawMoods as string[]).filter(Boolean)
        : rawMoods ? [(rawMoods as string)] : [];
      return {
        date: (data.date as string) ?? slug,
        moods,
        content,
        slug,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEntryBySlug(slug: string): DiaryEntry | undefined {
  return getAllEntries().find((e) => e.slug === slug);
}
