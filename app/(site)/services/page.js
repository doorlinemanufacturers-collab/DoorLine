import { getContent } from '@/lib/store';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Top Aluminium Anodizing & Electroplating in Lahore | Direct Rates',
  description: 'Premium quality aluminium anodizing and electroplating in Lahore at cheap, direct factory rates with no middleman. Bulk and job work orders across Pakistan.',
  keywords: ['aluminium anodizing in Lahore', 'electroplating in Lahore', 'anodizing service Pakistan', 'aluminium electroplating service', 'top anodizing service in Lahore', 'cheap anodizing price Lahore', 'premium quality electroplating Lahore'],
  alternates: { canonical: '/services' },
};

export default async function Services() {
  const { services } = await getContent();
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Aluminium Anodizing & Electroplating Services in Lahore</h1>
        <p className="lead">Finishing services for aluminium handles, hardware and parts, available for bulk and job work orders.</p>
        <div className="grid">{services.map((s, i) => <Reveal key={s.slug} delay={i * 100}><ServiceCard s={s} /></Reveal>)}</div>
      </div>
    </section>
  );
}
