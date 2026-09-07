/** Extract the 11-char video id from any common YouTube URL shape. */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const u = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*v=|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = u.match(p);
    if (m) return m[1];
  }
  return null;
}

/** Embeddable iframe src for a YouTube URL, or null if not a YouTube URL. */
export function youtubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

/** True when the url points at YouTube (watch / share / embed / shorts). */
export function isYouTubeUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return extractYouTubeId(url) !== null;
}
