import Link from 'next/link';
import { getContent } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const cat = searchParams?.category;
  const title = cat ? `${cat} Wholesale - Aluminium Handles Manufacturer Lahore` : 'Aluminium Door & Cabinet Handles Wholesale - Products';
  return {
    title,
    description: `Browse ${cat || 'aluminium door handles, cabinet handles, window locks and hinges'} from DoorLine Manufacturers, Lahore. Factory price for bulk buyers across Pakistan.`,
    alternates: { canonical: '/products' },
  };
}

export default async function ProductsPage({ searchParams }) {
  const { products } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const cat = searchParams?.category;
  const list = cat ? products.filter((p) => p.category === cat) : products;
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">{cat ? `${cat} - Wholesale Aluminium Handles` : 'Aluminium Door & Cabinet Handles - All Products'}</h1>
        <p className="lead">Direct from our factory in Lahore. Contact us for wholesale rates.</p>
        <div className="chips">
          <Link href="/products" className={`chip ${!cat ? 'on' : ''}`}>All</Link>
          {categories.map((c) => <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} className={`chip ${cat === c ? 'on' : ''}`}>{c}</Link>)}
        </div>
        <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        {list.length === 0 && <p>No products in this category yet.</p>}
      </div>
    </section>
  );
}
