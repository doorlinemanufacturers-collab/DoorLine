'use client';
import { useEffect, useId, useState } from 'react';

const HEX = { gold: '#d4a82a', golden: '#d4a82a', bronze: '#8c6a2f', brown: '#5d3b1f', silver: '#c4c7ca', white: '#f5f5f2', black: '#1b1b1b', grey: '#8e9094', gray: '#8e9094', champagne: '#d9c79b', copper: '#b8733a', blue: '#2b5fa8', red: '#b33a3a', green: '#3b7a4a' };
function hexFor(name) {
  const k = String(name || '').toLowerCase().trim();
  if (HEX[k]) return HEX[k];
  for (const key of Object.keys(HEX)) if (k.includes(key)) return HEX[key];
  return '#c4c7ca';
}
function rgb(hex) { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function lum(hex) { const [r, g, b] = rgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }
function shade(hex, amt) {
  const f = (c) => Math.max(0, Math.min(255, Math.round(amt > 0 ? c + (255 - c) * amt : c * (1 + amt))));
  const [r, g, b] = rgb(hex);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
function Metal({ id, color, dir = 'h' }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={dir === 'h' ? 1 : 0} y2={dir === 'h' ? 0 : 1}>
      <stop offset="0" stopColor={shade(color, -0.5)} /><stop offset="0.18" stopColor={shade(color, -0.12)} /><stop offset="0.38" stopColor={shade(color, 0.6)} />
      <stop offset="0.55" stopColor={shade(color, 0.18)} /><stop offset="0.8" stopColor={shade(color, -0.3)} /><stop offset="1" stopColor={shade(color, -0.6)} />
    </linearGradient>
  );
}
const Screw = ({ x, y, r = 2.4 }) => (<g><circle cx={x} cy={y} r={r} fill="#2a2a2a" fillOpacity=".55" /><circle cx={x} cy={y} r={r * 0.62} fill="#fff" fillOpacity=".35" /></g>);

function Shape({ info, color, gid }) {
  const m = `${gid}m`, v = `${gid}v`;
  if (info.mode === 'window') {
    return (
      <svg viewBox="0 0 60 60" style={{ height: 190 }} aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <circle cx="26" cy="32" r="20" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" /><circle cx="26" cy="32" r="12" fill={shade(color, -0.25)} stroke="#000" strokeOpacity=".25" />
        <path d="M26 32 L52 18" stroke={`url(#${m})`} strokeWidth="11" strokeLinecap="round" /><path d="M26 32 L52 18" stroke="#000" strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="26" cy="32" r="4.5" fill="#222" fillOpacity=".7" /><Screw x="12" y="48" r="2" />
      </svg>
    );
  }
  if (info.mode === 'hinge') {
    const st = info.hinge;
    return (
      <svg viewBox="0 0 80 80" style={{ height: 200 }} aria-hidden="true">
        <defs><Metal id={m} color={color} /><Metal id={v} color={color} dir="v" /></defs>
        <rect x="2" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />
        {st === 'l' ? (<g><polygon points="44,6 78,10 78,70 44,74" fill={shade(color, -0.35)} stroke="#000" strokeOpacity=".3" /><rect x="44" y="6" width="26" height="68" rx="2" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" /></g>)
          : st === 'w' ? (<g><rect x="44" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />{[52, 61, 70].map((x, i) => <rect key={x} x={x} y="6" width="4.5" height="68" fill={i % 2 ? '#fff' : '#000'} fillOpacity={i % 2 ? 0.25 : 0.2} />)}</g>)
            : (<rect x="44" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />)}
        <rect x="31" y="0" width="18" height="80" rx="9" fill={`url(#${m})`} stroke="#000" strokeOpacity=".35" />
        <line x1="31" x2="49" y1="26" y2="26" stroke="#000" strokeOpacity=".3" /><line x1="31" x2="49" y1="54" y2="54" stroke="#000" strokeOpacity=".3" />
        <circle cx="40" cy="6" r="5" fill="#111" />{st === 'lift' && <rect x="37" y="-4" width="6" height="10" rx="2" fill={shade(color, -0.3)} />}
        <Screw x="12" y="20" /><Screw x="12" y="60" /><Screw x="26" y="40" /><Screw x="56" y="20" /><Screw x="56" y="60" /><Screw x="70" y="40" />
      </svg>
    );
  }
  if (info.mode === 'cabinet') {
    return (
      <svg viewBox="0 0 34 150" style={{ height: 230 }} aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <rect x="14" y="6" width="14" height="138" rx="7" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" />
        <rect x="3" y="18" width="14" height="10" rx="2" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" /><rect x="3" y="122" width="14" height="10" rx="2" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" />
      </svg>
    );
  }
  const style = info.handle;
  if (style === 'flat' || style === 'wide') {
    const w = style === 'wide' ? 40 : 30; const x = (60 - w) / 2;
    return (
      <svg viewBox="0 0 60 240" style={{ height: 250 }} aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <rect x={x} y="8" width={w} height="224" rx="7" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <rect x={x + w * 0.3} y="44" width={w * 0.4} height="152" rx={w * 0.2} fill="#000" fillOpacity=".38" /><rect x={x + w * 0.34} y="48" width={w * 0.1} height="144" rx="3" fill="#fff" fillOpacity=".25" />
        <Screw x="30" y="26" /><Screw x="30" y="214" />
      </svg>
    );
  }
  if (style === 'sliding') {
    return (
      <svg viewBox="0 0 60 240" style={{ height: 250 }} aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <rect x="6" y="14" width="22" height="44" rx="4" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" /><rect x="6" y="182" width="22" height="44" rx="4" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <polygon points="22,40 36,52 36,188 22,200" fill={shade(color, -0.35)} /><rect x="30" y="40" width="22" height="160" rx="9" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <Screw x="14" y="26" /><Screw x="14" y="46" /><Screw x="14" y="194" /><Screw x="14" y="214" />
      </svg>
    );
  }
  const fluted = style === 'fluted';
  return (
    <svg viewBox="0 0 60 240" style={{ height: 250 }} aria-hidden="true">
      <defs><Metal id={m} color={color} /></defs>
      <rect x="4" y="44" width="24" height="16" rx="3" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" /><rect x="4" y="180" width="24" height="16" rx="3" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      <Screw x="10" y="52" r="2" /><Screw x="10" y="188" r="2" />
      <rect x="22" y="8" width="28" height="224" rx="14" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      {fluted && Array.from({ length: 9 }).map((_, i) => (<g key={i}><line x1={26 + i * 2.6} x2={26 + i * 2.6} y1="22" y2="218" stroke="#000" strokeOpacity=".22" strokeWidth=".9" /><line x1={27 + i * 2.6} x2={27 + i * 2.6} y1="22" y2="218" stroke="#fff" strokeOpacity=".16" strokeWidth=".6" /></g>))}
      <rect x="22" y="8" width="28" height="11" rx="5.5" fill="#101010" /><rect x="22" y="221" width="28" height="11" rx="5.5" fill="#101010" />
    </svg>
  );
}

export default function ColourChanger({ info, colors = [], name }) {
  const gid = useId().replace(/:/g, '');
  const [ci, setCi] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || colors.length < 2) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setCi((i) => (i + 1) % colors.length), 2600);
    return () => clearInterval(t);
  }, [auto, colors.length]);
  if (colors.length < 2) return null;
  const color = hexFor(colors[ci]);
  const bg = lum(color) > 0.7 ? 'radial-gradient(ellipse at 50% 35%,#e7e2d6,#b9b2a2 80%)' : 'radial-gradient(ellipse at 50% 35%,#fffdf6,#e9e3d3 70%)';
  return (
    <div className="cc">
      <strong>Choose your colour</strong>
      <div className="ccstage" style={{ background: bg }}>
        <div key={ci} className="ccpop"><Shape info={info} color={color} gid={`${gid}${ci}`} /></div>
        <span className="ccshadow" />
      </div>
      <div className="ccdots">
        {colors.map((c, i) => (
          <button key={c} type="button" className={`ccdot ${i === ci ? 'on' : ''}`} onClick={() => { setAuto(false); setCi(i); }}><i style={{ background: hexFor(c) }} /><span>{c}</span></button>
        ))}
      </div>
      <p className="muted" style={{ textAlign: 'center' }}>{name}: {colors[ci]}. Illustration only, real colour may vary slightly. Ask us on WhatsApp for samples.</p>
    </div>
  );
}
