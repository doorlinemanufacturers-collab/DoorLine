import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getContent } from '@/lib/store';

export default async function SiteLayout({ children }) {
  const { site, products, services } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return (<><Header site={site} categories={categories} services={services} /><main>{children}</main><Footer site={site} /><WhatsAppFloat site={site} /></>);
}
