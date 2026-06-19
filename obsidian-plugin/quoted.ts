import { QuotedTweet } from './types';

// Shape of X's public syndication response (cdn.syndication.twimg.com) — only the fields we read
// for video-poster recovery and quoted-tweet folding.
export interface SyndicationMedia { type?: string; media_url_https?: string; }
interface SyndicationEntityUrl { url?: string; expanded_url?: string; }
interface SyndicationEntities { urls?: SyndicationEntityUrl[]; media?: { url?: string }[]; }
interface SyndicationUser { name?: string; screen_name?: string; }
export interface SyndicationQuotedTweet {
  id_str?: string;
  text?: string;
  note_tweet?: { text?: string };
  user?: SyndicationUser;
  photos?: { url?: string }[];
  mediaDetails?: SyndicationMedia[];
  entities?: SyndicationEntities;
}
export interface SyndicationTweet {
  mediaDetails?: SyndicationMedia[];
  quoted_tweet?: SyndicationQuotedTweet;
  article?: { title?: string };
}

// pbs.twimg.com media URL → normalized large JPG, matching the interceptor's parent-photo and
// video-poster paths so every imported image shares one format.
function largeJpg(mediaUrlHttps: string): string {
  return mediaUrlHttps.split('?')[0] + '?format=jpg&name=large';
}

// Expand t.co links to their real destination and strip media (pic.x.com) links from raw tweet
// text. Used for syndication text here, and mirrored inline by the GraphQL interceptor in view.ts —
// X uses the same entity field names in both (urls: {url, expanded_url}; media: {url}), so the logic
// is identical. Raw API text has no prior cleanup, so this is where it gets de-shortened.
export function expandLinks(
  raw: string,
  urls?: { url?: string; expanded_url?: string }[],
  media?: { url?: string }[],
): string {
  let text = raw;
  for (const u of urls ?? []) {
    if (u.url && u.expanded_url) text = text.split(u.url).join(u.expanded_url);
  }
  for (const m of media ?? []) {
    if (m.url) text = text.split(m.url).join('');
  }
  // Backstop for a trailing media link the entity set may omit (e.g. a long note_tweet body).
  text = text.replace(/\s*https?:\/\/t\.co\/\w+\s*$/, '');
  return text.trim();
}

// Extract a foldable quoted tweet from a syndication response. Returns undefined when there is no
// quote, or the quote is protected/deleted (no author).
export function parseQuotedTweet(data: SyndicationTweet | null): QuotedTweet | undefined {
  const q = data?.quoted_tweet;
  const screenName = q?.user?.screen_name;
  if (!q || !screenName) return undefined;

  const rawText = q.note_tweet?.text ?? q.text ?? '';
  const quoted: QuotedTweet = {
    name: q.user?.name || screenName,
    username: '@' + screenName,
    text: expandLinks(rawText, q.entities?.urls, q.entities?.media),
    url: `https://x.com/${screenName}/status/${q.id_str ?? ''}`,
  };

  const images: string[] = [];
  for (const p of q.photos ?? []) {
    if (p.url) images.push(largeJpg(p.url));
  }
  if (images.length > 0) quoted.images = images;

  const videoPosters: string[] = [];
  for (const m of q.mediaDetails ?? []) {
    if ((m.type === 'video' || m.type === 'animated_gif') && m.media_url_https) {
      const poster = largeJpg(m.media_url_https);
      if (!videoPosters.includes(poster)) videoPosters.push(poster);
    }
  }
  if (videoPosters.length > 0) quoted.videoPosters = videoPosters;

  return quoted;
}

// Render the folded quote as a Markdown blockquote under a "## Quoted tweet" heading — matches the
// note's existing "## Linked article" / "## Full article" section style.
export function renderQuotedSection(quoted: QuotedTweet): string {
  const lines: string[] = [`**${quoted.name}** (${quoted.username})`];
  if (quoted.text) lines.push('', quoted.text);
  for (const img of quoted.images ?? []) lines.push('', `![](${img})`);
  (quoted.videoPosters ?? []).forEach((poster, i) => {
    const videoUrl = `${quoted.url}/video/${i + 1}`;
    lines.push('', `[▶ Video](${videoUrl})`, '', `[![](${poster})](${videoUrl})`);
  });
  lines.push('', `[View on X](${quoted.url})`);
  const blockquote = lines
    .join('\n')
    .split('\n')
    .map((line) => (line.length > 0 ? `> ${line}` : '>'))
    .join('\n');
  return `\n\n## Quoted tweet\n\n${blockquote}`;
}
