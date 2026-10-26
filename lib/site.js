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
