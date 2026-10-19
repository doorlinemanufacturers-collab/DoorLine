import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/auth';

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Vercel Blob is not connected. Create a Blob store in Vercel > Storage.' }, { status: 400 });
  const form = await req.formData();
  const file = form.get('file');
  if (!file || !file.type?.startsWith('image/')) return NextResponse.json({ error: 'Please upload an image file' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'Image must be smaller than 4MB' }, { status: 400 });
  const blob = await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
