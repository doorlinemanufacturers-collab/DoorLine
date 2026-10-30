import Link from 'next/link';

export default function PopularSearches({ items = [], title = 'Popular Searches' }) {
  const list = items.filter((x) => x && x.label && String(x.href || '').startsWith('/'));
  if (!list.length) return null;
  return (
    <nav aria-label={title} className="popsearch">
      <h2 className="poptitle">{title}</h2>
      <div className="chips">{list.map((x) => <Link key={x.label + x.href} href={x.href} className="chip">{x.label}</Link>)}</div>
    </nav>
  );
}
