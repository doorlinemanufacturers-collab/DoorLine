'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { waLink } from '@/lib/site';

export default function Header({ site, categories }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const close = () => { setOpen(false); setSub(false); };
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" aria-label={`${site.name} - ${site.tagline}`} onClick={close}>
          <Image src="/images/logo.png" alt="DoorLine Manufacturers logo - aluminium handles manufacturer Lahore" width={65} height={48} priority style={{ height: 48, width: 'auto' }} />
        </Link>
        <nav className="desknav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
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
        <button className="dlink" onClick={() => setSub(!sub)} aria-expanded={sub}>Products <span>{sub ? '▲' : '▼'}</span></button>
        {sub && (
          <div className="subs">
            <Link href="/products" onClick={close}>All Products</Link>
            {categories.map((c) => <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} onClick={close}>{c}</Link>)}
          </div>
        )}
        <Link href="/about" onClick={close}>About Us</Link>
        <Link href="/faq" onClick={close}>FAQ - Wholesale Buyers</Link>
        <Link href="/contact" onClick={close}>Contact Us</Link>
      </aside>
    </header>
  );
}
