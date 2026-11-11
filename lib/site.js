export function siteUrl() {
  const u = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.doorlinemanufacturers.com');
  return u.replace(/\/$/, '');
}
export function waLink(phone, text) {
  const n = String(phone || '').replace(/\D/g, '');
  return `/wa?n=${n}&text=${encodeURIComponent(text || '')}`;
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

// Rule: never show only "Lahore" in public text. Always "Lahore, Pakistan".
// Also applied to content saved from /admin, so old saved text follows the rule too.
const LAHORE_RULES = [
  [/(\b(?:in|at|from|near|of) )Lahore\b(?!,\s*(?:Pakistan|Punjab|Karachi|Islamabad))/g, '$1Lahore, Pakistan'],
  [/\b(Manufacturers?|Market|Factory|Wholesale|Anodizing|Electroplating|Handles|Hardware|Price) Lahore\b(?!,)/g, '$1 Lahore, Pakistan'],
  [/\b([Oo]ur) Lahore (factory|Factory|facility)\b/g, '$1 $2 in Lahore, Pakistan'],
  [/Lahore, Punjab(?!, Pakistan)/g, 'Lahore, Punjab, Pakistan'],
];
export function withPakistan(str) {
  if (typeof str !== 'string' || !str.includes('Lahore')) return str;
  return LAHORE_RULES.reduce((t, [re, rep]) => t.replace(re, rep), str);
}
const SKIP_KEYS = new Set(['slug', 'href', 'image', 'images', 'url', 'id', 'cities']);
export function deepWithPakistan(v, key) {
  if (SKIP_KEYS.has(key)) return v;
  if (typeof v === 'string') return withPakistan(v);
  if (Array.isArray(v)) return v.map((x) => deepWithPakistan(x, key));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepWithPakistan(x, k)]));
  return v;
}

// Complete LocalBusiness reference (address is required by Google/Semrush validators).
export function businessRef(site) {
  const base = siteUrl();
  const street = String(site.address || '').replace(/,\s*Lahore\b.*$/i, '').trim();
  const phone = '+92' + String(site.phone || '').replace(/\D/g, '').replace(/^0/, '');
  return {
    '@type': ['WholesaleStore', 'Organization'],
    '@id': `${base}/#business`,
    name: site.name,
    url: base,
    telephone: phone,
    image: `${base}/images/og-default.jpg`,
    address: { '@type': 'PostalAddress', streetAddress: street, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
  };
}
