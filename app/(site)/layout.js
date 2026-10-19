import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getContent } from '@/lib/store';

export default async function SiteLayout({ children }) {
  const { site } = await getContent();
  return (<><Header site={site} /><main>{children}</main><Footer site={site} /><WhatsAppFloat site={site} /></>);
}
