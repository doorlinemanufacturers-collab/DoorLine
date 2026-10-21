import Link from 'next/link';
import { getContent } from '@/lib/store';
import { searchProducts } from '@/lib/seo';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';


export async function generateMetadata({ searchParams }) {
  const cat = searchParams?.category;
  const q = searchParams?.q;
  const title = cat ? `${cat} Wholesale - Aluminium Handles Manufacturer Lahore` : 'Aluminium Door & Cabinet Handles Wholesale - Products';
  return {
    title,
    description: `Browse ${cat || 'aluminium door handles, cabinet handles, window locks and hinges'} from DoorLine Manufacturers, Lahore. Factory price for bulk buyers across Pakistan. Cheap wholesale price, no middleman, premium quality. Anodizing and electroplating available.`,
    alternates: { canonical: cat ? `/products?category=${encodeURIComponent(cat)}` : '/products' },
    robots: q ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductsPage({ searchParams }) {
  const { products } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const cat = searchParams?.category;
  const q = (searchParams?.q || '').toString();
  let list = cat ? products.filter((p) => p.category === cat) : products;
  if (q) list = searchProducts(list, q);
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">{q ? `Search results for "${q}"` : cat ? `${cat} - Wholesale Aluminium Handles` : 'Aluminium Door & Cabinet Handles - All Products'}</h1>
        <p className="lead">Direct from our factory in Lahore. Anodized and electroplated finishes available. Contact us for wholesale rates.</p>
        <form className="search" action="/products" method="get">
          <input name="q" defaultValue={q} placeholder="Search products, e.g. cabinet handle, window lock, hinge" aria-label="Search products" />
          <button className="btn" type="submit">Search</button>
        </form>
        <div className="chips">
          <Link href="/products" className={`chip ${!cat ? 'on' : ''}`}>All</Link>
          {categories.map((c) => <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} className={`chip ${cat === c ? 'on' : ''}`}>{c}</Link>)}
        </div>
        <div className="grid">{list.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><ProductCard p={p} /></Reveal>)}</div>
        {list.length === 0 && <p>No matching products. Try another word or <Link className="link" href="/contact">contact us</Link> for custom requirements.</p>}
      </div>
    </section>
  );
}
