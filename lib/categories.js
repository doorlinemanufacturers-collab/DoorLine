import { slugify } from './site';

export const catSlug = (name) => `aluminum-${slugify(name)}-lahore`;

const D = {
  'Door Handles': { use: 'shop fronts, offices, homes and glass, wooden and aluminium doors', tip: 'Measure the door width and the fixing distance, then choose a bar or pull handle of 8 to 12 inch or longer for wide and double doors.' },
  'Cabinet Handles': { use: 'kitchen cabinets, wardrobes, drawers and furniture', tip: 'Measure the centre-to-centre distance between the two screw holes and choose a handle with the same hole spacing. Common spacings are 64mm, 96mm, 128mm, 160mm and 192mm.' },
  'Window Locks': { use: 'sliding aluminium windows and doors', tip: 'Match the lock type (crescent or lever) to your window section and choose a colour that matches the frame.' },
  Hinges: { use: 'aluminium doors and frames', tip: 'Choose a hinge according to the door weight and the frame section, and check the finish matches your door.' },
  Fittings: { use: 'handle assembly and aluminium fabrication', tip: 'Check the side plate shape, pin size and end caps so the parts match your handle section.' },
};

export function categoryPage(name, site) {
  const d = D[name] || { use: 'doors, windows, cabinets and furniture', tip: 'Send us a photo and the measurements and we will suggest the right model.' };
  const low = name.toLowerCase();
  const tc = [`Aluminum ${name} | Pakistan, Lahore | Doorline`, `Aluminum ${name} | Pakistan, Lahore`];
  const title = tc.find((x) => x.length <= 60) || tc[1].slice(0, 60);
  const dc = [`Aluminum ${low} for ${d.use}. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${site.phone} for factory price.`, `Aluminum ${low}. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${site.phone} for price.`, `Aluminum ${low}. Wholesaler & Manufacturer in Pakistan. Call now.`];
  const description = dc.find((x) => x.length <= 155) || dc[2];
  const h1 = `Aluminum ${name} - Wholesaler & Manufacturer in Pakistan and Lahore`;
  const intro = `DoorLine Manufacturers is a professional aluminium handles manufacturer in Lahore, Pakistan. Our aluminum ${low} are made for ${d.use}, in anodized and powder coated finishes, and sold wholesale at direct factory rates with no middleman. Hardware shops, fabricators, furniture makers and contractors order from us in Lahore, Pakistan and deliver across Pakistan.`;
  const sections = [
    { h: `How to Choose Aluminium ${name}`, t: d.tip },
    { h: 'Colours and Finishes', t: `Our aluminium ${low} are available in gold, bronze, brown, silver, white and black. Anodized finishes resist wear and weather, and powder coated finishes give a wider colour range. We also provide anodizing and electroplating services for your own aluminium parts.` },
    { h: 'Wholesale Price and Delivery', t: `Because we are the manufacturer, ${low} come at direct factory rates. Message us on WhatsApp at ${site.whatsappDisplay || site.whatsapp} or call ${site.phone} for today's rate list. We deliver from Lahore, Pakistan to all cities in Pakistan by transport and cargo.` },
  ];
  const faqs = [
    { q: `Are you a manufacturer of aluminum ${low} in Lahore, Pakistan?`, a: 'Yes. We are a direct manufacturer with our own factory in Lahore, Pakistan, so you get factory rates with no middleman.' },
    { q: `What is the wholesale price of aluminium ${low}?`, a: `The price depends on the model, size, finish and quantity. Contact us for today's wholesale rate list.` },
    { q: `Do you deliver aluminium ${low} all over Pakistan?`, a: 'Yes. We deliver to all major cities by transport and cargo.' },
    { q: `Can I get ${low} in custom sizes or colours?`, a: 'For bulk orders we can supply custom lengths and selected colours. Send us the size, colour and quantity.' },
  ];
  const keywords = [`aluminum ${low} Lahore`, `aluminium ${low} manufacturer in Lahore, Pakistan`, `${low} wholesale Pakistan`, `${low} supplier Pakistan`, `aluminum ${low} price in Pakistan`, `${low} factory Lahore`, `buy aluminium ${low} online Pakistan`];
  const base = { title, description, h1, intro, sections, faqs, keywords };
  const o = OVERRIDES[name];
  return o ? { ...base, ...o(site) } : base;
}

// Unique, hand-written pages for the main products (one page = one product, no mixing).
const wa = (site) => site.whatsappDisplay || site.whatsapp;
const OVERRIDES = {
  'Door Handles': (site) => ({
    title: 'Aluminium Door Handles Manufacturer Lahore, Pakistan',
    description: `Aluminium door handles manufacturer in Lahore, Pakistan. Anodized gold, black, silver and brown. Wholesale rate on WhatsApp ${wa(site)}.`.slice(0, 155),
    h1: 'Aluminium Door Handles Manufacturer in Lahore, Pakistan',
    intro: 'DoorLine Manufacturers is a manufacturer in Lahore, Pakistan, and aluminium door handles are what we make every day. We supply them wholesale to aluminium and glass shops, hardware dealers, furniture makers and contractors, and we finish them in our own anodizing plant, so the colour you approve is the colour you receive. Looking for steel or glass door handles? See our glass door handles and steel handles pages.',
    sections: [
      { h: 'Why aluminium for door handles', t: 'Aluminium is light, does not rust and is easy to clean, which is why it is the usual choice for interior doors, bathroom doors, office partitions and aluminium-frame doors. A well finished aluminium handle keeps its look for years without polishing.' },
      { h: 'Finishes: anodized and powder coated', t: 'Anodized aluminium has a hard, even surface that resists scratches and sun, and it comes in gold, bronze, brown, silver and black. Powder coating gives more colours, including white. Tell us the colour of your door frames and we will match the finish.' },
      { h: 'How to choose the right door handle size', t: 'Measure the fixing distance between the two screw or bolt points, and note the door thickness. Pick the handle length by the door width and how many people use it. If you are unsure, send a photo of the door and the old handle on WhatsApp and we will suggest the model.' },
      { h: 'Aluminium door handle price in Pakistan', t: `The rate depends on the model, length, finish and quantity. We do not print a fixed list that goes out of date; we send today's wholesale rate on WhatsApp at ${wa(site)}. Bulk orders get better rates, and delivery goes from Lahore, Pakistan to every city by transport or cargo.` },
      { h: 'Buy from the manufacturer, not a trader', t: 'You deal with the factory, so questions about the metal, the finish or a custom length are answered by the people who make the handles. Our address is Main China Scheme Road, Lahore, Pakistan, and we are open Monday to Saturday, 9 am to 7 pm.' },
    ],
    faqs: [
      { q: 'What is the price of aluminium door handles in Pakistan?', a: `It depends on the model, length, finish and quantity. DoorLine Manufacturers sends the current wholesale rate on WhatsApp (${wa(site)}).` },
      { q: 'Which colours do aluminium door handles come in?', a: 'Anodized gold, bronze, brown, silver and black, and powder coated white and other colours. We match the finish to your frames.' },
      { q: 'Are aluminium door handles strong enough for daily use?', a: 'Yes, for interior and light commercial doors. For very heavy glass doors or busy shop fronts, a stainless steel handle is the safer choice, and we supply both.' },
      { q: 'Do you deliver aluminium door handles across Pakistan?', a: 'Yes. We are a manufacturer in Lahore, Pakistan and send wholesale orders to every city by transport or cargo.' },
    ],
    keywords: ['aluminium door handles manufacturer in Lahore, Pakistan', 'aluminium door handles price in Pakistan', 'aluminium door handles wholesale Pakistan', 'anodized aluminium door handles'],
  }),
  Hinges: (site) => ({
    title: 'Door Hinges Manufacturer Lahore, Pakistan | DoorLine',
    description: `Door hinges manufacturer in Lahore, Pakistan. Openable (qabza) and 3D adjustable hinges, wholesale rate on WhatsApp ${wa(site)}.`.slice(0, 155),
    h1: 'Door Hinges Manufacturer in Lahore, Pakistan',
    intro: 'DoorLine Manufacturers is a manufacturer in Lahore, Pakistan, and door hinges are one of our five main products. We supply openable hinges (qabza) and 3D adjustable hinges wholesale to hardware shops, fabricators, carpenters and contractors across Pakistan, at direct factory rates.',
    sections: [
      { h: 'Which door hinge do you need?', t: 'An openable hinge (qabza) is the simple, common choice for light and medium doors. A 3D hinge can be adjusted in three directions after fitting, so a door that has sagged or rubs the frame can be lined up again without removing it. Tell us the door type and we will suggest one.' },
      { h: 'How to choose a hinge', t: 'Check three things: the weight and thickness of the door, the size of the hinge leaf that fits the frame, and how many hinges the door needs. Heavier doors need a stronger hinge and usually three hinges instead of two.' },
      { h: 'Fitting tips', t: 'Mark the hinge positions on the door and the frame before cutting, keep the screws straight, and use all the screw holes. A hinge fitted out of line is the usual reason a door squeaks or does not close.' },
      { h: 'Door hinge price in Pakistan', t: `The price depends on the type, size, finish and quantity. Message us on WhatsApp at ${wa(site)} for today's wholesale rate. We deliver from Lahore, Pakistan to all cities by transport or cargo.` },
    ],
    faqs: [
      { q: 'What is the price of door hinges in Pakistan?', a: `It depends on the type, size, finish and quantity. DoorLine Manufacturers shares the current wholesale rate on WhatsApp (${wa(site)}).` },
      { q: 'What is the difference between a qabza and a 3D hinge?', a: 'A qabza (openable hinge) is a simple fixed hinge. A 3D hinge can be adjusted in three directions after fitting, which helps when a door sags.' },
      { q: 'How many hinges does a door need?', a: 'Light doors often use two hinges. Heavier or taller doors need three, to share the weight and keep the door straight.' },
      { q: 'Do you sell door hinges wholesale across Pakistan?', a: 'Yes. We are a manufacturer in Lahore, Pakistan and send wholesale orders to every city by transport or cargo.' },
    ],
    keywords: ['door hinges manufacturer in Lahore, Pakistan', 'door hinges price in Pakistan', 'qabza price in Pakistan', '3d hinge kabza Pakistan'],
  }),
};
