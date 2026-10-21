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

export function productSeo(p, site) {
  const name = p.name;
  const cat = p.category || 'Aluminium Handles';
  const us = name.replace(/aluminium/gi, 'aluminum');
  const noAlu = name.replace(/aluminium\s*/i, '').replace(/\s+/g, ' ').trim();
  const colors = String(p.colors || '').split(',').map((c) => c.trim()).filter(Boolean);
  const shortSize = String(p.size || '').replace(/\(.*?\)/g, '').trim();
  const type = /lock/i.test(name) ? 'window lock' : /hinge/i.test(name) ? 'door hinge' : /cabinet|pull/i.test(name + cat) ? 'cabinet handle' : /handle|bar/i.test(name) ? 'door handle' : 'aluminium hardware';

  const kw = [
    name, `${name} ${p.model}`, `${p.model} handle`, `${p.model} ${noAlu}`, `${p.model} aluminium ${type} Lahore`,
    `${name} manufacturer in Lahore`, `${name} wholesale Pakistan`, `${name} price in Lahore`, `${name} factory price`,
    `buy ${name} online Pakistan`, `${us} Lahore`, noAlu, `${noAlu} Lahore`, `${noAlu} price in Pakistan`,
    `${cat} manufacturer Lahore`, `${cat} wholesale Pakistan`,
    `aluminium ${type} manufacturer in Lahore`, `aluminium ${type} wholesale Pakistan`, `aluminium ${type} Lahore`, `${type} supplier Pakistan`, `${type} factory Lahore`,
    `anodized ${type} Lahore`, `cheap ${name} price`, `${name} direct factory rates`, `premium quality ${name}`,
    `top ${type} manufacturers in Lahore`, `no middleman ${type} Lahore`, `professional ${type} manufacturer Lahore`,
    ...(type === 'door handle' ? ['aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan', 'aluminium glass door handle Pakistan', 'main door handle aluminium Pakistan'] : type === 'window lock' ? ['sliding window lock supplier Lahore', 'aluminium window handle wholesale Pakistan', 'window latch Pakistan'] : type === 'cabinet handle' ? ['kitchen cabinet handles Lahore', 'wardrobe handle wholesale Pakistan', 'drawer pull handle Pakistan'] : ['aluminium fabrication hardware Lahore']),
    ...colors.map((c) => `${c} ${name}`), ...colors.map((c) => `${c} ${noAlu}`), ...colors.map((c) => `${c} ${noAlu} ${shortSize}`),
    shortSize ? `${shortSize} ${noAlu}` : '',
    ...String(p.keywords || '').split(','),
  ];

  const col = colors.slice(0, 2).join(' & ');
  let title = p.metaTitle || `${name} ${p.model} ${shortSize} - ${col} | Lahore`;
  if (!p.metaTitle && title.length > 70) title = `${name} ${p.model} - ${col} | Lahore`;
  title = title.replace(/\s+/g, ' ').replace(/ - \|/, ' |').slice(0, 70);

  const description = (p.metaDesc || `${name} ${p.model} (${[shortSize, colors.join('/'), p.finish].filter(Boolean).join(', ')}) from a professional aluminium handle manufacturer in Lahore. Cheap wholesale price, no middleman, premium quality.`).replace(/\s+/g, ' ').slice(0, 158);

  const intro = `${name} ${p.model} is manufactured at our factory in Lahore by DoorLine Manufacturers, a professional aluminium handle manufacturer, and supplied wholesale to hardware shops, fabricators, dealers and contractors across Pakistan. ${p.desc || ''} It is made of aluminium${shortSize ? ' in ' + shortSize + ' size' : ''}${colors.length ? ', available in ' + colors.join(', ') : ''}${p.finish ? ' with a ' + p.finish.toLowerCase() + ' finish' : ''}. As a direct ${type} manufacturer you get direct factory rates, a cheap wholesale price with no middleman, and premium quality on every order, and we also offer aluminium anodizing and electroplating services in Lahore for custom finish requirements.`;

  const options = colors.map((c) => `${c} ${name} ${p.model}${shortSize ? ' - ' + shortSize : ''}`);
  const variants = unique([noAlu, `${p.model} ${type}`, colors[0] ? `${colors[0]} ${noAlu}` : '', `${noAlu} Lahore`, `aluminium ${type} Lahore`, `${noAlu} price in Pakistan`, `${type} manufacturer Lahore`, `${cat} supplier Pakistan`]).slice(0, 8);

  const faqs = [
    { q: `What is the wholesale price of ${name} ${p.model}?`, a: `The price depends on quantity, size and finish. Contact DoorLine Manufacturers on WhatsApp or call for today's wholesale rate of ${name} ${p.model}.` },
    { q: `Are you the manufacturer of ${noAlu} in Lahore?`, a: 'Yes. We are a direct manufacturer in Lahore, so you get factory prices instead of trader prices.' },
    { q: `Which colours of ${name} ${p.model} are available?`, a: colors.length ? `It is available in ${colors.join(', ')}. Ask us if you need another colour.` : 'Please contact us for available colours.' },
    { q: `Do you deliver ${noAlu} all over Pakistan?`, a: 'Yes. We send bulk orders from Lahore to all major cities by transport and cargo.' },
  ];
  return { title, description, keywords: unique(kw).slice(0, 34), intro, variants, options, faqs, type, shortSize };
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
