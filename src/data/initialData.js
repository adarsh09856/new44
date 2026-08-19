export const DZONGKHAGS = [
  { id: 'thimphu', name: 'Thimphu', region: 'Western', popular: true, count: 42, image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', description: 'Capital city with modern urban conveniences & traditional charm' },
  { id: 'paro', name: 'Paro', region: 'Western', popular: true, count: 28, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', description: 'Scenic valley, international airport & Tiger\'s Nest heritage' },
  { id: 'punakha', name: 'Punakha', region: 'Central-West', popular: true, count: 19, image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80', description: 'Subtropical warm climate, ancient capital & fertile riverside land' },
  { id: 'chukha', name: 'Chukha / Phuntsholing', region: 'South-West', popular: true, count: 24, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', description: 'Commercial & trading hub connecting Bhutan to global commerce' },
  { id: 'bumthang', name: 'Bumthang', region: 'Central', popular: true, count: 15, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', description: 'Spiritual heartland of Bhutan with pine valleys and apple orchards' },
  { id: 'wangdue', name: 'Wangdue Phodrang', region: 'Central-West', popular: false, count: 12, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', description: 'Expansive river valleys and rapid new town development' },
  { id: 'haa', name: 'Haa', region: 'Western', popular: false, count: 8, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', description: 'Pristine alpine valley bordering high Himalayan ridges' },
  { id: 'sarpang', name: 'Sarpang / Gelephu', region: 'Southern', popular: true, count: 31, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', description: 'Upcoming Gelephu Mindfulness City (GMC) special economic zone' },
  { id: 'trongsa', name: 'Trongsa', region: 'Central', popular: false, count: 7, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', description: 'Historic central hub bridging Eastern and Western Bhutan' },
  { id: 'mongar', name: 'Mongar', region: 'Eastern', popular: false, count: 9, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', description: 'Eastern commercial center with terrace farmlands' },
  { id: 'trashigang', name: 'Trashigang', region: 'Eastern', popular: false, count: 11, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', description: 'The jewel of the east with vibrant heritage and mountain views' },
  { id: 'samtse', name: 'Samtse', region: 'South-West', popular: false, count: 14, image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80', description: 'Lush agricultural estates and border town opportunities' }
];

export const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Heritage Traditional Dzong-Style Villa with Apple Orchard',
    dzongkhag: 'Paro',
    gewog: 'Bongdey',
    address: 'Near Paro International Viewpoint, Bongdey Valley',
    purpose: 'buy',
    type: 'Villa / House',
    price: 32500000, // Nu. 3.25 Crore
    priceUnit: 'Nu.',
    bedrooms: 5,
    bathrooms: 4,
    areaSqFt: 4800,
    plotDecimal: 25.5,
    thramStatus: 'Verified Lagthram (Single Ownership)',
    isFeatured: true,
    isVerified: true,
    furnishing: 'Semi-Furnished',
    yearBuilt: 2021,
    orientation: 'South-East (Auspicious Sunlit Valley Facing)',
    parkingSpaces: 4,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece of authentic Bhutanese architecture featuring intricate handcrafted Rabsel wooden windows, masterfully carved pillars, and modern Himalayan thermal insulation. Enclosed within a private 25.5 decimal fenced compound boasting 18 mature yielding apple trees. Includes dedicated Choesham (prayer altar room), traditional cast-iron Bukhari wood heaters, solar water heating, and 360-degree panoramic views of Paro Valley.',
    amenities: [
      'Authentic Rabsel Woodwork',
      'Dedicated Choesham Room',
      'Cast-Iron Bukhari Heaters',
      'Solar Water Heating System',
      'Private 25.5 Decimal Orchard',
      'Paved Motor Road Access',
      '24/7 Mountain Spring Water',
      'Staff / Caretaker Quarters',
      'High-Speed Fiber Internet',
      'CCTV Security System'
    ],
    agent: {
      id: 'agent-1',
      name: 'Tashi Wangchuk Dorji',
      title: 'Principal Bhutan Heritage Realtor',
      phone: '+975 17 654 321',
      email: 'tashi@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      reviewsCount: 38
    },
    createdDate: '2026-08-10'
  },
  {
    id: 'prop-2',
    title: 'Luxury Penthouse with Buddha Dordenma Mountain View',
    dzongkhag: 'Thimphu',
    gewog: 'Motithang',
    address: 'Upper Motithang Hillside, Royal Enclave Road',
    purpose: 'buy',
    type: 'Apartment',
    price: 18500000, // Nu. 1.85 Crore
    priceUnit: 'Nu.',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2650,
    plotDecimal: 0,
    thramStatus: 'Joint Strata Lagthram Available',
    isFeatured: true,
    isVerified: true,
    furnishing: 'Fully Furnished (Custom Oak & Pine)',
    yearBuilt: 2023,
    orientation: 'South (Sunlit View of Great Buddha)',
    parkingSpaces: 2,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Prestigious top-floor penthouse situated in high-demand Upper Motithang. Features double-glazed European insulated windows, radiant underfloor heating, Italian marble bathrooms, custom Himalayan cedar cabinetry, and dual expansive open-air balconies looking out directly over the Thimphu Valley and Buddha Dordenma.',
    amenities: [
      'Unobstructed Buddha View',
      'Radiant Floor Heating',
      'Underground Private Parking',
      'Automatic Elevator Lift',
      'Backup Power Generator',
      'Imported Teakwood Flooring',
      'Modern Modular Kitchen',
      'Central Geyser & Water Filter'
    ],
    agent: {
      id: 'agent-2',
      name: 'Sonam Pelden',
      title: 'Senior Urban Property Consultant',
      phone: '+975 17 889 012',
      email: 'sonam@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      rating: 4.85,
      reviewsCount: 52
    },
    createdDate: '2026-08-14'
  },
  {
    id: 'prop-3',
    title: 'Executive 3BHK Sun-Drenched Apartment for Rent',
    dzongkhag: 'Thimphu',
    gewog: 'Changzamtog',
    address: 'Opposite Expressway Junction, Changzamtog',
    purpose: 'rent',
    type: 'Apartment',
    price: 45000, // Nu. 45,000 / month
    priceUnit: 'Nu./month',
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1750,
    plotDecimal: 0,
    thramStatus: 'Commercial/Residential Approved',
    isFeatured: true,
    isVerified: true,
    furnishing: 'Semi-Furnished',
    yearBuilt: 2024,
    orientation: 'East-Facing Morning Sunlight',
    parkingSpaces: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Brand new, never-occupied sun-soaked 3BHK flat located 5 minutes from Thimphu Clock Tower. Featuring high-grade wooden flooring, built-in wardrobes, private balcony, secure gated access, and continuous municipal + borewell 24-hour water supply.',
    amenities: [
      '24/7 Continuous Water',
      'Private Covered Balcony',
      'Dedicated Car Parking',
      'Built-in Wardrobes',
      'Gated Compound with Guard',
      'Close to Schools & Hospitals'
    ],
    agent: {
      id: 'agent-3',
      name: 'Karma Tshering',
      title: 'Rental & Leasing Specialist',
      phone: '+975 77 123 456',
      email: 'karma@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 4.92,
      reviewsCount: 64
    },
    createdDate: '2026-08-16'
  },
  {
    id: 'prop-4',
    title: 'Prime Commercial Complex Building (5 Floors)',
    dzongkhag: 'chukha',
    gewog: 'Phuntsholing Core',
    address: 'Tharpai Lam, Main Commercial Street, Phuntsholing',
    purpose: 'buy',
    type: 'Commercial Space',
    price: 68000000, // Nu. 6.8 Crore
    priceUnit: 'Nu.',
    bedrooms: 12,
    bathrooms: 10,
    areaSqFt: 11200,
    plotDecimal: 15.0,
    thramStatus: 'Clean Commercial Thram',
    isFeatured: false,
    isVerified: true,
    furnishing: 'Commercial Shell & Core',
    yearBuilt: 2020,
    orientation: 'Main Road Frontage',
    parkingSpaces: 8,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-yield commercial asset in the heart of Phuntsholing border trade capital. 5 levels with ground-floor showroom spaces currently producing active monthly rental returns of Nu. 380,000. Features commercial lift, 3-phase high capacity transformer, and basement parking.',
    amenities: [
      'High Rental Yield (Nu. 380k/mo)',
      'Direct Highway Frontage',
      'Passenger & Cargo Lift',
      'Transformer 250kVA',
      'Basement Customer Parking'
    ],
    agent: {
      id: 'agent-1',
      name: 'Tashi Wangchuk Dorji',
      title: 'Principal Bhutan Heritage Realtor',
      phone: '+975 17 654 321',
      email: 'tashi@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      reviewsCount: 38
    },
    createdDate: '2026-08-01'
  },
  {
    id: 'prop-5',
    title: 'Scenic Riverside Farmhouse & Organic Land (50 Decimal)',
    dzongkhag: 'Punakha',
    gewog: 'Khuruthang',
    address: 'Pho Chhu Riverbank Road, Punakha',
    purpose: 'buy',
    type: 'Land / Plot',
    price: 21000000, // Nu. 2.1 Crore
    priceUnit: 'Nu.',
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 3200,
    plotDecimal: 50.0,
    thramStatus: 'Dry Cultivable Land (Kamzhing & Khimsa)',
    isFeatured: true,
    isVerified: true,
    furnishing: 'Traditional Timber Finished',
    yearBuilt: 2022,
    orientation: 'River Facing (Mo Chhu / Pho Chhu Confluence)',
    parkingSpaces: 6,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Subtropical paradise along the tranquil Punakha River. 50 decimal fertile registered land perfect for an eco-resort, boutique luxury wellness homestay, or serene retirement residence. Features fruit trees (papaya, guava, citrus), natural mountain spring gravity-fed pipeline, and private river frontage.',
    amenities: [
      'Direct River Frontage',
      'Eco-Resort / Homestay Ready',
      '50 Decimal Fenced Property',
      'Pure Gravity Spring Water',
      '3-Phase Bhutan Power Line',
      'Scenic Dzong Views'
    ],
    agent: {
      id: 'agent-2',
      name: 'Sonam Pelden',
      title: 'Senior Urban Property Consultant',
      phone: '+975 17 889 012',
      email: 'sonam@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      rating: 4.85,
      reviewsCount: 52
    },
    createdDate: '2026-08-08'
  },
  {
    id: 'prop-6',
    title: 'Spacious 2BHK Modern Flat with Balcony in Babesa',
    dzongkhag: 'Thimphu',
    gewog: 'Babesa',
    address: 'Babesa Express Highway, Near Royal Thimphu College Gate',
    purpose: 'rent',
    type: 'Apartment',
    price: 28000,
    priceUnit: 'Nu./month',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1250,
    plotDecimal: 0,
    thramStatus: 'Residential Approved',
    isFeatured: false,
    isVerified: true,
    furnishing: 'Unfurnished',
    yearBuilt: 2023,
    orientation: 'South Facing',
    parkingSpaces: 1,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Affordable, clean and quiet 2-bedroom home in Babesa with sunny rooms, modern tiles, built-in kitchen cabinets, and easy access to public transport & schools.',
    amenities: [
      '24/7 Water Supply',
      'Balcony with Valley View',
      'Parking Space',
      'Electric Geyser Installed'
    ],
    agent: {
      id: 'agent-3',
      name: 'Karma Tshering',
      title: 'Rental & Leasing Specialist',
      phone: '+975 77 123 456',
      email: 'karma@jigmeestate.bt',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 4.92,
      reviewsCount: 64
    },
    createdDate: '2026-08-17'
  }
];

export const INITIAL_VEHICLES = [
  {
    id: 'veh-1',
    title: '2022 Toyota Land Cruiser Prado TX-L 4x4 (Diesel)',
    brand: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2022,
    purpose: 'buy',
    price: 7800000, // Nu. 78 Lakhs
    priceUnit: 'Nu.',
    mileageKm: 34500,
    fuelType: 'Diesel',
    transmission: 'Automatic 6-Speed',
    bodyType: 'SUV / 4x4',
    dzongkhag: 'Thimphu',
    registrationNo: 'BP-1-E-9801',
    rstaFitness: 'Valid until Nov 2027',
    insuranceStatus: 'Comprehensive RICBL Active',
    isFeatured: true,
    isVerified: true,
    ownerCount: 1,
    color: 'Pearl White Crystal Shine',
    images: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Full Time 4WD with Low Range Crawl Control',
      'Leather Heated & Ventilated Seats',
      'Dual Zone Climate Control with Rear Vents',
      'Sunroof & Roof Rails',
      'JBL Premium 9-Speaker Audio',
      'Original Bhutan STCBL Agent Imported',
      'Zero Accident History / Full Dealership Logbook'
    ],
    description: 'The definitive Bhutanese rugged luxury SUV. Pristine 1-owner Toyota Prado TX-L purchased brand new from STCBL Thimphu. Flawless suspension tuned for Bhutan highway & lateral roads. Comes with complete service history records and brand new Michelin all-terrain tyres.',
    seller: {
      name: 'Dechen Dorji',
      phone: '+975 17 555 432',
      type: 'Verified Private Owner',
      dzongkhag: 'Thimphu'
    },
    createdDate: '2026-08-12'
  },
  {
    id: 'veh-2',
    title: '2023 Toyota Hilux Revo Double Cab 2.8 4WD',
    brand: 'Toyota',
    model: 'Hilux Revo Double Cab',
    year: 2023,
    purpose: 'buy',
    price: 4950000, // Nu. 49.5 Lakhs
    priceUnit: 'Nu.',
    mileageKm: 21000,
    fuelType: 'Diesel',
    transmission: 'Automatic with Eco/Power Mode',
    bodyType: 'Pickup 4x4',
    dzongkhag: 'Paro',
    registrationNo: 'BP-1-D-4412',
    rstaFitness: 'Valid until March 2028',
    insuranceStatus: 'GIC-Bhutan Fully Insured',
    isFeatured: true,
    isVerified: true,
    ownerCount: 1,
    color: 'Attitude Black Metallic',
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Heavy Duty Heavy Payload Suspension',
      'Bedliner with Canopy Cover',
      'ARB Snorkel & Underbody Skid Plates',
      'Touchscreen Apple CarPlay & Android Auto',
      'Reverse Camera & Parking Sensors'
    ],
    description: 'Immaculate condition Toyota Hilux 2.8 4x4. Built for all mountain terrains, farming estates, and family expeditions. Exceptionally well maintained with authorized dealer servicing.',
    seller: {
      name: 'Karma Real Estate & Motors',
      phone: '+975 17 654 321',
      type: 'Verified Dealership Broker',
      dzongkhag: 'Paro'
    },
    createdDate: '2026-08-15'
  },
  {
    id: 'veh-3',
    title: '2024 BYD Atto 3 Extended Range Electric EV',
    brand: 'BYD',
    model: 'Atto 3 EV',
    year: 2024,
    purpose: 'buy',
    price: 3600000, // Nu. 36 Lakhs
    priceUnit: 'Nu.',
    mileageKm: 9800,
    fuelType: 'Electric (EV)',
    transmission: 'Automatic Single Speed',
    bodyType: 'Electric SUV',
    dzongkhag: 'Thimphu',
    registrationNo: 'BP-1-F-1108',
    rstaFitness: 'Valid until Jan 2029',
    insuranceStatus: 'Active Comprehensive',
    isFeatured: true,
    isVerified: true,
    ownerCount: 1,
    color: 'Ski White',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '420 KM Range per single charge',
      'Blade Battery Technology with 8-Year Warranty',
      'Panoramic Sunroof & 12.8" Rotating Screen',
      '360-Degree Panoramic View Camera',
      'Bhutan Fast EV Charging Compatible'
    ],
    description: 'Drive the future in clean green Bhutan! 100% Zero-emission BYD Atto 3 EV with incredible energy efficiency. Eligible for Bhutan Green Tax benefits. Charges overnight easily on home power socket.',
    seller: {
      name: 'Sonam Pelden Motors',
      phone: '+975 17 889 012',
      type: 'Verified Agent',
      dzongkhag: 'Thimphu'
    },
    createdDate: '2026-08-18'
  },
  {
    id: 'veh-4',
    title: '2021 Hyundai Tucson AWD Signature Edition',
    brand: 'Hyundai',
    model: 'Tucson Signature AWD',
    year: 2021,
    purpose: 'buy',
    price: 2950000, // Nu. 29.5 Lakhs
    priceUnit: 'Nu.',
    mileageKm: 42000,
    fuelType: 'Petrol',
    transmission: 'Automatic 7-Speed DCT',
    bodyType: 'Compact SUV',
    dzongkhag: 'chukha',
    registrationNo: 'BP-2-B-7741',
    rstaFitness: 'Valid until June 2027',
    insuranceStatus: 'RICBL Insured',
    isFeatured: false,
    isVerified: true,
    ownerCount: 1,
    color: 'Amazon Grey Metallic',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'HTRAC All-Wheel Drive system',
      'Ventilated Front Seats',
      'Wireless Phone Charger',
      'Push Button Start / Smart Key'
    ],
    description: 'Smooth and ultra-comfortable Hyundai Tucson AWD with low fuel consumption and great mountain grip.',
    seller: {
      name: 'Pema Wangdi',
      phone: '+975 77 999 111',
      type: 'Private Seller',
      dzongkhag: 'Phuntsholing'
    },
    createdDate: '2026-08-05'
  }
];

export const INITIAL_AGENTS = [
  {
    id: 'agent-1',
    name: 'Tashi Wangchuk Dorji',
    role: 'Managing Broker & Heritage Specialist',
    company: 'Jigme Real Estate & Land Advisory',
    experienceYears: 14,
    dzongkhag: 'Paro & Thimphu',
    languages: ['Dzongkha', 'English', 'Sharchop', 'Hindi'],
    phone: '+975 17 654 321',
    email: 'tashi@jigmeestate.bt',
    activeListingsCount: 18,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.95,
    reviewsCount: 47,
    bio: 'Bhutan Department of Human Settlement licensed broker specializing in traditional Bhutanese heritage residences, prime commercial thrams, and high-value land transactions in Paro and Thimphu valleys.'
  },
  {
    id: 'agent-2',
    name: 'Sonam Pelden',
    role: 'Senior Urban Property & Commercial Consultant',
    company: 'Jigme Urban Real Estate',
    experienceYears: 9,
    dzongkhag: 'Thimphu & Punakha',
    languages: ['Dzongkha', 'English', 'Nepali'],
    phone: '+975 17 889 012',
    email: 'sonam@jigmeestate.bt',
    activeListingsCount: 22,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 4.88,
    reviewsCount: 63,
    bio: 'Expert in high-end Thimphu apartments, luxury penthouses, residential developments, and mortgage advisory partnerships with Bank of Bhutan and Bhutan National Bank.'
  },
  {
    id: 'agent-3',
    name: 'Karma Tshering',
    role: 'Residential Leasing & Automotive Director',
    company: 'Jigme Vehicles & Rentals',
    experienceYears: 7,
    dzongkhag: 'Thimphu & Chukha',
    languages: ['Dzongkha', 'English', 'Lhotshamkha'],
    phone: '+975 77 123 456',
    email: 'karma@jigmeestate.bt',
    activeListingsCount: 31,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.92,
    reviewsCount: 75,
    bio: 'Focused on seamless expat leasing, premium rental management in capital city districts, and certified vehicle inspections with RSTA fitness verification.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Dasho Sangay Khandu',
    role: 'Property Investor & Villa Owner',
    location: 'Thimphu',
    quote: 'Jigme Real Estate made finding our dream traditional villa in Paro effortless. Their in-depth knowledge of Bhutanese thram titles and legal documentation gave our family total peace of mind.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    name: 'Dechen Lhamo',
    role: 'Business Owner & Expat Landlord',
    location: 'Phuntsholing',
    quote: 'Listing my commercial complex was quick and hassle-free. Within 2 weeks, I connected with a verified tenant through their platform. Best property service in Bhutan hands down!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-3',
    name: 'Kinley Penjor',
    role: 'Toyota Prado Owner',
    location: 'Punakha',
    quote: 'Bought my Prado 4x4 through Jigme Vehicles. RSTA ownership transfer assistance and transparent inspection reports made the whole deal smooth and dependable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    question: 'How does property ownership (Thram) transfer work in Bhutan?',
    answer: 'In Bhutan, property ownership is officially recorded in the national land registry (eSakor system by the National Land Commission). Our verified agents guide you through submitting the deed (Chazhag Sathram transfer), local Thromde/Gewog NOC clearance, and paying the nominal land registration fee.'
  },
  {
    question: 'Can I apply for a Bank of Bhutan (BoB) or BNB housing loan for properties listed here?',
    answer: 'Yes! All properties verified with Lagthram on Jigme Real Estate meet eligibility standards for housing and land loans through Bank of Bhutan (BoB), Bhutan National Bank (BNB), and Druk PNB, offering up to 70-80% loan-to-value at competitive interest rates.'
  },
  {
    question: 'How do you verify pre-owned vehicles before listing?',
    answer: 'All vehicles listed with our Verified badge undergo checking against RSTA registration records, fitness certificates, road safety compliance, and insurance validity to ensure clean titles and zero encumbrances.'
  },
  {
    question: 'How do I schedule a physical or virtual tour of a property?',
    answer: 'Simply click the "Schedule a Tour" button on any property listing page, select your preferred date & time, and the assigned broker will confirm your viewing immediately via SMS / WhatsApp.'
  }
];
