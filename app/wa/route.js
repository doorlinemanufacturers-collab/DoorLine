import { NextResponse } from 'next/server';

// WhatsApp links go through this internal redirect (disallowed in robots.txt),
// so SEO crawlers do not report wa.me as a broken external link on every page.
export async function GET(req) {
  const u = new URL(req.url);
  const n = (u.searchParams.get('n') || '').replace(/\D/g, '').slice(0, 15);
  const text = (u.searchParams.get('text') || '').slice(0, 600);
  if (!n) return NextResponse.redirect(new URL('/contact', req.url), 307);
  return NextResponse.redirect(`https://wa.me/${n}?text=${encodeURIComponent(text)}`, 307);
}
