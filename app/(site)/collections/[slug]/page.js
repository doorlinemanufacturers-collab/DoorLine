import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { catSlug, categoryPage } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import ContactLines from '@/components/ContactLines';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';

async function find(slug) {
  const c = await getContent();
  const cats = [...new Set(c.products.map((p) => p.category).filter(Boolean))];
  return { c, cats, cat: cats.find((x) => catSlug(x) === slug) };
}

export async function generateMetadata({ params }) {
  const { c, cat } = await find(params.slug);
  if (!cat) return { title: 'Page not found' };
  const p = categoryPage(cat, c.site);
  return { title: { absolute: p.title }, description: p.description, keywords: p.keywords, alternates: { canonical: `/collections/${params.slug}` }, openGraph: { title: p.title, description: p.description, url: `/collections/${params.slug}`, images: ['/images/logo.png'] } };
}

export default async function Collection({ params }) {
  const { c, cats, cat } = await find(params.slug);
  if (!cat) notFound();
  const p = categoryPage(cat, c.site);
  const list = c.products.filter((x) => x.category === cat);
  const base = siteUrl();
  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: p.h1, description: p.description, url: `${base}/collections/${params.slug}`, mainEntity: { '@type': 'ItemList', itemListElement: list.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/products/${x.slug}`, name: `${x.name} ${x.model}` })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, { '@type': 'ListItem', position: 2, name: 'Aluminum Handles', item: `${base}/aluminum-handles` }, { '@type': 'ListItem', position: 3, name: cat, item: `${base}/collections/${params.slug}` }] },
  ];
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="crumb"><Link href="/">Home</Link> / <Link href="/aluminum-handles">Aluminum Handles</Link> / {cat}</p>
          <h1 className="h1s">{p.h1}</h1>
          <Badges items={c.badges} />
          <p className="pre" style={{ maxWidth: 820 }}>{p.intro}</p>
          <div className="grid" style={{ marginTop: 24 }}>{list.map((x, i) => <Reveal key={x.slug} delay={(i % 4) * 80}><ProductCard p={x} /></Reveal>)}</div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          {p.sections.map((s, i) => (<Reveal key={i} className="seoblock"><h2>{s.h}</h2><p className="pre">{s.t}</p></Reveal>))}
          <h2>Frequently Asked Questions</h2>
          <FAQ faqs={p.faqs} />
        </div>
      </section>
      <section className="section">
        <div className="container contactgrid">
          <div>
            <h2>Order From Our Lahore Factory</h2>
            <address><ContactLines site={c.site} /></address>
            <p><a className="btn" href={waLink(c.site.whatsapp, `Hello, I need wholesale rates for aluminum ${cat.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">Get Wholesale Rates on WhatsApp</a></p>
          </div>
          <div>
            <h2>More Categories</h2>
            <div className="chips">{cats.filter((x) => x !== cat).map((x) => <Link key={x} className="chip" href={`/collections/${catSlug(x)}`}>{x}</Link>)}<Link className="chip" href="/services">Anodizing & Electroplating</Link><Link className="chip" href="/guides">Buying Guides</Link></div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
