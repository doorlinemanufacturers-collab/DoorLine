import Link from 'next/link';
import { getContent } from '@/lib/store';
import { siteUrl, waLink, jsonLd } from '@/lib/site';
import { makeLinker, catsOf, relatedGroups } from '@/lib/linkMap';
import { productAlt } from '@/lib/seo';
import Crumbs from './Crumbs';
import QuickAnswer from './QuickAnswer';
import ProductCard from './ProductCard';
import FAQ from './FAQ';
import LocationBlock from './LocationBlock';
import RelatedLinks from './RelatedLinks';

export default async function LandingView({ cfg }) {
  const c = await getContent();
  const { site } = c;
  const base = siteUrl();
  const items = (c.products || []).filter((p) => cfg.match.test(`${p.name} ${p.model} ${p.category} ${p.slug}`)).slice(0, 12);
  const linker = makeLinker(cfg.path, 6, 2, catsOf(c.products));
  const ld = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${base}${cfg.path}#webpage`, url: `${base}${cfg.path}`, name: cfg.h1,
    about: { '@id': `${base}/#business` }, inLanguage: 'en-PK',
    ...(items.length ? { mainEntity: { '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/products/${p.slug}`, name: `${p.name} ${p.model}` })) } } : {}),
  };
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <Crumbs items={[{ name: cfg.crumb }]} />
          <h1 className="h1s">{cfg.h1}</h1>
          <QuickAnswer>{cfg.quick(site)}</QuickAnswer>
          {cfg.intro.map((t, i) => <p key={i} className="pre">{linker.render(t)}</p>)}
          <p className="row">
            <a className="btn" href={waLink(site.whatsapp, cfg.wa)} target="_blank" rel="noopener noreferrer">Get Wholesale Rate on WhatsApp</a>
            <Link className="btn btn-outline" href="/contact">Contact the Manufacturer</Link>
          </p>
        </div>
      </section>
      {items.length > 0 && (
        <section className="section alt">
          <div className="container">
            <h2>{cfg.productsH}</h2>
            <div className="grid" style={{ marginTop: 18 }}>{items.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container narrow">
          {cfg.sections.map((s) => (
            <div key={s.h} style={{ marginBottom: 26 }}>
              <h2>{s.h}</h2>
              {s.p.map((t, i) => <p key={i} className="pre">{linker.render(t)}</p>)}
              {s.list && <ul className="ticks">{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}
              {s.after && <p className="pre">{s.after}</p>}
            </div>
          ))}
          <h2>Frequently Asked Questions</h2>
          <FAQ faqs={cfg.faqs} />
          <p><a className="btn" href={waLink(site.whatsapp, cfg.wa)} target="_blank" rel="noopener noreferrer">Ask the Manufacturer on WhatsApp</a></p>
        </div>
      </section>
      <LocationBlock site={site} />
      <RelatedLinks groups={relatedGroups(cfg.path, cfg.pick)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
    </>
  );
}
