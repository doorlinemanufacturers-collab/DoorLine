import { Poppins } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/store';
import { siteUrl } from '@/lib/site';

const font = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Top Aluminium Handles Manufacturers Lahore - Direct Factory Rates | DoorLine', template: '%s | DoorLine Manufacturers Lahore' },
  description: 'Top aluminium handles manufacturer in Lahore. Cheap wholesale price, no middleman, direct factory rates and premium quality door and cabinet handles, plus anodizing and electroplating. Delivery all over Pakistan.',
  keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore', 'aluminium anodizing in Lahore', 'electroplating in Lahore', 'top aluminium handles manufacturers in Lahore', 'best aluminium handles manufacturer Lahore', 'cheap aluminium door handles price Pakistan', 'direct factory rates aluminium handles', 'no middleman aluminium handles', 'premium quality aluminium handles', 'cheap anodizing price Lahore', 'premium quality anodizing Lahore', 'aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan', 'aluminium window handle wholesale Pakistan', 'sliding window lock supplier Lahore', 'aluminium glass door handle Pakistan', 'aluminium fabrication hardware Lahore', 'anodising service Lahore', 'colour anodizing Pakistan', 'electro plating Lahore', 'electroplating companies in Pakistan'],
  openGraph: { type: 'website', siteName: 'DoorLine Manufacturers', locale: 'en_PK', images: ['/images/logo.png'] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }) {
  const { site, products } = await getContent();
  const ld = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${siteUrl()}/#business`,
    name: site.name,
    description: 'Manufacturer of aluminium door handles, cabinet handles, window locks and hinges in Lahore, Pakistan, offering aluminium anodizing and electroplating services. Wholesale supply.',
    additionalType: 'https://schema.org/Manufacturer',
    url: siteUrl(),
    image: `${siteUrl()}${(products[0] && products[0].image) || '/images/fluted-bar-handle-white-gold.jpg'}`,
    telephone: '+92' + site.phone.replace(/\D/g, '').replace(/^0/, ''),
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', name: site.owner, telephone: '+' + String(site.whatsapp || '') },
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
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
        {children}
      </body>
    </html>
  );
}
