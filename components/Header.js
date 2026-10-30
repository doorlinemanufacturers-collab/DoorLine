'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { waLink } from '@/lib/site';
import { catSlug } from '@/lib/categories';

export default function Header({ site, categories, services = [] }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [sv, setSv] = useState(false);
  const close = () => { setOpen(false); setSub(false); setSv(false); };
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" aria-label={`${site.name} - ${site.tagline}`} onClick={close}>
          <Image src="/images/logo.png" alt="DoorLine Manufacturers logo - aluminium handles manufacturer, anodizing and electroplating Lahore" width={65} height={48} priority style={{ height: 48, width: 'auto' }} />
        </Link>
        <nav className="desknav" aria-label="Main">
          <Link href="/aluminum-handles">Aluminum Handles</Link>
          <Link href="/aluminum-hardware">Aluminum Hardware</Link>
          {services.map((x) => <Link key={x.slug} href={`/services/${x.slug}`}>{/anodiz/i.test(x.title) ? 'Anodizing' : /plating/i.test(x.title) ? 'Electroplating' : x.title}</Link>)}
          <Link href="/guides">Guides</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <a className="btn btn-sm" href={waLink(site.whatsapp, 'Hello, I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      {open && <div className="overlay" onClick={close} />}
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawerhead"><strong>Menu</strong><button className="x" onClick={close} aria-label="Close menu">×</button></div>
        <Link href="/" onClick={close}>Home</Link>
        <button className="dlink" onClick={() => setSub(!sub)} aria-expanded={sub}>Aluminum Handles <span>{sub ? '▲' : '▼'}</span></button>
        {sub && (
          <div className="subs">
            <Link href="/aluminum-handles" onClick={close}>All Aluminum Handles</Link>
            {categories.map((c) => <Link key={c} href={`/collections/${catSlug(c)}`} onClick={close}>{c}</Link>)}
          </div>
        )}
        <button className="dlink" onClick={() => setSv(!sv)} aria-expanded={sv}>Services <span>{sv ? '▲' : '▼'}</span></button>
        {sv && (
          <div className="subs">
            <Link href="/services" onClick={close}>All Services</Link>
            {services.map((x) => <Link key={x.slug} href={`/services/${x.slug}`} onClick={close}>{x.title.replace(' in Lahore', '').replace(/ Services?/, '')}</Link>)}
          </div>
        )}
        <Link href="/aluminum-hardware" onClick={close}>Aluminum Hardware</Link>
        <Link href="/guides" onClick={close}>Buying Guides</Link>
        <Link href="/delivery-across-pakistan" onClick={close}>Delivery Across Pakistan</Link>
        <Link href="/about" onClick={close}>About Us</Link>
        <Link href="/faq" onClick={close}>FAQ - Wholesale Buyers</Link>
        <Link href="/contact" onClick={close}>Contact Us</Link>
      </aside>
    </header>
  );
}
