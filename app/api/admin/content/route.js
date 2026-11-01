import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { getContent, saveContent, storeConfigured } from '@/lib/store';
import { pingIndexNow } from '@/lib/indexnow';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ content: await getContent({ fresh: true }), storage: storeConfigured() });
}
export async function PUT(req) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const { content } = await req.json();
    if (!content || !Array.isArray(content.products)) throw new Error('Invalid data');
    content.updatedAt = new Date().toISOString();
    await saveContent(content);
    revalidateTag('content');
    revalidatePath('/', 'layout');
    await pingIndexNow([ '/', '/aluminum-handles', ...content.products.map((p) => `/products/${p.slug}`).filter((u) => u !== '/products/') ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
