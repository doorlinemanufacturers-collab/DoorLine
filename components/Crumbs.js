import Link from 'next/link';
import { siteUrl } from '@/lib/site';

export default function Crumbs({ items = [] }) {
  const base = siteUrl();
  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, ...items.map((x, i) => ({ '@type': 'ListItem', position: i + 2, name: x.name, item: x.href ? `${base}${x.href}` : undefined }))] };
  return (
    <>
      <p className="crumb"><Link href="/">Home</Link>{items.map((x) => <span key={x.name}> / {x.href ? <Link href={x.href}>{x.name}</Link> : x.name}</span>)}</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
