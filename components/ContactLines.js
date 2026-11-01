import { waLink } from '@/lib/site';

export default function ContactLines({ site }) {
  return (
    <>
      <strong>{site.name}</strong><br />
      Contact Person: {site.owner}<br />
      {site.address}<br />
      Call: <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a><br />
      WhatsApp: <a href={waLink(site.whatsapp, 'Assalam o Alaikum, Hello, I need wholesale rates.')} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay || site.whatsapp}</a><br />
      Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />
      {site.hours}
    </>
  );
}
