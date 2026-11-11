import Link from 'next/link';
import { getContent } from '@/lib/store';
import { liveHref } from '@/lib/linkMap';

export default async function RelatedLinks({ groups = [], title = 'Explore More From DoorLine Manufacturers', alt = true }) {
  const c = await getContent();
  const list = groups.map((g) => ({ ...g, links: (g.links || []).filter((l) => liveHref(l.href, c)) })).filter((g) => g.links.length);
  if (!list.length) return null;
  return (
    <section className={`section${alt ? ' alt' : ''}`}>
      <nav className="container" aria-label={title}>
        <h2>{title}</h2>
        <div className="relgrid">
          {list.map((g) => (
            <div key={g.heading}>
              <h3 className="relh">{g.heading}</h3>
              <ul className="ticks">{g.links.map((l) => <li key={l.href}><Link className="link" href={l.href}>{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </nav>
    </section>
  );
}
