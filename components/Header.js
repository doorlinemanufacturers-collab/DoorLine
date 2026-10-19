import Link from 'next/link';
import Image from 'next/image';
import { waLink } from '@/lib/site';

export default function Header({ site }) {
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" aria-label={`${site.name} - ${site.tagline}`}>
          <Image src="/images/logo.png" alt="DoorLine Manufacturers logo - aluminium handles manufacturer Lahore" width={65} height={48} priority style={{ height: 48, width: 'auto' }} />
        </Link>
        <nav>
          <Link href="/#products">Products</Link>
          <Link href="/#why">Why Us</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <a className="btn btn-sm" href={waLink(site.whatsapp, 'Assalam o Alaikum, I need wholesale rates for aluminium handles.')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </header>
  );
}
