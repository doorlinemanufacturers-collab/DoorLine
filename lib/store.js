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
    return { ...defaultContent, ...saved, site: { ...defaultContent.site, ...saved.site }, hero: { ...defaultContent.hero, ...saved.hero }, about: { ...defaultContent.about, ...saved.about } };
  } catch (e) {
    return defaultContent;
  }
}

export async function saveContent(content) {
  if (!storeConfigured()) throw new Error('Storage is not connected. Connect Upstash Redis (KV) in Vercel > Storage.');
  const r = await fetch(`${url()}/set/${KEY}`, { method: 'POST', headers: { Authorization: `Bearer ${token()}` }, body: JSON.stringify(content) });
  if (!r.ok) throw new Error('Save failed');
}
