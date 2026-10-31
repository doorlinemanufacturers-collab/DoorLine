const P = (model, name, category, image, desc, size, finish, colors) => ({
  id: model.toLowerCase(),
  slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model.toLowerCase()}-lahore`.replace(/-+/g, '-'),
  model, name, category, image,
  alt: '',
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
    facebook: '',
    instagram: '',
    youtube: '',
    googleBusiness: '',
  },
  cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Gujranwala', 'Sialkot', 'Hyderabad', 'Sargodha', 'Bahawalpur', 'Sukkur', 'Abbottabad', 'Gujrat', 'Sahiwal', 'Sheikhupura', 'Kasur', 'Okara', 'Rahim Yar Khan', 'Dera Ghazi Khan', 'Mardan', 'Kohat', 'Larkana'],
  popular: [
    { label: 'Aluminum Handles', href: '/aluminum-handles' },
    { label: 'Aluminum Hardware', href: '/aluminum-hardware' },
    { label: 'Aluminum Handles Manufacturer in Lahore', href: '/aluminium-handles-manufacturer/lahore' },
    { label: 'Aluminum Handles Manufacturer in Pakistan', href: '/aluminium-handles-manufacturer/pakistan' },
    { label: 'Aluminum Door Handles', href: '/collections/aluminum-door-handles-lahore' },
    { label: 'Aluminum Cabinet Handles', href: '/collections/aluminum-cabinet-handles-lahore' },
    { label: 'Aluminum Hinges', href: '/collections/aluminum-hinges-lahore' },
    { label: 'Aluminum Window Locks', href: '/collections/aluminum-window-locks-lahore' },
    { label: 'Black Fluted Bar Handle', href: '/products/black-fluted-aluminium-bar-handle-dl-104-lahore' },
    { label: 'Anodizing Services in Pakistan', href: '/services/aluminium-anodizing-service-lahore' },
    { label: 'Electroplating Services in Pakistan', href: '/services/aluminium-electroplating-service-lahore' },
    { label: 'Aluminum Handles Karachi', href: '/aluminium-handles-manufacturer/karachi' },
    { label: 'Aluminum Handles Islamabad', href: '/aluminium-handles-manufacturer/islamabad' },
    { label: 'Aluminum Handles Buying Guides', href: '/guides' },
  ],
  homeFaqs: [
    { q: 'What are aluminum handles?', a: 'Aluminum (aluminium) handles are door, cabinet and window handles made from aluminium. They are light, resist rust and come in anodized and powder coated finishes such as gold, bronze, silver, white and black.' },
    { q: 'What is aluminum hardware?', a: 'Aluminum hardware means fittings made from aluminium for doors, windows and cabinets: handles, hinges, window locks and fittings. See our aluminum hardware range for the full list.' },
    { q: 'Where can I buy aluminum handles wholesale in Pakistan?', a: 'You can buy directly from Doorline, a wholesaler and manufacturer in Lahore. We deliver to every city in Pakistan at direct factory rates with no middleman.' },
    { q: 'What is the price of aluminum handles in Pakistan?', a: 'The price depends on the model, size, finish and quantity. Message us on WhatsApp or call for today\'s wholesale rate list.' },
    { q: 'Which aluminum handle is best for glass and aluminium doors?', a: 'Bar handles and pull handles with mounting brackets are common for glass and aluminium doors. Our size guide explains how to choose the length and fixing distance.' },
    { q: 'Are aluminum handles better than steel handles?', a: 'Aluminium is lighter and does not rust like steel, and it can be anodized in many colours. Steel can be heavier and may rust if its coating is damaged.' },
    { q: 'Do you supply hinges, window locks and other aluminum hardware?', a: 'Yes. Besides handles we supply aluminium hinges, window crescent and lever locks and handle fittings.' },
    { q: 'Do you provide anodizing for aluminum handles?', a: 'Yes. We provide anodizing and electroplating services in Pakistan and Lahore for our own products and for your aluminium parts.' },
  ],
  badges: ['Professional Manufacturer', 'Direct Factory Rates', 'No Middleman', 'Cheap Wholesale Price', 'Premium Quality', 'Anodizing & Electroplating'],
  hero: {
    h1: 'Aluminum Handles Manufacturer & Hardware Dealer in Pakistan, Lahore',
    sub: 'DoorLine Manufacturers is a professional wholesaler and manufacturer of aluminum (aluminium) handles and aluminum hardware in Pakistan and Lahore. Buy aluminium door handles, cabinet handles, window locks and hinges directly from the factory, and get professional aluminium anodizing and electroplating services. Wholesale rates for hardware shops, dealers, fabricators and contractors across Pakistan.',
    image: '',
  },
  about: {
    vision: 'To be the most trusted aluminium handles manufacturer and finishing partner in Pakistan, known for premium quality, honest direct factory rates and reliable service.',
    mission: 'To manufacture durable aluminium door handles, cabinet handles, window locks and hinges, and to provide anodizing and electroplating services, at fair prices without middlemen, helping dealers, fabricators and contractors grow their business.',
    promise: 'Premium quality in every batch, direct factory rates with no middleman, honest communication and dependable delivery across Pakistan.',
    title: 'About DoorLine Manufacturers',
    text: 'DoorLine Manufacturers is a direct manufacturer of aluminium door handles, cabinet handles, window locks and hinges based in Lahore, Pakistan. We supply hardware shops, aluminium window and door fabricators, dealers and contractors at factory rates.\n\nOur range is available in anodized gold, brown, silver, white and black finishes, in ready stock as well as bulk production orders. We also provide aluminium anodizing and electroplating services in Lahore, so you can get manufacturing and finishing from one trusted source. Every batch is finished with care so that your customers receive a clean, durable product.',
  },
  why: [
    { title: 'Direct Factory Rates, No Middleman', text: 'You buy straight from the manufacturer, so you get a cheap wholesale price without trader margins.' },
    { title: 'Wide Range of Designs', text: 'Fluted bar, flat pull, sliding door and window handles in many sizes and colours.' },
    { title: 'Bulk Delivery Across Pakistan', text: 'We dispatch from Lahore to all major cities by transport and cargo.' },
    { title: 'Anodizing & Electroplating', text: 'In-house finishing services for aluminium handles, hardware and parts, for bulk and job work orders.' },
    { title: 'Premium Quality', text: 'Strong aluminium sections with a durable, premium anodized or powder coated finish on every batch.' },
  ],
  seo: [
    { title: 'Aluminum Handles Manufacturer in Pakistan', text: 'DoorLine Manufacturers is a professional aluminum handles manufacturer in Pakistan, with its factory in Lahore. We supply aluminium door handles, cabinet handles, window locks and hinges, plus anodizing and electroplating services, to hardware shops, fabricators and dealers in every city of Pakistan at direct factory rates with no middleman.' },
    { title: 'Anodizing Services in Pakistan and Lahore', text: 'Need anodizing in Pakistan or Lahore? DoorLine Manufacturers provides aluminium anodizing services for handles, locks, hinges, profiles and other aluminium parts, in gold, bronze, brown, silver and black. Bulk and job work orders are welcome, at direct factory rates with no middleman and premium quality. Read more about our anodizing process, colours and how to send your parts on the anodizing services page.' },
    { title: 'Aluminum Handles vs Steel Handles', text: 'Many buyers search for steel or aluminum handles and wonder which one to choose. Aluminium handles are light, do not rust, and can be anodized or powder coated in many colours, which makes them a popular choice for aluminium doors, windows, cabinets and wardrobes. Steel handles are heavier and may rust if the coating is damaged. DoorLine Manufacturers specialises in aluminium handles, and our team can help you pick the right length, finish and fixing for your door.' },
    { title: 'Aluminium Door and Window Handles for Fabricators in Lahore', text: 'Aluminium fabricators and glass workshops in Lahore need handles, locks and hinges that fit standard aluminium sections and arrive on time. We supply pull handles, bar handles, sliding door handles, window handles and sliding window locks in standard sizes and in custom lengths for bulk orders, so your workshop can finish doors and windows without waiting on small imports.' },
    { title: 'How to Choose Aluminium Door Handles', text: 'Check the handle length against the door width, the section thickness against your screw or bolt fixing, and the finish against where the door will be used. Anodized finishes suit outdoor and high traffic doors because the coating is part of the metal and does not peel. Powder coated finishes give a wider range of colours for interiors. For glass doors and sliding doors choose a handle with a bracket designed for that fixing. If you are not sure, send us a photo and the door details on WhatsApp and we will suggest the right model.' },
    { title: 'Top Aluminium Handles Manufacturers in Lahore - Direct Factory Rates, No Middleman', text: 'Looking for top aluminium handles manufacturers in Lahore? DoorLine Manufacturers is a professional manufacturer that makes premium quality aluminium door handles, cabinet handles, window locks and hinges and sells them at direct factory rates with no middleman. That means a cheap wholesale price for hardware shops, dealers and fabricators, without compromising on finish or strength.' },
    { title: 'Premium Quality Anodizing at Direct Factory Rates', text: 'Our aluminium anodizing service delivers a premium quality, long lasting finish at direct factory rates. There is no middleman between you and the plant, so bulk anodizing and electroplating orders in Lahore get a cheap, competitive price with dependable quality and delivery across Pakistan.' },
    { title: 'Aluminium Anodizing Service in Lahore', text: 'Besides manufacturing handles, we provide aluminium anodizing in Lahore. Anodizing creates a hard, corrosion resistant oxide layer that can be coloured in gold, bronze, brown, silver and black. It is the preferred finish for aluminium handles, window fittings and profiles that must look good and last for years.' },
    { title: 'Electroplating Services in Pakistan and Lahore', text: 'We also offer electroplating in Pakistan and Lahore for aluminium parts and hardware. Correct surface preparation and plating give a bright, durable finish that resists wear and corrosion. Contact us with your sample and quantity and we will advise the most suitable finish.' },
    { title: 'Aluminium Door Handles Manufacturer in Lahore', text: 'DoorLine Manufacturers produces aluminium door handles in Lahore for homes, offices, shops and commercial buildings. Our fluted bar handles, flat pull handles and sliding door handles are made from strong aluminium sections and finished in gold, brown, silver, white and black. Because we are the factory and not a trader, hardware dealers and fabricators get true manufacturer pricing on every order, and we can also anodize or electroplate aluminium parts to match your finish requirements.' },
    { title: 'Aluminium Door Handles Wholesale in Pakistan', text: 'If you run a hardware shop, a glass and aluminium workshop or a building material store, we can supply aluminium door handles wholesale in Pakistan at competitive rates. Ready stock is available for popular models, and larger quantities can be produced on request. Send us your required models, colours and quantities and we will share the latest wholesale rate list. Need a special finish? Ask about our aluminium anodizing and electroplating services.' },
    { title: 'Kitchen Cabinet Handles Factory in Lahore', text: 'Our flat pull and bar style cabinet handles suit kitchens, wardrobes, drawers and furniture. As a kitchen cabinet handles factory in Lahore, we can offer several sizes and finishes, so furniture makers and interior contractors can match handles with their designs without paying retail prices. Anodized and electroplated finishes can be arranged for bulk orders.' },
    { title: 'Window Locks, Hinges and Fittings', text: 'Besides handles, we supply aluminium window crescent locks, lever locks, lift-off door hinges and handle fitting parts. Buying handles, locks and hinges from one supplier saves time, keeps colours consistent and reduces delivery costs on mixed orders.' },
    { title: 'Aluminium Handles Wholesale Market Lahore Supply', text: 'Many shops in the aluminium handles wholesale market in Lahore and other cities buy from us because of steady quality, clear pricing and reliable dispatch. We deliver to Karachi, Islamabad, Rawalpindi, Peshawar, Quetta, Multan, Faisalabad and every other city in Pakistan.' },
    { title: 'Who We Supply', text: 'Hardware stores, aluminium and glass fabricators, door and window workshops, furniture manufacturers, interior designers and construction contractors. If you resell or install aluminium hardware, our factory price list is made for you.' },
  ],
  services: [
    {
      slug: 'aluminium-anodizing-service-lahore',
      title: 'Aluminium Anodizing Services in Pakistan and Lahore',
      metaTitle: 'Anodizing Services in Pakistan, Lahore | Doorline',
      short: 'Anodizing services in Pakistan and Lahore: durable, colourful anodized finishes for aluminium handles, profiles and hardware.',
      image: '',
      gallery: [],
      keywords: 'anodizing in Pakistan, anodizing services in Pakistan, anodizing service in Pakistan, aluminium anodizing Pakistan, aluminum anodizing in Pakistan, anodizing services in Lahore, anodizing Lahore, aluminum anodizing Lahore, aluminium anodizing service Pakistan, anodising service Lahore, colour anodizing Pakistan, decorative anodizing aluminium, anodizing job work Lahore, anodizing plant Lahore, cheap anodizing price Lahore, premium quality anodizing Lahore, top anodizing service in Lahore, anodizing direct factory rates, no middleman anodizing, bulk anodizing',
      intro: 'Anodizing is an electrochemical process that builds a hard, protective oxide layer on the surface of aluminium. At DoorLine Manufacturers, a professional aluminium handles manufacturer in Lahore, we anodize aluminium handles, locks, hinges and other aluminium parts so they resist corrosion, scratches and daily wear while keeping a clean metallic look.',
      points: 'Corrosion and wear resistant surface\nColours such as gold, bronze, brown, silver and black (ask for current options)\nUniform finish across bulk orders\nSuitable for door handles, window fittings, profiles and furniture hardware\nBulk and job work orders for dealers, fabricators and factories\nDirect factory rates, no middleman\nDelivery across Pakistan',
      body: `## Anodizing Services in Pakistan
Doorline provides aluminium anodizing services for customers in every city of Pakistan, from our base in Lahore. Send your parts or samples by transport or cargo, tell us the colour and quantity, and we return the finished parts to your city.

## What Is Aluminium Anodizing?
Anodizing (also spelled anodising) is an electrochemical process that thickens the natural oxide layer on aluminium. The coating becomes part of the metal itself, so it does not peel or flake like paint. The surface is porous before sealing, which is why it can hold colour and then be sealed for protection.

## Why Anodize Aluminium Handles and Hardware
Door handles, window locks and hinges are touched every day and often exposed to weather. An anodized finish resists scratches and corrosion better than ordinary paint, stays easy to clean and keeps a consistent metallic look for years. It is a popular finish for aluminium door and window fittings in Pakistan.

## Anodizing Colours
Common colours include gold, bronze, brown, silver (natural) and black. The final shade depends on the aluminium alloy and the process, so we confirm the colour on a sample before a bulk order. Ask us for the shades available now.

## Anodizing or Powder Coating?
Anodizing gives a thin, hard, metallic finish that does not chip. Powder coating gives a thicker, paint-like layer in a wide range of colours such as white. We offer both finishes on our handles, so you can choose according to the door, the location and your budget.

## Anodizing Job Work in Lahore
Besides our own handles and fittings, we accept aluminium parts from fabricators, factories and workshops. Send us a sample, the colour you need and your quantity. We confirm the price and lead time and deliver finished parts across Pakistan by transport and cargo.`,
      faqs: [
        { q: 'Do you provide anodizing services in Pakistan?', a: 'Yes. We provide aluminium anodizing for customers across Pakistan. Parts are finished in Lahore and sent back to your city by transport or cargo.' },
        { q: 'What is aluminium anodizing?', a: 'Anodizing is an electrochemical process that thickens the natural oxide layer on aluminium, making the surface harder, more corrosion resistant and able to hold colour.' },
        { q: 'Do you provide anodizing services in Lahore for outside parts?', a: 'Yes. Contact us with your sample, colour and quantity and we will confirm whether we can take the job and share the price.' },
        { q: 'Which anodized colours are available?', a: 'Common colours include gold, bronze, brown, silver and black. Ask us for the current list of available shades.' },
        { q: 'Is anodising the same as anodizing?', a: 'Yes. Anodising and anodizing are two spellings of the same process. Anodising is the common British spelling and anodizing is the American one.' },
        { q: 'Is an anodized finish suitable for outdoor use?', a: 'Yes. The anodized layer is part of the aluminium, so it does not peel and it resists weather and corrosion better than ordinary paint.' },
        { q: 'What is the difference between anodizing and powder coating?', a: 'Anodizing is a thin, hard layer formed from the metal itself with a metallic look. Powder coating is a thicker painted layer with a wider colour choice. We offer both.' },
        { q: 'Do you accept bulk anodizing orders from other cities?', a: 'Yes. We take bulk orders and deliver across Pakistan by transport and cargo.' },
      ],
    },
    {
      slug: 'aluminium-electroplating-service-lahore',
      title: 'Aluminium Electroplating Services in Pakistan and Lahore',
      metaTitle: 'Electroplating Services in Pakistan, Lahore | Doorline',
      short: 'Electroplating services in Pakistan and Lahore: bright, durable plated finishes for aluminium parts and hardware.',
      image: '',
      gallery: [],
      keywords: 'electroplating in Pakistan, electroplating services in Pakistan, electroplating in Lahore, electroplating services in Lahore, electro plating Lahore, aluminum electroplating Pakistan, aluminium electroplating service, plating services Lahore, plating on aluminium Pakistan, electroplating job work Lahore, electroplating companies in Pakistan, hardware electroplating Lahore, chrome plating Lahore, nickel plating Lahore, cheap electroplating price Lahore, premium quality electroplating Lahore, electroplating direct factory rates, no middleman electroplating',
      intro: 'Electroplating coats a metal surface with a thin layer of another metal to improve appearance, corrosion resistance and surface hardness. Doorline offers electroplating for aluminium parts and hardware in Pakistan and Lahore, with proper surface preparation so the plating bonds well to aluminium.',
      points: 'Bright, even plated finish\nBetter corrosion and wear resistance\nProper surface preparation for aluminium\nFinishes such as chrome-look, nickel and gold-look (ask which finishes are available now)\nSuitable for handles, locks, hinges, furniture fittings and decorative hardware\nSample based quote: send a photo or sample for price and lead time\nJob work from any city in Pakistan, delivery by transport or cargo\nDirect factory rates, no middleman',
      body: `## Electroplating Services in Pakistan
Doorline provides electroplating for aluminium parts and hardware for customers across Pakistan, with our base in Lahore. Send a sample or clear photos with the finish and quantity you need, and we return the plated parts to your city by transport or cargo.

## What Is Electroplating?
Electroplating (also written electro plating) uses electric current to deposit a thin layer of metal onto the surface of a part. The result is a bright, uniform finish that also protects the base metal from wear and corrosion.

## How Electroplating Works
The process follows a few main steps. First the part is cleaned to remove oil and dirt. Then the surface is prepared. The part is placed in a plating bath and connected to an electric supply, and metal from the solution forms a thin layer on the part. Finally it is rinsed and dried. The exact steps depend on the base metal and the finish.

## Electroplating on Aluminium
Plating on aluminium needs careful preparation because the metal forms an oxide layer very quickly. Our process is planned around this so that the finish stays attached and looks even. Tell us the alloy or send a sample and we will advise.

## Why Plate Aluminium Parts?
Plating gives aluminium hardware a bright metallic look, better wear resistance and a finish that matches other fittings. It is often chosen for handles, locks, hinges, furniture fittings and decorative parts that are touched every day.

## Electroplating, Anodizing or Powder Coating?
Electroplating adds a layer of another metal and gives a bright, mirror-like or coloured metallic look. Anodizing grows a hard oxide layer from the aluminium itself and is a popular choice for durable colours such as gold, bronze and black. Powder coating adds a thicker painted layer in a wide colour range. We provide anodizing and electroplating, and we can help you choose the right one for your part.

## Finishes and Applications
Please contact us for the finishes currently available, such as chrome-look, nickel or gold-look plating. Typical parts are door and cabinet handles, window locks, hinges, furniture fittings, decorative trims and small aluminium components.

## How to Send Parts for Electroplating Job Work
Step one: message us on WhatsApp with photos of the part, the finish you want and the quantity. Step two: we review and confirm the price and lead time, and we may ask for a sample. Step three: send the parts by transport or cargo. Step four: we plate them and send them back to you.

## Electroplating Across Pakistan
We serve customers in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Gujranwala, Sialkot and other cities. Contact us with your requirement for a quote.`,
      faqs: [
        { q: 'Do you provide electroplating services in Pakistan?', a: 'Yes. We provide electroplating for aluminium parts for customers across Pakistan, with delivery by transport or cargo.' },
        { q: 'Do you provide electroplating services in Lahore?', a: 'Yes. Send us your sample, required finish and quantity and we will confirm the price and lead time.' },
        { q: 'Can aluminium be electroplated?', a: 'Yes. Aluminium needs special surface preparation before plating, and we plan our process around it so the finish bonds properly.' },
        { q: 'Which plating finishes can you do?', a: 'Please contact us for the finishes currently available, such as chrome-look, nickel or gold-look plating.' },
        { q: 'Is electro plating the same as electroplating?', a: 'Yes. Electro plating and electroplating describe the same process of coating a metal part with a thin layer of another metal using electric current.' },
        { q: 'What is the difference between electroplating and anodizing?', a: 'Electroplating adds a layer of another metal on the surface. Anodizing grows a hard oxide layer from the aluminium itself. Both improve appearance and protection, and we offer both.' },
        { q: 'How do I send parts for electroplating from another city?', a: 'Message us on WhatsApp with photos, the finish and the quantity. After we confirm the price, you send the parts by transport or cargo and we send them back after plating.' },
        { q: 'Is there a minimum quantity for plating jobs?', a: 'Minimum quantities depend on the part and finish. Message us your requirement and we will advise.' },
      ],
    },
  ],
  guides: [
    {
      slug: 'electroplating-vs-anodizing-which-is-better-for-aluminium',
      title: 'Electroplating vs Anodizing: Which Is Better for Aluminium?',
      description: 'The difference between electroplating and anodizing on aluminium, and how to choose the right finish for handles, locks and hardware.',
      body: `## What Is the Difference?
Electroplating adds a thin layer of another metal on top of the part. Anodizing grows a hard oxide layer from the aluminium itself, so the finish is part of the metal.

## Look and Colour
Electroplating gives a bright, mirror-like or metallic coloured look. Anodizing gives a softer metallic look in colours such as gold, bronze, brown and black.

## Durability
Both improve wear and corrosion resistance. Anodizing does not peel because it is not a separate coating. Electroplating needs careful surface preparation on aluminium so the layer stays attached.

## Which Should You Choose?
Choose anodizing for durable, natural metallic colours on doors, windows and outdoor hardware. Choose electroplating when you want a bright decorative finish such as chrome-look, nickel or gold-look. If you are not sure, send us a photo of the part.

## Doorline Services
We provide both anodizing and electroplating services in Pakistan and Lahore. Message us with your sample, finish and quantity.`,
    },
    {
      slug: 'electroplating-finishes-chrome-nickel-gold-look-explained',
      metaTitle: 'Electroplating Finishes Explained | Pakistan',
      title: 'Electroplating Finishes Explained: Chrome-Look, Nickel and Gold-Look',
      description: 'A simple guide to common electroplating finishes for hardware and aluminium parts, and what each one is used for.',
      body: `## Chrome-Look Finish
A bright, mirror-like silver finish popular for handles, taps and decorative hardware.

## Nickel Finish
A warm silver finish that is often used as a base layer and also as a final finish on hardware.

## Gold-Look Finish
A gold coloured finish used for decorative handles, locks and fittings.

## Choosing a Finish
Think about where the part will be used, how often it is touched and what other fittings it must match. Ask us which finishes are available now, because availability can change.

## Aluminium Parts
Aluminium needs special surface preparation before plating so the finish bonds well. Send us a sample and we will advise the right process.`,
    },
    {
      slug: 'how-to-send-parts-for-electroplating-job-work-in-pakistan',
      title: 'How to Send Parts for Electroplating Job Work in Pakistan',
      description: 'Step by step guide for fabricators and hardware makers: what to send, how to get a quote and how parts are returned after electroplating.',
      body: `## Step 1: Share Details
Send clear photos of the part, the finish you want and the quantity on WhatsApp.

## Step 2: Get a Quote
We review the details and confirm the price and lead time. For a new part we may ask for a sample first.

## Step 3: Pack and Send
Pack the parts so they do not scratch each other and send them to our Lahore facility by transport or cargo. Mark your name and phone number on the parcel.

## Step 4: Plating and Return
We plate the parts, check the finish and send them back to your city by transport or cargo.

## Tips
Send parts that are clean and free of damage. Tell us the base metal if you know it. For large orders, send one sample first to approve the finish.

## Anodizing Too
If you need anodizing instead, the same steps apply. See our anodizing services page for colours and details.`,
    },
    {
      slug: 'what-is-anodizing-aluminium-process-colours-uses',
      title: 'What Is Anodizing? Process, Colours and Uses for Aluminium',
      description: 'Anodizing explained in simple words: what it is, how the process works, the colours you can get and where anodized aluminium is used.',
      body: `## What Is Anodizing?
Anodizing is an electrochemical process that makes the natural oxide layer on aluminium thicker and harder. The layer grows out of the metal itself, so it is not a paint and it does not peel.

## How Does Anodizing Work?
The aluminium part is cleaned and placed in an acid bath where an electric current is passed through it. The surface forms a porous oxide layer. Colour can be added to this layer, and it is then sealed to lock the colour and improve protection.

## Anodizing Colours
Common colours are gold, bronze, brown, silver (natural) and black. The final shade depends on the alloy and the process.

## Where Is Anodized Aluminium Used?
Door and window handles, locks, hinges, aluminium profiles, furniture hardware, kitchen fittings and decorative panels. It suits parts that are touched often or exposed to weather.

## Anodizing in Lahore
DoorLine Manufacturers provides anodizing services in Lahore for handles, hardware and other aluminium parts, in bulk and job work orders. Send us a sample, colour and quantity for a price.`,
    },
    {
      slug: 'what-is-electroplating-process-uses-on-aluminium',
      title: 'What Is Electroplating? Process and Uses on Aluminium Parts',
      description: 'Electroplating explained simply: how a thin metal layer is added to a part, why aluminium needs special preparation and where plating is used.',
      body: `## Electroplating Services in Pakistan
Doorline provides electroplating for aluminium parts and hardware for customers across Pakistan. Send a sample with the finish and quantity you need, and we return the plated parts to your city by transport or cargo.

## What Is Electroplating?
Electroplating (also written electro plating) uses electric current to deposit a thin layer of metal on the surface of a part. It gives a bright, even finish and adds protection to the base metal.

## How Does It Work?
The part is cleaned, placed in a solution that contains the plating metal, and connected to an electric supply. Metal from the solution slowly builds a thin layer on the part.

## Plating on Aluminium
Aluminium forms an oxide layer very quickly, so it needs careful surface preparation before plating. With the right preparation the plating bonds well and stays attached.

## Uses
Handles, locks, hinges, decorative hardware and small fittings. Plating improves appearance and resistance to wear and corrosion.

## Electroplating in Lahore
DoorLine Manufacturers offers electroplating job work in Lahore for aluminium parts and hardware. Contact us with your sample, finish and quantity.`,
    },
    {
      slug: 'types-of-aluminium-handles-and-where-to-use-them',
      title: 'Types of Aluminium Handles and Where to Use Them',
      description: 'A simple guide to aluminium bar handles, pull handles, sliding door handles, cabinet handles and window locks, and which one suits your door or window.',
      body: `## Bar Handles
Round or fluted bar handles stand out from the door and suit glass doors, shop fronts and wooden doors. They are usually supplied in pairs with brackets.

## Pull Handles
Pull handles sit close to the surface and suit aluminium doors and windows where a slim profile is needed.

## Sliding Door Handles
Bracket type handles made for sliding doors and windows, available in white, gold and other colours.

## Cabinet Handles
Flat pull handles for kitchens, wardrobes and drawers. Choose the size by the hole spacing of your cabinet.

## Window Locks
Crescent locks and lever locks secure sliding windows. Match the type to your window section and the colour to the frame.

## Finishes
Aluminium handles come in anodized finishes (gold, bronze, brown, silver, black) and powder coated finishes (such as white). Choose by location, use and look.`,
    },
    {
      slug: 'how-to-choose-aluminium-door-handle-size',
      title: 'How to Choose the Right Size Aluminium Door Handle',
      description: 'A simple guide to measuring your door and choosing the right length, bracket and finish for an aluminium door handle.',
      body: `## Start With the Door
Measure the width of the door and the area where the handle will sit. A handle that is too short feels cramped, and one that is too long can look out of balance. For a single shop or office door, bar handles of 8 to 12 inch are common. Wide glass doors and double doors often use longer handles.

## Check the Fixing Distance
Measure the distance between the two fixing points, centre to centre, and match it with the mounting brackets of the handle. Our bar handles are supplied with mounting brackets. If you need a custom fixing distance for a bulk order, contact us before ordering.

## Pick the Finish for the Location
Anodized finishes in gold, bronze, brown or silver suit busy doors and outdoor use because the coating is part of the metal. Powder coated finishes such as white or black suit interiors where you want a specific colour.

## Pull Handles or Bar Handles?
Pull handles sit close to the surface and suit sliding doors and windows. Bar handles stand out from the door and suit shop fronts and glass doors.

## Need Help?
Send a photo of your door and its measurements on WhatsApp and we will suggest the right model at factory rates.`,
    },
    {
      slug: 'aluminium-cabinet-handle-hole-spacing-guide',
      metaTitle: 'Cabinet Handle Hole Spacing Guide | Pakistan',
      title: 'Aluminium Cabinet Handle Hole Spacing Guide (96mm, 128mm, 160mm, 192mm)',
      description: 'How to measure hole spacing and choose the right size aluminium cabinet handle for kitchens, wardrobes and drawers.',
      body: `## What Is Hole Spacing?
Hole spacing, also called centre-to-centre distance, is the distance between the centres of the two screw holes on a handle. It is the most important measurement when you replace or buy cabinet handles.

## Common Hole Spacings
The most common spacings are 64mm, 96mm, 128mm, 160mm, 192mm and 256mm. If your cabinet already has holes, measure them and buy a handle with the same spacing.

## How to Measure
Place a ruler across the two screw holes and measure from the centre of one hole to the centre of the other. Do not measure the full length of the handle, because the overall length is always longer than the hole spacing.

## Choosing the Size
Small drawers look best with 64mm to 96mm handles. Larger drawers and doors suit 128mm to 192mm, and long wardrobe doors can use longer pulls.

## Finish
Aluminium handles are available in anodized and powder coated finishes. Match the finish with the rest of your kitchen hardware, and ask us for custom lengths in bulk orders.`,
    },
    {
      slug: 'anodized-vs-powder-coated-aluminium-handles',
      metaTitle: 'Anodized vs Powder Coated Handles | Pakistan',
      title: 'Anodized vs Powder Coated Aluminium Handles: Which Is Better?',
      description: 'The difference between anodized and powder coated aluminium handles, and how to choose the right finish for your door or window.',
      body: `## What Is Anodizing?
Anodizing is an electrochemical process that creates a hard oxide layer on the surface of aluminium. The layer is part of the metal, so it does not peel or chip like paint, and it keeps a metallic look.

## What Is Powder Coating?
Powder coating applies a dry powder that is baked into a thicker, paint-like layer. It offers a wide range of colours, including white and black.

## Which Should You Choose?
Choose anodizing for busy doors, outdoor use and a natural metallic look in gold, bronze, brown or silver. Choose powder coating when you need a specific colour that anodizing cannot give.

## Our Finishes
DoorLine Manufacturers offers both finishes on aluminium handles, and we also provide anodizing and electroplating services for your own aluminium parts. Contact us with your sample and quantity.`,
    },
    {
      slug: 'how-to-buy-aluminium-handles-wholesale-in-pakistan',
      title: 'How to Buy Aluminium Handles Wholesale in Pakistan',
      description: 'What hardware shops and fabricators should check before buying aluminium handles wholesale: manufacturer or trader, MOQ, finish, packing and delivery.',
      body: `## Buy From the Manufacturer
Ask whether the supplier is the manufacturer or a trader. A direct manufacturer can give factory rates, custom sizes and consistent quality across batches.

## Check the Finish
Ask whether the handles are anodized or powder coated, which colours are available and whether samples can be shown before a bulk order.

## Ask About MOQ and Packing
Minimum order quantities differ by model. Ask about the packing, whether mounting brackets and screws are included and whether dealer packing is possible.

## Confirm Delivery
Ask how the goods are dispatched to your city and how long it takes. DoorLine Manufacturers dispatches from Lahore to all cities in Pakistan by transport and cargo.

## Get the Rate List
Send your required models, colours and quantities on WhatsApp and we will share the latest wholesale rate list directly from the factory.`,
    },
    {
      slug: 'aluminium-vs-steel-handles',
      title: 'Aluminium vs Steel Handles: Which Should You Choose?',
      description: 'A simple comparison of aluminium and steel door and cabinet handles: weight, rust, finish options and where each one works best.',
      body: `## Weight
Aluminium is light, which makes handles easy to fit on aluminium doors, windows and cabinets. Steel handles are heavier.

## Rust and Wear
Aluminium does not rust like iron or steel, and an anodized or powder coated finish adds protection. Steel can rust if its coating is damaged, especially outdoors or in damp places.

## Colours and Finishes
Aluminium can be anodized in gold, bronze, brown, silver and black, or powder coated in colours such as white. This gives a wide range for doors, windows and furniture.

## Where Each Works Best
Aluminium handles are a popular choice for aluminium doors and windows, shop fronts, kitchens and wardrobes. Steel may be chosen for very heavy duty applications.

## Our Range
DoorLine Manufacturers specialises in aluminium handles. Ask us for the right length and finish for your door.`,
    },
  ],
  products: [
    P('DL-101', 'Aluminium Sliding Door Handle Set', 'Door Handles', '/images/sliding-door-handle-set.jpg', 'Bracket type aluminium sliding door pull handle in white and gold finish. Suitable for aluminium doors and windows.', 'Bracket type', 'Powder coated', 'White, Gold'),
    P('DL-102', 'York Fluted Aluminium Bar Handle', 'Door Handles', '/images/york-fluted-bar-handle-gold.jpg', 'Fluted (lined) round aluminium bar handle pair supplied with screws and boxed packing. Suitable for glass and wooden doors.', 'Bar 8 inch (custom sizes available)', 'Anodized', 'Gold, White, Black'),
    P('DL-103', 'Fluted Aluminium Bar Handle', 'Door Handles', '/images/fluted-bar-handle-white-gold.jpg', 'Premium fluted aluminium bar handle in white and gold. Ideal for shops, offices and homes.', 'Bar 8 inch', 'Anodized / Powder coated', 'White, Gold'),
    P('DL-104', 'Black Fluted Aluminium Bar Handle', 'Door Handles', '/images/fluted-bar-handle-black.jpg', 'Black fluted aluminium bar handle pair with mounting brackets.', 'Bar 10 inch', 'Matte black', 'Black'),
    P('DL-105', 'Wide Flat Aluminium Door Handle', 'Door Handles', '/images/wide-flat-door-handle.jpg', 'Wide profile aluminium door handle in brown and silver finish. Strong grip, boxed packing.', 'Wide profile', 'Anodized', 'Brown, Silver'),
    P('DL-106', 'D38D Aluminium Door Handle', 'Door Handles', '/images/d38d-wide-door-handle.jpg', 'Model D38D aluminium door handle in gold finish with quality hardware box packing.', 'Wide profile', 'Anodized', 'Gold'),
    P('DL-107', 'Aluminium Sliding Handle Range', 'Door Handles', '/images/sliding-handle-range.jpg', 'Aluminium handle range in multiple shapes and colours for sliding doors and windows.', 'Assorted', 'Powder coated', 'Gold, Silver, White'),
    { ...P('DL-108', 'L-Shape Aluminium Hinges', 'Hinges', '/images/handle-fitting-parts.jpg', 'L-shape aluminium door hinge set with two leaves (one L-shaped), a centre pin and black end caps. Suitable for aluminium doors and frames.', 'Standard', 'Powder coated', 'Grey'), slug: 'l-shape-hinges', oldSlugs: ['aluminium-handle-fitting-kit-dl-108-lahore'], specs: 'Parts: 2 aluminium leaves, 1 centre pin, 2 black end caps\nLeaf type: One L-shaped leaf and one flat leaf' },
    { ...P('DL-201', 'Aluminium Door Lift-off Hinges', 'Hinges', '/images/aluminium-lift-off-hinge.jpg', 'Lift-off aluminium door hinge with smooth pin in gold finish. Made for aluminium doors.', 'Standard', 'Powder coated', 'Gold, Silver'), slug: 'lift-off-hinges', oldSlugs: ['aluminium-door-lift-off-hinge-dl-201-lahore'] },
    P('DL-301', 'Aluminium Window Crescent Lock', 'Window Locks', '/images/window-crescent-lock.jpg', 'Sliding window crescent lock available in silver, brown, gold and white.', 'Standard', 'Powder coated', 'Silver, Brown, Gold, White'),
    P('DL-302', 'Window Lock Lever Gold', 'Window Locks', '/images/window-lock-lever-gold.jpg', 'Lever type aluminium window lock in gold finish with strong cam action.', 'Standard', 'Powder coated', 'Gold'),
    P('DL-401', 'Flat Aluminium Pull Handle', 'Cabinet Handles', '/images/flat-pull-handle-4-colours.jpg', 'Flat plate aluminium pull handle in silver, gold, white and black. For cabinets, windows and doors.', '5 inch', 'Anodized / Powder coated', 'Silver, Gold, White, Black'),
  ],
  faqs: [
    { q: 'Who is DoorLine Manufacturers?', a: 'DoorLine Manufacturers is a professional aluminium handles manufacturer based in Lahore, Pakistan. We make aluminium door handles, cabinet handles, window locks and hinges, offer anodizing and electroplating services, and supply wholesale at direct factory rates with no middleman.' },
    { q: 'What is the wholesale price of aluminium door handles in Lahore?', a: 'The price depends on the model, size, finish and order quantity. Contact us on WhatsApp or call and we will share the latest wholesale rate list the same day.' },
    { q: 'Do you provide bulk delivery all over Pakistan?', a: 'Yes. We dispatch bulk orders from Lahore to Karachi, Islamabad, Rawalpindi, Peshawar, Quetta, Multan, Faisalabad and all other cities by transport and cargo.' },
    { q: 'Are you a direct manufacturer or trader?', a: 'We are a direct manufacturer, not a trader. That is why our customers get factory prices.' },
    { q: 'How many designs of cabinet handles do you have?', a: 'We offer several designs of flat pull, bar and sliding handles. Request our catalogue to see the full list.' },
    { q: 'Where is your aluminium handles factory in Lahore?', a: 'Our factory is in Lahore, Punjab. The exact address and map are available on our Contact Us page.' },
    { q: 'Do you offer anodizing and electroplating services in Lahore?', a: 'Yes. We provide aluminium anodizing and electroplating for handles, hardware and other aluminium parts. Send us a sample, the finish you need and the quantity, and we will share the price and lead time.' },
    { q: 'Are your aluminium door handles suitable for commercial and high traffic doors?', a: 'Yes. Our bar handles and pull handles are made from strong aluminium sections and are used on shops, offices and other busy doors. Choose an anodized finish for the best wear resistance.' },
    { q: 'Is an anodized finish available on your handles?', a: 'Yes. We offer anodized finishes such as gold, bronze, brown, silver and black on aluminium handles, and we also provide anodizing as a separate service.' },
    { q: 'Can the handles be made in custom lengths or colours?', a: 'For bulk orders we can supply custom lengths and selected colours. Send us the size, colour and quantity and we will confirm.' },
    { q: 'Can your handles be used outside and are they rust proof?', a: 'Aluminium does not rust like iron, and an anodized or powder coated finish adds protection against weather and corrosion, so our handles can be used on exterior doors and windows.' },
    { q: 'Do you supply sliding window locks and handles for aluminium window fabricators?', a: 'Yes. We supply crescent locks, lever locks, pull handles and hinges to window and door fabricators in Lahore and across Pakistan in bulk.' },
    { q: 'What is the minimum order quantity (MOQ)?', a: 'The wholesale MOQ differs by model. Send your requirement on WhatsApp and we will quote the best rate.' },
    { q: 'Which colours and finishes are available?', a: 'Gold, brown, silver, white and black in anodized and powder coated finishes.' },
    { q: 'Can you make custom sizes or private packing?', a: 'For bulk orders, custom sizes and dealer branded packing are possible. Contact us with your requirement.' },
  ],
};
