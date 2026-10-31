import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { productSeo, productAlt, previewInfo } from '@/lib/seo';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import LazyColour from '@/components/LazyColour';
import Crumbs from '@/components/Crumbs';
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
    title: { absolute: seo.title }, description: seo.description,
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
  const colorList = String(p.colors || '').split(',').map((x) => x.trim()).filter(Boolean);
  const gmap = { 'Door Handles': ['how-to-choose-aluminium-door-handle-size', 'types-of-aluminium-handles-and-where-to-use-them'], 'Cabinet Handles': ['aluminium-cabinet-handle-hole-spacing-guide', 'types-of-aluminium-handles-and-where-to-use-them'], 'Window Locks': ['types-of-aluminium-handles-and-where-to-use-them'], Hinges: ['types-of-aluminium-handles-and-where-to-use-them'] };
  const relGuides = (c.guides || []).filter((g) => [...(gmap[p.category] || []), 'anodized-vs-powder-coated-aluminium-handles'].includes(g.slug));
  const hasPrice = p.price && /\d/.test(String(p.price));
  const org = { '@type': 'Organization', name: c.site.name, url: base, address: { '@type': 'PostalAddress', streetAddress: c.site.address, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' } };
  const ld = [
    hasPrice
      ? { '@context': 'https://schema.org', '@type': 'Product', '@id': `${base}/products/${p.slug}#product`, url: `${base}/products/${p.slug}`, name: `${p.name} ${p.model}`, sku: p.model, mpn: p.model, description: seo.body[0], image: [img], category: p.category, material: 'Aluminium', color: p.colors, size: p.size, brand: { '@type': 'Brand', name: 'Doorline' }, manufacturer: org, offers: { '@type': 'Offer', priceCurrency: 'PKR', price: String(p.price).replace(/[^0-9.]/g, ''), availability: 'https://schema.org/InStock', url: `${base}/products/${p.slug}`, seller: org } }
      // Google requires offers, review or aggregateRating for Product markup. Without a price we publish a WebPage so Search Console shows no error.
      : { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${base}/products/${p.slug}#webpage`, url: `${base}/products/${p.slug}`, name: seo.title, description: seo.description, primaryImageOfPage: { '@type': 'ImageObject', url: img }, about: { '@type': 'Thing', name: `${p.name} ${p.model}`, description: seo.body[0], image: img }, publisher: org }
  ];
  return (
    <section className="section">
      <div className="container">
        <Crumbs items={[{ name: 'Aluminum Handles', href: '/aluminum-handles' }, { name: p.category, href: `/collections/${catSlug(p.category)}` }, { name: p.name }]} />
        <div className="pgrid">
          <Reveal eager><ProductImage src={p.image} alt={productAlt(p)} priority sizes="(max-width: 900px) 100vw, 50vw" /></Reveal>
          <Reveal eager>
            <h1 className="h1s">{p.name} - Wholesaler & Manufacturer in Pakistan and Lahore</h1>
            <Badges items={c.badges} />
            {seo.body.map((t, i) => <p key={i} className="pre">{t}</p>)}
            <div className="row">
              <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need the wholesale price of ${p.name} ${p.model}`)} target="_blank" rel="noopener noreferrer">Ask Wholesale Price on WhatsApp</a>
              <a className="btn btn-outline" href={`tel:${c.site.phone.replace(/\s/g, '')}`}>Call {c.site.phone}</a>
            </div>
            {colorList.length > 1 && <LazyColour info={previewInfo(p)} colors={colorList} name={p.name} />}
          </Reveal>
        </div>

        <div className="narrow" style={{ marginTop: 36 }}>
          <p className="muted">Browse: <Link className="link" href="/aluminum-handles">Aluminum Handles</Link> · <Link className="link" href="/aluminum-hardware">Aluminum Hardware</Link> · <Link className="link" href={`/collections/${catSlug(p.category)}`}>Aluminum {p.category}</Link> · <Link className="link" href="/aluminium-handles-manufacturer/pakistan">Manufacturer in Pakistan</Link></p>
          {relGuides.length > 0 && <p className="muted">Related guides: {relGuides.map((g, i) => <span key={g.slug}>{i > 0 && ' · '}<Link className="link" href={`/guides/${g.slug}`}>{g.title}</Link></span>)}</p>}
          <h2>{p.name} - Technical Specifications</h2>
          <div className="tablewrap"><table className="spec"><tbody>{seo.specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table></div>
          {seo.options.length > 0 && (<><h2 style={{ fontSize: '1.1rem' }}>Available Colours and Sizes</h2><ul className="ticks">{seo.options.map((o) => <li key={o}>{o}</li>)}</ul></>)}
        </div>

        <Reveal className="narrow-block">
          <h2 style={{ marginTop: 44 }}>Related Searches</h2>
          <div className="chips">{seo.variants.map((v) => <span key={v} className="chip">{v}</span>)}</div>
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
