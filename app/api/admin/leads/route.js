import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { listLeads, removeLead, redisReady } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!redisReady()) return NextResponse.json({ leads: [], error: 'Storage is not connected' });
  return NextResponse.json({ leads: await listLeads() });
}
export async function DELETE(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { raw } = await req.json();
  if (raw) await removeLead(raw);
  return NextResponse.json({ ok: true });
}
