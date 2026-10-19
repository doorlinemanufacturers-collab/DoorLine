'use client';
import { useState } from 'react';
import { waLink } from '@/lib/site';

export default function CatalogueForm({ whatsapp, button = 'Request Catalogue on WhatsApp', title = 'Catalogue Request' }) {
  const [f, setF] = useState({ name: '', shop: '', city: '', phone: '', msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = `${title}\nName: ${f.name}\nShop/Company: ${f.shop}\nCity: ${f.city}\nPhone: ${f.phone}\nRequirement: ${f.msg}`;
    window.open(waLink(whatsapp, text), '_blank', 'noopener');
  };
  return (
    <form className="form" onSubmit={submit}>
      <input required placeholder="Your Name" value={f.name} onChange={set('name')} />
      <input placeholder="Shop / Company Name" value={f.shop} onChange={set('shop')} />
      <input required placeholder="City" value={f.city} onChange={set('city')} />
      <input required type="tel" placeholder="Phone / WhatsApp Number" value={f.phone} onChange={set('phone')} />
      <textarea rows="3" placeholder="Which products and quantities do you need?" value={f.msg} onChange={set('msg')} />
      <button className="btn" type="submit">{button}</button>
    </form>
  );
}
