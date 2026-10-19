import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

export default async function sitemap() {
  const { products } = await getContent();
  const base = siteUrl();
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })),
  ];
}
