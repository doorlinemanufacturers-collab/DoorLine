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
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function Shine({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" x2="1">
        <stop offset="0" stopColor="#000" stopOpacity=".35" /><stop offset=".35" stopColor="#fff" stopOpacity=".55" />
        <stop offset=".7" stopColor="#000" stopOpacity=".1" /><stop offset="1" stopColor="#000" stopOpacity=".4" />
      </linearGradient>
    </defs>
  );
}

function BarHandle({ color, gid }) {
  return (
    <svg viewBox="0 0 40 200" width="100%" height="100%" aria-hidden="true">
      <Shine id={gid} />
      <rect x="2" y="26" width="14" height="10" rx="2" fill={color} />
      <rect x="2" y="164" width="14" height="10" rx="2" fill={color} />
      <rect x="14" y="8" width="20" height="184" rx="10" fill={color} />
      <rect x="14" y="8" width="20" height="184" rx="10" fill={`url(#${gid})`} />
      {[19, 23, 27, 31].map((x) => <line key={x} x1={x} x2={x} y1="14" y2="186" stroke="#000" strokeOpacity=".18" />)}
    </svg>
  );
}
function PullHandle({ color, gid }) {
  return (
    <svg viewBox="0 0 24 120" width="100%" height="100%" aria-hidden="true">
      <Shine id={gid} />
      <rect x="2" y="4" width="8" height="112" rx="4" fill={color} />
      <rect x="2" y="4" width="8" height="112" rx="4" fill={`url(#${gid})`} />
      <rect x="9" y="12" width="12" height="6" rx="2" fill={color} />
      <rect x="9" y="102" width="12" height="6" rx="2" fill={color} />
    </svg>
  );
}
function Crescent({ color }) {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <circle cx="20" cy="20" r="14" fill={color} stroke="#000" strokeOpacity=".25" />
      <path d="M20 20 L36 12" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M20 20 L36 12" stroke="#000" strokeOpacity=".2" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" fill="#000" fillOpacity=".35" />
    </svg>
  );
}
function Hinge({ color }) {
  return (
    <svg viewBox="0 0 26 70" width="100%" height="100%" aria-hidden="true">
      <rect x="0" y="6" width="16" height="58" rx="2" fill={color} stroke="#000" strokeOpacity=".25" />
      <rect x="14" y="0" width="10" height="70" rx="5" fill={color} stroke="#000" strokeOpacity=".3" />
      <circle cx="6" cy="16" r="2" fill="#000" fillOpacity=".4" /><circle cx="6" cy="54" r="2" fill="#000" fillOpacity=".4" />
    </svg>
  );
}

export default function DoorPreview({ kind = 'door handle', colors = [], cutout, name }) {
  const [show, setShow] = useState(false);
  const [angle, setAngle] = useState(0);
  const list = colors.length ? colors : ['Silver'];
  const [ci, setCi] = useState(0);
  const color = hexFor(list[ci] || list[0]);
  const gid = useId().replace(/:/g, '');
  const l = lum(color);
  const doorBg = l > 0.6 ? '#5b4636' : l < 0.25 ? '#d8c3a0' : '#6b4f3a';
  const isOpen = angle > 5;
  const mode = /lock/.test(kind) ? 'window' : /cabinet/.test(kind) ? 'cabinet' : /hinge/.test(kind) ? 'hinge' : 'door';
  const toggle = () => setAngle(isOpen ? 0 : 70);

  const handle = mode === 'door'
    ? (cutout ? <Image src={cutout} alt={name || 'Handle'} width={60} height={200} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <BarHandle color={color} gid={gid} />)
    : mode === 'cabinet' ? (cutout ? <Image src={cutout} alt={name || 'Handle'} width={60} height={200} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <PullHandle color={color} gid={gid} />) : null;

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
                  <div className="wlock"><Crescent color={color} /></div>
                </div>
              </div>
            ) : (
              <div className={`dwall ${mode === 'cabinet' ? 'cab' : ''}`}>
                <div className="droom" />
                <div className={`ddoor ${mode === 'cabinet' ? 'r' : ''}`} style={{ background: doorBg, transform: `rotateY(${mode === 'cabinet' ? angle : -angle}deg)` }} onClick={toggle} role="button" aria-label={isOpen ? 'Close the door' : 'Open the door'}>
                  <span className="dinset" /><span className="dinset b" />
                  {mode === 'door' && <div className="dhandle">{handle}</div>}
                  {mode === 'cabinet' && <div className="chandle">{handle}</div>}
                  {mode === 'hinge' && [8, 46, 84].map((t) => <div key={t} className="dhinge" style={{ top: `${t}%` }}><Hinge color={color} /></div>)}
                </div>
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
