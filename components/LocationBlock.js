import Link from 'next/link';
import ContactLines from './ContactLines';

export default function LocationBlock({ site, heading = 'Our Factory Location in Lahore, Pakistan' }) {
  const q = site.mapQuery || site.address;
  const maps = site.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  return (
    <section className="section">
      <div className="container contactgrid">
        <div>
          <h2>{heading}</h2>
          <p className="muted">Visit our aluminium handles factory and anodizing unit in Lahore, Pakistan. Message us on WhatsApp first so we can confirm your models.</p>
          <address><ContactLines site={site} /></address>
          <p className="row"><a className="btn" href={maps} target="_blank" rel="noopener noreferrer">Get Directions on Google Maps</a><Link className="btn btn-outline" href="/contact">Contact Us</Link></p>
        </div>
        <div>
          <iframe title={`${site.name} factory location on Google Maps, Lahore, Pakistan`} src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`} loading="lazy" className="map" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
