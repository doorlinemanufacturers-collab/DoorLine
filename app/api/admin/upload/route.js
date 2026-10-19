import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/auth';

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Vercel Blob connect nahi hai. Storage > Blob create karein.' }, { status: 400 });
  const form = await req.formData();
  const file = form.get('file');
  if (!file || !file.type?.startsWith('image/')) return NextResponse.json({ error: 'Sirf image upload karein' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'Image 4MB se choti ho' }, { status: 400 });
  const blob = await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
