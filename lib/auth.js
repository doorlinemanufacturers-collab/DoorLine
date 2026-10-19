import crypto from 'crypto';
import { cookies } from 'next/headers';

const USER = () => process.env.ADMIN_USER || 'waheed999';
const PASS = () => process.env.ADMIN_PASS || '03454880180AB';
const SECRET = () => process.env.AUTH_SECRET || `doorline-${PASS()}-secret`;
const sign = (p) => crypto.createHmac('sha256', SECRET()).update(p).digest('hex');
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

export function checkLogin(u, p) { return eq(u, USER()) && eq(p, PASS()); }
export function makeToken() {
  const payload = Buffer.from(JSON.stringify({ u: USER(), exp: Date.now() + 1000 * 60 * 60 * 12 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
export function isAdmin() {
  const t = cookies().get('dl_admin')?.value;
  if (!t) return false;
  const [payload, sig] = t.split('.');
  if (!payload || !sig || !eq(sig, sign(payload))) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now(); } catch { return false; }
}
