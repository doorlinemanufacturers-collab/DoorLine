import Link from 'next/link';
import { getContent } from '@/lib/store';
import { slugify, waLink } from '@/lib/site';
import { TOP_CITIES } from '@/lib/cities';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: { absolute: 'Aluminum Handles Delivery in Pakistan, Lahore | Doorline' },
  description: 'Aluminum handles manufacturer & hardware dealer delivering across Pakistan from Lahore: handles, hinges, locks, anodizing. Call for rates.',
  alternates: { canonical: '/delivery-across-pakistan' },
};

export default async function Delivery() {
  const { site, cities } = await getContent();
  const list = cities.map((c) => c.trim()).filter(Boolean);
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Aluminium Handles Supplier & Delivery Across Pakistan</h1>
        <p className="lead">DoorLine Manufacturers is a professional aluminium handles manufacturer in Lahore. We deliver door handles, cabinet handles, window locks, hinges and finished anodized or electroplated parts to every city in Pakistan by transport and cargo, at direct factory rates with no middleman.</p>
        <p><Link className="link" href="/aluminium-handles-manufacturer/pakistan">Aluminum handles manufacturer in Pakistan →</Link></p>
        <div className="chips">{list.map((c) => <a key={c} className="chip" href={`#${slugify(c)}`}>{c}</a>)}</div>
        <div className="grid4">
          {list.map((c, i) => (
            <Reveal key={c} delay={(i % 4) * 80} className="box">
              <h2 id={slugify(c)} style={{ fontSize: '1.05rem', marginBottom: 8 }}>Aluminium Door Handles Supplier in {c}</h2>
              <p>Hardware shops, fabricators and contractors in {c} can order aluminium door handles, cabinet handles, window locks and hinges directly from our Lahore factory. We also arrange anodizing and electroplating job work for {c} customers. Wholesale rates, bulk dispatch by transport or cargo.</p>
              {TOP_CITIES.includes(c) && <Link className="link" href={`/aluminium-handles-manufacturer/${slugify(c)}`}>Aluminum handles manufacturer in {c} →</Link>}
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: 28 }}>
          <a className="btn" href={waLink(site.whatsapp, 'Hello, please share wholesale rates and delivery details for my city.')} target="_blank" rel="noopener noreferrer">Ask Rates for Your City</a>{' '}
          <Link className="btn btn-outline" href="/aluminum-handles">View Aluminum Handles</Link>
        </p>
      </div>
    </section>
  );
}
