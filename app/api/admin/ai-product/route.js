import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

export const maxDuration = 30;

const SYSTEM = `You write product copy for DoorLine Manufacturers, a wholesaler and manufacturer of aluminium handles, hinges and window locks in Lahore, Pakistan.
Write clear, simple English.
Use ONLY the facts given in the input. Never invent sizes, weights, thickness, certifications, prices, years in business or customer numbers. If a detail is missing, leave it out.
Reply with one JSON object and nothing else, with these keys:
"desc": 2 to 3 sentences, 40 to 60 words, describing the product and where it is used.
"useCase": a short phrase such as "aluminum doors and windows".
"specs": an array of strings in the form "Name: Value", built only from the given facts (material is aluminium).
"keywords": an array of 8 to 12 long-tail search phrases that include the product type and words like Lahore, Pakistan, wholesale, manufacturer.`;

const clip = (v, n) => String(v || '').replace(/\s+/g, ' ').trim().slice(0, n);

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: 'AI key missing. In Vercel add the environment variable ANTHROPIC_API_KEY, then Redeploy.' }, { status: 400 });
  try {
    const b = await req.json();
    const input = { name: clip(b.name, 120), category: clip(b.category, 60), colours: clip(b.colors, 120), size: clip(b.size, 100), finish: clip(b.finish, 100), notes: clip(b.notes, 800) };
    if (!input.name) return NextResponse.json({ error: 'Please enter the product name first.' }, { status: 400 });
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 800, system: SYSTEM, messages: [{ role: 'user', content: JSON.stringify(input) }] }),
    });
    const j = await r.json();
    if (!r.ok) return NextResponse.json({ error: `AI error: ${(j.error && j.error.message) || r.status}` }, { status: 502 });
    const text = (j.content || []).map((x) => x.text || '').join('');
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return NextResponse.json({ error: 'AI reply was not readable. Please try again.' }, { status: 502 });
    const d = JSON.parse(m[0]);
    const draft = {
      desc: clip(d.desc, 420),
      useCase: clip(d.useCase, 80),
      specs: (Array.isArray(d.specs) ? d.specs : []).map((x) => clip(x, 120)).filter((x) => x.includes(':')).slice(0, 8),
      keywords: (Array.isArray(d.keywords) ? d.keywords : []).map((x) => clip(x, 80)).filter(Boolean).slice(0, 12),
    };
    return NextResponse.json({ draft });
  } catch (e) {
    return NextResponse.json({ error: `AI request failed: ${e.message}` }, { status: 500 });
  }
}
