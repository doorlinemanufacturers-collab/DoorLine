import { getContent } from '@/lib/store';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms for orders, pricing, delivery and returns with DoorLine Manufacturers, aluminium handles manufacturer in Lahore.',
  alternates: { canonical: '/terms' },
};

export default async function Terms() {
  const { site } = await getContent();
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="h1s">Terms & Conditions</h1>
        <p className="pre">{`These terms apply to orders placed with ${site.name}.

Prices and quotes
Wholesale rates are quoted on request and depend on the model, size, finish and quantity. A quote is valid for the period stated when it is shared and may change with raw material cost.

Orders and production
An order is confirmed when we accept your requirement and the agreed advance or payment terms are met. Bulk and custom finish orders are produced after confirmation. Anodizing and electroplating job work depends on the sample and finish approved by both sides.

Delivery
We dispatch from Lahore to cities across Pakistan by transport or cargo. Delivery time depends on stock, the order size and the destination.

Defects and returns
Please check your goods on receipt. If you find a manufacturing defect, contact us promptly with photos and we will repair or replace the item where the defect is ours.

Contact
${site.name}, ${site.address}. Phone: ${site.phone}. Email: ${site.email}.`}</p>
      </div>
    </section>
  );
}
