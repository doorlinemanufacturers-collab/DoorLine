import { getContent } from '@/lib/store';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';


export const metadata = {
  title: 'Anodizing & Electroplating Services in Pakistan and Lahore | Doorline',
  description: 'Aluminium anodizing and electroplating services in Pakistan and Lahore. Direct factory rates, bulk and job work orders. Call or WhatsApp for price.',
  keywords: ['aluminium anodizing in Lahore', 'electroplating in Lahore', 'anodizing service Pakistan', 'aluminium electroplating service', 'top anodizing service in Lahore', 'cheap anodizing price Lahore', 'premium quality electroplating Lahore'],
  alternates: { canonical: '/services' },
};

export default async function Services() {
  const { services } = await getContent();
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Aluminium Anodizing & Electroplating Services in Pakistan and Lahore</h1>
        <p className="lead">Finishing services for aluminium handles, hardware and parts, available for bulk and job work orders.</p>
        <div className="grid">{services.map((s, i) => <Reveal key={s.slug} delay={i * 100}><ServiceCard s={s} /></Reveal>)}</div>
      </div>
    </section>
  );
}
