import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { catSlug } from '@/lib/categories';

async function find(slug) { const c = await getContent(); return { c, g: c.guides.find((x) => x.slug === slug) }; }

export async function generateMetadata({ params }) {
  const { g } = await find(params.slug);
  if (!g) return { title: 'Guide not found' };
  return { title: g.metaTitle || g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` }, openGraph: { title: g.title, description: g.description, url: `/guides/${g.slug}`, type: 'article', images: ['/images/logo.png'] } };
}

export default async function Guide({ params }) {
  const { c, g } = await find(params.slug);
  if (!g) notFound();
  const base = siteUrl();
  const cats = [...new Set(c.products.map((p) => p.category).filter(Boolean))];
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description, mainEntityOfPage: `${base}/guides/${g.slug}`, image: `${base}/images/logo.png`, author: { '@type': 'Organization', name: c.site.name }, publisher: { '@type': 'Organization', name: c.site.name, logo: { '@type': 'ImageObject', url: `${base}/images/logo.png` } } };
  return (
    <section className="section">
      <div className="container narrow">
        <p className="crumb"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / {g.title}</p>
        <h1 className="h1s">{g.title}</h1>
        <p className="muted" style={{ marginBottom: 18 }}>By {c.site.name}, aluminium handles manufacturer in Lahore</p>
        {String(g.body || '').split(/\n\s*\n/).map((blk, i) => (blk.startsWith('## ') ? <h2 key={i} style={{ marginTop: 24 }}>{blk.slice(3)}</h2> : <p key={i} className="pre">{blk}</p>))}
        <div className="box" style={{ marginTop: 30 }}>
          <h3>Need help choosing?</h3>
          <p>Send us a photo and your measurements on WhatsApp and we will suggest the right aluminium handle at factory rates.</p>
          <p style={{ marginTop: 10 }}><a className="btn" href={waLink(c.site.whatsapp, `Hello, I read your guide "${g.title}" and need help choosing.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></p>
        </div>
        <h2 style={{ marginTop: 30 }}>Browse Our Products</h2>
        <div className="chips">{cats.map((x) => <Link key={x} className="chip" href={`/collections/${catSlug(x)}`}>{x}</Link>)}<Link className="chip" href="/services">Anodizing & Electroplating</Link></div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
