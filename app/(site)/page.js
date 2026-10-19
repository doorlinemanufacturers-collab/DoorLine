import Image from 'next/image';
import { getContent } from '@/lib/store';
import { waLink } from '@/lib/site';
import ProductCard from '@/components/ProductCard';
import CatalogueForm from '@/components/CatalogueForm';
import ContactLines from '@/components/ContactLines';
import FAQ from '@/components/FAQ';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { absolute: 'Aluminium Handles Manufacturer in Lahore | Door & Cabinet Handles Wholesale - DoorLine' },
  description: 'DoorLine Manufacturers - direct factory of aluminium door handles, kitchen cabinet handles, window locks & hinges in Lahore. Wholesale price, bulk delivery all over Pakistan.',
  keywords: ['aluminium handles manufacturer in Lahore', 'aluminium door handles wholesale Pakistan', 'kitchen cabinet handles factory Lahore', 'door handles supplier Pakistan', 'aluminium handles wholesale market Lahore'],
  alternates: { canonical: '/' },
  openGraph: { title: 'DoorLine Manufacturers - Aluminium Handles Manufacturer Lahore', description: 'Factory price aluminium door & cabinet handles for bulk buyers. Delivery all over Pakistan.', url: '/', images: ['/images/fluted-bar-handle-white-gold.jpg'] },
};

export default async function Home() {
  const { site, hero, about, why, products, faqs } = await getContent();
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&output=embed`;
  return (
    <>
      <section className="hero">
        <div className="container herogrid">
          <div>
            <h1>{hero.h1}</h1>
            <p>{hero.sub}</p>
            <div className="row">
              <a className="btn" href="#catalogue">Get Catalogue</a>
              <a className="btn btn-outline" href={waLink(site.whatsapp, 'I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">WhatsApp Rates</a>
            </div>
          </div>
          <div className="heroimg">
            <Image src={hero.image} alt="Aluminium door handle manufacturer Lahore Pakistan - fluted bar handles" fill priority sizes="(max-width: 900px) 100vw, 45vw" className="pimg" />
          </div>
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <h2>Our Products</h2>
          <p className="lead">Aluminium door handles, cabinet handles, window locks & hinges - wholesale from factory.</p>
          <div className="grid">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <section id="why" className="section alt">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="grid4">
            {why.map((w, i) => (<div key={i} className="box"><h3>{w.title}</h3><p>{w.text}</p></div>))}
          </div>
        </div>
      </section>

      <section id="catalogue" className="section">
        <div className="container narrow">
          <h2>Request Wholesale Catalogue</h2>
          <p className="lead">Form bharein - catalogue aur latest rate list WhatsApp par mil jayegi.</p>
          <CatalogueForm whatsapp={site.whatsapp} />
        </div>
      </section>

      <FAQ faqs={faqs} />

      <section id="about" className="section">
        <div className="container narrow">
          <h2>{about.title}</h2>
          <p className="pre">{about.text}</p>
        </div>
      </section>

      <section id="contact" className="section alt">
        <div className="container contactgrid">
          <div>
            <h2>Contact</h2>
            <address><ContactLines site={site} /></address>
            <p><a className="btn" href={waLink(site.whatsapp, 'Assalam o Alaikum')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
          </div>
          <iframe title={`${site.name} factory location Lahore`} src={map} loading="lazy" className="map" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
