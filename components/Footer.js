import ContactLines from './ContactLines';

export default function Footer({ site }) {
  return (
    <footer className="footer">
      <div className="container footgrid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.tagline}</p>
        </div>
        <address><ContactLines site={site} /></address>
      </div>
      <div className="copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
