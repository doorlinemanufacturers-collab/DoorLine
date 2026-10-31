import Link from 'next/link';
import { getContent } from '@/lib/store';
import { siteUrl, waLink } from '@/lib/site';
import { catSlug } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import ContactLines from '@/components/ContactLines';
import FAQ from '@/components/FAQ';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import PopularSearches from '@/components/PopularSearches';
import Crumbs from '@/components/Crumbs';

export async function generateMetadata() {
  const { site } = await getContent();
  const description = `Aluminum hardware: handles, hinges, window locks and fittings. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${site.phone} for factory price.`.slice(0, 155);
  const title = 'Aluminum Hardware Dealer & Manufacturer | Pakistan, Lahore';
  return {
    title: { absolute: title }, description,
    alternates: { canonical: '/aluminum-hardware' },
    openGraph: { title, description, url: '/aluminum-hardware', images: ['/images/logo.png'] },
  };
}

const BLOCKS = [
  { h: 'What Is Aluminum Hardware?', t: 'Aluminum (aluminium) hardware means the fittings used on doors, windows, cabinets and furniture: handles, hinges, window locks, brackets, side plates and end caps. It is light, does not rust like iron and can be anodized or powder coated in many colours.' },
  { h: 'Where Is Aluminum Hardware Used?', t: 'It is used on aluminium and glass doors, sliding windows, shop fronts, kitchen cabinets, wardrobes and office partitions. Fabricators and hardware shops buy it in bulk to complete doors and windows from one supplier.' },
  { h: 'Why Buy Aluminum Hardware From Doorline?', t: 'Doorline is the manufacturer and wholesaler, so you get direct factory rates with no middleman. We also provide anodizing and electroplating services in Pakistan and Lahore for matching finishes, and we deliver to every city.' },
];
const FAQS = [
  { q: 'What aluminum hardware do you supply?', a: 'We supply aluminum door handles, cabinet handles, hinges, window locks and handle fittings, in anodized and powder coated finishes.' },
  { q: 'Are you a wholesaler or a manufacturer of aluminum hardware?', a: 'Both. Doorline manufactures in Lahore and sells wholesale, so prices are direct factory rates.' },
  { q: 'Do you deliver aluminum hardware all over Pakistan?', a: 'Yes. We dispatch from Lahore to all major cities by transport and cargo.' },
  { q: 'Can I get aluminum hardware in custom colours or finishes?', a: 'Yes. We offer gold, bronze, brown, silver, white and black, and we provide anodizing and electroplating for custom finish requirements.' },
  { q: 'What is the price of aluminum hardware in Pakistan?', a: 'The price depends on the item, size, finish and quantity. Message us on WhatsApp for today\'s wholesale rate list.' },
  { q: 'Do you sell aluminum hardware only in bulk?', a: 'We focus on wholesale orders for hardware shops, fabricators and contractors. Contact us with your requirement and we will advise the minimum quantity.' },
];

export default async function Hardware() {
  const c = await getContent();
  const base = siteUrl();
  const cats = [...new Set(c.products.map((p) => p.category).filter(Boolean))];
  const order = ['Hinges', 'Window Locks', 'Fittings', 'Door Handles', 'Cabinet Handles'];
  const sorted = [...cats].sort((a, b) => (order.indexOf(a) < 0 ? 9 : order.indexOf(a)) - (order.indexOf(b) < 0 ? 9 : order.indexOf(b)));
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Aluminum Hardware', url: `${base}/aluminum-hardware`, description: 'Aluminum handles, hinges, window locks and fittings from the manufacturer and wholesaler in Lahore, Pakistan.', mainEntity: { '@type': 'ItemList', itemListElement: c.products.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/products/${x.slug}`, name: `${x.name} ${x.model}` })) } };
  return (
    <>
      <section className="section">
        <div className="container">
          <Crumbs items={[{ name: 'Aluminum Hardware' }]} />
          <h1 className="h1s">Aluminum Hardware Dealer & Manufacturer in Pakistan, Lahore</h1>
          <Badges items={c.badges} />
          <p className="pre" style={{ maxWidth: 860 }}>Doorline is a professional manufacturer and wholesaler of aluminum hardware in Lahore, Pakistan: aluminum handles, hinges, window locks and fittings for doors, windows and cabinets. Buy at direct factory rates with no middleman, with anodizing and electroplating services available.</p>
          <div className="chips">{sorted.map((x) => <Link key={x} className="chip" href={`/collections/${catSlug(x)}`}>Aluminum {x}</Link>)}<Link className="chip" href="/aluminum-handles">Aluminum Handles</Link></div>
        </div>
      </section>
      {sorted.map((cat, k) => (
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
          {BLOCKS.map((b) => (<Reveal key={b.h} className="seoblock"><h2>{b.h}</h2><p className="pre">{b.t}</p></Reveal>))}
          <h2>Aluminum Hardware FAQ</h2>
          <FAQ faqs={FAQS} />
        </div>
      </section>
      <section className="section alt">
        <div className="container contactgrid">
          <div>
            <h2>Buy Aluminum Hardware From the Manufacturer</h2>
            <address><ContactLines site={c.site} /></address>
            <p><a className="btn" href={waLink(c.site.whatsapp, 'Hello, I need wholesale rates for aluminum hardware.')} target="_blank" rel="noopener noreferrer">Get Wholesale Rates on WhatsApp</a></p>
          </div>
          <PopularSearches items={c.popular} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
