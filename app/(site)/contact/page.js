import { getContent } from '@/lib/store';
import ContactLines from '@/components/ContactLines';
import CatalogueForm from '@/components/CatalogueForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Us - Aluminium Handles Factory Lahore',
  description: 'Contact DoorLine Manufacturers in Lahore for wholesale aluminium handles, locks and hinges, and for anodizing and electroplating services. Call or WhatsApp for rates.',
  alternates: { canonical: '/contact' },
};

export default async function Contact() {
  const { site } = await getContent();
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&output=embed`;
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Contact Us</h1>
        <p className="lead">Call, WhatsApp or send an inquiry about wholesale handles, anodizing or electroplating. We reply with the latest rates.</p>
        <div className="contactgrid">
          <div>
            <address><ContactLines site={site} /></address>
            <h2 style={{ marginTop: 24, fontSize: '1.2rem' }}>Send an Inquiry</h2>
            <CatalogueForm whatsapp={site.whatsapp} button="Send Inquiry on WhatsApp" title="Wholesale Inquiry" />
          </div>
          <iframe title={`${site.name} factory location Lahore`} src={map} loading="lazy" className="map" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
