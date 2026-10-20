import Link from 'next/link';
import ProductImage from './ProductImage';

export function ServiceVisual({ s, big = false }) {
  if (s.image) return <ProductImage src={s.image} alt={`${s.title} - DoorLine Manufacturers Lahore`} priority={big} sizes="(max-width: 900px) 100vw, 50vw" />;
  const icon = /anodiz/i.test(s.title) ? '🎨' : /plating/i.test(s.title) ? '✨' : '⚙️';
  return (
    <div className={`svcvisual ${big ? 'big' : ''}`} role="img" aria-label={s.title}>
      <span className="svcicon">{icon}</span>
      <strong>{s.title.replace(' in Lahore', '').replace(' Service', '')}</strong>
    </div>
  );
}

export default function ServiceCard({ s }) {
  return (
    <article className="card svc">
      <Link href={`/services/${s.slug}`}>
        <ServiceVisual s={s} />
        <div className="cardbody">
          <span className="cat">Service</span>
          <h3>{s.title}</h3>
          <p className="muted">{s.short}</p>
          <span className="link">Learn more →</span>
        </div>
      </Link>
    </article>
  );
}
