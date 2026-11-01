import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/store';
import { waLink, slugify } from '@/lib/site';
import { catSlug } from '@/lib/categories';
import { TOP_CITIES } from '@/lib/cities';
import ProductCard from '@/components/ProductCard';
import CatalogueForm from '@/components/CatalogueForm';
import FAQ from '@/components/FAQ';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import PopularSearches from '@/components/PopularSearches';
import LazyAnodizing from '@/components/LazyAnodizing';
import ContactLines from '@/components/ContactLines';

const H1 = 'Aluminium Handles Manufacturer & Wholesaler in Lahore, Pakistan';
const ORDER_MSG = 'Assalam o Alaikum, I want wholesale rates.\nModel: \nColour: \nSize: \nQuantity: \nCity: ';
const CAT_ICON = { 'Door Handles': '🚪', 'Cabinet Handles': '🗄️', 'Window Locks': '🔒', Hinges: '🔩' };
const WHY_ICON = ['🏭', '🎨', '🚚', '✨', '✅', '⭐'];

export async function generateMetadata() {
  const { site } = await getContent();
  const title = 'Aluminium Handles Wholesale Price Pakistan | Lahore';
  const description = `Aluminium door handles wholesale price in Pakistan from our Lahore factory. Handles, hinges, locks and anodizing. WhatsApp ${site.whatsappDisplay || site.whatsapp}.`.slice(0, 155);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: '/' },
    openGraph: { title, description, url: '/', images: ['/images/og-default.jpg'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/og-default.jpg'] },
  };
}

function Band({ n, title, sub }) {
  return (
    <div className="band"><div className="container bandin"><span className="num">{n}</span><div><p className="bandt">{title}</p><small>{sub}</small></div></div></div>
  );
}

export default async function Home() {
  const { site, hero, why, products, seo, services, badges, about, guides, homeFaqs, popular } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const glance = [
    ['Business', `${site.name}: aluminum handles manufacturer & hardware dealer`],
    ['Location', site.address],
    ['Products', 'Aluminium door handles, cabinet handles, hinges, window locks, fittings'],
    ['Services', 'Aluminium anodizing and electroplating'],
    ['Customers', 'Hardware shops, fabricators, dealers, furniture makers, contractors'],
    ['Pricing', 'Direct factory rates, no middleman'],
    ['Delivery', 'All over Pakistan by transport and cargo'],
    ['Contact person', site.owner],
  ];
  return (
    <>
      <section className="hero">
        <div className={`container herogrid ${hero.image ? '' : 'herosolo'}`}>
          <div>
            <p className="kicker">Anodizing Factory in Lahore · Factory Price for Bulk Buyers</p>
            <h1>{H1}</h1>
            <p>{hero.sub}</p>
            <Badges items={badges} center={!hero.image} />
            <div className="row">
              <Link className="btn" href="/aluminum-handles">View Aluminium Handles</Link>
              <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello, I need wholesale rates for aluminum handles.')} target="_blank" rel="noopener noreferrer">WhatsApp Rates</a>
            </div>
          </div>
          {hero.image ? (
            <div className="heroimg">
              <Image src={hero.image} alt="Aluminium handles manufacturer and wholesaler in Lahore, Pakistan" fill priority sizes="(max-width: 900px) 100vw, 45vw" className="pimg" />
            </div>
          ) : null}
        </div>
      </section>

      {/* ---------- 1. COMPANY ---------- */}
      <Band n="1" title="Our Company" sub="Who we are, our vision, mission and promise" />
      <section id="company" className="sec sec-co">
        <div className="container">
          <div className="cogrid">
            <Reveal>
              <h2>{about.title}</h2>
              {String(about.text || '').split(/\n\s*\n/).map((t, i) => <p key={i} className="pre">{t}</p>)}
              <div className="row"><Link className="btn" href="/about">More About Us</Link><Link className="btn btn-outline" href="/contact">Contact Us</Link></div>
            </Reveal>
            <Reveal delay={120} className="glance">
              <h3>Doorline at a Glance</h3>
              <dl>{glance.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
            </Reveal>
          </div>

          <h2 className="subh">Our Vision, Mission & Promise</h2>
          <div className="vmp">
            {[['👁️', 'Our Vision', about.vision], ['🎯', 'Our Mission', about.mission], ['🤝', 'Our Promise', about.promise]].map(([ic, t, x], i) => (
              <Reveal key={t} delay={i * 100} className="vcard"><span className="vic" aria-hidden="true">{ic}</span><h3>{t}</h3><p>{x}</p></Reveal>
            ))}
          </div>

          <h2 className="subh">Why Choose Doorline</h2>
          <div className="fgrid">
            {why.map((w, i) => (<Reveal key={i} delay={i * 80} className="fcard"><span className="fic" aria-hidden="true">{WHY_ICON[i % WHY_ICON.length]}</span><h3>{w.title}</h3><p>{w.text}</p></Reveal>))}
          </div>
        </div>
      </section>

      {/* ---------- 2. CUSTOMERS ---------- */}
      <Band n="2" title="For Customers" sub="Products, services, delivery and how to order" />
      <section id="customers" className="sec sec-cu">
        <div className="container">
          <h2>Aluminium Handles & Hardware Categories</h2>
          <div className="catgrid">
            {categories.map((c, i) => (
              <Reveal key={c} delay={i * 70}><Link href={`/collections/${catSlug(c)}`} className="catcard"><span className="cic" aria-hidden="true">{CAT_ICON[c] || '🛠️'}</span><strong>Aluminium {c}</strong><span className="link">Browse {c.toLowerCase()} →</span></Link></Reveal>
            ))}
            <Reveal delay={categories.length * 70}><Link href="/aluminum-hardware" className="catcard"><span className="cic" aria-hidden="true">🧰</span><strong>Aluminium Hardware</strong><span className="link">See all hardware →</span></Link></Reveal>
          </div>

          <h2 className="subh">Featured Aluminium Handles</h2>
          <div className="grid">{products.slice(0, 8).map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><ProductCard p={p} /></Reveal>)}</div>
          <p className="center"><Link className="btn" href="/aluminum-handles">View All Aluminium Handles</Link> <Link className="btn btn-outline" href="/aluminum-hardware">View Aluminium Hardware</Link></p>

          <h2 className="subh">Aluminium Door Handles Price in Pakistan</h2>
          <div className="narrow">
            <p className="pre">The price of aluminium door handles in Pakistan depends on the model, size, finish and the quantity you order. We share the current wholesale rate list on WhatsApp, so you always get today&apos;s factory price with no middleman.</p>
            <ul className="ticks">
              <li><strong>Model and size:</strong> handle length and fixing distance.</li>
              <li><strong>Finish:</strong> anodized gold, brown, silver and black, or powder coated white.</li>
              <li><strong>Quantity:</strong> ready stock or bulk production order.</li>
              <li><strong>City:</strong> delivery by transport or cargo to your city.</li>
            </ul>
            <p className="center"><a className="btn" href={waLink(site.whatsapp, ORDER_MSG)} target="_blank" rel="noopener noreferrer">Get Today&apos;s Price on WhatsApp</a></p>
          </div>

          <h2 className="subh">Aluminium Handles Wholesale Market Lahore: Buy Direct From the Factory</h2>
          <div className="narrow">
            <p className="pre">Hardware shops, dealers and fabricators in Lahore and other cities buy aluminium handles from DoorLine at factory rates, because we are the manufacturer and not a trader. Our factory is at {site.address}. We are open {site.hours}. Message us on WhatsApp first so we can confirm that your models and colours are available.</p>
            <div className="row"><a className="btn btn-outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery || site.address)}`} target="_blank" rel="noopener noreferrer">Find Our Factory on Google Maps</a><Link className="btn btn-outline" href="/aluminium-handles-manufacturer/lahore">Handles Manufacturer in Lahore</Link></div>
          </div>

          <h2 className="subh">Anodizing Factory in Lahore: Anodizing & Electroplating Services</h2>
          <p className="pre narrow">DoorLine runs its own anodizing and electroplating work in Lahore. We finish our aluminium handles and also take job work from fabricators and factories across Pakistan, in gold, bronze, brown, silver and black. Send a sample and your quantity on WhatsApp for the price.</p>
          <div className="grid">{services.map((x, i) => <Reveal key={x.slug} delay={i * 120}><ServiceCard s={x} /></Reveal>)}</div>
          <h3 className="subh3">See How Anodizing Works</h3>
          <div className="narrow"><LazyAnodizing kind="anodizing" /></div>
          <p className="center"><Link className="btn btn-outline" href="/services/aluminium-anodizing-service-lahore">Anodizing Services</Link> <Link className="btn btn-outline" href="/services/aluminium-electroplating-service-lahore">Electroplating Services</Link></p>

          <h2 className="subh">How to Order Aluminium Handles on WhatsApp</h2>
          <div className="steps">
            {[['Open WhatsApp', `Message ${site.whatsappDisplay || site.whatsapp} using the button below. The order message is already filled in for you.`], ['Send your requirement', 'Write the model code, colour, size and quantity. Example: DL-104, black, 100 pieces.'], ['Add your city', 'Tell us your city. For custom lengths or finishes, send a photo or sample details.'], ['Get the rate list', 'We reply with the wholesale price and availability directly from the factory.'], ['Confirm and receive', 'Confirm the order. Ready stock is dispatched and bulk orders are produced, then sent by transport or cargo to your city.']].map(([t, x], i) => (
              <Reveal key={t} delay={i * 90} className="step"><span className="snum">{i + 1}</span><h3>{t}</h3><p>{x}</p></Reveal>
            ))}
          </div>
          <p className="center"><a className="btn" href={waLink(site.whatsapp, ORDER_MSG)} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a></p>

          <h2 className="subh">Delivery All Over Pakistan</h2>
          <div className="chips">{TOP_CITIES.map((c) => <Link key={c} className="chip" href={`/aluminium-handles-manufacturer/${slugify(c)}`}>{c}</Link>)}<Link className="chip on" href="/aluminium-handles-manufacturer/pakistan">Manufacturer in Pakistan →</Link><Link className="chip on" href="/delivery-across-pakistan">All cities →</Link></div>

          <div id="catalogue" className="formcard">
            <div><h2>Request Wholesale Catalogue</h2><p className="lead">Fill in the form and we will send the catalogue, latest rate list and anodizing and electroplating details on WhatsApp.</p><ul className="ticks"><li>Direct factory rates</li><li>Reply on WhatsApp</li><li>Delivery across Pakistan</li></ul></div>
            <CatalogueForm whatsapp={site.whatsapp} source="home" />
          </div>

          <h2 className="subh">Aluminium Handles Buying Guides</h2>
          <div className="fgrid">{guides.slice(0, 4).map((g, i) => (<Reveal key={g.slug} delay={i * 90} className="fcard"><h3>{g.title}</h3><p className="muted">{g.description}</p><Link className="link" href={`/guides/${g.slug}`}>Read guide →</Link></Reveal>))}</div>
        </div>
      </section>

      {/* ---------- 3. TRUST ---------- */}
      <Band n="3" title="Trust & Information" sub="Business details, FAQs and everything you can verify" />
      <section id="trust" className="sec sec-tr">
        <div className="container">
          <div className="trgrid">
            <Reveal className="tcard">
              <h2>Business Details You Can Verify</h2>
              <address><ContactLines site={site} /></address>
              <div className="row">
                <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery || site.address)}`} target="_blank" rel="noopener noreferrer">Find Us on Google Maps</a>
                <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </div>
            </Reveal>
            <Reveal delay={120} className="tcard">
              <h2>Why Buyers Trust DoorLine Manufacturers</h2>
              <ul className="ticks">
                <li>We are the manufacturer, not a trader.</li>
                <li>Name, address and phone are the same on every page.</li>
                <li>Prices and quotes come directly from the factory.</li>
                <li>Anodizing and electroplating are done for our own and customer parts.</li>
                <li>Privacy policy and terms are public.</li>
              </ul>
              <p><Link className="link" href="/privacy-policy">Privacy policy</Link> · <Link className="link" href="/terms">Terms</Link> · <Link className="link" href="/faq">FAQ</Link></p>
            </Reveal>
          </div>

          <h2 className="subh">Aluminium Handles & Hardware in Pakistan: What We Offer</h2>
          <div className="seogrid">
            {seo.map((b, i) => (<Reveal key={i} as="article" delay={(i % 3) * 80} className="scard"><h3>{b.title}</h3><p className="pre">{b.text}</p></Reveal>))}
          </div>

          <h2 className="subh">Aluminium Handles & Hardware: Frequently Asked Questions</h2>
          <div className="narrow"><FAQ faqs={homeFaqs} /></div>
          <p className="center"><Link className="btn btn-outline" href="/faq">See All FAQs</Link></p>

          <div className="popwrap"><PopularSearches items={popular} /></div>

          <div className="ctaband">
            <h2>Need Wholesale Rates Today?</h2>
            <p>Call {site.phone} or message us on WhatsApp.</p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Link className="btn" href="/contact">Contact Us</Link>
              <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
