import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { productSeo, productAlt } from '@/lib/seo';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';


async function find(slug) {
  const c = await getContent();
  return { c, p: c.products.find((x) => x.slug === slug) };
}

export async function generateMetadata({ params }) {
  const { c, p } = await find(params.slug);
  if (!p) return { title: 'Product not found' };
  const seo = productSeo(p, c.site);
  return {
    title: seo.title, description: seo.description, keywords: seo.keywords,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: seo.title, description: seo.description, url: `/products/${p.slug}`, images: [p.image] },
  };
}

export default async function ProductPage({ params }) {
  const { c, p } = await find(params.slug);
  if (!p) notFound();
  const seo = productSeo(p, c.site);
  const base = siteUrl();
  const img = p.image.startsWith('http') ? p.image : `${base}${p.image}`;
  const same = c.products.filter((x) => x.slug !== p.slug && x.category === p.category);
  const related = [...same, ...c.products.filter((x) => x.slug !== p.slug && x.category !== p.category)].slice(0, 4);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Product', '@id': `${base}/products/${p.slug}#product`, url: `${base}/products/${p.slug}`, name: `${p.name} ${p.model}`, sku: p.model, mpn: p.model, description: seo.intro, image: [img], category: p.category, material: 'Aluminium', color: p.colors, size: p.size, keywords: seo.keywords.join(', '), brand: { '@type': 'Brand', name: c.site.name }, manufacturer: { '@type': 'Organization', name: c.site.name, url: base },
      ...(p.price && /\d/.test(String(p.price)) ? { offers: { '@type': 'Offer', priceCurrency: 'PKR', price: String(p.price).replace(/[^0-9.]/g, ''), availability: 'https://schema.org/InStock', url: `${base}/products/${p.slug}`, seller: { '@type': 'Organization', name: c.site.name } } } : {}) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${base}/products` },
      { '@type': 'ListItem', position: 3, name: `${p.name} ${p.model}`, item: `${base}/products/${p.slug}` } ] },
  ];
  return (
    <section className="section">
      <div className="container">
        <p className="crumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href={`/products?category=${encodeURIComponent(p.category)}`}>{p.category}</Link> / {p.model}</p>
        <div className="pgrid">
          <Reveal><ProductImage src={p.image} alt={productAlt(p)} priority sizes="(max-width: 900px) 100vw, 50vw" /></Reveal>
          <Reveal delay={120}>
            <h1 className="h1s">{p.name} {p.model}</h1>
            <Badges items={c.badges} />
            <p className="pre">{seo.intro}</p>
            {seo.options.length > 0 && (<><h2 style={{ fontSize: '1.1rem' }}>Available Colours and Sizes</h2><ul className="ticks">{seo.options.map((o) => <li key={o}>{o} - Lahore</li>)}</ul></>)}
            <table className="spec"><tbody>
              <tr><th>Model</th><td>{p.model}</td></tr>
              <tr><th>Category</th><td>{p.category}</td></tr>
              <tr><th>Size</th><td>{p.size}</td></tr>
              <tr><th>Finish</th><td>{p.finish}</td></tr>
              <tr><th>Colours</th><td>{p.colors}</td></tr>
              <tr><th>Material</th><td>Aluminium</td></tr>
              <tr><th>Price</th><td>{p.price ? `Rs ${p.price}` : 'Wholesale rate - call or WhatsApp'}</td></tr>
            </tbody></table>
            <div className="row">
              <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need the wholesale price of ${p.name} ${p.model}`)} target="_blank" rel="noopener noreferrer">Ask Wholesale Price on WhatsApp</a>
              <a className="btn btn-outline" href={`tel:${c.site.phone.replace(/\s/g, '')}`}>Call {c.site.phone}</a>
            </div>
          </Reveal>
        </div>

        <Reveal className="narrow-block">
          <h2 style={{ marginTop: 44 }}>Popular Searches</h2>
          <div className="chips">{seo.variants.map((v) => <Link key={v} href={`/products?q=${encodeURIComponent(v)}`} className="chip">{v}</Link>)}</div>
          <p className="muted">Need a finish on your own aluminium parts? See our <Link className="link" href="/services/aluminium-anodizing-service-lahore">anodizing</Link> and <Link className="link" href="/services/aluminium-electroplating-service-lahore">electroplating</Link> services.</p>
        </Reveal>

        <div className="narrow" style={{ marginTop: 36 }}>
          <h2>{p.name} - Frequently Asked Questions</h2>
          <FAQ faqs={seo.faqs} />
        </div>

        <h2 style={{ marginTop: 48 }}>Related Products</h2>
        <div className="grid">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
