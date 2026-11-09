import Link from 'next/link';
import { catSlug } from './categories';

// ONE place that defines the internal link structure (topic clusters).
// Each target keyword has exactly one main page, so pages do not compete with each other.
const cat = (n) => `/collections/${catSlug(n)}`;
export const L = {
  handles: { href: '/aluminum-handles', label: 'Aluminium Handles' },
  doorHandles: { href: cat('Door Handles'), label: 'Aluminium Door Handles' },
  cabinetHandles: { href: cat('Cabinet Handles'), label: 'Aluminium Cabinet Handles' },
  windowLocks: { href: cat('Window Locks'), label: 'Aluminium Window Locks' },
  hinges: { href: cat('Hinges'), label: 'Aluminium Hinges' },
  fittings: { href: cat('Fittings'), label: 'Aluminium Handle Fittings' },
  hardware: { href: '/aluminum-hardware', label: 'Aluminium Hardware' },
  manufacturer: { href: '/aluminium-handles-manufacturer/pakistan', label: 'Aluminum Handles Wholesaler & Manufacturer in Pakistan' },
  manufacturerLahore: { href: '/aluminium-handles-manufacturer/lahore', label: 'Aluminium Handles Manufacturer in Lahore, Pakistan' },
  anodizing: { href: '/services/aluminium-anodizing-service-lahore', label: 'Aluminium Anodizer in Lahore, Pakistan' },
  plating: { href: '/services/aluminium-electroplating-service-lahore', label: 'Aluminium Electroplating in Lahore, Pakistan' },
  wholesaleGuide: { href: '/guides/how-to-buy-aluminium-handles-wholesale-in-pakistan', label: 'How to Buy Aluminium Handles Wholesale in Pakistan' },
  anodizingGuide: { href: '/guides/what-is-anodizing-aluminium-process-colours-uses', label: 'What Is Anodizing: Process, Colours and Uses' },
  platingGuide: { href: '/guides/what-is-electroplating-process-uses-on-aluminium', label: 'What Is Electroplating on Aluminium' },
  chooseGuide: { href: '/guides/how-to-choose-aluminium-door-handle-size', label: 'How to Choose Aluminium Door Handle Size' },
  guides: { href: '/guides', label: 'Aluminium Handles Buying Guides' },
  delivery: { href: '/delivery-across-pakistan', label: 'Delivery Across Pakistan' },
  contact: { href: '/contact', label: 'Contact DoorLine Manufacturers' },
  faq: { href: '/faq', label: 'Aluminium Handles FAQ' },
};

// Topic clusters: pillar page + its children + support pages.
export const CLUSTERS = {
  handles: { heading: 'Aluminium Handles & Door Handles', keys: ['handles', 'doorHandles', 'cabinetHandles', 'windowLocks', 'chooseGuide'] },
  hardware: { heading: 'Aluminium Hardware', keys: ['hardware', 'hinges', 'windowLocks', 'fittings'] },
  finishing: { heading: 'Anodizing & Electroplating', keys: ['anodizing', 'plating', 'anodizingGuide', 'platingGuide'] },
  manufacturer: { heading: 'Manufacturer & Wholesale', keys: ['manufacturer', 'manufacturerLahore', 'wholesaleGuide', 'delivery', 'contact'] },
};

// groups for a "Related links" block. self = current path (never linked to itself)
export function relatedGroups(self, pick = ['handles', 'hardware', 'finishing', 'manufacturer'], cats) {
  const okCat = (k) => !cats || !['doorHandles', 'cabinetHandles', 'windowLocks', 'hinges', 'fittings'].includes(k) || cats.includes({ doorHandles: 'Door Handles', cabinetHandles: 'Cabinet Handles', windowLocks: 'Window Locks', hinges: 'Hinges', fittings: 'Fittings' }[k]);
  return pick
    .map((n) => ({ heading: CLUSTERS[n].heading, links: CLUSTERS[n].keys.filter((k) => L[k].href !== self && okCat(k)).map((k) => L[k]) }))
    .filter((g) => g.links.length);
}

// which pillar a guide belongs to (by its slug)
export function guideGroups(slug) {
  if (/anodiz/.test(slug)) return ['finishing', 'handles', 'manufacturer'];
  if (/plating/.test(slug)) return ['finishing', 'handles', 'manufacturer'];
  if (/wholesale/.test(slug)) return ['manufacturer', 'handles', 'finishing'];
  return ['handles', 'hardware', 'finishing'];
}

// popular chips that must always exist (also when old chips were saved in /admin)
export function withCoreChips(popular = []) {
  const core = [L.handles, L.doorHandles, L.hardware, L.manufacturer, L.anodizing, L.plating, L.manufacturerLahore];
  const have = new Set((popular || []).map((x) => x && x.href));
  return [...core.filter((x) => !have.has(x.href)).map((x) => ({ label: x.label, href: x.href })), ...(popular || [])];
}

// Contextual links inside body text: each target is linked once per page (first mention), with a maximum.
const RULES = [
  [/\b(?:(?:aluminium|aluminum)\s+)?anodi[sz]ing\b|\banodi[sz]er\b/i, 'anodizing'],
  [/\belectroplating\b/i, 'plating'],
  [/\b(?:aluminium|aluminum)\s+door\s+handles?\b/i, 'doorHandles'],
  [/\bcabinet\s+handles?\b/i, 'cabinetHandles'],
  [/\bwindow\s+(?:crescent\s+|lever\s+)?locks?\b/i, 'windowLocks'],
  [/\b(?:aluminium|aluminum)\s+hinges?\b/i, 'hinges'],
  [/\b(?:aluminium|aluminum)\s+hardware\b/i, 'hardware'],
  [/\b(?:aluminium|aluminum)\s+handles?\s+(?:manufacturers?|wholesalers?)\b/i, 'manufacturer'],
  [/\bwholesale\b/i, 'wholesaleGuide'],
  [/\b(?:aluminium|aluminum)\s+handles?\b/i, 'handles'],
];

export function makeLinker(self, max = 7, perPara = 2) {
  const used = new Set();
  let count = 0;
  const render = (text) => {
    let rest = String(text || '');
    const out = [];
    let n = 0;
    let here = 0;
    while (rest && count < max && here < perPara) {
      let best = null;
      for (const [re, key] of RULES) {
        if (used.has(key) || L[key].href === self) continue;
        const m = re.exec(rest);
        if (m && (!best || m.index < best.m.index || (m.index === best.m.index && m[0].length > best.m[0].length))) best = { m, key };
      }
      if (!best) break;
      const { m, key } = best;
      if (m.index > 0) out.push(rest.slice(0, m.index));
      out.push(<Link key={`al${n++}`} className="link" href={L[key].href}>{m[0]}</Link>);
      used.add(key);
      count++;
      here++;
      rest = rest.slice(m.index + m[0].length);
    }
    if (rest) out.push(rest);
    return out;
  };
  return { render };
}
