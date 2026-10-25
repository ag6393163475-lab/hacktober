const bcrypt = require('bcryptjs');

/**
 * Seed data for Fashion Rental Platform
 * High fashion clothes, shoes, and luxury accessories with multi-angle Cloudinary imagery
 * and complete condition history proofs.
 */

const salt = bcrypt.genSaltSync(10);
const defaultPasswordHash = bcrypt.hashSync('Password@123', salt);

const initialUsers = [
  {
    _id: '65e000000000000000000001',
    name: 'Ananya Sharma',
    email: 'ananya@customer.com',
    password: defaultPasswordHash,
    role: 'CUSTOMER',
    phone: '+91 98765 43210',
    address: {
      street: 'Flat 402, Prestige Palms, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    walletBalance: 2450,
    trustScore: 96,
    totalRentals: 6,
    successfulReturns: 5,
    lateReturns: 1,
    damageCases: 0,
    loyaltyTier: 'SILVER',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    _id: '65e000000000000000000002',
    name: 'Vikram Singh (Express Logistics)',
    email: 'vikram@delivery.com',
    password: defaultPasswordHash,
    role: 'DELIVERY_PARTNER',
    phone: '+91 91234 56789',
    address: {
      street: 'Hub #4, Koramangala Logistics Zone',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034'
    },
    walletBalance: 0,
    trustScore: 99,
    totalRentals: 42,
    successfulReturns: 42,
    lateReturns: 0,
    damageCases: 0,
    loyaltyTier: 'GOLD',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    _id: '65e000000000000000000003',
    name: 'Pooja Mehta (Operations Admin)',
    email: 'admin@fashionrental.com',
    password: defaultPasswordHash,
    role: 'ADMIN',
    phone: '+91 99887 76655',
    address: {
      street: 'Fashion HQ, UB City Level 14',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001'
    },
    walletBalance: 125000,
    trustScore: 100,
    totalRentals: 120,
    successfulReturns: 120,
    lateReturns: 0,
    damageCases: 0,
    loyaltyTier: 'PLATINUM',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

const initialProducts = [
  {
    _id: '65e100000000000000000101',
    title: 'Sabyasachi Heritage Royal Crimson Lehenga',
    brand: 'Sabyasachi',
    category: 'CLOTHES',
    subCategory: 'Bridal Lehenga',
    gender: 'WOMEN',
    size: ['S', 'M', 'L'],
    color: 'Crimson Red & Gold',
    fabricOrMaterial: 'Handwoven Matka Silk with Zardozi Embroidery',
    description: 'Iconic heritage bridal ensemble featuring intricate zardozi, tilla work, and signature antique sequin borders. Paired with embroidered organza dupatta and handcrafted blouse.',
    occasion: 'Weddings / Sangeet / Grand Receptions',
    actualPrice: 120000,
    rentalPrice: 24000, // 20%
    securityDeposit: 36000, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/sabyasachi_crimson_front',
        cloudinaryPublicId: 'fashion_rental/products/sabyasachi_crimson_front',
        secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/sabyasachi_crimson_back',
        cloudinaryPublicId: 'fashion_rental/products/sabyasachi_crimson_back',
        secureUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/sabyasachi_crimson_side',
        cloudinaryPublicId: 'fashion_rental/products/sabyasachi_crimson_side',
        secureUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/sabyasachi_crimson_closeup',
        cloudinaryPublicId: 'fashion_rental/products/sabyasachi_crimson_closeup',
        secureUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/sabyasachi_crimson_tag',
        cloudinaryPublicId: 'fashion_rental/products/sabyasachi_crimson_tag',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [
      {
        date: new Date('2026-01-10T10:00:00Z'),
        stage: 'INITIAL_STOCK',
        notes: 'Acquired brand new from flagship Sabyasachi store. Fully cataloged with Cloudinary 5-angle inspection verification.',
        conditionGrade: 'EXCELLENT',
        evidence: [
          {
            publicId: 'fashion_rental/products/sabyasachi_crimson_front',
            secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            viewType: 'FRONT'
          }
        ]
      },
      {
        date: new Date('2026-01-18T14:30:00Z'),
        stage: 'BEFORE_RENTAL',
        customerName: 'Ananya Sharma',
        notes: 'Condition verified pristine. Zari intact, zero spots, zipper smooth.',
        conditionGrade: 'EXCELLENT',
        evidence: [
          {
            publicId: 'fashion_rental/evidence/before_sabya_1',
            secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            viewType: 'FRONT'
          }
        ]
      },
      {
        date: new Date('2026-01-22T16:00:00Z'),
        stage: 'RETURNED',
        customerName: 'Ananya Sharma',
        notes: 'Returned on time. Minor food oil droplet near hemline noted during return intake.',
        conditionGrade: 'MINOR_DAMAGE',
        evidence: [
          {
            publicId: 'fashion_rental/evidence/return_sabya_stain',
            secureUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
            viewType: 'CLOSEUP'
          }
        ]
      },
      {
        date: new Date('2026-01-25T11:00:00Z'),
        stage: 'REPAIRED',
        notes: 'Dry-cleaned with specialized heritage silk solvent. Stain completely resolved. Restored to ready inventory.',
        conditionGrade: 'REPAIRED',
        evidence: [
          {
            publicId: 'fashion_rental/evidence/repaired_sabya',
            secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            viewType: 'FRONT'
          }
        ]
      }
    ],
    available: true,
    rating: 4.95,
    reviewCount: 38
  },
  {
    _id: '65e100000000000000000102',
    title: 'Tom Ford Midnight Blue Silk-Velvet Tuxedo',
    brand: 'Tom Ford',
    category: 'CLOTHES',
    subCategory: 'Tuxedo / Formal Suit',
    gender: 'MEN',
    size: ['38R', '40R', '42R'],
    color: 'Midnight Blue & Black Satin',
    fabricOrMaterial: 'Italian Silk Velvet with Grosgrain Silk Lapels',
    description: 'The definitive black-tie showstopper. Peak grosgrain lapels, single-button closure, and tailored trousers with satin side stripe.',
    occasion: 'Black Tie Galas / Red Carpet / Receptions',
    actualPrice: 85000,
    rentalPrice: 17000, // 20%
    securityDeposit: 25500, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/tomford_tux_front',
        cloudinaryPublicId: 'fashion_rental/products/tomford_tux_front',
        secureUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/tomford_tux_back',
        cloudinaryPublicId: 'fashion_rental/products/tomford_tux_back',
        secureUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/tomford_tux_side',
        cloudinaryPublicId: 'fashion_rental/products/tomford_tux_side',
        secureUrl: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/tomford_tux_lapel',
        cloudinaryPublicId: 'fashion_rental/products/tomford_tux_lapel',
        secureUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/tomford_tux_tag',
        cloudinaryPublicId: 'fashion_rental/products/tomford_tux_tag',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [
      {
        date: new Date('2026-02-01T09:00:00Z'),
        stage: 'INITIAL_STOCK',
        notes: 'Added from Milan flagship collection. Hand-pressed and verified pristine.',
        conditionGrade: 'EXCELLENT',
        evidence: [
          {
            publicId: 'fashion_rental/products/tomford_tux_front',
            secureUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
            viewType: 'FRONT'
          }
        ]
      }
    ],
    available: true,
    rating: 4.88,
    reviewCount: 21
  },
  {
    _id: '65e100000000000000000103',
    title: 'Christian Louboutin So Kate 120 Patent Stilettos',
    brand: 'Christian Louboutin',
    category: 'SHOES',
    subCategory: 'Heels & Stilettos',
    gender: 'WOMEN',
    size: ['EU 37', 'EU 38', 'EU 39'],
    color: 'Nude Beige & Iconic Red Sole',
    fabricOrMaterial: 'High-Gloss Patent Calfskin',
    description: 'The pinnacle of dramatic luxury. Featuring a dramatic 120mm stiletto pitch and the signature glossy scarlet red lacquered sole.',
    occasion: 'Cocktails / Red Carpet / High Galas',
    actualPrice: 75000,
    rentalPrice: 15000, // 20%
    securityDeposit: 22500, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/louboutin_front',
        cloudinaryPublicId: 'fashion_rental/products/louboutin_front',
        secureUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/louboutin_back',
        cloudinaryPublicId: 'fashion_rental/products/louboutin_back',
        secureUrl: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/louboutin_side',
        cloudinaryPublicId: 'fashion_rental/products/louboutin_side',
        secureUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/louboutin_sole',
        cloudinaryPublicId: 'fashion_rental/products/louboutin_sole',
        secureUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/louboutin_tag',
        cloudinaryPublicId: 'fashion_rental/products/louboutin_tag',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [
      {
        date: new Date('2026-01-05T12:00:00Z'),
        stage: 'INITIAL_STOCK',
        notes: 'Fitted with official protective red sole skin. Heels zero scuffs.',
        conditionGrade: 'EXCELLENT',
        evidence: [
          {
            publicId: 'fashion_rental/products/louboutin_front',
            secureUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
            viewType: 'FRONT'
          }
        ]
      }
    ],
    available: true,
    rating: 4.92,
    reviewCount: 19
  },
  {
    _id: '65e100000000000000000104',
    title: 'Gucci 1953 Horsebit Classic Leather Loafers',
    brand: 'Gucci',
    category: 'SHOES',
    subCategory: 'Formal Loafers',
    gender: 'MEN',
    size: ['UK 8', 'UK 9', 'UK 10'],
    color: 'Burnished Tan Brown',
    fabricOrMaterial: 'Supple Italian Calfskin with Brass Horsebit Hardware',
    description: 'Celebrating 70 years of effortless Italian sartorial pedigree. Lightweight Blake welt construction with gold-toned brass equestrian hardware.',
    occasion: 'Weddings / Business Dinners / Festive Soirées',
    actualPrice: 68000,
    rentalPrice: 13600, // 20%
    securityDeposit: 20400, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/gucci_loafers_front',
        cloudinaryPublicId: 'fashion_rental/products/gucci_loafers_front',
        secureUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/gucci_loafers_back',
        cloudinaryPublicId: 'fashion_rental/products/gucci_loafers_back',
        secureUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/gucci_loafers_side',
        cloudinaryPublicId: 'fashion_rental/products/gucci_loafers_side',
        secureUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/gucci_loafers_hardware',
        cloudinaryPublicId: 'fashion_rental/products/gucci_loafers_hardware',
        secureUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/gucci_loafers_tag',
        cloudinaryPublicId: 'fashion_rental/products/gucci_loafers_tag',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [],
    available: true,
    rating: 4.85,
    reviewCount: 16
  },
  {
    _id: '65e100000000000000000105',
    title: 'Chanel Classic Medium Flap Bag (Black Caviar)',
    brand: 'Chanel',
    category: 'ACCESSORIES',
    subCategory: 'Luxury Handbags',
    gender: 'WOMEN',
    size: ['Medium (25.5 cm)'],
    color: 'Quilted Black & 24K Gold Hardware',
    fabricOrMaterial: 'Granulated Caviar Calfskin Leather with Burgundy Leather Lining',
    description: 'Timeless haute accessory. Double flap architecture, interlocking CC turn-lock closure, and leather-woven gold chain strap.',
    occasion: 'Weddings / Galas / Fine Dining',
    actualPrice: 350000,
    rentalPrice: 70000, // 20%
    securityDeposit: 105000, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/chanel_flap_front',
        cloudinaryPublicId: 'fashion_rental/products/chanel_flap_front',
        secureUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/chanel_flap_back',
        cloudinaryPublicId: 'fashion_rental/products/chanel_flap_back',
        secureUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/chanel_flap_side',
        cloudinaryPublicId: 'fashion_rental/products/chanel_flap_side',
        secureUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/chanel_flap_lock',
        cloudinaryPublicId: 'fashion_rental/products/chanel_flap_lock',
        secureUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/chanel_flap_serial',
        cloudinaryPublicId: 'fashion_rental/products/chanel_flap_serial',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [],
    available: true,
    rating: 5.0,
    reviewCount: 42
  },
  {
    _id: '65e100000000000000000106',
    title: 'Sabyasachi Heritage Royal Kundan & Basra Pearl Choker',
    brand: 'Sabyasachi Jewelry',
    category: 'ACCESSORIES',
    subCategory: 'Heritage Jewelry',
    gender: 'WOMEN',
    size: ['Adjustable Choker'],
    color: 'Uncut Diamonds & Sea Pearls',
    fabricOrMaterial: '22K Gold Plated Brass, Polki Kundan & Basra Seed Pearls',
    description: 'Intricately handcrafted choker set accompanied by matching chandelier earrings. Set with uncut polki gems and natural pearls.',
    occasion: 'Weddings / Grand Festivities',
    actualPrice: 110000,
    rentalPrice: 22000, // 20%
    securityDeposit: 33000, // 30%
    listingImages: [
      {
        viewType: 'FRONT',
        publicId: 'fashion_rental/products/kundan_choker_front',
        cloudinaryPublicId: 'fashion_rental/products/kundan_choker_front',
        secureUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'BACK',
        publicId: 'fashion_rental/products/kundan_choker_back',
        cloudinaryPublicId: 'fashion_rental/products/kundan_choker_back',
        secureUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'SIDE',
        publicId: 'fashion_rental/products/kundan_choker_side',
        cloudinaryPublicId: 'fashion_rental/products/kundan_choker_side',
        secureUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'CLOSEUP',
        publicId: 'fashion_rental/products/kundan_choker_detail',
        cloudinaryPublicId: 'fashion_rental/products/kundan_choker_detail',
        secureUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      },
      {
        viewType: 'TAG',
        publicId: 'fashion_rental/products/kundan_choker_hallmark',
        cloudinaryPublicId: 'fashion_rental/products/kundan_choker_hallmark',
        secureUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
        resourceType: 'image',
        format: 'webp',
        width: 1200,
        height: 1600
      }
    ],
    currentCondition: 'EXCELLENT',
    conditionHistory: [],
    available: true,
    rating: 4.97,
    reviewCount: 31
  }
];

const initialRentals = [
  {
    _id: '65e200000000000000000201',
    rentalNumber: 'RNT-1023',
    productId: '65e100000000000000000101', // Sabyasachi Lehenga
    customerId: '65e000000000000000000001', // Ananya
    deliveryPartnerId: '65e000000000000000000002', // Vikram
    rentalDurationDays: 3,
    startDate: new Date('2026-10-20T10:00:00Z'),
    dueDate: new Date('2026-10-23T18:00:00Z'),
    returnedDate: new Date('2026-10-24T12:00:00Z'), // 1 day late
    status: 'UNDER_INSPECTION', // In admin inspection queue ready for Before vs After review!
    pricing: {
      actualPrice: 120000,
      rentalPrice: 24000,
      securityDeposit: 36000,
      totalPaidInitial: 60000,
      lateFee: 2400, // 120000 * 0.02 * 1
      lateDays: 1,
      damageFee: 0,
      calculatedRefund: 33600
    },
    refundPreference: 'APP_WALLET',
    receiveVerification: {
      status: 'RECEIVED_CORRECTLY',
      verifiedAt: new Date('2026-10-20T14:30:00Z')
    }
  },
  {
    _id: '65e200000000000000000202',
    rentalNumber: 'RNT-1024',
    productId: '65e100000000000000000102', // Tom Ford Tuxedo
    customerId: '65e000000000000000000001',
    deliveryPartnerId: '65e000000000000000000002',
    rentalDurationDays: 4,
    startDate: new Date('2026-10-22T09:00:00Z'),
    dueDate: new Date('2026-10-26T18:00:00Z'),
    status: 'DELIVERED', // Customer currently enjoying the tuxedo, can submit Receive Verification or Return
    pricing: {
      actualPrice: 85000,
      rentalPrice: 17000,
      securityDeposit: 25500,
      totalPaidInitial: 42500,
      lateFee: 0,
      lateDays: 0,
      damageFee: 0,
      calculatedRefund: 25500
    },
    refundPreference: 'ORIGINAL_PAYMENT_METHOD',
    receiveVerification: {
      status: 'PENDING'
    }
  }
];

const initialEvidence = [
  {
    _id: '65e300000000000000000301',
    rentalId: '65e200000000000000000201',
    productId: '65e100000000000000000101',
    beforeRental: [
      {
        angle: 'FRONT',
        publicId: 'fashion_rental/evidence/before_rnt1023_front',
        cloudinaryPublicId: 'fashion_rental/evidence/before_rnt1023_front',
        secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Pristine front embroidery. Inspected by Admin Pooja before dispatch.'
      },
      {
        angle: 'BACK',
        publicId: 'fashion_rental/evidence/before_rnt1023_back',
        cloudinaryPublicId: 'fashion_rental/evidence/before_rnt1023_back',
        secureUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Back hooks and tassels verified 100% intact.'
      },
      {
        angle: 'LEFT',
        publicId: 'fashion_rental/evidence/before_rnt1023_left',
        cloudinaryPublicId: 'fashion_rental/evidence/before_rnt1023_left',
        secureUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Left flare panel clean, no frays.'
      },
      {
        angle: 'RIGHT',
        publicId: 'fashion_rental/evidence/before_rnt1023_right',
        cloudinaryPublicId: 'fashion_rental/evidence/before_rnt1023_right',
        secureUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Right zip closure tested and flawless.'
      },
      {
        angle: 'CLOSEUP',
        publicId: 'fashion_rental/evidence/before_rnt1023_closeup',
        cloudinaryPublicId: 'fashion_rental/evidence/before_rnt1023_closeup',
        secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'High resolution zardozi border macro shot.'
      }
    ],
    customerReceived: {
      verifiedGoodCondition: true,
      issueType: 'NONE',
      issueDescription: 'Received in luxury vacuum-sealed garment bag. Looks breathtaking!',
      reportedAt: new Date('2026-10-20T14:30:00Z'),
      customerReceivedImages: [
        {
          angle: 'FRONT',
          publicId: 'fashion_rental/evidence/customer_recv_1023',
          cloudinaryPublicId: 'fashion_rental/evidence/customer_recv_1023',
          secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          resourceType: 'image'
        }
      ],
      customerReceivedVideos: []
    },
    customerReturn: [
      {
        angle: 'FRONT',
        publicId: 'fashion_rental/evidence/return_customer_front',
        cloudinaryPublicId: 'fashion_rental/evidence/return_customer_front',
        secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Customer packed into protective bag'
      },
      {
        angle: 'CLOSEUP',
        publicId: 'fashion_rental/evidence/return_customer_closeup',
        cloudinaryPublicId: 'fashion_rental/evidence/return_customer_closeup',
        secureUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        caption: 'Noticed small food stain on left hemline'
      }
    ],
    deliveryPartnerReturn: [
      {
        angle: 'FRONT',
        notes: 'Collected from customer Ananya at Indiranagar. Handover bag sealed.',
        publicId: 'fashion_rental/evidence/delivery_pickup_1023',
        cloudinaryPublicId: 'fashion_rental/evidence/delivery_pickup_1023',
        secureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image'
      }
    ],
    damageEvidence: [
      {
        description: 'Light oil spot on lower zardozi border (Approx 2cm)',
        publicId: 'fashion_rental/evidence/damage_rnt1023_oilspot',
        cloudinaryPublicId: 'fashion_rental/evidence/damage_rnt1023_oilspot',
        secureUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        resourceType: 'image',
        isPrivate: true
      }
    ]
  }
];

const initialPayments = [
  {
    _id: '65e400000000000000000401',
    rentalId: '65e200000000000000000201',
    customerId: '65e000000000000000000001',
    transactionId: 'TXN_RENT_1023_INIT_78942',
    amount: 60000,
    paymentGateway: 'Razorpay Enterprise / Stripe',
    paymentType: 'INITIAL_RENTAL_DEPOSIT',
    paymentStatus: 'SUCCESS',
    refundStatus: 'PENDING',
    refundAmount: 0,
    refundDestination: 'APP_WALLET'
  }
];

module.exports = {
  initialUsers,
  initialProducts,
  initialRentals,
  initialEvidence,
  initialPayments
};
