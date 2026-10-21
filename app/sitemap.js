import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

export default async function sitemap() {
  const { products, services } = await getContent();
  const base = siteUrl();
  const pages = ['', '/products', '/services', '/delivery-across-pakistan', '/about', '/faq', '/contact'].map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.9 }));
  return [...pages, ...services.map((x) => ({ url: `${base}/services/${x.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })), ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }))];
}
