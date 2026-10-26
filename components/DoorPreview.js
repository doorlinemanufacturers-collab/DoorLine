'use client';
import { useId, useState } from 'react';
import Image from 'next/image';

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
  const x2 = dir === 'h' ? 1 : 0, y2 = dir === 'h' ? 0 : 1;
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      <stop offset="0" stopColor={shade(color, -0.5)} />
      <stop offset="0.18" stopColor={shade(color, -0.12)} />
      <stop offset="0.38" stopColor={shade(color, 0.6)} />
      <stop offset="0.55" stopColor={shade(color, 0.18)} />
      <stop offset="0.8" stopColor={shade(color, -0.3)} />
      <stop offset="1" stopColor={shade(color, -0.6)} />
    </linearGradient>
  );
}
const Screw = ({ x, y, r = 2.4 }) => (<g><circle cx={x} cy={y} r={r} fill="#2a2a2a" fillOpacity=".55" /><circle cx={x} cy={y} r={r * 0.62} fill="#fff" fillOpacity=".35" /><line x1={x - r * 0.6} y1={y} x2={x + r * 0.6} y2={y} stroke="#000" strokeOpacity=".5" strokeWidth=".8" /></g>);

function Handle({ style, color, gid }) {
  const m = `${gid}m`;
  if (style === 'flat' || style === 'wide') {
    const w = style === 'wide' ? 40 : 30;
    const x = (60 - w) / 2;
    return (
      <svg viewBox="0 0 60 240" width="100%" height="100%" aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <rect x={x} y="8" width={w} height="224" rx="7" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <rect x={x + w * 0.3} y="44" width={w * 0.4} height="152" rx={w * 0.2} fill="#000" fillOpacity=".38" />
        <rect x={x + w * 0.34} y="48" width={w * 0.1} height="144" rx="3" fill="#fff" fillOpacity=".25" />
        <Screw x="30" y="26" /><Screw x="30" y="214" />
      </svg>
    );
  }
  if (style === 'sliding') {
    return (
      <svg viewBox="0 0 60 240" width="100%" height="100%" aria-hidden="true">
        <defs><Metal id={m} color={color} /></defs>
        <rect x="6" y="14" width="22" height="44" rx="4" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <rect x="6" y="182" width="22" height="44" rx="4" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <polygon points="22,40 36,52 36,188 22,200" fill={shade(color, -0.35)} />
        <rect x="30" y="40" width="22" height="160" rx="9" fill={`url(#${m})`} stroke="#000" strokeOpacity=".25" />
        <Screw x="14" y="26" /><Screw x="14" y="46" /><Screw x="14" y="194" /><Screw x="14" y="214" />
      </svg>
    );
  }
  const fluted = style === 'fluted';
  return (
    <svg viewBox="0 0 60 240" width="100%" height="100%" aria-hidden="true">
      <defs><Metal id={m} color={color} /></defs>
      <rect x="4" y="44" width="24" height="16" rx="3" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      <rect x="4" y="180" width="24" height="16" rx="3" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      <Screw x="10" y="52" r="2" /><Screw x="10" y="188" r="2" />
      <rect x="22" y="8" width="28" height="224" rx="14" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      {fluted && Array.from({ length: 9 }).map((_, i) => (<g key={i}><line x1={26 + i * 2.6} x2={26 + i * 2.6} y1="22" y2="218" stroke="#000" strokeOpacity=".22" strokeWidth=".9" /><line x1={27 + i * 2.6} x2={27 + i * 2.6} y1="22" y2="218" stroke="#fff" strokeOpacity=".16" strokeWidth=".6" /></g>))}
      <rect x="22" y="8" width="28" height="11" rx="5.5" fill="#101010" /><rect x="22" y="221" width="28" height="11" rx="5.5" fill="#101010" />
    </svg>
  );
}

function CabinetPull({ color, gid }) {
  const m = `${gid}c`;
  return (
    <svg viewBox="0 0 34 150" width="100%" height="100%" aria-hidden="true">
      <defs><Metal id={m} color={color} /></defs>
      <rect x="14" y="6" width="14" height="138" rx="7" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" />
      <rect x="3" y="18" width="14" height="10" rx="2" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" />
      <rect x="3" y="122" width="14" height="10" rx="2" fill={`url(#${m})`} stroke="#000" strokeOpacity=".28" />
    </svg>
  );
}

function Crescent({ color, gid }) {
  const m = `${gid}k`;
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
      <defs><Metal id={m} color={color} /></defs>
      <circle cx="26" cy="32" r="20" fill={`url(#${m})`} stroke="#000" strokeOpacity=".3" />
      <circle cx="26" cy="32" r="12" fill={shade(color, -0.25)} stroke="#000" strokeOpacity=".25" />
      <path d="M26 32 L52 18" stroke={`url(#${m})`} strokeWidth="11" strokeLinecap="round" />
      <path d="M26 32 L52 18" stroke="#000" strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="26" cy="32" r="4.5" fill="#222" fillOpacity=".7" /><Screw x="12" y="48" r="2" />
    </svg>
  );
}

function HingeSvg({ style, color, gid }) {
  const m = `${gid}h`, v = `${gid}v`;
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true">
      <defs><Metal id={m} color={color} /><Metal id={v} color={color} dir="v" /></defs>
      <rect x="2" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />
      {style === 'l' ? (<g><polygon points="44,6 78,10 78,70 44,74" fill={shade(color, -0.35)} stroke="#000" strokeOpacity=".3" /><rect x="44" y="6" width="26" height="68" rx="2" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" /></g>)
        : style === 'w' ? (<g><rect x="44" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />{[52, 61, 70].map((x, i) => <rect key={x} x={x} y="6" width="4.5" height="68" fill={i % 2 ? '#fff' : '#000'} fillOpacity={i % 2 ? 0.25 : 0.2} />)}</g>)
          : (<rect x="44" y="6" width="34" height="68" rx="3" fill={`url(#${v})`} stroke="#000" strokeOpacity=".3" />)}
      <rect x="31" y="0" width="18" height="80" rx="9" fill={`url(#${m})`} stroke="#000" strokeOpacity=".35" />
      <line x1="31" x2="49" y1="26" y2="26" stroke="#000" strokeOpacity=".3" /><line x1="31" x2="49" y1="54" y2="54" stroke="#000" strokeOpacity=".3" />
      <circle cx="40" cy="6" r="5" fill="#111" />
      {style === 'lift' && <rect x="37" y="-4" width="6" height="10" rx="2" fill={shade(color, -0.3)} />}
      <Screw x="12" y="20" /><Screw x="12" y="60" /><Screw x="26" y="40" />
      <Screw x="56" y="20" /><Screw x="56" y="60" /><Screw x="70" y="40" />
    </svg>
  );
}

export default function DoorPreview({ info = { mode: 'door', hinge: 'butt', handle: 'bar' }, colors = [], cutout, name }) {
  const [show, setShow] = useState(false);
  const [angle, setAngle] = useState(0);
  const list = colors.length ? colors : ['Silver'];
  const [ci, setCi] = useState(0);
  const color = hexFor(list[ci] || list[0]);
  const gid = useId().replace(/:/g, '');
  const l = lum(color);
  const doorBg = l > 0.6 ? '#4b3a2c' : l < 0.25 ? '#d6bd96' : '#6a4d38';
  const isOpen = angle > 5;
  const mode = info.mode;
  const toggle = () => setAngle(isOpen ? 0 : 70);
  const img = (w, h) => <Image src={cutout} alt={name || 'Handle'} width={w} height={h} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;

  return (
    <div className="dprev">
      <button type="button" className="btn btn-outline" onClick={() => setShow(!show)} aria-expanded={show}>{show ? 'Hide Preview' : 'Preview on Door'}</button>
      {show && (
        <div className="dbox">
          {list.length > 1 && (
            <div className="chips" style={{ marginBottom: 8 }}>
              {list.map((c, i) => <button key={c} type="button" className={`chip ${i === ci ? 'on' : ''}`} onClick={() => setCi(i)}>{c}</button>)}
            </div>
          )}
          <div className="dscene">
            {mode === 'window' ? (
              <div className="dwall wwall">
                <div className="wpane back"><span className="wglass" /></div>
                <div className="wpane front" style={{ transform: `translateX(${angle * 1.1}%)` }}>
                  <span className="wglass" />
                  <div className="wlock"><Crescent color={color} gid={gid} /></div>
                </div>
              </div>
            ) : (
              <div className={`dwall ${mode === 'cabinet' ? 'cab' : ''}`}>
                <div className={`droom ${mode === 'cabinet' ? 'shelves' : ''}`} />
                <div className={`ddoor ${mode === 'cabinet' ? 'r' : ''} ${mode === 'cabinet' ? 'light' : ''}`} style={{ backgroundColor: mode === 'cabinet' ? '#e8dcc4' : doorBg, transform: `rotateY(${mode === 'cabinet' ? angle : -angle}deg)`, filter: `brightness(${1 - angle / 400})` }} onClick={toggle} role="button" aria-label={isOpen ? 'Close the door' : 'Open the door'}>
                  <span className="dinset" /><span className="dinset b" />
                  {mode === 'door' && <div className="dhandle">{cutout ? img(60, 240) : <Handle style={info.handle} color={color} gid={gid} />}</div>}
                  {mode === 'cabinet' && <div className="chandle">{cutout ? img(34, 150) : <CabinetPull color={color} gid={gid} />}</div>}
                  {mode === 'hinge' && [6, 44, 82].map((t) => <div key={t} className="dhinge" style={{ top: `${t}%` }}>{cutout ? img(80, 80) : <HingeSvg style={info.hinge} color={color} gid={`${gid}${t}`} />}</div>)}
                </div>
                <div className="dfloor" />
              </div>
            )}
          </div>
          <div className="dctrl">
            <button type="button" className="btn btn-sm" onClick={toggle}>{isOpen ? (mode === 'window' ? 'Close window' : 'Close door') : (mode === 'window' ? 'Open window' : 'Open door')}</button>
            <input type="range" min="0" max="75" value={angle} onChange={(e) => setAngle(Number(e.target.value))} aria-label="Move to open or close" />
          </div>
          <p className="muted">Illustration of how {name || 'this product'} looks on a {mode === 'window' ? 'sliding window' : mode === 'cabinet' ? 'cabinet door' : 'door'}. Colour and finish may vary slightly. Message us on WhatsApp for exact samples.</p>
        </div>
      )}
    </div>
  );
}
