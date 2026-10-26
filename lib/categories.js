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
  const title = `Aluminum ${name} - Wholesaler & Manufacturer in Pakistan and Lahore | Doorline`;
  const dc = [`Aluminum ${low} for ${d.use}. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${site.phone} for factory price.`, `Aluminum ${low}. Wholesaler & Manufacturer in Pakistan and Lahore. Call ${site.phone} for price.`, `Aluminum ${low}. Wholesaler & Manufacturer in Pakistan. Call now.`];
  const description = dc.find((x) => x.length <= 155) || dc[2];
  const h1 = `Aluminum ${name} - Wholesaler & Manufacturer in Pakistan and Lahore`;
  const intro = `DoorLine Manufacturers is a professional aluminium handles manufacturer in Lahore, Pakistan. Our aluminum ${low} are made for ${d.use}, in anodized and powder coated finishes, and sold wholesale at direct factory rates with no middleman. Hardware shops, fabricators, furniture makers and contractors order from us in Lahore and deliver across Pakistan.`;
  const sections = [
    { h: `How to Choose Aluminium ${name}`, t: d.tip },
    { h: 'Colours and Finishes', t: `Our aluminium ${low} are available in gold, bronze, brown, silver, white and black. Anodized finishes resist wear and weather, and powder coated finishes give a wider colour range. We also provide anodizing and electroplating services for your own aluminium parts.` },
    { h: 'Wholesale Price and Delivery', t: `Because we are the manufacturer, ${low} come at direct factory rates. Message us on WhatsApp at ${site.whatsappDisplay || site.whatsapp} or call ${site.phone} for today's rate list. We deliver from Lahore to all cities in Pakistan by transport and cargo.` },
  ];
  const faqs = [
    { q: `Are you a manufacturer of aluminum ${low} in Lahore?`, a: 'Yes. We are a direct manufacturer with our own factory in Lahore, so you get factory rates with no middleman.' },
    { q: `What is the wholesale price of aluminium ${low}?`, a: `The price depends on the model, size, finish and quantity. Contact us for today's wholesale rate list.` },
    { q: `Do you deliver aluminium ${low} all over Pakistan?`, a: 'Yes. We deliver to all major cities by transport and cargo.' },
    { q: `Can I get ${low} in custom sizes or colours?`, a: 'For bulk orders we can supply custom lengths and selected colours. Send us the size, colour and quantity.' },
  ];
  const keywords = [`aluminum ${low} Lahore`, `aluminium ${low} manufacturer in Lahore`, `${low} wholesale Pakistan`, `${low} supplier Pakistan`, `aluminum ${low} price in Pakistan`, `${low} factory Lahore`, `buy aluminium ${low} online Pakistan`];
  return { title, description, h1, intro, sections, faqs, keywords };
}
