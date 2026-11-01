'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images = [] }) {
  const [open, setOpen] = useState(-1);
  useEffect(() => {
    if (open < 0) return undefined;
    const k = (e) => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, images.length]);
  if (!images.length) return null;
  return (
    <>
      <div className="gal-grid">
        {images.map((g, i) => (
          <button key={i} type="button" className="gal-th" onClick={() => setOpen(i)} aria-label={`Open picture ${i + 1}`}>
            <Image src={g.url} alt={g.alt} fill sizes="(max-width: 600px) 50vw, 25vw" className="gimg" />
          </button>
        ))}
      </div>
      {open >= 0 && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setOpen(-1)}>
          <button type="button" className="lb-x" onClick={() => setOpen(-1)} aria-label="Close">×</button>
          {images.length > 1 && <button type="button" className="lb-n lb-p" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + images.length) % images.length); }} aria-label="Previous picture">‹</button>}
          <div className="lb-img" onClick={(e) => e.stopPropagation()}><Image src={images[open].url} alt={images[open].alt} fill sizes="100vw" className="gimg contain" priority /></div>
          {images.length > 1 && <button type="button" className="lb-n lb-nx" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % images.length); }} aria-label="Next picture">›</button>}
          <p className="lb-cap">{images[open].alt}</p>
        </div>
      )}
    </>
  );
}
