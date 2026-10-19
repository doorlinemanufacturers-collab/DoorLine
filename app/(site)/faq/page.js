import { getContent } from '@/lib/store';
import FAQ from '@/components/FAQ';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FAQ - Wholesale Buyers | Aluminium Handles Lahore',
  description: 'Answers to common questions from wholesale buyers about aluminium door handle prices, bulk delivery across Pakistan, MOQ, colours and our Lahore factory.',
  alternates: { canonical: '/faq' },
};

export default async function FaqPage() {
  const { faqs } = await getContent();
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="h1s">FAQ - Wholesale Buyers</h1>
        <p className="lead">Common questions about buying aluminium handles wholesale from our Lahore factory.</p>
        <FAQ faqs={faqs} />
      </div>
    </section>
  );
}
