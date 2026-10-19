import { NextResponse } from 'next/server';
import { checkLogin, makeToken } from '@/lib/auth';

export async function POST(req) {
  const { username, password } = await req.json().catch(() => ({}));
  if (!checkLogin(username || '', password || '')) return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('dl_admin', makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 43200 });
  return res;
}
