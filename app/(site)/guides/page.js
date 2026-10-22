import Link from 'next/link';
import { getContent } from '@/lib/store';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Aluminium Handles Buying Guides | Size, Finish & Wholesale Tips',
  description: 'Practical guides from an aluminium handles manufacturer in Lahore: how to choose door handle size, cabinet handle hole spacing, anodized vs powder coated finish, and how to buy wholesale in Pakistan.',
  alternates: { canonical: '/guides' },
};

export default async function Guides() {
  const { guides } = await getContent();
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1s">Aluminium Handles Buying Guides</h1>
        <p className="lead">Simple, practical advice from DoorLine Manufacturers, a professional aluminium handles manufacturer in Lahore.</p>
        <div className="grid">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 90}>
              <article className="card"><Link href={`/guides/${g.slug}`}><div className="cardbody"><span className="cat">Guide</span><h3>{g.title}</h3><p className="muted">{g.description}</p><span className="link">Read guide →</span></div></Link></article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
