import Link from 'next/link';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { catSlug } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import ProductSearch from '@/components/ProductSearch';
import ContactLines from '@/components/ContactLines';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import Crumbs from '@/components/Crumbs';

export const metadata = {
  title: { absolute: 'Aluminum Handles & Aluminum Door Handles | Pakistan, Lahore' },
  description: 'Aluminum handles and aluminum door handles from the manufacturer in Pakistan, Lahore. Direct factory rates, no middleman. Call for price.',
  alternates: { canonical: '/aluminum-handles' },
  openGraph: { title: 'Aluminum Handles & Aluminum Door Handles | Pakistan, Lahore', url: '/aluminum-handles', images: ['/images/og-default.jpg'] },
};

const TYPES = [
  { h: 'Aluminium Bar Handles', t: 'Fluted and plain round bar handles for glass doors, shop fronts and wooden doors, supplied in pairs with mounting brackets. Available in gold, bronze, white and black.' },
  { h: 'Pull Handles and Sliding Door Handles', t: 'Flat and bracket type pull handles for sliding doors and windows. They sit close to the surface and suit aluminium door and window frames.' },
  { h: 'Aluminium Cabinet Handles', t: 'Flat pull handles for kitchen cabinets, wardrobes and drawers in anodized and powder coated finishes.' },
  { h: 'Window Locks, Hinges and Fittings', t: 'Crescent locks, lever locks, lift-off hinges, side plates and end caps so you can complete doors and windows from one supplier.' },
];

const FAQS = [
  { q: 'What are aluminum handles used for?', a: 'Aluminum handles are used on doors, windows, cabinets, wardrobes and drawers. They are light, do not rust like steel and can be anodized or powder coated in many colours.' },
  { q: 'What are aluminum door handles?', a: 'Aluminum door handles are bar, pull or sliding handles made from aluminium for glass, aluminium and wooden doors. Our door handles come with mounting brackets.' },
  { q: 'Are you the manufacturer of these aluminum handles?', a: 'Yes. Doorline makes these handles at its own factory in Lahore, so you get direct factory rates with no middleman.' },
  { q: 'What is the price of aluminum handles in Pakistan?', a: 'The price depends on the model, size, finish and quantity. Message us on WhatsApp for today\'s wholesale rate list.' },
  { q: 'Which finishes and colours are available?', a: 'Anodized and powder coated finishes in gold, bronze, brown, silver, white and black. We also provide anodizing and electroplating services.' },
  { q: 'Do you deliver aluminum handles all over Pakistan?', a: 'Yes. We dispatch from Lahore to all cities by transport and cargo.' },
];

export default async function AluminumHandles() {
  const c = await getContent();
  const cats = [...new Set(c.products.map((p) => p.category).filter(Boolean))];
  const base = siteUrl();
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Aluminum Handles', url: `${base}/aluminum-handles`, description: 'Aluminum handles and aluminum door handles from the manufacturer in Pakistan, Lahore.', mainEntity: { '@type': 'ItemList', itemListElement: c.products.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/products/${x.slug}`, name: `${x.name} ${x.model}` })) } };
  return (
    <>
      <section className="section">
        <div className="container">
          <Crumbs items={[{ name: 'Aluminum Handles' }]} />
          <h1 className="h1s">Aluminum Handles & Aluminum Door Handles in Pakistan, Lahore</h1>
          <Badges items={c.badges} />
          <p className="pre" style={{ maxWidth: 860 }}>Doorline is a manufacturer and hardware dealer of aluminum (aluminium) handles in Pakistan, Lahore. Browse our aluminum door handles, cabinet handles, window locks and hinges, made at our own factory and sold at direct factory rates with no middleman. Anodizing and electroplating services are also available.</p>
          <ProductSearch products={c.products} />
          <div className="chips">{cats.map((x) => <Link key={x} className="chip" href={`/collections/${catSlug(x)}`}>Aluminum {x}</Link>)}<Link className="chip" href="/aluminum-hardware">Aluminum Hardware</Link><Link className="chip" href="/services">Anodizing & Electroplating</Link></div>
        </div>
      </section>

      {cats.map((cat, k) => (
        <section key={cat} className={`section ${k % 2 ? '' : 'alt'}`}>
          <div className="container">
            <h2>Aluminum {cat}</h2>
            <p className="lead"><Link className="link" href={`/collections/${catSlug(cat)}`}>View all aluminum {cat.toLowerCase()} →</Link></p>
            <div className="grid">{c.products.filter((x) => x.category === cat).map((x, i) => <Reveal key={x.slug} delay={(i % 4) * 80}><ProductCard p={x} /></Reveal>)}</div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container narrow">
          <h2>Types of Aluminium Handles We Make</h2>
          {TYPES.map((x) => (<Reveal key={x.h} className="seoblock"><h3 style={{ fontSize: '1.1rem' }}>{x.h}</h3><p className="pre">{x.t}</p></Reveal>))}
          <p>Not sure which one to choose? Read our <Link className="link" href="/guides/how-to-choose-aluminium-door-handle-size">door handle size guide</Link> or the <Link className="link" href="/guides/aluminium-cabinet-handle-hole-spacing-guide">cabinet handle hole spacing guide</Link>.</p>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          <h2>Aluminum Handles FAQ</h2>
          <FAQ faqs={FAQS} />
        </div>
      </section>
      <section className="section">
        <div className="container contactgrid">
          <div>
            <h2>Buy Aluminum Handles From the Manufacturer</h2>
            <address><ContactLines site={c.site} /></address>
            <p><a className="btn" href={waLink(c.site.whatsapp, 'Hello, I need wholesale rates for aluminum handles.')} target="_blank" rel="noopener noreferrer">Get Wholesale Rates on WhatsApp</a></p>
          </div>
          <div>
            <h2>More From Doorline</h2>
            <div className="chips"><Link className="chip" href="/aluminium-handles-manufacturer/pakistan">Manufacturer in Pakistan</Link><Link className="chip" href="/aluminium-handles-manufacturer/lahore">Manufacturer in Lahore</Link><Link className="chip" href="/guides">Buying Guides</Link><Link className="chip" href="/delivery-across-pakistan">Delivery</Link></div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
