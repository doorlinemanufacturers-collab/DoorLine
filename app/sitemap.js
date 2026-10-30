import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

export default async function sitemap() {
  const { products, services, cities, guides } = await getContent();
  const base = siteUrl();
  const pages = ['', '/aluminum-handles', '/aluminum-hardware', '/services', '/guides', '/delivery-across-pakistan', '/about', '/faq', '/contact', '/privacy-policy', '/terms'].map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.9 }));
  const cityUrls = ['Pakistan', 'Lahore', ...cities.map((x) => x.trim()).filter((x) => x && x !== 'Lahore')].map((c) => ({ url: `${base}/aluminium-handles-manufacturer/${c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 }));
  const slug = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const catUrls = [...new Set(products.map((p) => p.category).filter(Boolean))].map((c) => ({ url: `${base}/collections/aluminum-${slug(c)}-lahore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 }));
  const guideUrls = guides.map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 }));
  return [...pages, ...catUrls, ...guideUrls, ...cityUrls, ...services.map((x) => ({ url: `${base}/services/${x.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })), ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }))];
}
