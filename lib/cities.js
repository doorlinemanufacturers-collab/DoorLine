export const PROVINCE = {
  Lahore: 'Punjab', Karachi: 'Sindh', Hyderabad: 'Sindh', Sukkur: 'Sindh', Larkana: 'Sindh',
  Islamabad: 'Islamabad Capital Territory', Rawalpindi: 'Punjab', Faisalabad: 'Punjab', Multan: 'Punjab', Gujranwala: 'Punjab',
  Sialkot: 'Punjab', Sargodha: 'Punjab', Bahawalpur: 'Punjab', Gujrat: 'Punjab', Sahiwal: 'Punjab', Sheikhupura: 'Punjab',
  Kasur: 'Punjab', Okara: 'Punjab', 'Rahim Yar Khan': 'Punjab', 'Dera Ghazi Khan': 'Punjab',
  Peshawar: 'Khyber Pakhtunkhwa', Abbottabad: 'Khyber Pakhtunkhwa', Mardan: 'Khyber Pakhtunkhwa', Kohat: 'Khyber Pakhtunkhwa',
  Quetta: 'Balochistan',
};

export const TOP_CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];
const BLURB = {
  Karachi: 'Karachi is the largest city and main port of Pakistan, with a large number of hardware shops, fabricators and builders.',
  Islamabad: 'Islamabad is the capital of Pakistan, with steady construction and interior fit-out work.',
  Rawalpindi: 'Rawalpindi sits next to Islamabad and has busy hardware markets and fabrication workshops.',
  Faisalabad: 'Faisalabad is a major industrial city of Punjab with many workshops and factories.',
  Multan: 'Multan is a major city of southern Punjab and serves a wide surrounding region.',
  Peshawar: 'Peshawar is the main city of Khyber Pakhtunkhwa.',
  Quetta: 'Quetta is the capital of Balochistan, and we dispatch there by transport and cargo.',
};

export function cityPage(city, site) {
  if (city === 'Pakistan') {
    return {
      title: 'Aluminum Handles Manufacturer in Pakistan | Doorline',
      description: 'Aluminum handles manufacturer & hardware dealer in Pakistan with a factory in Lahore. Door handles, hinges, locks, anodizing. Call for price.',
      h1: 'Aluminum Handles Manufacturer in Pakistan',
      intro: 'DoorLine Manufacturers is a professional aluminum (aluminium) handles manufacturer in Pakistan. Our factory is in Lahore, Punjab, and we supply aluminium door handles, cabinet handles, window locks and hinges to hardware shops, fabricators, dealers and contractors in every city of Pakistan. We also provide anodizing and electroplating services, at direct factory rates with no middleman and premium quality.',
      sections: [
        { h: 'Aluminium Handles Made in Pakistan', t: 'We manufacture fluted bar handles, pull handles, sliding door handles, cabinet handles, window crescent and lever locks and hinges in anodized and powder coated finishes. Colours include gold, bronze, brown, silver, white and black.' },
        { h: 'Anodizing and Electroplating Services in Pakistan', t: 'Besides our own products, we accept aluminium parts for anodizing and electroplating job work. Send us a sample, the finish and the quantity, and we will confirm the price and lead time.' },
        { h: 'Order From Anywhere in Pakistan', t: `Send your models, colours and quantities on WhatsApp at ${site.whatsappDisplay || site.whatsapp} or call ${site.phone}. We reply with the latest wholesale rate list and dispatch from Lahore to your city by transport and cargo.` },
      ],
      faqs: [
        { q: 'Who is a professional aluminum handles manufacturer in Pakistan?', a: 'DoorLine Manufacturers is a professional aluminium handles manufacturer with its factory in Lahore, supplying customers across Pakistan.' },
        { q: 'Do you supply aluminium handles to all cities in Pakistan?', a: 'Yes. We deliver to all major cities by transport and cargo.' },
        { q: 'Do you offer anodizing and electroplating in Pakistan?', a: 'Yes. We provide aluminium anodizing and electroplating job work from our Lahore facility.' },
        { q: 'Are the prices factory rates?', a: 'Yes. We are the manufacturer, so you get direct factory rates with no middleman.' },
      ],
      keywords: ['aluminum handles manufacturer in Pakistan', 'aluminium handles manufacturer in Pakistan', 'aluminum handels manufacturer Pakistan', 'aluminum handles manufacturers Pakistan', 'door handles manufacturer Pakistan', 'handles manufacturer in Pakistan', 'aluminium handle factory Pakistan', 'anodizing services Pakistan'],
      prov: '',
    };
  }
  const prov = PROVINCE[city];
  const home = city === 'Lahore';
  const tOpts = home ? ['Aluminum Handles Manufacturer in Pakistan, Lahore | Doorline'] : [`Aluminum Handles Manufacturer in ${city}, Pakistan | Doorline`, `Aluminum Handles Manufacturer in ${city}, Pakistan`];
  const title = tOpts.find((x) => x.length <= 60) || tOpts[tOpts.length - 1];
  const dOpts = [`Aluminum handles manufacturer & hardware dealer ${home ? 'in Pakistan, Lahore' : 'for ' + city + ', Pakistan'}: door and cabinet handles, hinges, locks. Call ${site.phone} for factory price.`, `Aluminum handles manufacturer & hardware dealer ${home ? 'in Pakistan, Lahore' : 'for ' + city + ', Pakistan'}. Call ${site.phone} for factory price.`];
  const description = dOpts.find((x) => x.length <= 155) || dOpts[1].slice(0, 155);
  const h1 = `Aluminum Handles Manufacturer in ${city}`;
  const intro = home
    ? `DoorLine Manufacturers is a professional aluminum (aluminium) handles manufacturer with its factory in Lahore, Punjab. We make aluminium door handles, cabinet handles, window locks and hinges, and we provide anodizing and electroplating services, all at direct factory rates with no middleman and premium quality.`
    : `Looking for an aluminum handles manufacturer in ${city}? ${BLURB[city] ? BLURB[city] + ' ' : ''}DoorLine Manufacturers makes aluminium door handles, cabinet handles, window locks and hinges at its Lahore factory and delivers them to ${city}${prov ? ', ' + prov : ''} by transport and cargo. You get direct factory rates, no middleman and premium quality, with anodizing and electroplating available for your finish requirements.`;
  const sections = [
    { h: `Aluminium Door and Cabinet Handles for ${city} Buyers`, t: `Hardware shops, aluminium and glass fabricators, furniture makers and contractors in ${city} order our fluted bar handles, pull handles, sliding door handles, cabinet handles, window crescent locks and hinges in bulk. ${home ? 'You can also visit our factory in Lahore.' : `Orders are packed at our Lahore factory and dispatched to ${city} by transport or cargo.`} Colours include gold, bronze, brown, silver, white and black.` },
    { h: `Anodizing and Electroplating for ${city} Customers`, t: `${home ? 'We provide anodizing and electroplating job work in Lahore.' : `Customers in ${city} can send aluminium parts to our Lahore facility for anodizing and electroplating, and we return the finished parts to ${city} by transport.`} Send us a sample, the finish and the quantity and we will confirm the price and lead time.` },
    { h: `How to Order from ${city}`, t: `Send your required models, colours and quantities on WhatsApp or through the inquiry form. We reply with the latest wholesale rate list. After you confirm, ready stock is dispatched quickly and bulk orders are produced with your required finish and delivered to ${city}.` },
  ];
  const faqs = [
    { q: `Do you deliver aluminium handles to ${city}?`, a: home ? 'Yes. Our factory is in Lahore and we also dispatch to all other cities in Pakistan.' : `Yes. We dispatch aluminium door handles, cabinet handles, window locks and hinges from Lahore to ${city} by transport and cargo.` },
    { q: `Are you a manufacturer or a trader?`, a: `We are a direct manufacturer with our own factory in Lahore, so ${city} buyers get factory rates with no middleman.` },
    { q: `Can I get anodizing or electroplating done from ${city}?`, a: home ? 'Yes. Contact us with your sample, finish and quantity.' : `Yes. You can send parts from ${city} to our Lahore facility. We finish them and send them back. Contact us for the price and lead time.` },
    { q: `How do I get wholesale rates in ${city}?`, a: `Message us on WhatsApp at ${site.whatsappDisplay || site.whatsapp} or call ${site.phone} and we will share today's rate list for ${city}.` },
  ];
  const keywords = [
    `aluminum handles manufacturer in ${city}`, `aluminium handles manufacturer in ${city}`, `aluminum handels manufacturer ${city}`,
    `aluminium door handles supplier ${city}`, `cabinet handles wholesale ${city}`, `window lock supplier ${city}`,
    `anodizing services ${city}`, `electroplating services ${city}`, `handles manufacturer ${city}`, `steel aluminum handles manufacturer ${city}`,
  ];
  return { title, description, h1, intro, sections, faqs, keywords, prov };
}
