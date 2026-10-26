'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://doorlinemanufacturers.com').replace(/\/$/, '');
const pSlug = (p) => (p.slug ? slugify(p.slug) : slugify(p.name));
const pUrl = (p) => `${SITE}/products/${pSlug(p)}`;

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
    setC({ ...j.content, products: (j.content.products || []).map((x) => ({ ...x, _s0: x.slug })) }); setStorage(j.storage); setAuth(true);
  };
  useEffect(() => { load(); }, []);

  const doLogin = async (e) => {
    e.preventDefault(); setErr('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(login) });
    if (!r.ok) return setErr((await r.json()).error || 'Login fail');
    load();
  };
  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); setAuth(false); setC(null); };

  const save = async (override) => {
    const data = override && override.products ? override : c;
    setBusy(true); setMsg(''); setErr('');
    const r = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: data }) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) setErr(j.error || 'Save fail'); else setMsg(tab === 'products' ? 'Saved. Product pages are live. Copy each new product link and request indexing in Google Search Console.' : 'Saved. Your website is updated.');
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
    const slug = p.slug ? slugify(p.slug) : slugify(p.name);
    const old = new Set(p.oldSlugs || []);
    if (p._s0 && p._s0 !== slug) old.add(p._s0);
    const { _s0, ...rest } = p;
    return { ...rest, slug, oldSlugs: [...old], alt: p.alt };
  };
  const doSaveProducts = () => {
    const seen = {};
    const next = { ...c, products: c.products.map(finalize).map((p) => { let sl = p.slug; let n = 2; while (seen[sl]) { sl = `${p.slug}-${n}`; n += 1; } seen[sl] = 1; return { ...p, slug: sl }; }) };
    setC(next); save(next);
  };
  const doSaveServices = () => { const next = { ...c, services: c.services.map(finSvc) }; setC(next); save(next); };
  const doSaveGuides = () => { const next = { ...c, guides: (c.guides || []).map((g) => ({ ...g, slug: slugify(g.slug || g.title) })) }; setC(next); save(next); };
  const finSvc = (x) => ({ ...x, slug: slugify(x.slug || x.title) });

  const upload = async (i, file) => {
    if (!file) return; setMsg('Uploading...'); setErr('');
    const fd = new FormData(); fd.append('file', await compress(file));
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await r.json();
    if (!r.ok) { setMsg(''); return setErr(j.error); }
    upProd(i, 'image', j.url); setMsg((j.storage === 'blob' ? 'Image uploaded to Blob storage. Now click Save Changes.' : 'Blob is not connected, so the image was saved in backup storage. Now click Save Changes.'));
  };

  const applyLatest = async () => {
    if (!confirm('Replace the website texts (SEO blocks, FAQs, guides, services text, cities, badges, Why Us, hero heading) with the latest version? Products, contact info and images stay as they are.')) return;
    const r = await fetch('/api/admin/defaults');
    const j = await r.json();
    const d = j.defaults;
    if (!d) return setErr('Could not load the latest texts.');
    setC((o) => ({
      ...o,
      seo: d.seo, faqs: d.faqs, cities: d.cities, badges: d.badges, why: d.why, guides: d.guides,
      services: d.services.map((x) => ({ ...x, image: ((o.services || []).find((y) => y.slug === x.slug) || {}).image || x.image })),
      hero: { ...o.hero, h1: d.hero.h1, sub: d.hero.sub },
      about: { ...o.about, vision: d.about.vision, mission: d.about.mission, promise: d.about.promise },
      deleted: [],
    }));
    setMsg('Latest texts loaded. Now click Save Changes to publish them.');
  };

  const uploadPreview = async (i, file) => {
    if (!file) return; setMsg('Uploading...'); setErr('');
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await r.json();
    if (!r.ok) { setMsg(''); return setErr(j.error); }
    upProd(i, 'previewImage', j.url); setMsg('Preview image uploaded. Now click Save Changes.');
  };

  const copyText = async (t) => { try { await navigator.clipboard.writeText(t); setMsg('Link copied.'); } catch (e) { setMsg('Copy failed. Select the link and copy it manually.'); } };

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

  const [draft, setDraft] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const aiWrite = async (i) => {
    const p = c.products[i];
    setAiBusy(true); setErr(''); setMsg('Writing draft...');
    try {
      const r = await fetch('/api/admin/ai-product', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: p.name, category: p.category, colors: p.colors, size: p.size, finish: p.finish, notes: p.aiNotes || '' }) });
      const j = await r.json();
      if (!r.ok) { setMsg(''); setErr(j.error || 'AI failed'); } else { setDraft({ i, data: j.draft }); setMsg('Draft ready. Review it below.'); }
    } catch (e) { setMsg(''); setErr('AI request failed.'); }
    setAiBusy(false);
  };
  const applyDraft = () => {
    const d = draft.data; const i = draft.i;
    setC((o) => { const n = structuredClone(o); const p = n.products[i]; p.desc = d.desc; p.useCase = d.useCase; p.specs = (d.specs || []).join('\n'); p.keywords = (d.keywords || []).join(', '); return n; });
    setDraft(null); setMsg('Draft applied. Check it, then click Save Changes.');
  };

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
                  <p style={{ marginTop: 10 }}><button className="btn btn-sm danger" onClick={() => { if (confirm('Delete this guide?')) setC({ ...c, guides: c.guides.filter((_, z) => z !== i), deleted: [...(c.deleted || []), g.slug] }); }}>Delete Guide</button></p>
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
          <p style={{ marginBottom: 12 }}><button className="btn btn-sm btn-outline" onClick={applyLatest}>Update website texts to the latest version</button></p>
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
                  <p style={{ marginTop: 10 }}><button className="btn btn-sm" onClick={() => up(['services', i, 'faqs'], [...(x.faqs || []), { q: '', a: '' }])}>+ Add FAQ</button> <button className="btn btn-sm danger" onClick={() => { if (confirm('Delete this service?')) setC({ ...c, services: c.services.filter((_, z) => z !== i), deleted: [...(c.deleted || []), x.slug] }); }}>Delete Service</button></p>
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
          <p><button className="btn btn-sm" onClick={addProd}>+ Add New Product</button> <button className="btn btn-sm btn-outline" onClick={() => copyText(c.products.map(pUrl).join('\n'))}>Copy all product links</button></p>
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
                  <label>Public page link (works after you click Save Changes)</label>
                  <input readOnly value={pUrl(p)} onFocus={(e) => e.target.select()} />
                  <p style={{ marginTop: 8 }}><button type="button" className="btn btn-sm" onClick={() => copyText(pUrl(p))}>Copy link</button> <a className="btn btn-sm btn-outline" href={pUrl(p)} target="_blank" rel="noopener noreferrer">Open page</a></p>
                  <p className="muted">After saving: Google Search Console, URL Inspection, paste this link, Request Indexing.</p>
                  <div className="panel" style={{ background: '#faf7f0' }}>
                    <strong>AI Product Writer</strong>
                    <p className="muted">Writes the description, use case, specs and keywords from the name, category, colours, size, finish and your notes. It uses only the facts you give. Always review before saving.</p>
                    <Field label="Notes for AI (optional: features, sizes, where it is used)" area rows={3} value={p.aiNotes} onChange={(v) => upProd(i, 'aiNotes', v)} />
                    <p style={{ marginTop: 10 }}><button type="button" className="btn btn-sm" disabled={aiBusy} onClick={() => aiWrite(i)}>{aiBusy ? 'Writing...' : 'Write draft with AI'}</button></p>
                    {draft && draft.i === i && (
                      <div style={{ marginTop: 12, borderTop: '1px solid #e4d5b0', paddingTop: 10 }}>
                        <p><strong>Description:</strong> {draft.data.desc}</p>
                        <p><strong>Use case:</strong> {draft.data.useCase}</p>
                        <p className="pre"><strong>Specs:</strong>{'\n'}{(draft.data.specs || []).join('\n')}</p>
                        <p><strong>Keywords:</strong> {(draft.data.keywords || []).join(', ')}</p>
                        <p className="muted">Using this draft replaces the description, use case, specs and extra keywords of this product.</p>
                        <p style={{ marginTop: 8 }}><button type="button" className="btn btn-sm" onClick={applyDraft}>Use this draft</button> <button type="button" className="btn btn-sm btn-outline" onClick={() => setDraft(null)}>Discard</button></p>
                      </div>
                    )}
                  </div>
                  <Field label="Description" area value={p.desc} onChange={(v) => upProd(i, 'desc', v)} />
                  <div className="two">
                    <div><Field label="Size" value={p.size} onChange={(v) => upProd(i, 'size', v)} /></div>
                    <div><Field label="Finish" value={p.finish} onChange={(v) => upProd(i, 'finish', v)} /></div>
                  </div>
 <Field label="Use case (for the Google description, e.g. aluminum doors and windows)" value={p.useCase} onChange={(v) => upProd(i, 'useCase', v)} />
                  <Field label="Technical specs (one per line, Name: Value)" area rows={4} value={p.specs} onChange={(v) => upProd(i, 'specs', v)} />
                  <Field label="Colours (comma separated, e.g. Black, Gold)" value={p.colors} onChange={(v) => upProd(i, 'colors', v)} />
                  <Field label="Price in PKR (optional - leave empty to show 'call for rate')" value={p.price} onChange={(v) => upProd(i, 'price', v)} />
                  <Field label="Image path or URL" value={p.image} onChange={(v) => upProd(i, 'image', v)} />
                  <label>Or upload a new image (max 4MB)</label>
                  <input type="file" accept="image/*" onChange={(e) => upload(i, e.target.files[0])} />
                  <Thumb src={p.image} />
                  {p.image && <p style={{ marginTop: 8 }}><button className="btn btn-sm danger" onClick={() => upProd(i, 'image', '')}>Remove image</button></p>}
                  <label>Door preview type (Auto picks it from the category and name)</label>
                  <select value={p.previewType || 'auto'} onChange={(e) => upProd(i, 'previewType', e.target.value)}>
                    <option value="auto">Auto</option><option value="door">Door handle</option><option value="cabinet">Cabinet handle</option><option value="window">Window lock</option><option value="hinge">Hinge (Qabza)</option>
                  </select>
                  <Field label="Door preview image (optional): transparent PNG of the handle, shown on the door preview. Leave empty to use the drawn handle" value={p.previewImage} onChange={(v) => upProd(i, 'previewImage', v)} />
                  <input type="file" accept="image/png,image/webp" onChange={(e) => uploadPreview(i, e.target.files[0])} />
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
