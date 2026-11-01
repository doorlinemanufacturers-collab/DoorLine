import { getContent } from '@/lib/store';
import FAQ from '@/components/FAQ';


export const metadata = {
  title: { absolute: 'Aluminum Handles FAQ | Pakistan, Lahore | Doorline' },
  description: 'Answers about aluminum handle prices, delivery across Pakistan, MOQ, colours, anodizing and electroplating from our factory in Lahore.',
  alternates: { canonical: '/faq' },
};

export default async function FaqPage() {
  const { faqs } = await getContent();
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="h1s">FAQ - Wholesale Buyers</h1>
        <p className="lead">Common questions about buying aluminium handles wholesale and our anodizing and electroplating services.</p>
        <FAQ faqs={faqs} />
      </div>
    </section>
  );
}
