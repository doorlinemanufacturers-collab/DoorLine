import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/auth';

// Vercel can name the token with a custom prefix, e.g. MYSTORE_READ_WRITE_TOKEN
function blobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const hit = Object.entries(process.env).find(([k, v]) => k.endsWith('READ_WRITE_TOKEN') && v);
  return hit ? hit[1] : '';
}

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const token = blobToken();
  if (!token) return NextResponse.json({ error: 'No Blob token found. In Vercel open Storage, open your Blob store, connect it to this project (Production enabled), then Redeploy.' }, { status: 400 });
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !file.type?.startsWith('image/')) return NextResponse.json({ error: 'Please upload an image file' }, { status: 400 });
    if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'Image must be smaller than 4MB' }, { status: 400 });
    const blob = await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`, file, { access: 'public', token });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: `Upload failed: ${e.message}` }, { status: 500 });
  }
}
