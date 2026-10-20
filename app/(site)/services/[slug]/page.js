import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { ServiceVisual } from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';

export const dynamic = 'force-dynamic';

async function find(slug) { const c = await getContent(); return { c, s: c.services.find((x) => x.slug === slug) }; }

export async function generateMetadata({ params }) {
  const { s } = await find(params.slug);
  if (!s) return { title: 'Service not found' };
  const description = `${s.short} Premium quality, cheap price, direct factory rates and no middleman. DoorLine Manufacturers, Lahore. Bulk orders across Pakistan.`.slice(0, 158);
  return {
    title: s.metaTitle || `${s.title} | Premium Quality & Direct Rates`, description,
    keywords: String(s.keywords || '').split(',').map((k) => k.trim()).filter(Boolean),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description, url: `/services/${s.slug}`, images: [s.image] },
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
      <section className="section alt">
        <div className="container narrow">
          <Reveal><p className="pre">{s.body}</p></Reveal>
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
