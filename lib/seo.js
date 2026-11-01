const unique = (a) => [...new Set(a.map((x) => String(x).replace(/\s+/g, ' ').trim()).filter(Boolean))];

export function normalize(t) {
  return String(t || '').toLowerCase()
    .replace(/aluminum|alominium|aluminuim/g, 'aluminium')
    .replace(/handel|handal|handles/g, 'handle')
    .replace(/locks/g, 'lock').replace(/hinges/g, 'hinge')
    .replace(/latch|latches/g, 'lock').replace(/electro plating/g, 'electroplating')
    .replace(/anodising|anodized|anodised/g, 'anodizing')
    .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function productAlt(p) {
  if (p.alt && p.alt.trim()) return p.alt.trim();
  const c = String(p.colors || '').split(',')[0].trim();
  return `${p.name} ${p.model}${c ? ' ' + c : ''} - aluminium handle manufacturer Lahore Pakistan`.replace(/\s+/g, ' ').slice(0, 125);
}

export function regionPhrase(p) {
  const sum = [...String(p.slug || p.name || '')].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return sum % 2 ? 'Pakistan and Lahore' : 'Lahore, Pakistan';
}

const USE = { 'Door Handles': 'aluminum doors and windows', 'Cabinet Handles': 'kitchen cabinets and wardrobes', 'Window Locks': 'sliding aluminum windows', Hinges: 'aluminum doors', Fittings: 'aluminum door fabrication' };

export function productSeo(p, site) {
  const name = p.name;
  const cat = p.category || 'Aluminium Handles';
  const us = name.replace(/aluminium/gi, 'aluminum');
  const noAlu = name.replace(/aluminium\s*/i, '').replace(/\s+/g, ' ').trim();
  const colors = String(p.colors || '').split(',').map((c) => c.trim()).filter(Boolean);
  const shortSize = String(p.size || '').replace(/\(.*?\)/g, '').trim();
  const type = /lock/i.test(name) ? 'window lock' : /hinge/i.test(name) ? 'door hinge' : /cabinet|pull/i.test(name + cat) ? 'cabinet handle' : /handle|bar/i.test(name) ? 'door handle' : 'aluminium hardware';
  const use = (p.useCase && p.useCase.trim()) || USE[cat] || 'aluminum doors and windows';
  const phone = (site && site.phone) || '';
  const region = regionPhrase(p);

  const kw = [
    name, `${name} ${p.model}`, `${p.model} ${noAlu}`, `${p.model} aluminium ${type}`,
    `${name} wholesaler and manufacturer in Pakistan`, `${name} wholesaler in Lahore`, `${name} manufacturer in Lahore`, `${name} supplier Pakistan`,
    `${name} wholesale price`, `${name} factory price`, `${us} Pakistan`, noAlu, `${noAlu} Lahore`,
    `${cat} wholesaler and manufacturer`, `aluminium ${type} wholesaler Pakistan`, `aluminium ${type} manufacturer in Lahore`, `${type} supplier Pakistan`,
    `anodized ${type} Lahore`, `${name} direct factory rates`, `${name} aluminum hardware`, 'aluminum hardware Pakistan', `aluminum handles ${p.model}`, `professional ${type} manufacturer Pakistan`,
    ...(type === 'door handle' ? ['aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan'] : type === 'window lock' ? ['sliding window lock supplier Lahore', 'window latch Pakistan'] : type === 'cabinet handle' ? ['kitchen cabinet handles Lahore', 'wardrobe handle wholesale Pakistan'] : type === 'door hinge' ? ['aluminium door hinges Pakistan', 'openable hinges wholesaler Lahore'] : ['aluminium fabrication hardware Lahore']),
    ...colors.map((c) => `${c} ${noAlu}`), ...colors.map((c) => `${c} ${noAlu} ${shortSize}`),
    ...String(p.keywords || '').split(','),
  ];

  const short = name.replace(/^Aluminium\s+/i, '');
  const titleOpts = [`${name} | Wholesale Pakistan, Lahore`, `${name} | Pakistan, Lahore`, `${short} | Pakistan, Lahore`];
  const title = (p.metaTitle && p.metaTitle.trim()) || titleOpts.find((x) => x.length <= 60) || titleOpts[2].slice(0, 60);

  const cands = [
    `${name} for ${use}. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${phone} for factory price.`,
    `${name} for ${use}. Wholesaler & Manufacturer in Pakistan. Call ${phone} for price.`,
    `${name} for ${use}. Wholesaler & Manufacturer in Pakistan. Call now.`,
    `${name} - Wholesaler & Manufacturer in Pakistan. Call now.`,
  ].map((x) => x.replace(/\s+/g, ' ').trim());
  let description = (p.metaDesc && p.metaDesc.trim()) ? p.metaDesc.trim().slice(0, 155) : (cands.find((x) => x.length <= 155) || cands[3].slice(0, 155));

  const body = [
    `${name} (${p.model}) is made at the Doorline factory in Lahore, Pakistan, and supplied wholesale to hardware shops, aluminum fabricators, dealers and contractors across the country. ${p.desc || ''} It suits hardware shops that resell it and fabricators who need the same model again and again in bulk.`.replace(/\s+/g, ' ').trim(),
    `Use case: designed for ${use}. It is made of aluminium${shortSize ? ', size ' + shortSize : ''}${p.finish ? ', ' + p.finish.toLowerCase() + ' finish' : ''}${colors.length ? ', available in ' + colors.join(', ') : ''}. Check the technical specifications table below for the details of this model.`,
    `This item is part of our aluminum hardware and aluminum handles range. As a wholesaler and manufacturer, Doorline sells at direct factory rates with no middleman and premium quality control. We also provide aluminium anodizing and electroplating services in Lahore for custom finishes, and we deliver to every city in Pakistan by transport and cargo. Message us on WhatsApp or call ${phone} for the wholesale price and minimum order quantity of ${name}.`,
  ];
  const intro = body.join(' ');

  const specs = [
    ['Model', p.model], ['Category', p.category], ['Material', 'Aluminium'], ['Size', p.size], ['Finish', p.finish], ['Colours', p.colors], ['Application', use],
    ['Supply', 'Wholesaler & Manufacturer, Lahore, Pakistan'],
    ...String(p.specs || '').split('\n').map((l) => l.split(':')).filter((a) => a.length >= 2 && a[0].trim()).map((a) => [a[0].trim(), a.slice(1).join(':').trim()]),
    ['Price', p.price ? `Rs ${p.price}` : 'Wholesale rate - call or WhatsApp'],
  ].filter(([, v]) => v);

  const options = colors.map((c) => `${c} ${name} ${p.model}${shortSize ? ' - ' + shortSize : ''}`);
  const variants = unique([noAlu, `${p.model} ${type}`, colors[0] ? `${colors[0]} ${noAlu}` : '', `${noAlu} wholesaler Pakistan`, `aluminium ${type} Lahore`, `${noAlu} price in Pakistan`, `${type} manufacturer Lahore`, `${cat} supplier Pakistan`]).slice(0, 8);

  const faqs = [
    { q: `What is the wholesale price of ${name} ${p.model}?`, a: `The price depends on quantity, size and finish. Contact Doorline on WhatsApp or call ${phone} for today's wholesale rate of ${name} ${p.model}.` },
    { q: `Are you a wholesaler or a manufacturer of ${noAlu}?`, a: 'We are both. Doorline manufactures at its own factory in Lahore and sells wholesale, so you get factory rates with no middleman.' },
    { q: `What is ${name} used for?`, a: `${name} is used for ${use}. It is made of aluminium${shortSize ? ' and the standard size is ' + shortSize : ''}.` },
    { q: `Which colours of ${name} ${p.model} are available?`, a: colors.length ? `It is available in ${colors.join(', ')}. Ask us if you need another colour or an anodized or electroplated finish.` : 'Please contact us for available colours.' },
    { q: `Do you deliver ${noAlu} all over Pakistan?`, a: 'Yes. We send bulk orders from Lahore to all major cities by transport and cargo.' },
  ];
  return { title, description, keywords: unique(kw).slice(0, 34), intro, body, specs, variants, options, faqs, type, shortSize, use, region };
}

export function searchProducts(products, q) {
  const tokens = normalize(q).split(' ').filter((t) => t.length > 1);
  if (!tokens.length) return products;
  return products
    .map((p) => {
      const hay = normalize(`${p.name} ${p.model} ${p.category} ${p.colors} ${p.desc} ${p.keywords || ''}`);
      return { p, score: tokens.filter((t) => hay.includes(t)).length };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function previewInfo(p) {
  const t = `${p.category || ''} ${p.name || ''}`.toLowerCase();
  let mode = p.previewType && p.previewType !== 'auto' ? p.previewType : null;
  if (!mode) {
    if (/hinge|qabza|qabze|kabza|lift[- ]?off|\bbutt\b/.test(t)) mode = 'hinge';
    else if (/lock|latch|crescent|lever/.test(t)) mode = 'window';
    else if (/cabinet|drawer|wardrobe|kitchen/.test(t)) mode = 'cabinet';
    else mode = 'door';
  }
  const hinge = /w[- ]?shape/.test(t) ? 'w' : /l[- ]?shape/.test(t) ? 'l' : /lift/.test(t) ? 'lift' : 'butt';
  const handle = /sliding/.test(t) ? 'sliding' : /fluted|lined|york/.test(t) ? 'fluted' : /wide|d38/.test(t) ? 'wide' : /flat|pull|plate/.test(t) ? 'flat' : 'bar';
  return { mode, hinge, handle };
}
