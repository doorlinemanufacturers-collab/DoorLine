const unique = (a) => [...new Set(a.map((x) => x.trim()).filter(Boolean))];

export function normalize(t) {
  return String(t || '').toLowerCase()
    .replace(/aluminum|alominium|aluminuim/g, 'aluminium')
    .replace(/handel|handal|handles/g, 'handle')
    .replace(/locks/g, 'lock').replace(/hinges/g, 'hinge').replace(/latch|latches/g, 'lock').replace(/electro plating/g, 'electroplating')
    .replace(/anodising|anodized|anodised/g, 'anodizing')
    .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function productSeo(p, site) {
  const name = p.name;
  const cat = p.category || 'Aluminium Handles';
  const us = name.replace(/aluminium/gi, 'aluminum');
  const colors = String(p.colors || '').split(',').map((c) => c.trim()).filter(Boolean);
  const type = /lock/i.test(name) ? 'window lock' : /hinge/i.test(name) ? 'door hinge' : /cabinet|pull/i.test(name + cat) ? 'cabinet handle' : /handle|bar/i.test(name) ? 'door handle' : 'aluminium hardware';
  const kw = [
    name, `${name} ${p.model}`, `${name} manufacturer in Lahore`, `${name} wholesale Pakistan`, `${name} price in Lahore`,
    `${name} factory price`, `buy ${name} online Pakistan`, `${us} Lahore`, `${cat} manufacturer Lahore`, `${cat} wholesale Pakistan`,
    `aluminium ${type} manufacturer in Lahore`, `aluminium ${type} wholesale Pakistan`, `${type} supplier Pakistan`, `${type} factory Lahore`, `anodized ${type} Lahore`, `cheap ${name} price`, `${name} direct factory rates`, `premium quality ${name}`, `top ${type} manufacturers in Lahore`, `no middleman ${type} Lahore`, `${type} electroplating Lahore`,
    ...(type === 'door handle' ? ['aluminium pull handle manufacturer Lahore', 'sliding door handle Pakistan', 'aluminium glass door handle Pakistan', 'main door handle aluminium Pakistan'] : type === 'window lock' ? ['sliding window lock supplier Lahore', 'aluminium window handle wholesale Pakistan', 'window latch Pakistan'] : type === 'cabinet handle' ? ['kitchen cabinet handles Lahore', 'wardrobe handle wholesale Pakistan', 'drawer pull handle Pakistan'] : ['aluminium fabrication hardware Lahore']),
    ...colors.map((c) => `${c} ${name}`),
    ...String(p.keywords || '').split(','),
  ];
  const title = (p.metaTitle || `${name} ${p.model} - Direct Factory Rate Lahore`).slice(0, 70);
  const description = (p.metaDesc || `${name} ${p.model} direct from our Lahore factory. ${p.size ? p.size + '. ' : ''}${colors.length ? 'Colours: ' + colors.join(', ') + '. ' : ''}Cheap wholesale price, no middleman, premium quality.`).slice(0, 158);
  const intro = `${name} ${p.model} is manufactured at our factory in Lahore and supplied wholesale to hardware shops, fabricators, dealers and contractors across Pakistan. ${p.desc || ''} It is available${colors.length ? ' in ' + colors.join(', ') : ''}${p.finish ? ' with a ' + p.finish.toLowerCase() + ' finish' : ''}. As a direct ${type} manufacturer you get direct factory rates, a cheap wholesale price with no middleman, and premium quality on every order, and we also offer aluminium anodizing and electroplating services in Lahore for custom finish requirements.`;
  const variants = unique([
    `${name}`, `${us}`, `${type} manufacturer Lahore`, `${type} wholesale Pakistan`, `${cat} supplier Pakistan`, `${name} price`,
  ]).slice(0, 6);
  const faqs = [
    { q: `What is the wholesale price of ${name} ${p.model}?`, a: `The price depends on quantity, size and finish. Contact DoorLine Manufacturers on WhatsApp or call for today's wholesale rate of ${name} ${p.model}.` },
    { q: `Are you the manufacturer of ${name} in Lahore?`, a: `Yes. We are a direct manufacturer in Lahore, so you get factory prices instead of trader prices.` },
    { q: `Which colours of ${name} ${p.model} are available?`, a: colors.length ? `It is available in ${colors.join(', ')}. Ask us if you need another colour.` : 'Please contact us for available colours.' },
    { q: `Do you deliver ${name} all over Pakistan?`, a: 'Yes. We send bulk orders from Lahore to all major cities by transport and cargo.' },
  ];
  return { title, description, keywords: unique(kw).slice(0, 24), intro, variants, faqs, type };
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
