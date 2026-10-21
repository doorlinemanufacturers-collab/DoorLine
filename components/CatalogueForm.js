'use client';
import { useState } from 'react';
import { waLink } from '@/lib/site';

export default function CatalogueForm({ whatsapp, button = 'Request Catalogue on WhatsApp', title = 'Catalogue Request', source = 'home' }) {
  const [f, setF] = useState({ name: '', shop: '', city: '', phone: '', msg: '', website: '' });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = `${title}\nName: ${f.name}\nShop/Company: ${f.shop}\nCity: ${f.city}\nPhone: ${f.phone}\nRequirement: ${f.msg}`;
    try { fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, source }), keepalive: true }); } catch (err) { /* ignore */ }
    window.open(waLink(whatsapp, text), '_blank', 'noopener');
    setDone(true);
  };
  return (
    <form className="form" onSubmit={submit}>
      <input required placeholder="Your Name" value={f.name} onChange={set('name')} />
      <input placeholder="Shop / Company Name" value={f.shop} onChange={set('shop')} />
      <input required placeholder="City" value={f.city} onChange={set('city')} />
      <input required type="tel" placeholder="Phone / WhatsApp Number" value={f.phone} onChange={set('phone')} />
      <textarea rows="3" placeholder="Which products and quantities do you need?" value={f.msg} onChange={set('msg')} />
      <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set('website')} />
      <button className="btn" type="submit">{button}</button>
      {done && <p className="ok">Thank you! Your inquiry is saved and WhatsApp is opening. We will reply soon.</p>}
    </form>
  );
}
