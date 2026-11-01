const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisReady = () => !!(url() && token());

export async function redisCmd(args) {
  const r = await fetch(url(), { method: 'POST', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args), cache: 'no-store' });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

const LEADS = 'doorline_leads_v1';
export async function addLead(lead) {
  await redisCmd(['LPUSH', LEADS, JSON.stringify(lead)]);
  await redisCmd(['LTRIM', LEADS, 0, 499]);
}
export async function listLeads() {
  const rows = await redisCmd(['LRANGE', LEADS, 0, 199]);
  return (rows || []).map((raw) => { try { return { ...JSON.parse(raw), _raw: raw }; } catch { return null; } }).filter(Boolean);
}
export async function removeLead(raw) { await redisCmd(['LREM', LEADS, 1, raw]); }
