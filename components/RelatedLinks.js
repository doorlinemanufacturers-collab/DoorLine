import Link from 'next/link';

export default function RelatedLinks({ groups = [], title = 'Explore More From DoorLine Manufacturers', alt = true }) {
  const list = groups.filter((g) => g && g.links && g.links.length);
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
