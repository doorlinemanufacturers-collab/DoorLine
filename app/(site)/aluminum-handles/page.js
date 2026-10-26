import Link from 'next/link';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { searchProducts } from '@/lib/seo';
import { catSlug } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import ContactLines from '@/components/ContactLines';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q;
  return {
    title: { absolute: 'Aluminum Handles - Wholesaler & Manufacturer in Pakistan and Lahore | Doorline' },
    description: 'Aluminum door handles, cabinet handles, hinges and window locks. Wholesaler & Manufacturer in Pakistan and Lahore. Call for factory price.',
    keywords: ['aluminum handles', 'aluminium handles', 'aluminum handles Pakistan', 'aluminum door handles', 'aluminum cabinet handles', 'aluminum handles price in Pakistan', 'aluminum handels'],
    alternates: { canonical: '/aluminum-handles' },
    robots: q ? { index: false, follow: true } : undefined,
    openGraph: { title: 'Aluminum Handles - Wholesaler & Manufacturer in Pakistan and Lahore | Doorline', url: '/aluminum-handles', images: ['/images/logo.png'] },
  };
}

const TYPES = [
  { h: 'Aluminium Bar Handles', t: 'Fluted and plain round bar handles for glass doors, shop fronts and wooden doors, supplied in pairs with mounting brackets. Available in gold, bronze, white and black.' },
  { h: 'Pull Handles and Sliding Door Handles', t: 'Flat and bracket type pull handles for sliding doors and windows. They sit close to the surface and suit aluminium door and window frames.' },
  { h: 'Aluminium Cabinet Handles', t: 'Flat pull handles for kitchen cabinets, wardrobes and drawers in anodized and powder coated finishes.' },
  { h: 'Window Locks, Hinges and Fittings', t: 'Crescent locks, lever locks, lift-off hinges, side plates and end caps so you can complete doors and windows from one supplier.' },
];

const FAQS = [
  { q: 'What are aluminum handles used for?', a: 'Aluminum handles are used on doors, windows, cabinets, wardrobes and drawers. They are light, do not rust like steel and can be anodized or powder coated in many colours.' },
  { q: 'Are you the manufacturer of these aluminum handles?', a: 'Yes. DoorLine Manufacturers makes these handles at its own factory in Lahore, so you get direct factory rates with no middleman.' },
  { q: 'What is the price of aluminum handles in Pakistan?', a: 'The price depends on the model, size, finish and quantity. Message us on WhatsApp for today\'s wholesale rate list.' },
  { q: 'Which finishes and colours are available?', a: 'Anodized and powder coated finishes in gold, bronze, brown, silver, white and black. We also provide anodizing and electroplating services.' },
  { q: 'Do you deliver aluminum handles all over Pakistan?', a: 'Yes. We dispatch from Lahore to all cities by transport and cargo.' },
];

export default async function AluminumHandles({ searchParams }) {
  const c = await getContent();
  const q = (searchParams?.q || '').toString();
  const cats = [...new Set(c.products.map((p) => p.category).filter(Boolean))];
  const base = siteUrl();
  const found = q ? searchProducts(c.products, q) : null;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Aluminum Handles', url: `${base}/aluminum-handles`, description: 'Aluminum door handles, cabinet handles, window locks and hinges from the manufacturer in Lahore.', mainEntity: { '@type': 'ItemList', itemListElement: c.products.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/products/${x.slug}`, name: `${x.name} ${x.model}` })) } };
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="h1s">{q ? `Search results for "${q}"` : 'Aluminum Handles - Door, Cabinet & Window Handles'}</h1>
          <Badges items={c.badges} />
          <p className="pre" style={{ maxWidth: 860 }}>DoorLine Manufacturers is a professional manufacturer of aluminum (aluminium) handles in Lahore, Pakistan. Browse our aluminum door handles, cabinet handles, window locks and hinges, made at our own factory and sold at direct factory rates with no middleman. Anodizing and electroplating services are also available.</p>
          <form className="search" action="/aluminum-handles" method="get">
            <input name="q" defaultValue={q} placeholder="Search aluminum handles, e.g. black bar handle, window lock" aria-label="Search aluminum handles" />
            <button className="btn" type="submit">Search</button>
          </form>
          <div className="chips">{cats.map((x) => <Link key={x} className="chip" href={`/collections/${catSlug(x)}`}>{x}</Link>)}<Link className="chip" href="/services">Anodizing & Electroplating</Link></div>
          {found && (<><div className="grid">{found.map((x, i) => <Reveal key={x.slug} delay={(i % 4) * 80}><ProductCard p={x} /></Reveal>)}</div>{found.length === 0 && <p>No matching products. Try another word or <Link className="link" href="/contact">contact us</Link>.</p>}</>)}
        </div>
      </section>

      {!found && cats.map((cat, k) => (
        <section key={cat} className={`section ${k % 2 ? '' : 'alt'}`}>
          <div className="container">
            <h2>Aluminum {cat}</h2>
            <p className="lead"><Link className="link" href={`/collections/${catSlug(cat)}`}>View all aluminum {cat.toLowerCase()} →</Link></p>
            <div className="grid">{c.products.filter((x) => x.category === cat).map((x, i) => <Reveal key={x.slug} delay={(i % 4) * 80}><ProductCard p={x} /></Reveal>)}</div>
          </div>
        </section>
      ))}

      {!found && (
        <>
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
                <h2>More From DoorLine</h2>
                <div className="chips"><Link className="chip" href="/aluminium-handles-manufacturer/pakistan">Manufacturer in Pakistan</Link><Link className="chip" href="/aluminium-handles-manufacturer/lahore">Manufacturer in Lahore</Link><Link className="chip" href="/guides">Buying Guides</Link><Link className="chip" href="/delivery-across-pakistan">Delivery</Link></div>
              </div>
            </div>
          </section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        </>
      )}
    </>
  );
}
