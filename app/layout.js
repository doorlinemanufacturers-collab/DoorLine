import { Poppins } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

const font = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'DoorLine Manufacturers - Aluminium Handles Manufacturer Lahore', template: '%s | DoorLine Manufacturers Lahore' },
  description: 'Direct factory of aluminium door handles, cabinet handles, window locks and hinges in Lahore, plus anodizing and electroplating services. Wholesale rates and bulk delivery all over Pakistan.',
  keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore', 'aluminium anodizing in Lahore', 'electroplating in Lahore'],
  openGraph: { type: 'website', siteName: 'DoorLine Manufacturers', locale: 'en_PK', images: ['/images/fluted-bar-handle-white-gold.jpg'] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }) {
  const { site, products } = await getContent();
  const ld = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${siteUrl()}/#business`,
    name: site.name,
    description: 'Manufacturer of aluminium door handles, cabinet handles, window locks and hinges in Lahore, Pakistan. Wholesale supply.',
    additionalType: 'https://schema.org/Manufacturer',
    url: siteUrl(),
    image: `${siteUrl()}${(products[0] && products[0].image) || '/images/fluted-bar-handle-white-gold.jpg'}`,
    telephone: '+92' + site.phone.replace(/\D/g, '').replace(/^0/, ''),
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', name: site.owner, telephone: '+' + String(site.whatsapp || '') },
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
    knowsAbout: ['Aluminium door handles', 'Cabinet handles', 'Window locks', 'Aluminium hinges', 'Aluminium anodizing', 'Electroplating'],
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' }],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
