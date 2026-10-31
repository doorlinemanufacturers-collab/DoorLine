'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { searchProducts } from '@/lib/seo';

export default function ProductSearch({ products = [] }) {
  const [q, setQ] = useState('');
  const found = q.trim().length > 1 ? searchProducts(products, q) : null;
  return (
    <div>
      <div className="search"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search aluminum handles, e.g. black bar handle, window lock" aria-label="Search aluminum handles" /></div>
      {found && (
        <div style={{ marginBottom: 24 }}>
          {found.length === 0 ? <p>No matching products. Try another word or contact us.</p> : <div className="grid">{found.map((x) => <ProductCard key={x.slug} p={x} />)}</div>}
        </div>
      )}
    </div>
  );
}
