'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Anim = dynamic(() => import('./AnodizingAnimation'), { ssr: false });

export default function LazyAnodizing({ kind = 'anodizing' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ minHeight: on ? undefined : 440 }}>{on ? <Anim kind={kind} /> : null}</div>;
}
