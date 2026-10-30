import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/store';
import { waLink } from '@/lib/site';
import ProductCard from '@/components/ProductCard';
import CatalogueForm from '@/components/CatalogueForm';
import FAQ from '@/components/FAQ';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';
import Badges from '@/components/Badges';
import PopularSearches from '@/components/PopularSearches';
import AnodizingAnimation from '@/components/AnodizingAnimation';
import { slugify } from '@/lib/site';
import { catSlug } from '@/lib/categories';


export async function generateMetadata() {
  const { site } = await getContent();
  const title = 'Aluminum Handles & Aluminum Hardware - Wholesaler & Manufacturer in Pakistan and Lahore | Doorline';
  const description = `Aluminum handles & aluminum hardware: Wholesaler & Manufacturer in Pakistan and Lahore. Anodizing, electroplating. Call ${site.phone} for price.`.slice(0, 155);
  return {
    title: { absolute: title }, description,
    keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore', 'aluminium handles wholesale market Lahore', 'aluminium anodizing in Lahore', 'electroplating in Lahore', 'top aluminium handles manufacturers in Lahore', 'best aluminium handles manufacturer Lahore', 'cheap aluminium door handles price Pakistan', 'direct factory rates aluminium handles', 'no middleman aluminium handles', 'premium quality aluminium handles', 'cheap anodizing price Lahore', 'premium quality anodizing Lahore', 'aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan', 'aluminium window handle wholesale Pakistan', 'sliding window lock supplier Lahore', 'aluminium glass door handle Pakistan', 'aluminium fabrication hardware Lahore', 'anodising service Lahore', 'colour anodizing Pakistan', 'electro plating Lahore', 'electroplating companies in Pakistan', 'aluminum handles manufacturer in Lahore', 'aluminum handels manufacturer in Lahore', 'steel aluminum handles manufacturer in Lahore', 'anodizing services in Lahore', 'anodizing Lahore', 'aluminum handles manufacturer in Karachi', 'aluminum handles manufacturer in Islamabad', 'aluminum handles manufacturer in Pakistan', 'wholesaler and manufacturer in Pakistan', 'aluminium handles wholesaler Lahore', 'aluminium hinges wholesaler Pakistan', 'aluminium handles supplier Pakistan'],
    alternates: { canonical: '/' },
    openGraph: { title, description, url: '/', images: ['/images/logo.png'] },
  };
}

export default async function Home() {
  const { site, hero, why, products, faqs, seo, services, badges, about, cities, guides, homeFaqs, popular } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return (
    <>
      <section className="hero">
        <div className={`container herogrid ${hero.image ? '' : 'herosolo'}`}>
          <div>
            <h1>{hero.h1}</h1>
            <p>{hero.sub}</p>
            <Badges items={badges} center={!hero.image} />
            <div className="row">
              <Link className="btn" href="/aluminum-handles">View Aluminum Handles</Link>
              <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello, I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">WhatsApp Rates</a>
            </div>
          </div>
          {hero.image ? (
            <div className="heroimg">
              <Image src={hero.image} alt="Aluminium door handle manufacturer, anodizing and electroplating Lahore Pakistan" fill priority sizes="(max-width: 900px) 100vw, 45vw" className="pimg" />
            </div>
          ) : null}
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="track">{[0, 1].map((k) => <span key={k}>Door Handles ✦ Cabinet Handles ✦ Window Locks ✦ Hinges ✦ Anodizing ✦ Electroplating ✦ Wholesale Lahore ✦ Delivery All Over Pakistan ✦ </span>)}</div></div>

      <section className="section">
        <Reveal className="container">
          <h2>Product Categories</h2>
          <p className="lead">Browse our aluminium handle range by category.</p>
          <div className="grid4">
            {categories.map((c) => (
              <Link key={c} href={`/collections/${catSlug(c)}`} className="box catbox">
                <h3>{c}</h3>
                <span className="link">Browse {c} →</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <h2>Anodizing & Electroplating Services</h2>
          <p className="lead">Professional aluminium finishing for handles, hardware and parts.</p>
          <div className="grid">{services.map((x, i) => <Reveal key={x.slug} delay={i * 120}><ServiceCard s={x} /></Reveal>)}</div>
        </div>
      </section>

      <section id="products" className="section alt">
        <div className="container">
          <h2>Featured Aluminium Handles</h2>
          <p className="lead">Door handles, cabinet handles, window locks and hinges at wholesale factory prices. Anodizing and electroplating available.</p>
          <div className="grid">{products.slice(0, 8).map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><ProductCard p={p} /></Reveal>)}</div>
          <p style={{ marginTop: 28, textAlign: 'center' }}><Link className="btn" href="/aluminum-handles">View All Aluminum Handles</Link></p>
        </div>
      </section>

      <section id="why" className="section">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="grid4">
            {why.map((w, i) => (<Reveal key={i} delay={i * 90} className="box"><h3>{w.title}</h3><p>{w.text}</p></Reveal>))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our Vision, Mission & Promise</h2>
          <div className="grid4">
            {[['Our Vision', about.vision], ['Our Mission', about.mission], ['Our Promise', about.promise]].map(([t, x], i) => (<Reveal key={t} delay={i * 100} className="box"><h3>{t}</h3><p>{x}</p></Reveal>))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          {seo.map((b, i) => (
            <Reveal key={i} as="article" className="seoblock">
              <h2>{b.title}</h2>
              <p className="pre">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="grid4">
            {[['1. Send Your Requirement', 'Share the models, colours and quantities you need on WhatsApp or through the form.'], ['2. Get Factory Rates', 'We reply with the latest wholesale rate list directly from the factory, no middleman.'], ['3. Confirm and Produce', 'Confirm the order. Ready stock ships fast and bulk orders are produced with your required finish.'], ['4. Delivery Across Pakistan', 'Your order is dispatched from Lahore by transport or cargo to your city.']].map(([t, x], i) => (<Reveal key={t} delay={i * 90} className="box"><h3>{t}</h3><p>{x}</p></Reveal>))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2>See How Anodizing Works</h2>
          <p className="lead">Our anodizing services in Pakistan and Lahore: watch the process and pick a colour.</p>
          <AnodizingAnimation />
          <p style={{ marginTop: 16, textAlign: 'center' }}><Link className="btn btn-outline" href="/services/aluminium-anodizing-service-lahore">Anodizing Services</Link> <Link className="btn btn-outline" href="/services/aluminium-electroplating-service-lahore">Electroplating Services</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Aluminium Handles Buying Guides</h2>
          <div className="grid4">{guides.slice(0, 4).map((g, i) => (<Reveal key={g.slug} delay={i * 90} className="box"><h3>{g.title}</h3><p className="muted">{g.description}</p><Link className="link" href={`/guides/${g.slug}`}>Read guide →</Link></Reveal>))}</div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Delivery All Over Pakistan</h2>
          <p className="lead">We supply aluminium handles, locks and hinges from Lahore to dealers and fabricators in every major city.</p>
          <div className="chips">{cities.slice(0, 12).map((c) => <Link key={c} className="chip" href={`/aluminium-handles-manufacturer/${slugify(c)}`}>{c}</Link>)}<Link className="chip on" href="/aluminium-handles-manufacturer/pakistan">Manufacturer in Pakistan →</Link><Link className="chip on" href="/delivery-across-pakistan">All cities →</Link></div>
        </div>
      </section>

      <section id="catalogue" className="section">
        <div className="container narrow">
          <h2>Request Wholesale Catalogue</h2>
          <p className="lead">Fill in the form and we will send the catalogue, latest rate list and anodizing and electroplating details on WhatsApp.</p>
          <CatalogueForm whatsapp={site.whatsapp} source="home" />
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <h2>Aluminum Handles & Hardware - Frequently Asked Questions</h2>
          <FAQ faqs={homeFaqs} />
          <p style={{ marginTop: 20 }}><Link className="btn btn-outline" href="/faq">See All FAQs</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container"><PopularSearches items={popular} /></div>
      </section>

      <section className="section cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Need Wholesale Rates Today?</h2>
          <p className="lead">Call {site.phone} or message us on WhatsApp.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <Link className="btn" href="/contact">Contact Us</Link>
            <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
