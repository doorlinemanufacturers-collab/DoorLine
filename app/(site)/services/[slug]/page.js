import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { ServiceVisual } from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import AnodizingAnimation from '@/components/AnodizingAnimation';


async function find(slug) { const c = await getContent(); return { c, s: c.services.find((x) => x.slug === slug) }; }

export async function generateMetadata({ params }) {
  const { c, s } = await find(params.slug);
  if (!s) return { title: 'Service not found' };
  const description = `${s.short} Call ${c.site.phone} for price. Direct factory rates, bulk orders across Pakistan.`.slice(0, 155);
  return {
    title: { absolute: s.metaTitle || `${s.title} | Doorline` }, description,
    keywords: String(s.keywords || '').split(',').map((k) => k.trim()).filter(Boolean),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description, url: `/services/${s.slug}`, images: [s.image || '/images/logo.png'] },
  };
}

export default async function ServicePage({ params }) {
  const { c, s } = await find(params.slug);
  if (!s) notFound();
  const points = String(s.points || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.intro, serviceType: s.title,
    provider: { '@type': 'LocalBusiness', name: c.site.name, url: siteUrl(), telephone: c.site.phone },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
  };
  const others = c.services.filter((x) => x.slug !== s.slug);
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / {s.title}</p>
          <div className="pgrid">
            <Reveal><ServiceVisual s={s} big /></Reveal>
            <Reveal delay={120}>
              <h1 className="h1s">{s.title}</h1>
              <Badges items={c.badges} />
              <p className="pre">{s.intro}</p>
              <ul className="ticks">{points.map((p, i) => <li key={i}>{p}</li>)}</ul>
              <div className="row">
                <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need details about ${s.title}.`)} target="_blank" rel="noopener noreferrer">Get a Quote on WhatsApp</a>
                <Link className="btn btn-outline" href="/contact">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/anodiz/i.test(s.title) && (
        <section className="section">
          <div className="container narrow">
            <h2>How Anodizing Works - Watch the Process</h2>
            <p className="lead">Watch an aluminium part go through cleaning, anodizing, colouring and sealing. Tap a colour to see the final finish.</p>
            <AnodizingAnimation />
          </div>
        </section>
      )}
      <section className="section alt">
        <div className="container narrow">
          <Reveal>{String(s.body || '').split(/\n\s*\n/).map((blk, i) => (blk.startsWith('## ') ? <h2 key={i} style={{ marginTop: 26 }}>{blk.slice(3)}</h2> : <p key={i} className="pre">{blk}</p>))}</Reveal>
          {(() => { const re = /anodiz/i.test(s.title) ? /anodiz|powder/ : /plating/i.test(s.title) ? /plating/ : /^$/; const rel = (c.guides || []).filter((g) => re.test(g.slug)); return rel.length ? (<p style={{ marginTop: 20 }}>Related guides: {rel.map((g, i) => <span key={g.slug}>{i > 0 && ', '}<Link className="link" href={`/guides/${g.slug}`}>{g.title}</Link></span>)}</p>) : null; })()}
          <h2 style={{ marginTop: 28 }}>Frequently Asked Questions</h2>
          <FAQ faqs={s.faqs || []} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Our Aluminium Products</h2>
          <div className="grid">{c.products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          {others.length > 0 && <p style={{ marginTop: 24 }}>Also see: {others.map((o, i) => <span key={o.slug}>{i > 0 && ', '}<Link className="link" href={`/services/${o.slug}`}>{o.title}</Link></span>)}</p>}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
