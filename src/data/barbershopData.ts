export interface BarberService {
  id: string;
  name: string;
  category: 'haircuts' | 'beard' | 'vip' | 'locs_treatments';
  duration: string;
  durationMinutes: number;
  priceNgn: number;
  description: string;
  isPopular?: boolean;
  idealFor?: string;
}

export interface BarberProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  avatar: string;
  badge?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'fades' | 'beard' | 'afro' | 'locs' | 'classic';
  image: string;
  description: string;
  barberTip: string;
  serviceId: string;
  timeRequired: string;
  tags: string[];
}

export interface InstagramPost {
  id: string;
  image: string;
  title: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  date: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  companyOrLocation: string;
  image: string;
  quote: string;
  rating: number;
  highlight: string;
  serviceReceived: string;
}

export const SHOP_INFO = {
  name: "K.B International Barber's Shop",
  shortName: "KB International",
  tagline: "Where Precision Meets Royalty in Nigerian Grooming",
  address: "Smart Junction, Ogijo 121101, Ogun State, Nigeria",
  landmark: "Beside Smart Junction, Ogijo Expressway",
  phone: "0805 608 7919",
  phoneRaw: "08056087919",
  whatsappInternational: "2348056087919",
  instagramHandle: "@kbinternationalbarbers",
  instagramUrl: "https://instagram.com/kbinternationalbarbers",
  googleMapsUrl: "https://maps.app.goo.gl/kHex6odZgrEYjnYT9",
  openingHours: {
    weekdays: "8:00 AM - 8:30 PM",
    saturday: "8:00 AM - 8:30 PM",
    sunday: "10:00 AM - 8:30 PM",
  },
  closingHour24: 20.5, // 8:30 PM
  openingHourWeekday24: 8,
  openingHourSunday24: 10,
};

export const BARBER_SERVICES: BarberService[] = [
  {
    id: 'classic-fade',
    name: 'Precision Fade & Crisp Razor Edge-Up',
    category: 'haircuts',
    duration: '40 mins',
    durationMinutes: 40,
    priceNgn: 4000,
    description: 'Custom low, mid, or high taper skin fade with surgical razor line-up, neck taper, and soothing aftershave mist.',
    isPopular: true,
    idealFor: 'Clean modern look, work executives, weekly freshen-up',
  },
  {
    id: 'waves-taper',
    name: '360 Waves Sculpt & Temple Taper',
    category: 'haircuts',
    duration: '45 mins',
    durationMinutes: 45,
    priceNgn: 4500,
    description: 'Wave enhancing cut, pomade conditioning, hairline preservation, and razor-sharp temple tapers with hot blow drying.',
    isPopular: true,
    idealFor: 'Short hair enthusiasts seeking deep wave connectivity',
  },
  {
    id: 'burst-fade-afro',
    name: 'Burst / Drop Fade with Sponge Curls',
    category: 'haircuts',
    duration: '45 mins',
    durationMinutes: 45,
    priceNgn: 4500,
    description: 'Curved burst fade around the ears, textured afro sponge styling, and crisp geometric perimeter lineup.',
    idealFor: 'Youthful trendsetters, college gentlemen, creative stylists',
  },
  {
    id: 'junior-gentleman',
    name: 'Junior Gentleman Cut (Ages 1 - 13)',
    category: 'haircuts',
    duration: '30 mins',
    durationMinutes: 30,
    priceNgn: 3000,
    description: 'Patient, gentle cut for young boys. Low noise clippers, cartoon/game screen view, and clean age-appropriate finish.',
    isPopular: true,
    idealFor: 'School resumption, birthdays, Sunday service grooming',
  },
  {
    id: 'beard-sculpt',
    name: 'Executive Beard Sculpt & Hot Towel Spa',
    category: 'beard',
    duration: '30 mins',
    durationMinutes: 30,
    priceNgn: 3500,
    description: 'Beard trim, straight razor contouring, peppermint hot towel infusion, and organic argan oil conditioning.',
    isPopular: true,
    idealFor: 'Full beard gentlemen wanting sharp cheek & jawline definition',
  },
  {
    id: 'beard-dye-tint',
    name: 'Beard Darkening & Blemish Coverage Tint',
    category: 'beard',
    duration: '35 mins',
    durationMinutes: 35,
    priceNgn: 4500,
    description: 'Natural ammonia-free black or dark brown tinting to eliminate gray patches and enhance facial contrast.',
    idealFor: 'Executives seeking uniform black beard density',
  },
  {
    id: 'royal-kb-combo',
    name: 'The Royal K.B Executive Combo',
    category: 'vip',
    duration: '75 mins',
    durationMinutes: 75,
    priceNgn: 12000,
    description: 'Our signature experience: Master Haircut + Sculpted Beard + Deep Scalp Wash + Black Charcoal Detox Mask + Head/Shoulder Massage & Chilled Beverage.',
    isPopular: true,
    idealFor: 'Grooms, weekend luxury unwind, milestone celebrations',
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite Private Session',
    category: 'vip',
    duration: '90 mins',
    durationMinutes: 90,
    priceNgn: 22000,
    description: 'Private enclosed VIP booth, complimentary chilled drinks & snacks, PS5 gaming console, comprehensive grooming, facial steaming & fragrance finish.',
    idealFor: 'VIP clients seeking total privacy, celebrities, business leaders',
  },
  {
    id: 'father-son-combo',
    name: 'Father & Son Heritage Dual Session',
    category: 'vip',
    duration: '60 mins',
    durationMinutes: 60,
    priceNgn: 6500,
    description: 'Simultaneous or sequential cuts for father and son with complimentary juice/malt and keepsake photo.',
    idealFor: 'Family bonding weekends',
  },
  {
    id: 'locs-retwist',
    name: 'Artisan Dreadlocs Retwist & Clean Edge',
    category: 'locs_treatments',
    duration: '70 mins',
    durationMinutes: 70,
    priceNgn: 9000,
    description: 'Organic locking gel palm roll, scalp hydration oil, hood dryer set, and precision hairline fade perimeter.',
    isPopular: true,
    idealFor: 'Short to medium starter locs and maintenance clients',
  },
  {
    id: 'charcoal-facial',
    name: 'Charcoal Black Mask & Steam Extraction',
    category: 'locs_treatments',
    duration: '35 mins',
    durationMinutes: 35,
    priceNgn: 5000,
    description: 'Facial steaming, pore unclogging, blackhead peel-off mask, cold towel pore tightening, and SPF moisturizer.',
    idealFor: 'Clearing sun dust, ingrown hair prevention, revitalizing skin',
  },
  {
    id: 'scalp-wash-treatment',
    name: 'Mentholated Deep Scalp Detox Wash',
    category: 'locs_treatments',
    duration: '20 mins',
    durationMinutes: 20,
    priceNgn: 3000,
    description: 'Invigorating tea-tree & mint shampoo, stimulating scalp massage brush, and anti-dandruff leave-in rinse.',
    idealFor: 'Relieving itchy scalp and removing buildup',
  },
];

export const MASTER_BARBERS: BarberProfile[] = [
  {
    id: 'master-kb',
    name: 'K.B (Chief Stylist & Founder)',
    role: 'Lead Master Barber',
    experience: '12+ Years Experience',
    specialty: 'Presidential Fades, Master Lineups & Beard Sculpting',
    rating: 5.0,
    reviewsCount: 340,
    bio: 'Renowned for razor-sharp geometric precision and unmatched attention to hairline symmetry. Founder of KB International.',
    avatar: '/src/assets/images/hero_luxury_barber_1791044230160.jpg',
    badge: 'Founder Choice',
  },
  {
    id: 'barber-tobi',
    name: 'Tobi "The Surgeon"',
    role: 'Senior Fade Architect',
    experience: '7 Years Experience',
    specialty: 'Skin Tapers, Drop Fades & Burst Fades',
    rating: 4.9,
    reviewsCount: 215,
    bio: 'Specialist in seamless gradients and contemporary Nigerian street luxury aesthetics. Flawless blending technique.',
    avatar: '/src/assets/images/cut_burst_fade_afro_1791044259274.jpg',
    badge: 'Fade Specialist',
  },
  {
    id: 'barber-david',
    name: 'David Da Barber',
    role: 'Waves & Texture Maestro',
    experience: '6 Years Experience',
    specialty: '360 Waves, Beard Tinting & Locs Care',
    rating: 4.9,
    reviewsCount: 180,
    bio: 'Dedicated wave whisperer and color restoration specialist. Ensures healthy hair sheen and long-lasting cuts.',
    avatar: '/src/assets/images/cut_360_waves_fade_1791044244742.jpg',
    badge: 'Wave Master',
  },
  {
    id: 'barber-emeka',
    name: 'Emeka Royal Groomer',
    role: 'VIP Suite & Spa Specialist',
    experience: '5 Years Experience',
    specialty: 'Hot Towel Shaves, Junior Gentlemen & Facials',
    rating: 4.8,
    reviewsCount: 145,
    bio: 'Brings spa-level relaxation to the barber chair. Incredible patience with children and gentle razor work.',
    avatar: '/src/assets/images/cut_beard_sculpt_exec_1791044269544.jpg',
    badge: 'Gentle Spa Pro',
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Surgical 360 Waves & Low Temple Taper',
    category: 'fades',
    image: '/src/assets/images/cut_360_waves_fade_1791044244742.jpg',
    description: 'Flawless 360 wave connectivity paired with an ultra-clean temple taper and razor-straight geometric forehead line.',
    barberTip: 'Brush twice daily with medium bristle; apply organic argan oil before sleeping with a silk durag.',
    serviceId: 'waves-taper',
    timeRequired: '45 mins',
    tags: ['360 Waves', 'Temple Taper', 'Razor Edge', 'Popular'],
  },
  {
    id: 'look-2',
    title: 'Textured Sponge Afro with Drop Burst Fade',
    category: 'afro',
    image: '/src/assets/images/cut_burst_fade_afro_1791044259274.jpg',
    description: 'High-energy contemporary cut featuring defined curl definition on top and a surgical crescent burst fade around ears.',
    barberTip: 'Hydrate coils with leave-in conditioner spray before sponge twisting every morning.',
    serviceId: 'burst-fade-afro',
    timeRequired: '45 mins',
    tags: ['Burst Fade', 'Sponge Curls', 'Afro Modern', 'Youthful'],
  },
  {
    id: 'look-3',
    title: 'Executive Low Buzz & Sculpted Royal Beard',
    category: 'beard',
    image: '/src/assets/images/cut_beard_sculpt_exec_1791044269544.jpg',
    description: 'The epitome of boardroom authority: uniform low buzz cut with seamlessly connected, conditioned full beard.',
    barberTip: 'Condition beard daily with beard balm and trim cheek line maintenance every 10 days.',
    serviceId: 'beard-sculpt',
    timeRequired: '30 mins',
    tags: ['Executive', 'Full Beard', 'Low Cut', 'Boardroom'],
  },
  {
    id: 'look-4',
    title: 'Artisan Locs Retwist with Mid Skin Fade',
    category: 'locs',
    image: '/src/assets/images/cut_dreadlocs_taper_1791044280573.jpg',
    description: 'Clean barrel-twist or freeform dreadlock retwist complemented by a spotless mid skin fade and sharp C-cup line.',
    barberTip: 'Keep scalp oiled with peppermint & tea tree; avoid heavy waxes to prevent lint buildup.',
    serviceId: 'locs-retwist',
    timeRequired: '70 mins',
    tags: ['Dreadlocks', 'Mid Fade', 'Protective Style', 'Locs'],
  },
  {
    id: 'look-5',
    title: 'Junior Gentleman Fresh Taper Fade',
    category: 'classic',
    image: '/src/assets/images/kid_sharp_taper_cut_1791044494288.jpg',
    description: 'Crisp, neat, age-appropriate fade for boys. Gentle low-noise clippers and smooth skin-friendly edge work.',
    barberTip: 'Book early Saturday morning or weekday afternoons after school for a calm session.',
    serviceId: 'junior-gentleman',
    timeRequired: '30 mins',
    tags: ['Junior Gentleman', 'Kids Cut', 'Clean Fade', 'Gentle'],
  },
  {
    id: 'look-6',
    title: 'Distinguished Executive Beard & Low Cut',
    category: 'beard',
    image: '/src/assets/images/distinguished_gentleman_exec_1791044471555.jpg',
    description: 'Refined silver-flecked beard grooming with razor jawline contour and uniform polished hair texture.',
    barberTip: 'Ask for our beard darkening tint if you wish to blend gray patches naturally.',
    serviceId: 'beard-sculpt',
    timeRequired: '40 mins',
    tags: ['Distinguished', 'Silver Fox', 'Executive', 'Luxury'],
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: '/src/assets/images/cut_360_waves_fade_1791044244742.jpg',
    title: 'Surgical 360 Waves',
    caption: 'Deep 360 wave connectivity that speaks for itself. Razor edge precision by Master KB. Who is next in the chair? 👑💈',
    likes: 428,
    comments: 34,
    tags: ['#360waves', '#ogijobarber', '#kbinternational', '#nigerianbarbers'],
    date: '1 day ago',
  },
  {
    id: 'ig-2',
    image: '/src/assets/images/cut_burst_fade_afro_1791044259274.jpg',
    title: 'Burst Fade Afro Sponge',
    caption: 'Burst drop fade with defined sponge curls. That seamless gradient from skin to crown! 🔥 Tap WhatsApp to book.',
    likes: 382,
    comments: 29,
    tags: ['#burstfade', '#afrohair', '#menshaircut', '#lagosstyle'],
    date: '2 days ago',
  },
  {
    id: 'ig-3',
    image: '/src/assets/images/distinguished_gentleman_exec_1791044471555.jpg',
    title: 'Distinguished Executive',
    caption: 'A clean cut is your business card before you speak. Sculpted beard & presidential low cut for our elder statesman.',
    likes: 512,
    comments: 48,
    tags: ['#executivegrooming', '#boardroomcut', '#beardgang', '#luxurybarber'],
    date: '3 days ago',
  },
  {
    id: 'ig-4',
    image: '/src/assets/images/kid_sharp_taper_cut_1791044494288.jpg',
    title: 'Junior Gentleman Friday',
    caption: 'Big smiles from our junior champ! We make grooming enjoyable and painless for kids with cartoons & gentle hands.',
    likes: 641,
    comments: 52,
    tags: ['#juniorgentleman', '#kidshaircut', '#ogijosmartjunction', '#cleanfade'],
    date: '4 days ago',
  },
  {
    id: 'ig-5',
    image: '/src/assets/images/cut_dreadlocs_taper_1791044280573.jpg',
    title: 'Locs Retwist & Skin Fade',
    caption: 'Organic locking gel retwist paired with surgical mid taper. Protecting the crown while keeping the perimeter sharp.',
    likes: 489,
    comments: 41,
    tags: ['#locs', '#dreadlocksretwist', '#taperfade', '#barberlife'],
    date: '5 days ago',
  },
  {
    id: 'ig-6',
    image: '/src/assets/images/cut_beard_sculpt_exec_1791044269544.jpg',
    title: 'Royal Beard Definition',
    caption: 'Straight razor cheek alignment + hot towel peppermint infusion. The Royal KB standard. ₦3,500.',
    likes: 367,
    comments: 26,
    tags: ['#beardsculpt', '#hottowelshave', '#ogijo', '#barbershop'],
    date: '6 days ago',
  },
  {
    id: 'ig-7',
    image: '/src/assets/images/stylish_curly_fade_post_1791044482757.jpg',
    title: 'Curly High-Top Fade',
    caption: 'Geometric temple line-up meeting voluminous curls. Crafted by Senior Stylist Tobi. Walk in or book online.',
    likes: 395,
    comments: 31,
    tags: ['#curlyfade', '#sharpedges', '#mensgrooming', '#nigeria'],
    date: '1 week ago',
  },
  {
    id: 'ig-8',
    image: '/src/assets/images/executive_client_lounge_1791044505390.jpg',
    title: 'Lounge Comfort Experience',
    caption: 'Chilled VIP lounge with continuous 24/7 power, cold refreshments, and PlayStation 5 while you wait. Pure hospitality.',
    likes: 580,
    comments: 44,
    tags: ['#viplounge', '#ogijobarbershop', '#luxurylifestyle', '#hospitality'],
    date: '1 week ago',
  },
  {
    id: 'ig-9',
    image: '/src/assets/images/hero_luxury_barber_1791044230160.jpg',
    title: 'In The Chair with Master KB',
    caption: 'Every cut is crafted with surgical intent. Open Monday to Sunday at Smart Junction, Ogijo. Call 0805 608 7919.',
    likes: 724,
    comments: 65,
    tags: ['#masterbarber', '#ogijobestbarber', '#kbinternational', '#royalty'],
    date: '2 weeks ago',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. Adeoluwa Oshinowo',
    title: 'Managing Consultant & Medical Director',
    companyOrLocation: 'Ogijo & Sagamu',
    image: '/src/assets/images/distinguished_gentleman_exec_1791044471555.jpg',
    quote: 'Finding a barbershop that respects executive time and hygiene standards in this corridor was impossible until KB International opened. The standby generator is seamless—no awkward power pauses midway through a cut. Their hot towel treatment and razor symmetry are world-class.',
    rating: 5,
    highlight: 'Uninterrupted Power & Immaculate Hygiene',
    serviceReceived: 'The Royal K.B Executive Combo',
  },
  {
    id: 'test-2',
    name: 'Chief Olalekan Adeleke',
    title: 'Real Estate Developer & Investor',
    companyOrLocation: 'Smart Junction Estate, Ogijo',
    image: '/src/assets/images/cut_beard_sculpt_exec_1791044269544.jpg',
    quote: 'The ambiance is undeniably regal. Stepping in from the heat into a clean, air-conditioned space with cold maltina and smooth afrobeats sets the mood immediately. Master KB sculpts my beard with royal precision. This is the only barbershop my family trusts.',
    rating: 5,
    highlight: 'Pure Executive Ambiance & Respect',
    serviceReceived: 'Presidential Suite Private Session',
  },
  {
    id: 'test-3',
    name: 'Engr. Babatunde Lawal',
    title: 'Senior Civil Engineer',
    companyOrLocation: 'Ikorodu - Sagamu Axis',
    image: '/src/assets/images/executive_client_lounge_1791044505390.jpg',
    quote: 'I drive past three other salons to get to KB International at Smart Junction. The clippers are sterilized in UV cabinets right in your presence, and every customer gets a fresh razor blade. The WhatsApp booking confirmed my chair within 2 minutes. Exceptional service.',
    rating: 5,
    highlight: 'Medical-Grade Sterilization & Fast Booking',
    serviceReceived: 'Precision Fade & Crisp Edge-Up',
  },
  {
    id: 'test-4',
    name: 'Oluwaseyi Balogun',
    title: 'Creative Brand Strategist & Father',
    companyOrLocation: 'Ogijo, Ogun State',
    image: '/src/assets/images/cut_360_waves_fade_1791044244742.jpg',
    quote: 'Brought my 8-year-old son for his school resumption cut while I had my 360 wave touch-up. The barbers are so courteous and gentle with young boys. The PS5 in the waiting area kept him thrilled. We both walked out looking like kings.',
    rating: 5,
    highlight: 'Family-Friendly Luxury & Patient Staff',
    serviceReceived: 'Father & Son Heritage Dual Session',
  },
];

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Femi Adebayo',
    location: 'Ogijo, Ogun State',
    rating: 5,
    date: '2 weeks ago',
    service: 'The Royal K.B Executive Combo',
    comment: 'KB International is easily the best barbershop in Ogijo. The standby generator means no NEPA cut-off while your hair is midway. Master KB took his time on my beard and the hot towel was pure bliss. 100% recommended!',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Oluwaseun Bakare',
    location: 'Smart Junction Area',
    rating: 5,
    date: '3 weeks ago',
    service: '360 Waves & Temple Taper',
    comment: 'The precision is unmatched. My lineup is razor sharp and my waves popped immediately. Very respectful staff, air conditioned lounge, and cold malt while waiting. Booking via WhatsApp is so fast!',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Chinedu Okonkwo',
    location: 'Ikorodu / Ogijo Border',
    rating: 5,
    date: '1 month ago',
    service: 'Junior Gentleman Cut & Fade',
    comment: 'Brought my two boys for back-to-school grooming. Barbers were extremely patient with the kids and gave them stylish, neat cuts. Clean clippers sterilized in front of you. That hygiene alone is worth 5 stars.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Engr. Babatunde Lawal',
    location: 'Sagamu Interchange',
    rating: 5,
    date: '1 month ago',
    service: 'Executive Beard Sculpt',
    comment: 'I drive from Sagamu to Ogijo just for KB. True VIP treatment. Clean equipment, relaxing music, cold water and AC. Scanned their Google QR code right at the mirror to give this review!',
    verified: true,
  },
];

export const AMENITIES = [
  {
    title: '24/7 Standby Generator',
    desc: 'Uninterrupted power supply. No delay or clipper stoppage due to grid outages.',
    highlight: 'Zero Downtime',
  },
  {
    title: 'Hospital-Grade Sterilization',
    desc: 'Medical UV cabinets and fresh disposable single-use blades for every client.',
    highlight: '100% Safe & Hygenic',
  },
  {
    title: 'Chilled VIP AC Lounge',
    desc: 'Dual-unit split AC climate control keeping you refreshingly cool from Ogijo heat.',
    highlight: 'Pure Comfort',
  },
  {
    title: 'PS5 & Premier League Live',
    desc: 'High-speed fiber Wi-Fi, Sony PlayStation 5 gaming, and live DSTV football.',
    highlight: 'Entertainment',
  },
  {
    title: 'Complimentary Refreshments',
    desc: 'Enjoy chilled premium malt, cold bottled water, or espresso with every VIP package.',
    highlight: 'Executive Hospitality',
  },
  {
    title: 'WhatsApp Instant Booking',
    desc: 'Book your chair in 60 seconds with instant WhatsApp confirmation to 08056087919.',
    highlight: 'Priority Booking',
  },
];

