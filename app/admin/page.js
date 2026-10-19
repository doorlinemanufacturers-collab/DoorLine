'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function Field({ label, value, onChange, area, rows = 3 }) {
  return (
    <>
      <label>{label}</label>
      {area ? <textarea rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} /> : <input value={value || ''} onChange={(e) => onChange(e.target.value)} />}
    </>
  );
}

function Thumb({ src }) {
  if (!src) return null;
  return <Image className="thumb" src={src} alt="preview" width={90} height={90} unoptimized />;
}

export default function Admin() {
  const [auth, setAuth] = useState(null); // null loading, false login, true in
  const [c, setC] = useState(null);
  const [storage, setStorage] = useState(true);
  const [tab, setTab] = useState('general');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(null);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const r = await fetch('/api/admin/content', { cache: 'no-store' });
    if (r.status === 401) return setAuth(false);
    const j = await r.json();
    setC(j.content); setStorage(j.storage); setAuth(true);
  };
  useEffect(() => { load(); }, []);

  const doLogin = async (e) => {
    e.preventDefault(); setErr('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(login) });
    if (!r.ok) return setErr((await r.json()).error || 'Login fail');
    load();
  };
  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); setAuth(false); setC(null); };

  const save = async () => {
    setBusy(true); setMsg(''); setErr('');
    const r = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: c }) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) setErr(j.error || 'Save fail'); else setMsg('Saved! Website update ho gayi.');
  };

  const up = (path, v) => setC((o) => { const n = structuredClone(o); let t = n; for (let i = 0; i < path.length - 1; i++) t = t[path[i]]; t[path[path.length - 1]] = v; return n; });
  const upProd = (i, k, v) => up(['products', i, k], v);
  const addProd = () => {
    const n = c.products.length + 1;
    setC({ ...c, products: [{ id: `new-${Date.now()}`, slug: '', model: `DL-${500 + n}`, name: 'New Aluminium Handle', category: 'Door Handles', image: '', alt: '', desc: '', size: '', finish: '', colors: '' }, ...c.products] });
    setOpen(0);
  };
  const delProd = (i) => { if (confirm('Is product ko delete karein?')) setC({ ...c, products: c.products.filter((_, x) => x !== i) }); };
  const finalize = (p) => {
    const slug = p.slug ? slugify(p.slug) : `${slugify(p.name)}-${slugify(p.model)}-lahore`;
    return { ...p, slug, alt: p.alt || `${p.name} ${p.model} ${p.size} Lahore Pakistan`.replace(/\s+/g, ' ').trim() };
  };
  const doSaveProducts = () => { setC((o) => ({ ...o, products: o.products.map(finalize) })); setTimeout(save, 50); };

  const upload = async (i, file) => {
    if (!file) return; setMsg('Uploading...'); setErr('');
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await r.json();
    if (!r.ok) { setMsg(''); return setErr(j.error); }
    upProd(i, 'image', j.url); setMsg('Image upload ho gayi - ab Save dabayein.');
  };

  if (auth === null) return <div className="login">Loading...</div>;
  if (auth === false) {
    return (
      <form className="login panel" onSubmit={doLogin}>
        <h1>Admin Login</h1>
        <label>Username</label>
        <input value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} autoComplete="username" required />
        <label>Password</label>
        <div className="pw">
          <input type={show ? 'text' : 'password'} value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} autoComplete="current-password" required />
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? '🙈' : '👁️'}</button>
        </div>
        <p style={{ marginTop: 16 }}><button className="btn" type="submit">Login</button></p>
        {err && <p className="err">{err}</p>}
      </form>
    );
  }

  const tabs = [['general', 'Contact & Info'], ['hero', 'Hero & About'], ['why', 'Why Us'], ['products', `Products (${c.products.length})`], ['faqs', `FAQs (${c.faqs.length})`]];
  return (
    <div className="adm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>DoorLine Admin Dashboard</h1>
        <div><a href="/" target="_blank" style={{ marginRight: 12 }}>View site</a><button className="tab" onClick={logout}>Logout</button></div>
      </div>
      {!storage && <p className="err">⚠️ Storage connect nahi hai - changes save nahi honge. Vercel me Upstash Redis (KV) connect karein (README dekhein).</p>}
      <div className="tabs">{tabs.map(([k, l]) => <button key={k} className={`tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>{l}</button>)}</div>

      {tab === 'general' && (
        <div className="panel">
          {[['name', 'Business Name'], ['tagline', 'Tagline'], ['owner', 'Contact Person Name'], ['phone', 'Call Number (display)'], ['whatsappDisplay', 'WhatsApp Number (display)'], ['whatsapp', 'WhatsApp number for link (923454880180, no + or spaces)'], ['email', 'Email'], ['address', 'Full Address'], ['hours', 'Opening Hours (text)'], ['mapQuery', 'Google Map search text (address ya place name)']].map(([k, l]) => (
            <Field key={k} label={l} value={c.site[k]} onChange={(v) => up(['site', k], v)} />
          ))}
        </div>
      )}

      {tab === 'hero' && (
        <div className="panel">
          <Field label="Hero H1 heading" area value={c.hero.h1} onChange={(v) => up(['hero', 'h1'], v)} />
          <Field label="Hero sub text" area value={c.hero.sub} onChange={(v) => up(['hero', 'sub'], v)} />
          <Field label="Hero image path/URL (e.g. /images/xyz.jpg)" value={c.hero.image} onChange={(v) => up(['hero', 'image'], v)} />
          <Thumb src={c.hero.image} />
          <Field label="About title" value={c.about.title} onChange={(v) => up(['about', 'title'], v)} />
          <Field label="About text" area rows={7} value={c.about.text} onChange={(v) => up(['about', 'text'], v)} />
        </div>
      )}

      {tab === 'why' && (
        <>
          {c.why.map((w, i) => (
            <div className="panel" key={i}>
              <Field label="Title" value={w.title} onChange={(v) => up(['why', i, 'title'], v)} />
              <Field label="Text" area value={w.text} onChange={(v) => up(['why', i, 'text'], v)} />
              <p style={{ marginTop: 10 }}><button className="btn btn-sm danger" onClick={() => setC({ ...c, why: c.why.filter((_, x) => x !== i) })}>Delete</button></p>
            </div>
          ))}
          <button className="btn btn-sm" onClick={() => setC({ ...c, why: [...c.why, { title: 'New point', text: '' }] })}>+ Add point</button>
        </>
      )}

      {tab === 'products' && (
        <>
          <p><button className="btn btn-sm" onClick={addProd}>+ Add New Product</button></p>
          {c.products.map((p, i) => (
            <div className="panel" key={p.id + i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}>
                <strong>{p.model} - {p.name}</strong><span>{open === i ? '▲' : '▼'}</span>
              </div>
              {open === i && (
                <>
                  <div className="two">
                    <div><Field label="Model (e.g. DL-101)" value={p.model} onChange={(v) => upProd(i, 'model', v)} /></div>
                    <div><Field label="Category" value={p.category} onChange={(v) => upProd(i, 'category', v)} /></div>
                  </div>
                  <Field label="Product Name" value={p.name} onChange={(v) => upProd(i, 'name', v)} />
                  <Field label="URL slug (khali chhorein to auto banega)" value={p.slug} onChange={(v) => upProd(i, 'slug', v)} />
                  <Field label="Description" area value={p.desc} onChange={(v) => upProd(i, 'desc', v)} />
                  <div className="two">
                    <div><Field label="Size" value={p.size} onChange={(v) => upProd(i, 'size', v)} /></div>
                    <div><Field label="Finish" value={p.finish} onChange={(v) => upProd(i, 'finish', v)} /></div>
                  </div>
                  <Field label="Colours" value={p.colors} onChange={(v) => upProd(i, 'colors', v)} />
                  <Field label="Image path/URL" value={p.image} onChange={(v) => upProd(i, 'image', v)} />
                  <label>Ya nayi image upload karein (max 4MB)</label>
                  <input type="file" accept="image/*" onChange={(e) => upload(i, e.target.files[0])} />
                  <Thumb src={p.image} />
                  <Field label="Image Alt text (SEO) - khali chhorein to auto" value={p.alt} onChange={(v) => upProd(i, 'alt', v)} />
                  <p style={{ marginTop: 12 }}><button className="btn btn-sm danger" onClick={() => delProd(i)}>Delete Product</button></p>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {tab === 'faqs' && (
        <>
          {c.faqs.map((f, i) => (
            <div className="panel" key={i}>
              <Field label="Question" value={f.q} onChange={(v) => up(['faqs', i, 'q'], v)} />
              <Field label="Answer" area value={f.a} onChange={(v) => up(['faqs', i, 'a'], v)} />
              <p style={{ marginTop: 10 }}><button className="btn btn-sm danger" onClick={() => setC({ ...c, faqs: c.faqs.filter((_, x) => x !== i) })}>Delete</button></p>
            </div>
          ))}
          <button className="btn btn-sm" onClick={() => setC({ ...c, faqs: [...c.faqs, { q: '', a: '' }] })}>+ Add FAQ</button>
        </>
      )}

      <div className="bar">
        <button className="btn" disabled={busy} onClick={tab === 'products' ? doSaveProducts : save}>{busy ? 'Saving...' : 'Save Changes'}</button>
        {msg && <span className="ok">{msg}</span>}{err && <span className="err">{err}</span>}
      </div>
    </div>
  );
}
