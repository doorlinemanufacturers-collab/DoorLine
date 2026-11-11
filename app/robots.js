import { siteUrl } from '@/lib/site';

// Search engines and AI answer engines are welcome. Admin and API stay private.
const BOTS = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/wa', '/map'] },
      ...BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/admin', '/api/', '/wa', '/map'] })),
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
