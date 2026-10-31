'use client';
import { useEffect, useRef } from 'react';

let io = null;
function getObserver() {
  if (!io && typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  }
  return io;
}

// eager: content that is visible at the top of the page is never hidden (better LCP).
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', eager = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (eager) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const o = getObserver();
    if (!o) { el.classList.add('in'); return undefined; }
    o.observe(el);
    return () => o.unobserve(el);
  }, [eager]);
  return <Tag ref={ref} className={`${eager ? '' : 'reveal'} ${className}`.trim()} style={eager ? undefined : { transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
