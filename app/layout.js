import { Poppins } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Aluminum Handles, Hinges & Locks - Wholesaler & Manufacturer in Pakistan and Lahore | Doorline', template: '%s | DoorLine' },
  description: 'Professional aluminium handles manufacturer in Lahore. Cheap wholesale price, no middleman, direct factory rates and premium quality door and cabinet handles, plus anodizing and electroplating. Delivery all over Pakistan.',
  keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore', 'aluminium anodizing in Lahore', 'electroplating in Lahore', 'top aluminium handles manufacturers in Lahore', 'best aluminium handles manufacturer Lahore', 'cheap aluminium door handles price Pakistan', 'direct factory rates aluminium handles', 'no middleman aluminium handles', 'premium quality aluminium handles', 'cheap anodizing price Lahore', 'premium quality anodizing Lahore', 'aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan', 'aluminium window handle wholesale Pakistan', 'sliding window lock supplier Lahore', 'aluminium glass door handle Pakistan', 'aluminium fabrication hardware Lahore', 'anodising service Lahore', 'colour anodizing Pakistan', 'electro plating Lahore', 'electroplating companies in Pakistan', 'aluminum handles manufacturer in Lahore', 'aluminum handels manufacturer in Lahore', 'steel aluminum handles manufacturer in Lahore', 'anodizing services in Lahore', 'anodizing Lahore', 'aluminum handles manufacturer in Karachi', 'aluminum handles manufacturer in Islamabad', 'aluminum handles manufacturer in Pakistan'],
  openGraph: { type: 'website', siteName: 'DoorLine Manufacturers', locale: 'en_PK', images: ['/images/logo.png'] },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
};

export default async function RootLayout({ children }) {
  const { site, products } = await getContent();
  const sameAs = [site.facebook, site.instagram, site.youtube, site.googleBusiness].filter(Boolean);
  const ld = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${siteUrl()}/#business`,
    alternateName: ['DoorLine', 'Door Line Manufacturers', 'DoorLine Aluminium Handles Lahore'],
    name: site.name,
    description: 'Wholesaler and manufacturer of aluminium door handles, cabinet handles, window locks and hinges in Lahore, Pakistan, offering aluminium anodizing and electroplating services. Wholesale supply.',
    additionalType: 'https://schema.org/Manufacturer',
    url: siteUrl(),
    logo: `${siteUrl()}/images/logo.png`,
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}`,
    image: `${siteUrl()}${(products[0] && products[0].image) || '/images/fluted-bar-handle-white-gold.jpg'}`,
    telephone: '+92' + site.phone.replace(/\D/g, '').replace(/^0/, ''),
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', name: site.owner, telephone: '+' + String(site.whatsapp || '') },
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
    ...(sameAs.length ? { sameAs } : {}),
    slogan: 'Direct factory rates. No middleman. Premium quality.',
    knowsAbout: ['Aluminium door handles', 'Cabinet handles', 'Window locks', 'Aluminium hinges', 'Aluminium anodizing', 'Electroplating'],
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' }],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl()}/#website`, url: siteUrl(), name: site.name, alternateName: ['DoorLine', 'Door Line Manufacturers'], inLanguage: 'en' }) }} />
        {children}
      </body>
    </html>
  );
}
