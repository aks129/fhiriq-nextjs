/**
 * Real episodes, from the real feed.
 *
 * The podcast section previously shipped hardcoded placeholder episodes
 * ("Episode 1", invented durations and dates) that did not correspond to
 * anything published. This reads the actual Substack feed instead, so the
 * site can only ever show episodes that exist.
 *
 * Only items carrying an <enclosure> are treated as episodes — the feed mixes
 * written posts and audio, and an item without audio is an article.
 */

export type Episode = {
  title: string;
  link: string;
  date: string; // ISO
  audioUrl: string | null;
  duration: string | null; // "47:43", only when the feed actually states it
};

/**
 * The general Substack feed carries every audio episode (20 at time of
 * writing); the dedicated podcast RSS at
 * api.substack.com/feed/podcast/4334682.rss carries fewer but includes
 * itunes:duration. Using the general feed means the site lists everything,
 * and duration renders only when a feed supplies it rather than being
 * invented.
 */
const FEED_URL = 'https://evestel.substack.com/feed';

/** itunes:duration is either seconds ("2863") or HH:MM:SS. Normalise to m:ss. */
function normaliseDuration(raw: string | null): string | null {
  if (!raw) return null;
  const v = raw.trim();
  if (/^\d+$/.test(v)) {
    const total = Number(v);
    if (!total) return null;
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }
  return /^[\d:]+$/.test(v) ? v : null;
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function pick(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : null;
}

/**
 * Returns the most recent episodes, or an empty array if the feed is
 * unreachable or malformed. Callers must render a sensible fallback for the
 * empty case rather than assuming content — a failed fetch must never
 * produce an empty-looking section.
 */
export async function getEpisodes(limit = 4): Promise<Episode[]> {
  try {
    const res = await fetch(FEED_URL, {
      // Revalidate hourly. The feed is the source of truth; the site caches it.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    return xml
      .split('<item>')
      .slice(1)
      .filter((block) => block.includes('<enclosure'))
      .map((block) => {
        const enclosure = block.match(/<enclosure[^>]*url="([^"]+)"/);
        const pub = pick(block, 'pubDate');
        const parsed = pub ? new Date(pub) : null;
        return {
          title: pick(block, 'title') ?? '',
          link: pick(block, 'link') ?? 'https://evestel.substack.com',
          date: parsed && !Number.isNaN(parsed.valueOf()) ? parsed.toISOString() : '',
          audioUrl: enclosure ? enclosure[1] : null,
          duration: normaliseDuration(pick(block, 'itunes:duration')),
        };
      })
      .filter((e) => e.title && e.date)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function formatEpisodeDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
