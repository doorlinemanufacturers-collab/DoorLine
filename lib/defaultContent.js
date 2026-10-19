const P = (model, name, category, image, desc, size, finish, colors) => ({
  id: model.toLowerCase(),
  slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model.toLowerCase()}-lahore`.replace(/-+/g, '-'),
  model, name, category, image,
  alt: `${name} ${model} ${size} Lahore Pakistan`,
  desc, size, finish, colors,
});

export const defaultContent = {
  site: {
    name: 'DoorLine Manufacturers',
    tagline: 'Aluminium Handles Manufacturer Lahore',
    owner: 'Abdul Waheed',
    phone: '0302 4888180',
    whatsappDisplay: '0345 4880180',
    whatsapp: '923454880180',
    email: 'info@example.com',
    address: 'Factory Address Here, Lahore, Punjab, Pakistan',
    hours: 'Mon-Sat 9:00 AM - 7:00 PM',
    mapQuery: 'Lahore, Pakistan',
  },
  hero: {
    h1: 'Aluminium Door & Cabinet Handles Manufacturer in Lahore - Factory Price for Bulk Buyers',
    sub: 'Direct factory se aluminium door handles, cabinet handles, window locks aur hinges. Hardware shops, dealers aur contractors ke liye wholesale rates.',
    image: '/images/fluted-bar-handle-white-gold.jpg',
  },
  about: {
    title: 'About DoorLine Manufacturers',
    text: 'DoorLine Manufacturers Lahore me aluminium door handles, cabinet handles, window locks aur hinges ki direct manufacturer hai. Hum hardware shops, aluminium window/door fabricators aur dealers ko factory rate par maal supply karte hain. Anodized gold, brown, silver, white aur black finishes me ready stock aur bulk orders dono available hain.',
  },
  why: [
    { title: 'Direct Factory Rates', text: 'Beech me koi trader nahi - seedha factory se wholesale price.' },
    { title: 'Many Designs & Colours', text: 'Fluted bar, flat pull, sliding aur window handles, 5 se zyada colours me.' },
    { title: 'Bulk Delivery Pakistan', text: 'Lahore se poore Pakistan me cargo / transport ke zariye delivery.' },
    { title: 'Consistent Quality', text: 'Strong aluminium sections aur durable powder/anodized finish.' },
  ],
  products: [
    P('DL-101', 'Aluminium Sliding Door Handle Set', 'Door Handles', '/images/sliding-door-handle-set.jpg', 'Bracket type aluminium sliding door pull handle, white aur gold finish me. Aluminium doors aur windows ke liye.', 'Bracket type', 'Powder coated', 'White, Gold'),
    P('DL-102', 'York Fluted Aluminium Bar Handle', 'Door Handles', '/images/york-fluted-bar-handle-gold.jpg', 'Fluted (lined) round aluminium bar handle pair, screws aur boxed packing ke sath. Glass aur wooden doors ke liye.', 'Bar 8 inch (custom sizes available)', 'Anodized', 'Gold, White, Black'),
    P('DL-103', 'Fluted Aluminium Bar Handle', 'Door Handles', '/images/fluted-bar-handle-white-gold.jpg', 'Premium fluted aluminium bar handle, white aur gold anodized. Shops, offices aur homes ke liye.', 'Bar 8 inch', 'Anodized / Powder coated', 'White, Gold'),
    P('DL-104', 'Black Fluted Aluminium Bar Handle', 'Door Handles', '/images/fluted-bar-handle-black.jpg', 'Black fluted aluminium bar handle pair with mounting brackets.', 'Bar 10 inch', 'Matte black', 'Black'),
    P('DL-105', 'Wide Flat Aluminium Door Handle', 'Door Handles', '/images/wide-flat-door-handle.jpg', 'Wide profile aluminium door handle, brown aur silver finish. Strong grip, boxed packing.', 'Wide profile', 'Anodized', 'Brown, Silver'),
    P('DL-106', 'D38D Aluminium Door Handle', 'Door Handles', '/images/d38d-wide-door-handle.jpg', 'Model D38D aluminium door handle in gold finish, quality hardware box packing.', 'Wide profile', 'Anodized', 'Gold'),
    P('DL-107', 'Aluminium Sliding Handle Range', 'Door Handles', '/images/sliding-handle-range.jpg', 'Aluminium handle range - multiple shapes and colours for sliding doors and windows.', 'Assorted', 'Powder coated', 'Gold, Silver, White'),
    P('DL-108', 'Aluminium Handle Fitting Kit', 'Fittings', '/images/handle-fitting-parts.jpg', 'Handle side plates, centre pin aur black end caps ka fitting set - fabricators ke liye.', 'Standard', 'Powder coated', 'Grey, White'),
    P('DL-201', 'Aluminium Door Lift-off Hinge', 'Hinges', '/images/aluminium-lift-off-hinge.jpg', 'Lift-off aluminium door hinge, smooth pin, gold finish. Aluminium doors ke liye.', 'Standard', 'Powder coated', 'Gold, Silver'),
    P('DL-301', 'Aluminium Window Crescent Lock', 'Window Locks', '/images/window-crescent-lock.jpg', 'Sliding window crescent lock, 4 colours me - silver, brown, gold, white.', 'Standard', 'Powder coated', 'Silver, Brown, Gold, White'),
    P('DL-302', 'Window Lock Lever Gold', 'Window Locks', '/images/window-lock-lever-gold.jpg', 'Lever type aluminium window lock, gold finish, strong cam action.', 'Standard', 'Powder coated', 'Gold'),
    P('DL-401', 'Flat Aluminium Pull Handle', 'Cabinet Handles', '/images/flat-pull-handle-4-colours.jpg', 'Flat plate aluminium pull handle - silver, gold, white aur black. Cabinets, windows aur doors.', '5 inch', 'Anodized / Powder coated', 'Silver, Gold, White, Black'),
  ],
  faqs: [
    { q: 'What is the wholesale price of aluminium door handles in Lahore?', a: 'Price size, finish aur quantity par depend karti hai. Latest wholesale rate list ke liye WhatsApp ya call karein - hum same day rates share karte hain.' },
    { q: 'Do you provide bulk delivery all over Pakistan?', a: 'Ji haan, hum Lahore se Karachi, Islamabad, Peshawar, Quetta, Multan, Faisalabad samet poore Pakistan me transport / cargo se bulk delivery karte hain.' },
    { q: 'Are you a direct manufacturer or trader?', a: 'Hum direct manufacturer hain, trader nahi. Isi liye aapko factory price milti hai.' },
    { q: 'How many designs of cabinet handles do you have?', a: 'Hamare paas fluted bar, flat pull, sliding aur window handles ke kai designs hain. Poori list ke liye catalogue request karein.' },
    { q: 'Where is your aluminium handles factory in Lahore?', a: 'Hamari factory Lahore, Punjab me hai. Exact address aur map is page ke Contact section me maujood hai.' },
    { q: 'What is the minimum order quantity (MOQ)?', a: 'Wholesale ke liye MOQ model ke hisaab se alag hota hai. Apni requirement WhatsApp par bhejein, hum best rate batayenge.' },
    { q: 'Which colours and finishes are available?', a: 'Gold, brown, silver, white aur black - anodized aur powder coated finishes me.' },
    { q: 'Can you make custom sizes or private packing?', a: 'Bulk orders par custom size aur dealer ki apni packing mumkin hai. Details ke liye humse rabta karein.' },
  ],
};

