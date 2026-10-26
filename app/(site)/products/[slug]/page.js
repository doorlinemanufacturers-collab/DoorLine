import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { productSeo, productAlt } from '@/lib/seo';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import DoorPreview from '@/components/DoorPreview';
import { catSlug } from '@/lib/categories';

async function find(slug) {
  const c = await getContent();
  const p = c.products.find((x) => x.slug === slug);
  const moved = p ? null : c.products.find((x) => (x.oldSlugs || []).includes(slug));
  return { c, p, moved };
}

export async function generateMetadata({ params }) {
  const { c, p, moved } = await find(params.slug);
  if (!p) return { title: moved ? 'Redirecting' : 'Product not found' };
  const seo = productSeo(p, c.site);
  return {
    title: { absolute: seo.title }, description: seo.description, keywords: seo.keywords,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: seo.title, description: seo.description, url: `/products/${p.slug}`, images: [p.image] },
  };
}

export default async function ProductPage({ params }) {
  const { c, p, moved } = await find(params.slug);
  if (!p && moved) permanentRedirect(`/products/${moved.slug}`);
  if (!p) notFound();
  const seo = productSeo(p, c.site);
  const base = siteUrl();
  const img = p.image.startsWith('http') ? p.image : `${base}${p.image}`;
  const same = c.products.filter((x) => x.slug !== p.slug && x.category === p.category);
  const related = [...same, ...c.products.filter((x) => x.slug !== p.slug && x.category !== p.category)].slice(0, 4);
  const hasPrice = p.price && /\d/.test(String(p.price));
  const org = { '@type': 'Organization', name: c.site.name, url: base, address: { '@type': 'PostalAddress', streetAddress: c.site.address, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' } };
  const ld = [
    hasPrice
      ? { '@context': 'https://schema.org', '@type': 'Product', '@id': `${base}/products/${p.slug}#product`, url: `${base}/products/${p.slug}`, name: `${p.name} ${p.model}`, sku: p.model, mpn: p.model, description: seo.body[0], image: [img], category: p.category, material: 'Aluminium', color: p.colors, size: p.size, keywords: seo.keywords.join(', '), brand: { '@type': 'Brand', name: 'Doorline' }, manufacturer: org, offers: { '@type': 'Offer', priceCurrency: 'PKR', price: String(p.price).replace(/[^0-9.]/g, ''), availability: 'https://schema.org/InStock', url: `${base}/products/${p.slug}`, seller: org } }
      // Google requires offers, review or aggregateRating for Product markup. Without a price we publish a WebPage so Search Console shows no error.
      : { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${base}/products/${p.slug}#webpage`, url: `${base}/products/${p.slug}`, name: seo.title, description: seo.description, primaryImageOfPage: { '@type': 'ImageObject', url: img }, about: { '@type': 'Thing', name: `${p.name} ${p.model}`, description: seo.body[0], image: img }, publisher: org },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Aluminum Handles', item: `${base}/aluminum-handles` },
      { '@type': 'ListItem', position: 3, name: p.category, item: `${base}/collections/${catSlug(p.category)}` },
      { '@type': 'ListItem', position: 4, name: `${p.name} ${p.model}`, item: `${base}/products/${p.slug}` } ] },
  ];
  return (
    <section className="section">
      <div className="container">
        <p className="crumb"><Link href="/">Home</Link> / <Link href="/aluminum-handles">Aluminum Handles</Link> / <Link href={`/collections/${catSlug(p.category)}`}>{p.category}</Link> / {p.name}</p>
        <div className="pgrid">
          <Reveal><ProductImage src={p.image} alt={productAlt(p)} priority sizes="(max-width: 900px) 100vw, 50vw" /></Reveal>
          <Reveal delay={120}>
            <h1 className="h1s">{p.name} - Wholesaler & Manufacturer in Pakistan and Lahore</h1>
            <Badges items={c.badges} />
            {seo.body.map((t, i) => <p key={i} className="pre">{t}</p>)}
            <div className="row">
              <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need the wholesale price of ${p.name} ${p.model}`)} target="_blank" rel="noopener noreferrer">Ask Wholesale Price on WhatsApp</a>
              <a className="btn btn-outline" href={`tel:${c.site.phone.replace(/\s/g, '')}`}>Call {c.site.phone}</a>
            </div>
            <DoorPreview kind={seo.type} colors={String(p.colors || '').split(',').map((x) => x.trim()).filter(Boolean)} cutout={p.previewImage} name={p.name} />
          </Reveal>
        </div>

        <div className="narrow" style={{ marginTop: 36 }}>
          <h2>{p.name} - Technical Specifications</h2>
          <table className="spec"><tbody>{seo.specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
          {seo.options.length > 0 && (<><h2 style={{ fontSize: '1.1rem' }}>Available Colours and Sizes</h2><ul className="ticks">{seo.options.map((o) => <li key={o}>{o}</li>)}</ul></>)}
        </div>

        <Reveal className="narrow-block">
          <h2 style={{ marginTop: 44 }}>Popular Searches</h2>
          <div className="chips">{seo.variants.map((v) => <Link key={v} href={`/aluminum-handles?q=${encodeURIComponent(v)}`} className="chip">{v}</Link>)}</div>
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
