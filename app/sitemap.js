import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

export default async function sitemap() {
  const { products } = await getContent();
  const base = siteUrl();
  const pages = ['', '/products', '/about', '/faq', '/contact'].map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.9 }));
  return [...pages, ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }))];
}
