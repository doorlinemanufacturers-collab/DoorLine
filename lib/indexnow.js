import { siteUrl } from './site';

// IndexNow tells Bing, Yandex and other supporting search engines about new or changed pages.
// (Google does not support IndexNow. Use Search Console > URL Inspection > Request Indexing for Google.)
export const INDEXNOW_KEY = 'b7c1d2e3f4a5968778695a4b3c2d1e0f';

export async function pingIndexNow(paths) {
  try {
    const base = siteUrl();
    const host = new URL(base).host;
    if (host.includes('localhost')) return;
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${base}/${INDEXNOW_KEY}.txt`, urlList: paths.map((p) => base + p).slice(0, 100) }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) { /* best effort only */ }
}
