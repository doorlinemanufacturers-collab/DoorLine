export function siteUrl() {
  const u = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.doorlinemanufacturers.com');
  return u.replace(/\/$/, '');
}
export function waLink(phone, text) {
  const n = String(phone || '').replace(/\D/g, '');
  return `https://wa.me/${n}?text=${encodeURIComponent(text || '')}`;
}
export function slugify(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function fitTitle(...cands) {
  const list = cands.filter(Boolean);
  const ok = list.find((x) => x.length <= 60);
  if (ok) return ok;
  const last = list[list.length - 1] || '';
  return last.length <= 60 ? last : last.slice(0, 60).replace(/\s+\S*$/, '');
}

// Safe JSON-LD serializer: stops "</script>" or HTML in text from breaking out of the script tag.
export function jsonLd(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
