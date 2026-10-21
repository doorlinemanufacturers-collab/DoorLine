import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { getContent, saveContent, storeConfigured } from '@/lib/store';

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
    await saveContent(content);
    revalidateTag('content');
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
