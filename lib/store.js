import { defaultContent } from './defaultContent';

const KEY = 'doorline_content_v1';
const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function storeConfigured() { return !!(url() && token()); }

export async function getContent(opts = {}) {
  if (!storeConfigured()) return defaultContent;
  try {
    const r = await fetch(`${url()}/get/${KEY}`, { headers: { Authorization: `Bearer ${token()}` }, ...(opts.fresh ? { cache: 'no-store' } : { next: { revalidate: 300, tags: ['content'] } }) });
    const j = await r.json();
    if (!j.result) return defaultContent;
    const saved = typeof j.result === 'string' ? JSON.parse(j.result) : j.result;
    const merged = { ...defaultContent, ...saved, site: { ...defaultContent.site, ...saved.site }, hero: { ...defaultContent.hero, ...saved.hero }, about: { ...defaultContent.about, ...saved.about } };
    // New default guides and services reach the website even after the admin has saved content before.
    // Items you delete in the admin stay deleted.
    const removed = new Set(saved.deleted || []);
    for (const key of ['guides', 'services']) {
      const have = new Set((merged[key] || []).map((x) => x.slug));
      const extra = (defaultContent[key] || []).filter((x) => !have.has(x.slug) && !removed.has(x.slug));
      merged[key] = [...(merged[key] || []), ...extra];
    }
    return merged;
  } catch (e) {
    return defaultContent;
  }
}

export async function saveContent(content) {
  if (!storeConfigured()) throw new Error('Storage is not connected. Connect Upstash Redis (KV) in Vercel > Storage.');
  const r = await fetch(`${url()}/set/${KEY}`, { method: 'POST', headers: { Authorization: `Bearer ${token()}` }, body: JSON.stringify(content) });
  if (!r.ok) throw new Error('Save failed');
}
