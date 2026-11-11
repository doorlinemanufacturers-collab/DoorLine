// Product landing pages for the main products. Text is written for buyers (search intent), not for robots.
const WORKS = 'DoorLine Manufacturers is a manufacturer in Lahore, Pakistan';

export const LANDINGS = {
  'glass-door-handles': {
    path: '/glass-door-handles',
    crumb: 'Glass Door Handles',
    title: ['Glass Door Handles Manufacturer Lahore, Pakistan | DoorLine', 'Glass Door Handles Manufacturer Lahore, Pakistan'],
    desc: (s) => `Glass door handles manufacturer in Lahore, Pakistan. Steel and aluminium pull handles for glass doors. Wholesale rate on WhatsApp ${s.whatsappDisplay || s.whatsapp}.`,
    h1: 'Glass Door Handles Manufacturer in Lahore, Pakistan',
    match: /glass/i,
    productsH: 'Glass Door Handles From Our Factory in Lahore, Pakistan',
    wa: 'Assalam o Alaikum, I want wholesale rates for glass door handles.\nModel / type: \nGlass thickness: \nHole distance (centre to centre): \nQuantity: \nCity: ',
    quick: (s) => `Glass door handles are pull handles that bolt through drilled, tempered glass, usually 8 to 12 mm thick, on shop, office and home doors. ${WORKS}, and supplies glass door handles wholesale across Pakistan. Send the glass thickness, hole distance and quantity on WhatsApp (${s.whatsappDisplay || s.whatsapp}) to get the rate.`,
    intro: [
      'If you fit frameless glass doors for shops, offices, showrooms or homes, the handle is the part your customer touches every day, so it has to feel solid and stay tight for years. DoorLine Manufacturers makes and supplies glass door handles from its own factory in Lahore, Pakistan, in stainless steel and aluminium, and sells them wholesale to glass fabricators, aluminium shops, dealers and contractors.',
      'You buy straight from the manufacturer, so there is no middleman between the factory and your shop. This page explains how to pick the right handle, what decides the price, and how to order on WhatsApp without mistakes.',
    ],
    sections: [
      { h: 'Types of glass door handles', p: ['Before you order, know the style your door needs. These are the shapes glass fabricators use most in Pakistan:'], list: ['H-type bar pull handles: two bolt points through the glass, the most common choice for shop fronts and offices.', 'D-type pull handles: a shorter, rounded grip, popular for inside doors.', 'Ladder or long pull handles: used on double doors and wide entrances where people push through together.', 'Back-to-back pair handles: bolted from both sides, so the door can be pulled from inside and outside.'], after: 'Models and finishes change from batch to batch. Look at the products above or ask for current photos on WhatsApp.' },
      { h: 'How to choose the right glass door handle', p: ['Four measurements decide the handle, and a wrong number is the usual reason for a returned order:'], list: ['Glass thickness: most frameless doors use 8, 10 or 12 mm tempered glass. The bolts and washers must match it.', 'Hole distance: measure from the centre of one hole to the centre of the other (the CTC). If the glass is not drilled yet, give this number to your glass fabricator first.', 'Handle length: a single door usually takes a handle of about 300 to 600 mm; double doors and heavy traffic need longer bars.', 'Where it is used: a busy shop front needs a solid handle, while a light interior door can take a lighter one.'] },
      { h: 'Stainless steel or aluminium glass door handles?', p: ['Both work, and the better one depends on the door.', 'Stainless steel is strong and suits heavy glass and busy entrances. Aluminium is lighter, costs less and can be anodized in gold, bronze, brown, silver or black to match the frames, which is why many shops choose it for interior doors. DoorLine supplies both and finishes aluminium in its own anodizing plant in Lahore, Pakistan, so colours stay the same from one order to the next.'] },
      { h: 'Installing glass door handles without cracking the glass', p: ['Tempered glass cannot be drilled after it is toughened, so the holes must be made before toughening. When you fit the handle, put the supplied washers or gaskets on both sides so metal never touches the glass, and tighten the bolts evenly by hand until firm. Over-tightening is the main cause of chipped holes. If you are unsure, ask your glass fabricator to fit the first handle and copy the method for the rest.'] },
      { h: 'Glass door handle price in Pakistan: what decides the rate', p: ['There is no single price, because the rate depends on the material, the length, the finish, a single handle or a pair, and how many you order. Bulk quantities get better wholesale rates. We do not publish a fixed list that goes out of date. Instead we reply on WhatsApp with the current factory rate for your exact model, so you can compare it with any quote you already have.'] },
      { h: 'Buy glass door handles from a manufacturer in Lahore, Pakistan', p: ['DoorLine Manufacturers is a factory, not a shop. We make aluminium handles and finish them in our own plant, and we supply stainless steel glass door handles to the same standard. That means you can ask us about material, finish and custom lengths and get an answer from the people who make them. Our factory is on Main China Scheme Road, Lahore, Pakistan, and we are open Monday to Saturday, 9 am to 7 pm. Orders go to every city in Pakistan by transport or cargo.', 'To order: open WhatsApp, send the model, glass thickness, hole distance, quantity and your city, then confirm the rate we send back.'] },
      { h: 'Care and cleaning', p: ['Wipe handles with a soft damp cloth and a little mild soap. Do not use bleach, acid cleaners or steel wool, because they dull the finish. Dry the handle after cleaning, especially near bathrooms and in humid weather.'] },
    ],
    faqs: [
      { q: 'What is the price of glass door handles in Pakistan?', a: 'The price depends on the material, length, finish and quantity. DoorLine Manufacturers shares the current wholesale rate on WhatsApp for your exact model, straight from the factory in Lahore, Pakistan.' },
      { q: 'How do I measure a glass door handle before ordering?', a: 'Measure the glass thickness and the hole distance from the centre of one hole to the centre of the other. Add the handle length you want and your quantity, and send these on WhatsApp.' },
      { q: 'Which is better for glass doors, steel or aluminium handles?', a: 'Stainless steel suits heavy glass and busy shop fronts. Aluminium is lighter, costs less and comes in anodized colours, so it suits interior doors. We supply both.' },
      { q: 'Do you sell glass door handles wholesale and deliver across Pakistan?', a: 'Yes. We are a manufacturer in Lahore, Pakistan and sell wholesale to glass fabricators, dealers and contractors. Orders are sent to every city in Pakistan by transport or cargo.' },
    ],
    pick: ['handles', 'hardware', 'finishing', 'manufacturer'],
    alt: (n) => `Glass door handle ${n} - stainless steel and aluminium pull handles - DoorLine Manufacturers, Lahore, Pakistan`,
  },

  'steel-handles': {
    path: '/steel-handles',
    crumb: 'Steel Handles',
    title: ['Stainless Steel Handles Manufacturer Lahore, Pakistan | DoorLine', 'Stainless Steel Handles Manufacturer Lahore, Pakistan'],
    desc: (s) => `Stainless steel (SS) handles manufacturer in Lahore, Pakistan. Door and glass door handles, wholesale rate on WhatsApp ${s.whatsappDisplay || s.whatsapp}.`,
    h1: 'Stainless Steel Handles (SS Handles) Manufacturer in Lahore, Pakistan',
    match: /steel|stainless|\bss\b/i,
    productsH: 'Steel and SS Handles From Our Factory in Lahore, Pakistan',
    wa: 'Assalam o Alaikum, I want wholesale rates for steel / SS handles.\nModel: \nLength: \nFinish: \nQuantity: \nCity: ',
    quick: (s) => `Stainless steel (SS) handles are strong, rust-resistant handles used on glass doors, entrance doors and commercial doors. ${WORKS} and supplies steel handles wholesale across Pakistan. Send the model, length and quantity on WhatsApp (${s.whatsappDisplay || s.whatsapp}) for the factory rate.`,
    intro: [
      'Steel handles are the choice when a door gets heavy daily use: shop fronts, offices, showrooms and main entrances. DoorLine Manufacturers supplies stainless steel (SS) handles for glass doors and other doors from its factory in Lahore, Pakistan, and sells them wholesale to dealers, fabricators and contractors.',
      'Below you will find what to check before buying, how steel compares with aluminium, and how to order on WhatsApp.',
    ],
    sections: [
      { h: 'Where stainless steel handles are used', p: ['Stainless steel handles go on frameless glass doors, aluminium and wooden entrance doors, office doors and showroom doors. They suit places where hands touch the door all day and the handle must not bend or loosen.'] },
      { h: 'Steel handles or aluminium handles?', p: ['Steel is stronger and better for heavy or busy doors. Aluminium is lighter, costs less and can be anodized in several colours. Many customers use steel on the main entrance and aluminium on interior doors, and we supply both from the same factory in Lahore, Pakistan.'] },
      { h: 'What to check before you buy SS handles', p: ['A good steel handle is judged on a few points you can check yourself:'], list: ['Weight and wall thickness: a hollow, very light handle can dent or loosen.', 'Welds and joints: they should be smooth, with no gaps or rough spots.', 'Finish: an even finish with no scratches or colour patches along the bar.', 'Fixing: the bolts, washers and caps should fit tightly and match your door.'] },
      { h: 'Do steel handles rust?', p: ['Stainless steel resists rust far better than plain steel, but it is not immune. Salty air, bleach and harsh cleaners can leave stains on any stainless surface. Wipe the handle with a soft cloth and mild soap, dry it, and avoid steel wool. If the door is outdoors or near the sea, tell us so we can suggest a suitable model.'] },
      { h: 'How to order the right size', p: ['Tell us the door type and, for glass doors, the glass thickness and the hole distance from centre to centre. For other doors, send the handle length you want and the fixing distance. A photo of the door or of an old handle is the quickest way to avoid a wrong order, and you can send it straight on WhatsApp.'] },
      { h: 'Steel handle price in Pakistan: what decides the rate', p: ['The rate depends on the model, length, thickness, finish and quantity. Instead of printing a price list that goes out of date, we send the current wholesale rate on WhatsApp for your exact model, direct from the factory.'] },
      { h: 'Order steel handles from a manufacturer in Lahore, Pakistan', p: ['We are a manufacturer, so you deal with the factory and not a trader. Send the model, length, finish, quantity and your city on WhatsApp, check the rate we reply with, and confirm. Orders are sent to every city in Pakistan by transport or cargo. Our factory is on Main China Scheme Road, Lahore, Pakistan, open Monday to Saturday, 9 am to 7 pm.'] },
    ],
    faqs: [
      { q: 'What is the price of steel handles in Pakistan?', a: 'It depends on the model, length, thickness, finish and quantity. DoorLine Manufacturers shares the current wholesale rate on WhatsApp, straight from its factory in Lahore, Pakistan.' },
      { q: 'Are stainless steel handles rust-proof?', a: 'Stainless steel resists rust well but can still stain from salty air, bleach or harsh cleaners. Clean with mild soap and a soft cloth and dry the handle.' },
      { q: 'Which is better, steel or aluminium handles?', a: 'Steel is stronger for heavy, busy doors. Aluminium is lighter, cheaper and available in anodized colours. We supply both.' },
      { q: 'Do you sell steel handles wholesale across Pakistan?', a: 'Yes. We are a manufacturer in Lahore, Pakistan and send wholesale orders to every city by transport or cargo.' },
    ],
    pick: ['handles', 'hardware', 'finishing', 'manufacturer'],
    alt: (n) => `Stainless steel handle ${n} - steel and SS handles - DoorLine Manufacturers, Lahore, Pakistan`,
  },
};

export function landingMeta(cfg, site) {
  const title = cfg.title.find((t) => t.length <= 60) || cfg.title[cfg.title.length - 1];
  const description = cfg.desc(site).slice(0, 155);
  return { title: { absolute: title }, description, alternates: { canonical: cfg.path }, openGraph: { title, description, url: cfg.path, images: ['/images/og-default.jpg'] } };
}
