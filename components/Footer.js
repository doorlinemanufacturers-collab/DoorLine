import Link from 'next/link';
import ContactLines from './ContactLines';

export default function Footer({ site }) {
  return (
    <footer className="footer">
      <div className="container footgrid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.tagline}</p>
          <p className="footlinks">
            <Link href="/">Home</Link> · <Link href="/products">Products</Link> · <Link href="/about">About</Link> · <Link href="/faq">FAQ</Link> · <Link href="/contact">Contact Us</Link>
          </p>
        </div>
        <address><ContactLines site={site} /></address>
      </div>
      <div className="copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
