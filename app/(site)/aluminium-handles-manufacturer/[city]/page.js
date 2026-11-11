import Link from 'next/link';
import QuickAnswer from '@/components/QuickAnswer';
import RelatedLinks from '@/components/RelatedLinks';
import { relatedGroups, makeLinker, guideGroups, catsOf } from '@/lib/linkMap';
import LocationBlock from '@/components/LocationBlock';
import { notFound, permanentRedirect } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, slugify, waLink, jsonLd, businessRef } from '@/lib/site';
import { catSlug } from '@/lib/categories';
import { cityPage, TOP_CITIES } from '@/lib/cities';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';

async function find(slug) {
  const c = await getContent();
  const all = [...TOP_CITIES];
  const city = slug === 'pakistan' ? 'Pakistan' : all.find((x) => slugify(x) === slug);
  const known = (c.cities || []).some((x) => slugify(x) === slug);
  return { c, city, all, redirect: !city && known };
}

export async function generateMetadata({ params }) {
  const { c, city, redirect } = await find(params.city);
  if (!city) return { title: redirect ? 'Redirecting' : 'Page not found' };
  const p = cityPage(city, c.site);
  return { title: { absolute: p.title }, description: p.description, alternates: { canonical: `/aluminium-handles-manufacturer/${params.city}` }, openGraph: { title: p.title, description: p.description, url: `/aluminium-handles-manufacturer/${params.city}`, images: ['/images/logo.png'] } };
}

export default async function CityPage({ params }) {
  const { c, city, all, redirect } = await find(params.city);
  if (redirect) permanentRedirect('/aluminium-handles-manufacturer/pakistan');
  if (!city) notFound();
  const p = cityPage(city, c.site);
  const base = siteUrl();
  const linker = makeLinker(`/aluminium-handles-manufacturer/${params.city}`, undefined, undefined, catsOf(c.products));
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: `Aluminum handles manufacturer, anodizing and electroplating for ${city}`, serviceType: 'Aluminium handles manufacturing, anodizing and electroplating', provider: businessRef(c.site), areaServed: { '@type': city === 'Pakistan' ? 'Country' : 'City', name: city }, url: `${base}/aluminium-handles-manufacturer/${params.city}` },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, { '@type': 'ListItem', position: 2, name: 'Delivery Across Pakistan', item: `${base}/delivery-across-pakistan` }, { '@type': 'ListItem', position: 3, name: city, item: `${base}/aluminium-handles-manufacturer/${params.city}` }] },
  ];
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <p className="crumb"><Link href="/">Home</Link> / <Link href="/delivery-across-pakistan">Delivery Across Pakistan</Link> / {city}</p>
          <h1 className="h1s">{p.h1}</h1>
          <QuickAnswer>{city === 'Pakistan'
            ? `DoorLine Manufacturers is an aluminium handles wholesaler and manufacturer in Pakistan with its factory in Lahore, Pakistan. Buyers in every city get wholesale factory rates on WhatsApp (${c.site.whatsappDisplay || c.site.whatsapp}), and orders are delivered by transport or cargo.`
            : `DoorLine Manufacturers supplies aluminium handles to ${city}, Pakistan from its factory in Lahore, Pakistan, delivered by transport or cargo. Message ${c.site.whatsappDisplay || c.site.whatsapp} on WhatsApp for the wholesale rate list.`}</QuickAnswer>
          <Badges items={c.badges} />
          <p className="pre">{p.intro}</p>
          {city !== 'Pakistan' && <p className="muted">Supplying all of Pakistan: <Link className="link" href="/aluminium-handles-manufacturer/pakistan">Aluminum Handles Wholesaler &amp; Manufacturer in Pakistan</Link></p>}
          <div className="row">
            <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need wholesale rates for aluminium handles in ${city}.`)} target="_blank" rel="noopener noreferrer">Get Rates for {city}</a>
            <Link className="btn btn-outline" href="/aluminum-handles">View Aluminum Handles</Link>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          {p.sections.map((s, i) => (<Reveal key={i} className="seoblock"><h2>{s.h}</h2><p className="pre">{linker.render(s.t)}</p></Reveal>))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Aluminium Handles We Supply to {city}</h2>
          <div className="grid">{c.products.slice(0, 4).map((x) => <ProductCard key={x.slug} p={x} />)}</div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          <h2>{city} - Frequently Asked Questions</h2>
          <FAQ faqs={p.faqs} />
          <h2 style={{ marginTop: 32 }}>We Also Deliver To</h2>
          <div className="chips">{city !== 'Pakistan' && <Link className="chip on" href="/aluminium-handles-manufacturer/pakistan">All Pakistan</Link>}{all.filter((x) => x !== city).map((x) => <Link key={x} className="chip" href={`/aluminium-handles-manufacturer/${slugify(x)}`}>{x}</Link>)}</div>
        </div>
      </section>
      {city === 'Pakistan' && (
        <section className="section">
          <div className="container narrow">
            <h2>Best Aluminium Handles Manufacturer in Pakistan: What to Check</h2>
            <p className="pre">Looking for the best aluminium handles manufacturer in Pakistan? Compare these points before you place a bulk order:</p>
            <ul className="ticks">
              <li><strong>Own factory:</strong> you buy from the manufacturer, not a trader, so there is no middleman.</li>
              <li><strong>In-house finishing:</strong> anodizing and electroplating done in the same factory keeps colour and quality the same across batches.</li>
              <li><strong>Wholesale rates:</strong> a clear wholesale price list on WhatsApp for your model, colour and quantity.</li>
              <li><strong>Range:</strong> {catsOf(c.products).map((n, i) => (<span key={n}>{i ? ', ' : ''}<Link className="link" href={`/collections/${catSlug(n)}`}>{n.toLowerCase()}</Link></span>))} from one manufacturer.</li>
              <li><strong>Delivery:</strong> dispatch by transport or cargo to every city in Pakistan.</li>
            </ul>
            <p className="pre">DoorLine Manufacturers works this way from its factory in Lahore, Pakistan. Read how to <Link className="link" href="/guides/how-to-buy-aluminium-handles-wholesale-in-pakistan">buy aluminium handles wholesale in Pakistan</Link> or <a className="link" href={waLink(c.site.whatsapp, 'Hello, I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">ask for rates on WhatsApp</a>.</p>
          </div>
        </section>
      )}
      {city === 'Lahore' && <LocationBlock site={c.site} />}
      <RelatedLinks groups={relatedGroups(`/aluminium-handles-manufacturer/${params.city}`, ['handles','finishing','hardware','manufacturer'])} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
    </>
  );
}
