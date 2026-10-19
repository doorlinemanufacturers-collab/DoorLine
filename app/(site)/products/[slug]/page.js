import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function find(slug) {
  const c = await getContent();
  return { c, p: c.products.find((x) => x.slug === slug) };
}

export async function generateMetadata({ params }) {
  const { p } = await find(params.slug);
  if (!p) return { title: 'Product not found' };
  const title = `${p.name} ${p.model} - Wholesale Manufacturer Lahore`;
  const description = `${p.name} ${p.model} (${p.size}) factory price in Lahore. ${p.desc} Bulk supply all over Pakistan.`.slice(0, 300);
  return {
    title, description,
    keywords: [`${p.name} Lahore`, `${p.name} wholesale Pakistan`, 'aluminium handles manufacturer in Lahore'],
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title, description, url: `/products/${p.slug}`, images: [p.image] },
  };
}

export default async function ProductPage({ params }) {
  const { c, p } = await find(params.slug);
  if (!p) notFound();
  const related = c.products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 4);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: `${p.name} ${p.model}`, sku: p.model, description: p.desc,
    image: p.image.startsWith('http') ? p.image : `${siteUrl()}${p.image}`, category: p.category,
    brand: { '@type': 'Brand', name: c.site.name }, manufacturer: { '@type': 'Organization', name: c.site.name },
  };
  return (
    <section className="section">
      <div className="container">
        <p className="crumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / {p.model}</p>
        <div className="pgrid">
          <ProductImage src={p.image} alt={p.alt} priority sizes="(max-width: 900px) 100vw, 50vw" />
          <div>
            <h1 className="h1s">{p.name} {p.model}</h1>
            <p className="pre">{p.desc}</p>
            <table className="spec"><tbody>
              <tr><th>Model</th><td>{p.model}</td></tr>
              <tr><th>Category</th><td>{p.category}</td></tr>
              <tr><th>Size</th><td>{p.size}</td></tr>
              <tr><th>Finish</th><td>{p.finish}</td></tr>
              <tr><th>Colours</th><td>{p.colors}</td></tr>
              <tr><th>Price</th><td>Wholesale rate - call / WhatsApp</td></tr>
            </tbody></table>
            <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need the wholesale price of ${p.name} ${p.model}`)} target="_blank" rel="noopener noreferrer">Ask Wholesale Price on WhatsApp</a>
          </div>
        </div>
        {related.length > 0 && (<><h2 style={{ marginTop: 48 }}>Related Products</h2><div className="grid">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></>)}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
