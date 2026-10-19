import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/store';
import { waLink } from '@/lib/site';
import ProductCard from '@/components/ProductCard';
import CatalogueForm from '@/components/CatalogueForm';
import FAQ from '@/components/FAQ';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { absolute: 'Aluminium Handles Manufacturer in Lahore | Door & Cabinet Handles Wholesale - DoorLine' },
  description: 'DoorLine Manufacturers is a direct factory of aluminium door handles, kitchen cabinet handles, window locks and hinges in Lahore. Wholesale price, bulk delivery all over Pakistan.',
  keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore', 'aluminium anodizing in Lahore', 'electroplating in Lahore'],
  alternates: { canonical: '/' },
  openGraph: { title: 'DoorLine Manufacturers - Aluminium Handles Manufacturer Lahore', description: 'Factory price aluminium door and cabinet handles for bulk buyers. Delivery all over Pakistan.', url: '/', images: ['/images/fluted-bar-handle-white-gold.jpg'] },
};

export default async function Home() {
  const { site, hero, why, products, faqs, seo, services } = await getContent();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return (
    <>
      <section className="hero">
        <div className="container herogrid">
          <div>
            <h1>{hero.h1}</h1>
            <p>{hero.sub}</p>
            <div className="row">
              <Link className="btn" href="/products">View Products</Link>
              <a className="btn btn-outline" href={waLink(site.whatsapp, 'Hello, I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">WhatsApp Rates</a>
            </div>
          </div>
          <div className="heroimg">
            <Image src={hero.image} alt="Aluminium door handle manufacturer Lahore Pakistan - fluted bar handles" fill priority sizes="(max-width: 900px) 100vw, 45vw" className="pimg" />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="track">{[0, 1].map((k) => <span key={k}>Door Handles ✦ Cabinet Handles ✦ Window Locks ✦ Hinges ✦ Anodizing ✦ Electroplating ✦ Wholesale Lahore ✦ Delivery All Over Pakistan ✦ </span>)}</div></div>

      <section className="section">
        <Reveal className="container">
          <h2>Product Categories</h2>
          <p className="lead">Browse our aluminium handle range by category.</p>
          <div className="grid4">
            {categories.map((c) => (
              <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} className="box catbox">
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
          <p className="lead">Door handles, cabinet handles, window locks and hinges at wholesale factory prices.</p>
          <div className="grid">{products.slice(0, 8).map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><ProductCard p={p} /></Reveal>)}</div>
          <p style={{ marginTop: 28, textAlign: 'center' }}><Link className="btn" href="/products">View All Products</Link></p>
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

      <section id="catalogue" className="section">
        <div className="container narrow">
          <h2>Request Wholesale Catalogue</h2>
          <p className="lead">Fill in the form and we will send the catalogue and latest rate list on WhatsApp.</p>
          <CatalogueForm whatsapp={site.whatsapp} />
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <h2>Frequently Asked Questions</h2>
          <FAQ faqs={faqs.slice(0, 4)} schema={false} />
          <p style={{ marginTop: 20 }}><Link className="btn btn-outline" href="/faq">See All FAQs</Link></p>
        </div>
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
