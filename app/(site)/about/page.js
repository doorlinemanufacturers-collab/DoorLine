import Link from 'next/link';
import { getContent } from '@/lib/store';


export const metadata = {
  title: 'About Us - Professional Aluminium Handles Manufacturer Lahore',
  description: 'Learn about DoorLine Manufacturers (direct factory rates, no middleman, premium quality), a direct factory of aluminium door handles, cabinet handles, window locks and hinges in Lahore, with anodizing and electroplating services.',
  alternates: { canonical: '/about' },
};

export default async function About() {
  const { about, why } = await getContent();
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <h1 className="h1s">{about.title}</h1>
          <p className="pre">{about.text}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Our Vision, Mission & Promise</h2>
          <div className="grid4">
            {[['Our Vision', about.vision], ['Our Mission', about.mission], ['Our Promise', about.promise]].map(([t, x]) => (<div key={t} className="box"><h3>{t}</h3><p>{x}</p></div>))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="grid4">{why.map((w, i) => (<div key={i} className="box"><h3>{w.title}</h3><p>{w.text}</p></div>))}</div>
          <p style={{ marginTop: 28 }}><Link className="btn" href="/contact">Contact Us</Link></p>
        </div>
      </section>
    </>
  );
}
