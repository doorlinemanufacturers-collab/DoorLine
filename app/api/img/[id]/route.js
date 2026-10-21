import { redisCmd, redisReady } from '@/lib/redis';

export async function GET(_req, { params }) {
  const id = String(params.id || '').replace(/[^a-zA-Z0-9]/g, '');
  if (!id || !redisReady()) return new Response('Not found', { status: 404 });
  try {
    const raw = await redisCmd(['GET', `doorline_img_${id}`]);
    if (!raw) return new Response('Not found', { status: 404 });
    const { t, b } = JSON.parse(raw);
    return new Response(Buffer.from(b, 'base64'), { headers: { 'Content-Type': t || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch {
    return new Response('Error', { status: 500 });
  }
}
