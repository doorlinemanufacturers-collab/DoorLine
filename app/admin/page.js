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
    if (!r.ok) setErr(j.error || 'Save fail'); else setMsg('Saved. Your website is updated.');
  };

  const up = (path, v) => setC((o) => { const n = structuredClone(o); let t = n; for (let i = 0; i < path.length - 1; i++) t = t[path[i]]; t[path[path.length - 1]] = v; return n; });
  const upProd = (i, k, v) => up(['products', i, k], v);
  const addProd = () => {
    const n = c.products.length + 1;
    setC({ ...c, products: [{ id: `new-${Date.now()}`, slug: '', model: `DL-${500 + n}`, name: 'New Aluminium Handle', category: 'Door Handles', image: '', alt: '', desc: '', size: '', finish: '', colors: '' }, ...c.products] });
    setOpen(0);
  };
  const delProd = (i) => { if (confirm('Delete this product?')) setC({ ...c, products: c.products.filter((_, x) => x !== i) }); };
  const finalize = (p) => {
    const slug = p.slug ? slugify(p.slug) : `${slugify(p.name)}-${slugify(p.model)}-lahore`;
    return { ...p, slug, alt: p.alt };
  };
  const doSaveProducts = () => { setC((o) => ({ ...o, products: o.products.map(finalize) })); setTimeout(save, 50); };
  const doSaveServices = () => { setC((o) => ({ ...o, services: o.services.map(finSvc) })); setTimeout(save, 50); };
  const doSaveGuides = () => { setC((o) => ({ ...o, guides: o.guides.map((g) => ({ ...g, slug: slugify(g.slug || g.title) })) })); setTimeout(save, 50); };
  const finSvc = (x) => ({ ...x, slug: slugify(x.slug || x.title) });

  const upload = async (i, file) => {
    if (!file) return; setMsg('Uploading...'); setErr('');
    const fd = new FormData(); fd.append('file', await compress(file));
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await r.json();
    if (!r.ok) { setMsg(''); return setErr(j.error); }
    upProd(i, 'image', j.url); setMsg((j.storage === 'blob' ? 'Image uploaded to Blob storage. Now click Save Changes.' : 'Blob is not connected, so the image was saved in backup storage. Now click Save Changes.'));
  };

  const uploadSvc = async (i, file) => {
    if (!file) return; setMsg('Uploading...'); setErr('');
    const fd = new FormData(); fd.append('file', await compress(file));
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await r.json();
    if (!r.ok) { setMsg(''); return setErr(j.error); }
    up(['services', i, 'image'], j.url); setMsg((j.storage === 'blob' ? 'Image uploaded to Blob storage. Now click Save Changes.' : 'Blob is not connected, so the image was saved in backup storage. Now click Save Changes.'));
  };

  const compress = (file) => new Promise((resolve) => {
    const img = new window.Image();
    const u = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, 1100 / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.width * r); cv.height = Math.round(img.height * r);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      cv.toBlob((b) => { URL.revokeObjectURL(u); resolve(b ? new File([b], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file); }, 'image/jpeg', 0.82);
    };
    img.onerror = () => resolve(file);
    img.src = u;
  });

  const [leads, setLeads] = useState(null);
  const loadLeads = async () => { const r = await fetch('/api/admin/leads', { cache: 'no-store' }); const j = await r.json(); setLeads(j.leads || []); };
  useEffect(() => { if (tab === 'leads' && auth) loadLeads(); }, [tab, auth]);

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

  const tabs = [['general', 'Contact & Info'], ['hero', 'Hero & About'], ['why', 'Why Us'], ['seo', 'Home SEO Text'], ['services', `Services (${c.services.length})`], ['guides', `Guides (${(c.guides || []).length})`], ['leads', 'Inquiries'], ['products', `Products (${c.products.length})`], ['faqs', `FAQs (${c.faqs.length})`]];
  return (
    <div className="adm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>DoorLine Admin Dashboard</h1>
        <div><a href="/" target="_blank" style={{ marginRight: 12 }}>View site</a><button className="tab" onClick={logout}>Logout</button></div>
      </div>
      {!storage && <p className="err">⚠️ Storage is not connected, so changes cannot be saved yet. In Vercel open your project, then the Storage tab, create an Upstash Redis (KV) database, connect it to this project and redeploy. See the README for details.</p>}
      <div className="tabs">{tabs.map(([k, l]) => <button key={k} className={`tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>{l}</button>)}</div>

      {tab === 'guides' && (
        <>
          <p className="muted" style={{ marginBottom: 10 }}>Guides are helpful articles that bring buyers from Google. Start a line with ## for a heading and separate blocks with a blank line.</p>
          <p><button className="btn btn-sm" onClick={() => { setC({ ...c, guides: [{ slug: '', title: 'New Guide', description: '', body: '' }, ...(c.guides || [])] }); setOpen(0); }}>+ Add Guide</button></p>
          {(c.guides || []).map((g, i) => (
            <div className="panel" key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}><strong>{g.title}</strong><span>{open === i ? '▲' : '▼'}</span></div>
              {open === i && (
                <>
                  <Field label="Title" value={g.title} onChange={(v) => up(['guides', i, 'title'], v)} />
                  <Field label="URL slug (leave empty to generate automatically)" value={g.slug} onChange={(v) => up(['guides', i, 'slug'], v)} />
                  <Field label="Short description (Google description, max 158 characters)" area value={g.description} onChange={(v) => up(['guides', i, 'description'], v)} />
                  <Field label="Article text" area rows={14} value={g.body} onChange={(v) => up(['guides', i, 'body'], v)} />
                  <p style={{ marginTop: 10 }}><button className="btn btn-sm danger" onClick={() => { if (confirm('Delete this guide?')) setC({ ...c, guides: c.guides.filter((_, z) => z !== i) }); }}>Delete Guide</button></p>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {tab === 'leads' && (
        <>
          <p className="muted" style={{ marginBottom: 10 }}>Inquiries sent from the website forms appear here (latest first).</p>
          {!leads && <p>Loading...</p>}
          {leads && leads.length === 0 && <p className="muted">No inquiries yet.</p>}
          {leads && leads.map((l, i) => (
            <div className="panel" key={l.id || i}>
              <strong>{l.name}</strong> <span className="muted">{l.date ? new Date(l.date).toLocaleString() : ''}</span>
              <p>{l.shop ? `${l.shop} - ` : ''}{l.city}</p>
              <p><a href={`tel:${l.phone}`}>{l.phone}</a> | <a href={`https://wa.me/${String(l.phone).replace(/\D/g, '').replace(/^0/, '92')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
              <p className="pre">{l.msg}</p>
              <button className="btn btn-sm danger" onClick={async () => { await fetch('/api/admin/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ raw: l._raw }) }); loadLeads(); }}>Delete</button>
            </div>
          ))}
        </>
      )}

      {tab === 'general' && (
        <div className="panel">
          {[['name', 'Business Name'], ['tagline', 'Tagline'], ['owner', 'Contact Person Name'], ['phone', 'Call Number (display)'], ['whatsappDisplay', 'WhatsApp Number (display)'], ['whatsapp', 'WhatsApp number for link (923454880180, no + or spaces)'], ['email', 'Email'], ['address', 'Full Address'], ['hours', 'Opening Hours (text)'], ['mapQuery', 'Google Map search text (address or place name)'], ['facebook', 'Facebook page URL (optional)'], ['instagram', 'Instagram URL (optional)'], ['youtube', 'YouTube URL (optional)'], ['googleBusiness', 'Google Business Profile URL (optional)']].map(([k, l]) => (
            <Field key={k} label={l} value={c.site[k]} onChange={(v) => up(['site', k], v)} />
          ))}
          <Field label="Delivery cities (one per line)" area rows={6} value={(c.cities || []).join('\n')} onChange={(v) => up(['cities'], v.split('\n'))} />
        </div>
      )}

      {tab === 'hero' && (
        <div className="panel">
          <Field label="Hero H1 heading" area value={c.hero.h1} onChange={(v) => up(['hero', 'h1'], v)} />
          <Field label="Trust badges under the hero text (one per line)" area rows={5} value={(c.badges || []).join('\n')} onChange={(v) => up(['badges'], v.split('\n'))} />
          <Field label="Hero sub text" area value={c.hero.sub} onChange={(v) => up(['hero', 'sub'], v)} />
          <Field label="Hero image path or URL (leave empty to show no image)" value={c.hero.image} onChange={(v) => up(['hero', 'image'], v)} />
          <Thumb src={c.hero.image} />
          {c.hero.image && <p style={{ marginTop: 8 }}><button className="btn btn-sm danger" onClick={() => up(['hero', 'image'], '')}>Remove hero image</button></p>}
          <Field label="Our Vision" area value={c.about.vision} onChange={(v) => up(['about', 'vision'], v)} />
          <Field label="Our Mission" area value={c.about.mission} onChange={(v) => up(['about', 'mission'], v)} />
          <Field label="Our Promise" area value={c.about.promise} onChange={(v) => up(['about', 'promise'], v)} />
          <Field label="About title" value={c.about.title} onChange={(v) => up(['about', 'title'], v)} />
          <Field label="About text" area rows={7} value={c.about.text} onChange={(v) => up(['about', 'text'], v)} />
        </div>
      )}

      {tab === 'seo' && (
        <>
          <p className="muted" style={{ marginBottom: 10 }}>These text blocks appear on the home page and help your Google ranking. Keep them natural and useful.</p>
          {c.seo.map((b, i) => (
            <div className="panel" key={i}>
              <Field label="Heading" value={b.title} onChange={(v) => up(['seo', i, 'title'], v)} />
              <Field label="Text" area rows={5} value={b.text} onChange={(v) => up(['seo', i, 'text'], v)} />
              <p style={{ marginTop: 10 }}><button className="btn btn-sm danger" onClick={() => setC({ ...c, seo: c.seo.filter((_, x) => x !== i) })}>Delete</button></p>
            </div>
          ))}
          <button className="btn btn-sm" onClick={() => setC({ ...c, seo: [...c.seo, { title: '', text: '' }] })}>+ Add text block</button>
        </>
      )}

      {tab === 'services' && (
        <>
          <p className="muted" style={{ marginBottom: 10 }}>Service pages (anodizing, electroplating and more). Each service gets its own page, Google schema and FAQ.</p>
          <p><button className="btn btn-sm" onClick={() => { setC({ ...c, services: [{ slug: '', title: 'New Service in Lahore', short: '', image: '', keywords: '', intro: '', points: '', body: '', faqs: [] }, ...c.services] }); setOpen(0); }}>+ Add Service</button></p>
          {c.services.map((x, i) => (
            <div className="panel" key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}><strong>{x.title}</strong><span>{open === i ? '▲' : '▼'}</span></div>
              {open === i && (
                <>
                  <Field label="Title (include the keyword, e.g. Aluminium Anodizing Service in Lahore)" value={x.title} onChange={(v) => up(['services', i, 'title'], v)} />
                  <Field label="URL slug (leave empty to generate automatically)" value={x.slug} onChange={(v) => up(['services', i, 'slug'], v)} />
                  <Field label="Google title (meta title, max 70 characters)" value={x.metaTitle} onChange={(v) => up(['services', i, 'metaTitle'], v)} />
                  <Field label="Short description" area value={x.short} onChange={(v) => up(['services', i, 'short'], v)} />
                  <Field label="Image path or URL" value={x.image} onChange={(v) => up(['services', i, 'image'], v)} />
                  <Thumb src={x.image} />
                  {x.image && <p style={{ marginTop: 8 }}><button className="btn btn-sm danger" onClick={() => up(['services', i, 'image'], '')}>Remove image</button></p>}
                  <label>Or upload a new image (max 4MB)</label>
                  <input type="file" accept="image/*" onChange={(e) => uploadSvc(i, e.target.files[0])} />
                  <Field label="SEO keywords (comma separated)" area value={x.keywords} onChange={(v) => up(['services', i, 'keywords'], v)} />
                  <Field label="Introduction" area rows={4} value={x.intro} onChange={(v) => up(['services', i, 'intro'], v)} />
                  <Field label="Key points (one per line)" area rows={5} value={x.points} onChange={(v) => up(['services', i, 'points'], v)} />
                  <Field label="Details text (start a line with ## for a heading; separate blocks with a blank line)" area rows={14} value={x.body} onChange={(v) => up(['services', i, 'body'], v)} />
                  <label>FAQs</label>
                  {(x.faqs || []).map((f, k) => (
                    <div key={k} style={{ borderTop: '1px solid #eee', paddingTop: 8 }}>
                      <Field label="Question" value={f.q} onChange={(v) => up(['services', i, 'faqs', k, 'q'], v)} />
                      <Field label="Answer" area value={f.a} onChange={(v) => up(['services', i, 'faqs', k, 'a'], v)} />
                      <button className="btn btn-sm danger" style={{ marginTop: 6 }} onClick={() => up(['services', i, 'faqs'], x.faqs.filter((_, z) => z !== k))}>Delete FAQ</button>
                    </div>
                  ))}
                  <p style={{ marginTop: 10 }}><button className="btn btn-sm" onClick={() => up(['services', i, 'faqs'], [...(x.faqs || []), { q: '', a: '' }])}>+ Add FAQ</button> <button className="btn btn-sm danger" onClick={() => { if (confirm('Delete this service?')) setC({ ...c, services: c.services.filter((_, z) => z !== i) }); }}>Delete Service</button></p>
                </>
              )}
            </div>
          ))}
        </>
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
                  <Field label="URL slug (leave empty to generate automatically)" value={p.slug} onChange={(v) => upProd(i, 'slug', v)} />
                  <Field label="Description" area value={p.desc} onChange={(v) => upProd(i, 'desc', v)} />
                  <div className="two">
                    <div><Field label="Size" value={p.size} onChange={(v) => upProd(i, 'size', v)} /></div>
                    <div><Field label="Finish" value={p.finish} onChange={(v) => upProd(i, 'finish', v)} /></div>
                  </div>
                  <Field label="Colours (comma separated, e.g. Black, Gold)" value={p.colors} onChange={(v) => upProd(i, 'colors', v)} />
                  <Field label="Price in PKR (optional - leave empty to show 'call for rate')" value={p.price} onChange={(v) => upProd(i, 'price', v)} />
                  <Field label="Image path or URL" value={p.image} onChange={(v) => upProd(i, 'image', v)} />
                  <label>Or upload a new image (max 4MB)</label>
                  <input type="file" accept="image/*" onChange={(e) => upload(i, e.target.files[0])} />
                  <Thumb src={p.image} />
                  {p.image && <p style={{ marginTop: 8 }}><button className="btn btn-sm danger" onClick={() => upProd(i, 'image', '')}>Remove image</button></p>}
                  <Field label="Image alt text (leave empty: auto uses product name, model, colour, Lahore)" value={p.alt} onChange={(v) => upProd(i, 'alt', v)} />
                  <p className="muted" style={{ marginTop: 14 }}>Automatic SEO: title, description, keywords, FAQs and search phrases are generated from the product name, category and colours. Optional overrides:</p>
                  <Field label="Extra search keywords (comma separated, optional)" value={p.keywords} onChange={(v) => upProd(i, 'keywords', v)} />
                  <Field label="Custom meta title (optional, max 70 characters)" value={p.metaTitle} onChange={(v) => upProd(i, 'metaTitle', v)} />
                  <Field label="Custom meta description (optional, max 158 characters)" area value={p.metaDesc} onChange={(v) => upProd(i, 'metaDesc', v)} />
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
        <button className="btn" disabled={busy} onClick={tab === 'products' ? doSaveProducts : tab === 'services' ? doSaveServices : tab === 'guides' ? doSaveGuides : save}>{busy ? 'Saving...' : 'Save Changes'}</button>
        {msg && <span className="ok">{msg}</span>}{err && <span className="err">{err}</span>}
      </div>
    </div>
  );
}
