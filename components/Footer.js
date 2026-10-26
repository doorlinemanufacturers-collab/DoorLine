import Link from 'next/link';
import ContactLines from './ContactLines';

export default function Footer({ site }) {
  const social = [['Facebook', site.facebook], ['Instagram', site.instagram], ['YouTube', site.youtube], ['Google Business', site.googleBusiness]].filter(([, u]) => u);
  return (
    <footer className="footer">
      <div className="container footgrid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.tagline}</p>
          <p className="muted" style={{ color: '#aaa' }}>Professional aluminium handles manufacturer in Lahore. Direct factory rates, no middleman, premium quality, plus anodizing and electroplating.</p>
          <p className="footlinks">
            <Link href="/">Home</Link> · <Link href="/aluminum-handles">Aluminum Handles</Link> · <Link href="/services/aluminium-anodizing-service-lahore">Anodizing</Link> · <Link href="/services/aluminium-electroplating-service-lahore">Electroplating</Link> · <Link href="/delivery-across-pakistan">Delivery</Link> · <Link href="/about">About</Link> · <Link href="/faq">FAQ</Link> · <Link href="/contact">Contact Us</Link> · <Link href="/guides">Guides</Link> · <Link href="/privacy-policy">Privacy</Link> · <Link href="/terms">Terms</Link>
          </p>
          {social.length > 0 && <p className="footlinks">{social.map(([n, u], i) => <span key={n}>{i > 0 && ' · '}<a href={u} target="_blank" rel="noopener noreferrer">{n}</a></span>)}</p>}
        </div>
        <address><ContactLines site={site} /></address>
      </div>
      <div className="container footmapwrap">
        <iframe title={`${site.name} factory location, Lahore, Pakistan`} src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&output=embed`} loading="lazy" className="footmap" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <div className="copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
