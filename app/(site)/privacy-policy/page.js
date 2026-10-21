import { getContent } from '@/lib/store';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How DoorLine Manufacturers handles the information you send through our inquiry and contact forms.',
  alternates: { canonical: '/privacy-policy' },
};

export default async function Privacy() {
  const { site } = await getContent();
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="h1s">Privacy Policy</h1>
        <p className="pre">{`${site.name} respects your privacy. This page explains what information we collect through this website and how we use it.

Information we collect
When you send an inquiry or catalogue request, we receive the details you enter: your name, shop or company name, city, phone number and message. If you contact us on WhatsApp, call or email, we receive the details you share in that conversation.

How we use it
We use this information only to reply to your inquiry, share rates and catalogues, and process your orders. We do not sell your information to anyone.

Cookies and analytics
This website does not require you to create an account. Our hosting and analytics tools may collect basic technical information such as browser type and pages visited to keep the site fast and secure.

Your choices
You can ask us to delete the information you sent us at any time by contacting us.

Contact
${site.name}, ${site.address}. Phone: ${site.phone}. Email: ${site.email}.`}</p>
      </div>
    </section>
  );
}
