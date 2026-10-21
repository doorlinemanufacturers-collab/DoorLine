import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/auth';
import { redisCmd, redisReady } from '@/lib/redis';

// Vercel can name the token with a custom prefix, e.g. MYSTORE_READ_WRITE_TOKEN
function blobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const hit = Object.entries(process.env).find(([k, v]) => k.endsWith('READ_WRITE_TOKEN') && v);
  return hit ? hit[1] : '';
}

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !file.type?.startsWith('image/')) return NextResponse.json({ error: 'Please upload an image file' }, { status: 400 });
    if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'Image must be smaller than 4MB' }, { status: 400 });

    const token = blobToken();
    if (token) {
      // Blob is connected: images are stored in Vercel Blob only.
      try {
        const blob = await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`, file, { access: 'public', token });
        return NextResponse.json({ url: blob.url, storage: 'blob' });
      } catch (e) {
        return NextResponse.json({ error: `Blob upload failed: ${e.message}. Make sure the Blob store is Public and connected to this project, then Redeploy.` }, { status: 500 });
      }
    }
    // Backup only when no Blob token exists at all
    if (redisReady()) {
      if (file.size > 650 * 1024) return NextResponse.json({ error: 'Image is too large. Please choose a smaller image.' }, { status: 400 });
      const buf = Buffer.from(await file.arrayBuffer());
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      await redisCmd(['SET', `doorline_img_${id}`, JSON.stringify({ t: file.type, b: buf.toString('base64') })]);
      return NextResponse.json({ url: `/api/img/${id}`, storage: 'redis' });
    }
    return NextResponse.json({ error: 'Storage is not connected. Connect Upstash Redis or Vercel Blob to this project in Vercel > Storage, then Redeploy.' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: `Upload failed: ${e.message}` }, { status: 500 });
  }
}
