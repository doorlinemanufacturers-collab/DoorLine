import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getContent } from '@/lib/store';
import { siteUrl, slugify, waLink } from '@/lib/site';
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
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: `Aluminum handles manufacturer, anodizing and electroplating for ${city}`, serviceType: 'Aluminium handles manufacturing, anodizing and electroplating', provider: { '@type': 'LocalBusiness', '@id': `${base}/#business`, name: c.site.name }, areaServed: { '@type': city === 'Pakistan' ? 'Country' : 'City', name: city }, url: `${base}/aluminium-handles-manufacturer/${params.city}` },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, { '@type': 'ListItem', position: 2, name: 'Delivery Across Pakistan', item: `${base}/delivery-across-pakistan` }, { '@type': 'ListItem', position: 3, name: city, item: `${base}/aluminium-handles-manufacturer/${params.city}` }] },
  ];
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <p className="crumb"><Link href="/">Home</Link> / <Link href="/delivery-across-pakistan">Delivery Across Pakistan</Link> / {city}</p>
          <h1 className="h1s">{p.h1}</h1>
          <Badges items={c.badges} />
          <p className="pre">{p.intro}</p>
          <div className="row">
            <a className="btn" href={waLink(c.site.whatsapp, `Hello, I need wholesale rates for aluminium handles in ${city}.`)} target="_blank" rel="noopener noreferrer">Get Rates for {city}</a>
            <Link className="btn btn-outline" href="/aluminum-handles">View Aluminum Handles</Link>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          {p.sections.map((s, i) => (<Reveal key={i} className="seoblock"><h2>{s.h}</h2><p className="pre">{s.t}</p></Reveal>))}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
