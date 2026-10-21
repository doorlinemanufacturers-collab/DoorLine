import Link from 'next/link';
import ProductImage from './ProductImage';
import { productAlt } from '@/lib/seo';

export default function ProductCard({ p }) {
  return (
    <article className="card">
      <Link href={`/products/${p.slug}`}>
        <ProductImage src={p.image} alt={productAlt(p)} />
        <div className="cardbody">
          <span className="cat">{p.category}</span>
          <h3>{p.name} {p.model}</h3>
          <p className="muted">{p.colors}</p>
          <span className="link">View details →</span>
        </div>
      </Link>
    </article>
  );
}
