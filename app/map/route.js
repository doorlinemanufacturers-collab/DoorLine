import { NextResponse } from 'next/server';
import { getContent } from '@/lib/store';

// Google Maps link for the factory, via an internal redirect (disallowed in robots.txt).
export async function GET() {
  const { site } = await getContent();
  const q = site.mapQuery || site.address;
  return NextResponse.redirect(site.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, 307);
}
