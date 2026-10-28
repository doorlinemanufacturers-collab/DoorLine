'use client';
import { useEffect, useId, useState } from 'react';

const COLS = [{ n: 'Gold', h: '#d4a82a' }, { n: 'Bronze', h: '#8c6a2f' }, { n: 'Brown', h: '#5d3b1f' }, { n: 'Black', h: '#1b1b1b' }, { n: 'Silver (natural)', h: '#c4c7ca' }];
const STEPS = [
  { t: '1. Cleaning', d: 'The aluminium part is cleaned and degreased so the surface is ready for treatment.' },
  { t: '2. Anodizing bath', d: 'Electric current in an acid bath grows a hard oxide layer from the metal itself.' },
  { t: '3. Colouring', d: 'The porous oxide layer absorbs the colour you choose.' },
  { t: '4. Sealing', d: 'The pores are sealed to lock in the colour and protect the surface.' },
  { t: '5. Finished part', d: 'A durable anodized part in your chosen colour. Ask us for the colours available now.' },
];
const X = [55, 165, 275, 385, 495];
const LIQ = ['#bfe3df', '#ecd98a', null, '#bcd8ee'];

export default function AnodizingAnimation() {
  const id = useId().replace(/:/g, '');
  const [step, setStep] = useState(0);
  const [down, setDown] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [ci, setCi] = useState(0);
  const col = COLS[ci].h;

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); setStep(4); }
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timers = [];
    setDown(false);
    if (step < 4) {
      timers.push(setTimeout(() => setDown(true), 1100));
      timers.push(setTimeout(() => setDown(false), 3000));
      timers.push(setTimeout(() => setStep((s) => (s + 1) % 5), 3900));
    } else {
      timers.push(setTimeout(() => setStep(0), 3800));
    }
    return () => timers.forEach(clearTimeout);
  }, [step, playing]);

  const goTo = (i) => { setPlaying(false); setStep(i); setDown(i < 4); };
  const fill = step === 0 ? (down ? '#d9dcdf' : '#b5b9be')
    : step === 1 ? (down ? '#a9b0b6' : '#d9dcdf')
      : step === 2 ? (down ? col : '#a9b0b6')
        : col;
  const liq = (i) => (i === 2 ? col : LIQ[i]);

  return (
    <div className="anim">
      <svg viewBox="0 0 560 290" role="img" aria-label="Animation of the aluminium anodizing process: cleaning, anodizing, colouring and sealing">
        <defs>
          <linearGradient id={`${id}s`} x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".35" /><stop offset=".35" stopColor="#fff" stopOpacity=".6" /><stop offset=".75" stopColor="#000" stopOpacity=".1" /><stop offset="1" stopColor="#000" stopOpacity=".4" /></linearGradient>
          <clipPath id={`${id}c`}><rect x="-11" y="0" width="22" height="110" rx="11" /></clipPath>
        </defs>
        <rect x="0" y="20" width="560" height="7" rx="3" fill="#8f959b" />
        {X.slice(0, 4).map((x, i) => (
          <g key={`b${i}`}>
            <rect x={x - 42} y="165" width="84" height="85" rx="6" fill="#eef2f4" stroke={step === i ? '#b8862b' : '#8a8f96'} strokeWidth={step === i ? 3 : 2} />
            <rect x={x - 39} y="190" width="78" height="57" rx="3" fill={liq(i)} opacity=".92" style={{ transition: 'fill 1s' }} />
          </g>
        ))}
        <rect x={X[4] - 32} y="212" width="64" height="38" rx="4" fill="#cfd3d7" stroke="#8a8f96" strokeWidth="2" />
        <g className="acar" style={{ transform: `translateX(${X[step]}px)` }}>
          <line x1="0" y1="27" x2="0" y2="68" stroke="#6b7076" strokeWidth="3" />
          <rect x="-9" y="22" width="18" height="10" rx="2" fill="#6b7076" />
          <g className="apart" style={{ transform: `translateY(${down ? 62 : 0}px)` }}>
            <rect x="-24" y="86" width="14" height="10" rx="2" fill={fill} className="pfill" /><rect x="-24" y="146" width="14" height="10" rx="2" fill={fill} className="pfill" />
            <g transform="translate(0,66) scale(1,1)">
              <rect x="-11" y="0" width="22" height="110" rx="11" fill={fill} className="pfill" stroke="#000" strokeOpacity=".25" />
              <rect x="-11" y="0" width="22" height="110" rx="11" fill={`url(#${id}s)`} />
              {step === 4 && <g clipPath={`url(#${id}c)`}><rect className="ashine" x="-30" y="-10" width="8" height="130" fill="#fff" opacity=".55" transform="skewX(-15)" /></g>}
            </g>
          </g>
        </g>
        {X.slice(0, 4).map((x, i) => (
          <g key={`f${i}`}>
            <rect x={x - 39} y="190" width="78" height="57" rx="3" fill={liq(i)} opacity=".35" style={{ transition: 'fill 1s' }} />
            <rect x={x - 42} y="165" width="84" height="85" rx="6" fill="none" stroke={step === i ? '#b8862b' : '#8a8f96'} strokeWidth={step === i ? 3 : 2} />
            <line x1={x - 34} y1="172" x2={x - 34} y2="236" stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
            {down && step === i && [0, 1, 2, 3, 4, 5].map((b) => <circle key={b} className="bub" cx={x - 28 + b * 11} cy="236" r={2 + (b % 3)} fill="#fff" fillOpacity=".8" style={{ animationDelay: `${b * 0.25}s` }} />)}
            {down && step === 1 && i === 1 && <g><rect x={x - 38} y="195" width="4" height="48" fill="#6b7076" /><rect x={x + 34} y="195" width="4" height="48" fill="#6b7076" /><polyline className="spark" points={`${x - 30},205 ${x - 20},215 ${x - 28},222 ${x - 14},232`} fill="none" stroke="#f5c400" strokeWidth="2.5" /><polyline className="spark s2" points={`${x + 30},205 ${x + 20},218 ${x + 28},226 ${x + 14},236`} fill="none" stroke="#f5c400" strokeWidth="2.5" /></g>}
          </g>
        ))}
        {['Clean', 'Anodize', 'Colour', 'Seal', 'Done'].map((l, i) => <text key={l} x={X[i]} y="278" textAnchor="middle" fontSize="15" fontWeight={step === i ? 700 : 500} fill={step === i ? '#b8862b' : '#555'}>{l}</text>)}
        {step === 4 && <text x={X[4]} y="236" textAnchor="middle" fontSize="22" fill="#2e8b57">✓</text>}
      </svg>
      <div className="astepcap"><strong>{STEPS[step].t}</strong><p>{STEPS[step].d}</p></div>
      <div className="asteps">
        {STEPS.map((s, i) => <button key={s.t} type="button" className={`astep ${i === step ? 'on' : ''}`} onClick={() => goTo(i)} aria-label={s.t}>{i + 1}</button>)}
        <button type="button" className="btn btn-sm" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
      </div>
      <p className="muted" style={{ textAlign: 'center', marginTop: 8 }}>Choose the final colour</p>
      <div className="ccdots">
        {COLS.map((c, i) => (
          <button key={c.n} type="button" className={`ccdot ${i === ci ? 'on' : ''}`} onClick={() => setCi(i)}><i style={{ background: c.h }} /><span>{c.n}</span></button>
        ))}
      </div>
    </div>
  );
}
