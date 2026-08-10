import { NextResponse } from 'next/server';
import { getEpisodes } from '@/lib/podcast';

export const runtime = 'nodejs';

/**
 * Server-side podcast feed.
 *
 * /podcast previously fetched the RSS in the browser through
 * api.allorigins.win, a third-party CORS proxy — an uptime dependency on
 * someone else's free service for the site's own content. Fetching here
 * removes the proxy and the CORS problem entirely.
 *
 * On failure this returns an empty list. Callers must render an honest empty
 * state; the page used to fall back to three invented episodes with made-up
 * titles, durations and dates, which is what made the section look populated
 * when it had no data at all.
 */
export async function GET() {
  const episodes = await getEpisodes(12);
  return NextResponse.json(
    { episodes },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
  );
}
