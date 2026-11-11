import { getLocalGallery } from '@/lib/localGallery';
import QuickAnswer from '@/components/QuickAnswer';
import RelatedLinks from '@/components/RelatedLinks';
import { relatedGroups, makeLinker, guideGroups, catsOf } from '@/lib/linkMap';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, waLink, jsonLd, businessRef } from '@/lib/site';
import { ServiceVisual } from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import LazyAnodizing from '@/components/LazyAnodizing';
import Crumbs from '@/components/Crumbs';
import Gallery from '@/components/Gallery';


async function find(slug) { const c = await getContent(); return { c, s: c.services.find((x) => x.slug === slug) }; }

export async function generateMetadata({ params }) {
  const { c, s } = await find(params.slug);
  if (!s) return { title: 'Service not found' };
  const description = `${s.short} Call ${c.site.phone} for price. Direct factory rates, bulk orders across Pakistan.`.slice(0, 155);
  return {
    title: { absolute: s.metaTitle || `${s.title} | Doorline` }, description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description, url: `/services/${s.slug}`, images: [s.image || '/images/logo.png'] },
  };
}

export default async function ServicePage({ params }) {
  const { c, s } = await find(params.slug);
  if (!s) notFound();
  const gallery = (s.gallery || []).filter((g) => g && g.url).map((g, i) => ({ url: g.url, alt: (g.alt && g.alt.trim()) || `${s.title} - sample ${i + 1} - Doorline Lahore Pakistan` }));
  const localFolder = /anodiz/i.test(s.title) ? 'anodizing' : /plating/i.test(s.title) ? 'electroplating' : '';
  if (localFolder) gallery.push(...getLocalGallery(localFolder));
  const linker = makeLinker(`/services/${s.slug}`, undefined, undefined, catsOf(c.products));
  const workLabel = /anodiz/i.test(s.title) ? 'Anodizing Work Samples' : /plating/i.test(s.title) ? 'Electroplating Work Samples' : 'Work Samples';
  const abs = (u) => (u.startsWith('http') ? u : `${siteUrl()}${u}`);
  const points = String(s.points || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.intro, serviceType: s.title,
    provider: businessRef(c.site),
    areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'City', name: 'Lahore' }],
    ...(gallery.length ? { image: gallery.map((g) => abs(g.url)) } : {}),
  };
  const others = c.services.filter((x) => x.slug !== s.slug);
  return (
    <>
      <section className="section">
        <div className="container">
          <Crumbs items={[{ name: 'Services', href: '/services' }, { name: s.title }]} />
          <div className="pgrid">
            <Reveal eager><ServiceVisual s={s} big /></Reveal>
            <Reveal eager>
              <h1 className="h1s">{s.title}</h1>
              <QuickAnswer>{/anodiz/i.test(s.title)
                ? 'Anodizing is an electrochemical process that builds a hard, corrosion resistant oxide layer on aluminium and lets it take colours such as gold, bronze, brown, silver and black. DoorLine Manufacturers anodizes aluminium in Lahore, Pakistan, for its own handles and as job work for fabricators across Pakistan.'
                : /plating/i.test(s.title)
                  ? 'Electroplating coats a part with a thin layer of metal using electric current, to improve its look and protection. DoorLine Manufacturers plates aluminium parts and hardware in Lahore, Pakistan, including job work sent from anywhere in Pakistan.'
                  : s.short}</QuickAnswer>
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
            <LazyAnodizing kind="anodizing" />
          </div>
        </section>
      )}
      {gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>{workLabel}</h2>
            <p className="lead">Tap a picture to enlarge it.</p>
            <Gallery images={gallery} />
          </div>
        </section>
      )}
      {/plating/i.test(s.title) && (
        <section className="section">
          <div className="container narrow">
            <h2>How Electroplating Works - Watch the Process</h2>
            <p className="lead">Watch a part go through cleaning, surface preparation, plating and rinsing. Tap a finish to see the result.</p>
            <LazyAnodizing kind="plating" />
          </div>
        </section>
      )}
      {(/anodiz/i.test(s.title) || /plating/i.test(s.title)) && (
        <section className="section">
          <div className="container narrow">
            <h2>{/anodiz/i.test(s.title) ? 'Aluminium Anodizer in Lahore, Pakistan' : 'Aluminium Electroplating in Lahore, Pakistan'}</h2>
            <p className="pre">{/anodiz/i.test(s.title)
              ? 'Looking for an aluminium anodizer in Lahore, Pakistan? DoorLine Manufacturers anodizes aluminium handles, profiles and hardware in its own factory, and also takes job work from fabricators and factories across Pakistan. Send a sample, the colour and your quantity on WhatsApp and we reply with the price.'
              : 'Looking for aluminium electroplating in Lahore, Pakistan? DoorLine Manufacturers plates aluminium parts and hardware in its own factory and also takes job work from fabricators and factories across Pakistan. Send a sample, the finish and your quantity on WhatsApp and we reply with the price.'}</p>
            <p className="pre">See our <Link className="link" href="/aluminum-handles">aluminium handles</Link>, <Link className="link" href="/aluminum-hardware">aluminium hardware</Link>, or read the <Link className="link" href="/guides">buying and finishing guides</Link>.</p>
            <p><a className="btn" href={waLink(c.site.whatsapp, /anodiz/i.test(s.title) ? 'Hello, I need anodizing for my aluminium parts. Sample, colour and quantity: ' : 'Hello, I need electroplating for my aluminium parts. Sample, finish and quantity: ')} target="_blank" rel="noopener noreferrer">Send Your Sample on WhatsApp</a></p>
          </div>
        </section>
      )}
      <section className="section alt">
        <div className="container narrow">
          <Reveal>{String(s.body || '').split(/\n\s*\n/).map((blk, i) => (blk.startsWith('## ') ? <h2 key={i} style={{ marginTop: 26 }}>{blk.slice(3)}</h2> : <p key={i} className="pre">{linker.render(blk)}</p>))}</Reveal>
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
      <RelatedLinks groups={relatedGroups(`/services/${s.slug}`, ['finishing','handles','manufacturer','hardware'])} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
    </>
  );
}
