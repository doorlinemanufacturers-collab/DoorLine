import { Poppins } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/store';
import { siteUrl, jsonLd } from '@/lib/site';
import { catSlug } from '@/lib/categories';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Aluminum Handles Manufacturer & Hardware Dealer | Pakistan, Lahore', template: '%s | Doorline' },
  description: 'Aluminum handles manufacturer & hardware dealer in Pakistan, Lahore. Door and cabinet handles, hinges, locks, anodizing and electroplating at factory rates.',
  openGraph: { type: 'website', siteName: 'DoorLine Manufacturers', locale: 'en_PK', images: ['/images/og-default.jpg'] },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image', images: ['/images/og-default.jpg'] },
};

export default async function RootLayout({ children }) {
  const { site, products } = await getContent();
  const sameAs = [site.facebook, site.instagram, site.youtube, site.googleBusiness].filter(Boolean);
  const base = siteUrl();
  const phone = '+92' + String(site.phone || '').replace(/\D/g, '').replace(/^0/, '');
  const wa = '+' + String(site.whatsapp || '').replace(/\D/g, '');
  // Address is stored as one line; split the street part from "Lahore, Punjab, Pakistan".
  const street = String(site.address || '').replace(/,\s*Lahore\b.*$/i, '').trim();
  const categories = [...new Set(products.map((x) => x.category).filter(Boolean))];
  const ld = {
    '@context': 'https://schema.org',
    // WholesaleStore is a LocalBusiness subtype. schema.org has no "Manufacturer" type, so manufacturing is stated in description/knowsAbout.
    '@type': ['WholesaleStore', 'Organization'],
    '@id': `${base}/#business`,
    name: site.name,
    alternateName: ['DoorLine', 'Door Line Manufacturers', 'DoorLine Aluminium Handles Lahore'],
    description: 'Manufacturer and wholesaler of aluminium door handles, cabinet handles, window locks, hinges and hardware in Lahore, Pakistan, with in-house aluminium anodizing and electroplating services. Factory-direct wholesale supply across Pakistan.',
    url: base,
    logo: { '@type': 'ImageObject', url: `${base}/images/logo.png` },
    image: [`${base}${(products[0] && products[0].image) || '/images/fluted-bar-handle-white-gold.jpg'}`, `${base}/images/og-default.jpg`],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery || site.address)}`,
    telephone: phone,
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: street, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
    ...(site.lat && site.lng ? { geo: { '@type': 'GeoCoordinates', latitude: Number(site.lat), longitude: Number(site.lng) } } : {}),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', name: site.owner, telephone: phone, email: site.email, areaServed: 'PK', availableLanguage: ['en', 'ur'] },
      { '@type': 'ContactPoint', contactType: 'customer service', name: 'WhatsApp orders', telephone: wa, areaServed: 'PK', availableLanguage: ['en', 'ur'] },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    slogan: 'Direct factory rates. No middleman. Premium quality.',
    knowsAbout: ['Aluminium door handles', 'Aluminium cabinet handles', 'Window locks', 'Aluminium hinges', 'Aluminium anodizing', 'Electroplating', 'Aluminium hardware wholesale'],
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    ...(categories.length ? { hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Aluminium handles and hardware', itemListElement: categories.map((c) => ({ '@type': 'OfferCatalog', name: `Aluminium ${c}`, url: `${base}/collections/${catSlug(c)}` })) } } : {}),
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' }],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl()}/#website`, url: siteUrl(), name: site.name, alternateName: ['DoorLine', 'Door Line Manufacturers'], inLanguage: 'en' }) }} />
        {children}
      </body>
    </html>
  );
}
