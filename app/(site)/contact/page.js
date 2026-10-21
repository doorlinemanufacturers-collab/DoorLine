import { getContent } from '@/lib/store';
import CatalogueForm from '@/components/CatalogueForm';
import ContactCards from '@/components/ContactCards';

export const metadata = {
  title: 'Contact Us - Professional Aluminium Handles Manufacturer Lahore',
  description: 'Contact DoorLine Manufacturers, a professional aluminium handles manufacturer in Lahore, for wholesale handles, locks, hinges, anodizing and electroplating. Call or WhatsApp for rates.',
  alternates: { canonical: '/contact' },
};

export default async function Contact() {
  const { site } = await getContent();
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&output=embed`;
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Contact DoorLine Manufacturers</h1>
        <p className="lead">Professional aluminium handles manufacturer in Lahore. Call, WhatsApp or send an inquiry about wholesale handles, anodizing or electroplating. We reply with the latest rates.</p>
        <ContactCards site={site} />
        <div className="contactgrid" style={{ marginTop: 36 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem' }}>Send an Inquiry</h2>
            <p className="muted" style={{ marginBottom: 12 }}>Your inquiry reaches us instantly and also opens on WhatsApp.</p>
            <CatalogueForm whatsapp={site.whatsapp} button="Send Inquiry" title="Wholesale Inquiry" source="contact" />
          </div>
          <iframe title={`${site.name} factory location Lahore`} src={map} loading="lazy" className="map" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
