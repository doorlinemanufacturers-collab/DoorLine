import Link from 'next/link';
import ProductImage from './ProductImage';

export default function ServiceCard({ s }) {
  return (
    <article className="card svc">
      <Link href={`/services/${s.slug}`}>
        <ProductImage src={s.image} alt={`${s.title} - DoorLine Manufacturers Lahore`} />
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
