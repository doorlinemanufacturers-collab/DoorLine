import { waLink } from '@/lib/site';

export default function ContactCards({ site }) {
  const tel = site.phone.replace(/\s/g, '');
  const cards = [
    { icon: '📞', title: 'Call Us', text: site.phone, href: `tel:${tel}`, cta: 'Call now' },
    { icon: '💬', title: 'WhatsApp', text: site.whatsappDisplay || site.whatsapp, href: waLink(site.whatsapp, 'Hello, I need wholesale rates for aluminium handles.'), cta: 'Chat on WhatsApp', ext: true },
    { icon: '✉️', title: 'Email', text: site.email, href: `mailto:${site.email}`, cta: 'Send email' },
    { icon: '📍', title: 'Visit Our Factory', text: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery || site.address)}`, cta: 'Get directions', ext: true },
  ];
  return (
    <>
      <div className="ccards">
        {cards.map((c, i) => (
          <a key={c.title} className="ccard" href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noopener noreferrer' : undefined} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="cicon" aria-hidden="true">{c.icon}</span>
            <strong>{c.title}</strong>
            <span className="ctext">{c.text}</span>
            <span className="link">{c.cta} →</span>
          </a>
        ))}
      </div>
      <p className="chours">🕘 {site.hours} &nbsp;·&nbsp; Contact person: <strong>{site.owner}</strong></p>
    </>
  );
}
