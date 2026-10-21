import Link from 'next/link';
import { getContent } from '@/lib/store';


export const metadata = {
  title: 'About Us - Professional Aluminium Handles Manufacturer Lahore',
  description: 'Learn about DoorLine Manufacturers (direct factory rates, no middleman, premium quality), a direct factory of aluminium door handles, cabinet handles, window locks and hinges in Lahore, with anodizing and electroplating services.',
  alternates: { canonical: '/about' },
};

export default async function About() {
  const { about, why, site } = await getContent();
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <h1 className="h1s">{about.title}</h1>
          <p className="pre">{about.text}</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <h2>DoorLine Manufacturers at a Glance</h2>
          <table className="spec"><tbody>
            <tr><th>Business</th><td>{site.name} - professional aluminium handles manufacturer</td></tr>
            <tr><th>Location</th><td>{site.address}</td></tr>
            <tr><th>Products</th><td>Aluminium door handles, cabinet handles, window locks, hinges, fitting parts</td></tr>
            <tr><th>Services</th><td>Aluminium anodizing and electroplating</td></tr>
            <tr><th>Customers</th><td>Hardware shops, fabricators, dealers, furniture makers, contractors</td></tr>
            <tr><th>Pricing</th><td>Direct factory rates, no middleman</td></tr>
            <tr><th>Delivery</th><td>All over Pakistan</td></tr>
            <tr><th>Contact person</th><td>{site.owner}</td></tr>
          </tbody></table>
        </div>
      </section>
      <section className="section alt">
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
