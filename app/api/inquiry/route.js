import { NextResponse } from 'next/server';
import { addLead, redisReady } from '@/lib/redis';

export async function POST(req) {
  try {
    const b = await req.json();
    if (b.website) return NextResponse.json({ ok: true }); // honeypot
    const clean = (v, n) => String(v || '').replace(/[<>]/g, '').trim().slice(0, n);
    const lead = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: clean(b.name, 80), shop: clean(b.shop, 100), city: clean(b.city, 60), phone: clean(b.phone, 30), msg: clean(b.msg, 1000), source: clean(b.source, 40), date: new Date().toISOString() };
    if (!lead.name || !lead.phone) return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    if (redisReady()) await addLead(lead);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
