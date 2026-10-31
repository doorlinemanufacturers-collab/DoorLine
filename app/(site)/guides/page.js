import Link from 'next/link';
import { getContent } from '@/lib/store';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: { absolute: 'Aluminum Handles Guides | Pakistan, Lahore | Doorline' },
  description: 'Guides from an aluminum handles manufacturer in Pakistan, Lahore: door handle size, cabinet hole spacing, anodizing, electroplating and wholesale buying.',
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
