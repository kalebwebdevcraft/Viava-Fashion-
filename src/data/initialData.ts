import { Product, LookbookItem, OrderRequest, ContactMessage } from '../types';
import { FASHION_IMAGES } from '../assets/images';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'VF-HAB-001',
    title: 'Contemporary Habesha Couture Gown',
    slug: 'contemporary-habesha-couture-gown',
    category: 'Contemporary Habesha',
    collection: 'Heritage Modern',
    priceBirr: 8900,
    originalPriceBirr: 9800,
    description:
      'A breathtaking synthesis of centuries-old Ethiopian textile heritage and sleek modern couture. Handcrafted in our Addis Ababa atelier from pure organically grown Ethiopian cotton (Shemma), delicately bordered with hand-spun golden Tibeb geometric embroidery along the hem and collar.',
    details: [
      '100% Organically harvested Ethiopian highland cotton',
      'Intricate gold-thread Tibeb motif embroidery crafted by master weavers in Addis Ababa',
      'Sculptural draping with concealed side zipper and softly cinched waist',
      'Full inner breathable silk lining for effortless all-day comfort',
      'Bespoke hem length tailoring offered complimentary at our Bole boutique'
    ],
    fabricCare: [
      'Delicate dry clean recommended to preserve hand-spun metallic embroidery',
      'Cool iron inside-out or vertical steam',
      'Store in provided breathable cotton garment bag'
    ],
    images: [
      FASHION_IMAGES.habesha,
      FASHION_IMAGES.hero
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 1 }
    ],
    colors: [
      { name: 'Heritage Ivory & Gold', hex: '#FAF5EB' },
      { name: 'Pure White & Silver', hex: '#FFFFFF' }
    ],
    isFeatured: true,
    isNewArrival: true,
    badge: 'Atelier Signature',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    sku: 'VF-STL-002',
    title: 'The Addis Sovereign Emerald Tailored Suit',
    slug: 'addis-sovereign-emerald-tailored-suit',
    category: 'Tailored Suits',
    collection: 'Addis Haute 2026',
    priceBirr: 6850,
    originalPriceBirr: 7500,
    description:
      'A commanding statement in modern power dressing. Cut from structural Italian wool-blend gabardine in a deep, regal forest emerald. Features razor-sharp peak lapels, a tapered double-breasted waist, and matching high-rise pleated wide-leg trousers.',
    details: [
      'Substantial 320gsm wool & crepe gabardine with structured shoulder architecture',
      'Dual horn buttons and functional besom pockets',
      'Includes both structured tailored blazer and high-waisted fluid trousers',
      'Satin cupro lining in bespoke champagne tone',
      'Hand-finished cuffs with working buttonholes'
    ],
    fabricCare: [
      'Specialist dry clean only',
      'Steam press between wears to refresh structural drape'
    ],
    images: [
      FASHION_IMAGES.tailored,
      FASHION_IMAGES.lifestyle
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 }
    ],
    colors: [
      { name: 'Deep Forest Emerald', hex: '#1C4A38' },
      { name: 'Addis Midnight Black', hex: '#161616' }
    ],
    isFeatured: true,
    isNewArrival: false,
    badge: 'Best Seller',
    createdAt: '2026-03-05T12:00:00Z'
  },
  {
    id: 'prod-3',
    sku: 'VF-GLA-003',
    title: 'Terracotta Copper Sunburst Pleated Gala Gown',
    slug: 'terracotta-copper-sunburst-pleated-gown',
    category: 'Dresses & Gowns',
    collection: 'Bole Nocturne',
    priceBirr: 11200,
    originalPriceBirr: 12500,
    description:
      'Engineered for unforgettable evening presence. Crafted from fluid metallic-sheen accordion pleated chiffon silk in gradient shades of warm Addis sunset terracotta and burnt copper. The 360-degree dramatic circular sweep moves like liquid light.',
    details: [
      'Over 8 meters of precision accordion-pleated silk chiffon',
      'Deep cross-front halter neck with crossover waist band',
      'Dramatic cape sleeve flutter accents and full floor-sweeping circle skirt',
      'Reinforced internal bustier support with gentle boning',
      'Invisible zip closure at center back'
    ],
    fabricCare: [
      'Delicate dry clean only. Do not machine wash or steam pleats directly'
    ],
    images: [
      FASHION_IMAGES.evening,
      FASHION_IMAGES.hero
    ],
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 2 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 1 }
    ],
    colors: [
      { name: 'Burnt Copper Sunset', hex: '#B8532F' },
      { name: 'Champagne Gold Dust', hex: '#D7B47C' }
    ],
    isFeatured: true,
    isNewArrival: true,
    badge: 'Runway Exclusive',
    createdAt: '2026-03-10T14:30:00Z'
  },
  {
    id: 'prod-4',
    sku: 'VF-COAT-004',
    title: 'Addis Metropolitan Architectural Wrap Coat',
    slug: 'addis-metropolitan-architectural-wrap-coat',
    category: 'Urban Streetwear',
    collection: 'Addis Haute 2026',
    priceBirr: 7950,
    originalPriceBirr: 8800,
    description:
      'Designed for the crisp evening breeze of the Addis Ababa highlands. An architectural statement trench coat featuring asymmetric high-collar neck draping, an elongated silhouette, and an oversized self-tie belt in rich toasted camel wool.',
    details: [
      'Heavyweight 450gsm double-faced camel cashmere and virgin wool blend',
      'Asymmetric architectural lapel that buttons snugly or falls in sculptural folds',
      'Deep welt hand pockets with fleece hand-warming lining',
      'Back storm flap and center walking vent for mobility',
      'Custom brushed brass buckles and horn hardware'
    ],
    fabricCare: [
      'Specialist wool dry clean only',
      'Hang on wide cedar coat hanger'
    ],
    images: [
      FASHION_IMAGES.hero,
      FASHION_IMAGES.lifestyle
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 2 }
    ],
    colors: [
      { name: 'Toasted Caramel Camel', hex: '#B78255' },
      { name: 'Raw Basalt Slate', hex: '#3E424B' }
    ],
    isFeatured: true,
    isNewArrival: false,
    badge: 'Iconic Outerwear',
    createdAt: '2026-02-20T08:00:00Z'
  },
  {
    id: 'prod-5',
    sku: 'VF-STR-005',
    title: 'Meskel Square Oversized Wool Trench Set',
    slug: 'meskel-square-oversized-wool-trench-set',
    category: 'Urban Streetwear',
    collection: 'Addis Haute 2026',
    priceBirr: 5400,
    originalPriceBirr: 6200,
    description:
      'Inspired by the dynamic tempo of downtown Addis Ababa. A relaxed, slouchy wool trench in deep moss green, paired effortlessly with tailored charcoal trousers and a cream merino knit.',
    details: [
      'Relaxed drop-shoulder cut with generous room for seasonal layering',
      'Water-repellent woven wool finish suitable for unpredictable highland showers',
      'Horn button front with contrast tortoiseshell accents',
      'Double welt slant pockets and internal passport/phone sleeve',
      'Handcrafted in small batches of 25 pieces in Kazanchis workshop'
    ],
    fabricCare: ['Dry clean only. Brush gently with natural garment brush.'],
    images: [
      FASHION_IMAGES.lifestyle,
      FASHION_IMAGES.tailored
    ],
    sizes: [
      { size: 'XS', stock: 0 },
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    colors: [
      { name: 'Highland Pine Green', hex: '#1E3B2E' },
      { name: 'Charcoal Asphalt', hex: '#2B2E33' }
    ],
    isFeatured: false,
    isNewArrival: true,
    badge: 'Limited Run',
    createdAt: '2026-03-12T16:00:00Z'
  },
  {
    id: 'prod-6',
    sku: 'VF-LIN-006',
    title: 'Entoto Sand Asymmetric Handwoven Linen Dress',
    slug: 'entoto-sand-asymmetric-handwoven-linen-dress',
    category: 'Silk & Linens',
    collection: 'Entoto Linens',
    priceBirr: 4600,
    originalPriceBirr: 5100,
    description:
      'Pure artisanal comfort. Spun from native organic linen and breathable cotton gauze in warm desert sand, finished with delicate hand-fringed edging and raw mother-of-pearl buttons.',
    details: [
      '70% Pre-washed organic linen, 30% hand-spun Ethiopian cotton',
      'Relaxed asymmetrical hemline with side slit',
      'Self-fabric belt to cinch or wear loosely in caftan silhouette',
      'Pre-shrunk for effortless wear in warm weather'
    ],
    fabricCare: ['Gentle cold wash or hand wash with mild eco-detergent', 'Line dry in shade'],
    images: [
      FASHION_IMAGES.habesha
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 }
    ],
    colors: [
      { name: 'Dune Sand', hex: '#DFD3C3' },
      { name: 'Raw Earthen Clay', hex: '#9C6F5A' }
    ],
    isFeatured: false,
    isNewArrival: false,
    badge: 'Eco Artisan',
    createdAt: '2026-02-15T09:00:00Z'
  },
  {
    id: 'prod-7',
    sku: 'VF-ACC-007',
    title: 'The Bole Minimalist Box Calfskin Tote',
    slug: 'bole-minimalist-box-calfskin-tote',
    category: 'Accessories & Bags',
    collection: 'Addis Haute 2026',
    priceBirr: 3200,
    originalPriceBirr: 3600,
    description:
      'Sculptural everyday luxury. Handcrafted from supple full-grain Ethiopian leather, renowned worldwide for its buttery hand-feel and durable grain. Features gold-plated hardware and twin handles.',
    details: [
      '100% Genuine Ethiopian high-grade full grain leather',
      'Structured rectangular silhouette with magnetic top snap',
      'Accommodates 14-inch laptop, planner, and daily essentials',
      'Internal zip divider pocket and solid brass foot studs'
    ],
    fabricCare: ['Wipe clean with soft microfiber cloth', 'Apply leather conditioning balm biannually'],
    images: [
      FASHION_IMAGES.hero
    ],
    sizes: [
      { size: 'Custom', stock: 6 }
    ],
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#7E4822' },
      { name: 'Obsidian Black', hex: '#111111' }
    ],
    isFeatured: false,
    isNewArrival: false,
    badge: 'Ethiopian Leather',
    createdAt: '2026-01-20T11:00:00Z'
  },
  {
    id: 'prod-8',
    sku: 'VF-KIM-008',
    title: 'Contemporary Tibeb Weave Silk Kimono',
    slug: 'contemporary-tibeb-weave-silk-kimono',
    category: 'Contemporary Habesha',
    collection: 'Heritage Modern',
    priceBirr: 5800,
    originalPriceBirr: 6500,
    description:
      'A versatile statement layer uniting Japanese kimono silhouettes with authentic Ethiopian Tibeb border weaving. Wear open over monochromatic evening separates or cinched as a dress.',
    details: [
      'Raw silk and lightweight cotton blend',
      'Hand-loomed border along front placket and wide bell sleeves',
      'Wide obi sash included with matching fringe details',
      'Crafted with pride in our Piassa artisan collective'
    ],
    fabricCare: ['Dry clean or delicate cold hand wash. Iron on low heat.'],
    images: [
      FASHION_IMAGES.habesha
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 1 }
    ],
    colors: [
      { name: 'Smoked Pearl & Gold', hex: '#D8D4CD' }
    ],
    isFeatured: false,
    isNewArrival: true,
    createdAt: '2026-03-08T10:00:00Z'
  }
];

export const INITIAL_LOOKBOOK: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Highland Modernity: The Bole Campaign',
    caption: 'Editorial study in architectural tailoring against the skyline of Bole, Addis Ababa.',
    image: FASHION_IMAGES.hero,
    tag: 'Studio Editorial',
    aspectRatio: 'landscape',
    linkedProductId: 'prod-4'
  },
  {
    id: 'look-2',
    title: 'The Sacred Golden Weave',
    caption: 'Reinterpreting traditional royal Habesha couture for the modern global gala.',
    image: FASHION_IMAGES.habesha,
    tag: 'Atelier Craft',
    aspectRatio: 'portrait',
    linkedProductId: 'prod-1'
  },
  {
    id: 'look-3',
    title: 'Emerald Structure & Addis Daylight',
    caption: 'Sharp tailoring designed for power meetings and creative salons in Kazanchis.',
    image: FASHION_IMAGES.tailored,
    tag: 'Runway',
    aspectRatio: 'portrait',
    linkedProductId: 'prod-2'
  },
  {
    id: 'look-4',
    title: 'Fluidity in Burnt Copper',
    caption: 'The dramatic 360-degree pleated gala gown in motion during fashion week previews.',
    image: FASHION_IMAGES.evening,
    tag: 'Runway',
    aspectRatio: 'portrait',
    linkedProductId: 'prod-3'
  },
  {
    id: 'look-5',
    title: 'Meskel Square & Metropolitan Rhythm',
    caption: 'Street style captured along the light rail transit corridor of central Addis Ababa.',
    image: FASHION_IMAGES.lifestyle,
    tag: 'Addis Streetwear',
    aspectRatio: 'landscape',
    linkedProductId: 'prod-5'
  }
];

export const INITIAL_ORDERS: OrderRequest[] = [
  {
    id: 'ord-1',
    orderNumber: 'VIA-2026-4019',
    customerName: 'Liya Tadesse',
    phone: '+251 91 145 8820',
    email: 'liya.tadesse@example.com',
    city: 'Addis Ababa',
    subCity: 'Bole',
    deliveryAddress: 'Cameroon St, Next to Ramada Hotel, Apt 4B',
    paymentMethod: 'Telebirr',
    notes: 'Please call 15 minutes before arrival. Would love to try on size S and M if courier can wait 5 mins.',
    items: [
      {
        productId: 'prod-1',
        title: 'Contemporary Habesha Couture Gown',
        priceBirr: 8900,
        selectedSize: 'S',
        selectedColor: 'Heritage Ivory & Gold',
        quantity: 1,
        image: FASHION_IMAGES.habesha
      }
    ],
    subtotalBirr: 8900,
    deliveryFeeBirr: 0,
    totalBirr: 8900,
    status: 'Confirmed',
    createdAt: '2026-03-14T11:20:00Z',
    emailNotificationSent: true,
    emailNotificationTimestamp: '2026-03-14T11:20:05Z'
  },
  {
    id: 'ord-2',
    orderNumber: 'VIA-2026-4020',
    customerName: 'Yared Bekele',
    phone: '+251 92 388 9102',
    email: 'yared.bekele@addisbiz.et',
    city: 'Addis Ababa',
    subCity: 'Kazanchis',
    deliveryAddress: 'Near UNECA Headquarters, G7 Plaza, 3rd Floor',
    paymentMethod: 'CBE Birr (Commercial Bank of Ethiopia)',
    notes: 'Office delivery during business hours (9am - 5pm).',
    items: [
      {
        productId: 'prod-2',
        title: 'The Addis Sovereign Emerald Tailored Suit',
        priceBirr: 6850,
        selectedSize: 'M',
        selectedColor: 'Deep Forest Emerald',
        quantity: 1,
        image: FASHION_IMAGES.tailored
      }
    ],
    subtotalBirr: 6850,
    deliveryFeeBirr: 0,
    totalBirr: 6850,
    status: 'In Atelier',
    createdAt: '2026-03-15T09:45:00Z',
    emailNotificationSent: true,
    emailNotificationTimestamp: '2026-03-15T09:45:08Z'
  },
  {
    id: 'ord-3',
    orderNumber: 'VIA-2026-4021',
    customerName: 'Selamawit Girma',
    phone: '+251 93 512 3490',
    email: 'selam.girma@gmail.com',
    city: 'Addis Ababa',
    subCity: 'Sarbet',
    deliveryAddress: 'Opposite Canadian Embassy gate, House #142',
    paymentMethod: 'Cash on Delivery (Addis Ababa)',
    notes: 'Please bring exact change if possible.',
    items: [
      {
        productId: 'prod-5',
        title: 'Meskel Square Oversized Wool Trench Set',
        priceBirr: 5400,
        selectedSize: 'M',
        selectedColor: 'Highland Pine Green',
        quantity: 1,
        image: FASHION_IMAGES.lifestyle
      }
    ],
    subtotalBirr: 5400,
    deliveryFeeBirr: 0,
    totalBirr: 5400,
    status: 'New',
    createdAt: '2026-03-16T08:15:00Z',
    emailNotificationSent: true,
    emailNotificationTimestamp: '2026-03-16T08:15:04Z'
  }
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Bethlehem Mengistu',
    phone: '+251 91 299 1845',
    email: 'b.mengistu@culture.gov.et',
    inquiryType: 'Custom Fitting & Tailoring Appointment',
    message: 'Hello Viava team, I am looking for a custom contemporary Habesha bridal gown for my sister’s upcoming wedding in Bole. Could we schedule a private atelier consultation this Saturday around 2:00 PM?',
    createdAt: '2026-03-15T15:30:00Z',
    status: 'Unread'
  },
  {
    id: 'msg-2',
    name: 'Kassahun Alemayehu',
    phone: '+251 94 401 2289',
    email: 'kassa@addistyle.com',
    inquiryType: 'VIP Stylist Consultation',
    message: 'Inquiring about styling outfits for our film festival delegation traveling to Cannes next month. We need 3 tailored looks representing modern Ethiopian design.',
    createdAt: '2026-03-14T17:10:00Z',
    status: 'Replied'
  }
];
