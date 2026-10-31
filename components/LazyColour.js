'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Colour = dynamic(() => import('./ColourChanger'), { ssr: false });

export default function LazyColour({ info, colors, name }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ minHeight: on ? undefined : 420 }}>{on ? <Colour info={info} colors={colors} name={name} /> : null}</div>;
}
