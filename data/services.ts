/**
 * Sellis Beauty Spa — Services Data
 * Single source of truth for all service categories and prices.
 * All prices in GH₵ (Ghana Cedis)
 */

export type ServiceEntry = {
  name: string;
  price: string;
  note?: string;
  image: string;   // Unique photo for this service's card
};

export type ServiceSubcategory = {
  label: string;
  services: ServiceEntry[];
};

export type ServiceCategoryData = {
  id: string;
  title: string;
  description: string;
  gradient: string;      // Fallback when image hasn't loaded
  coverImage?: string;   // Hero image used in the QuickView drawer header
  services?: ServiceEntry[];
  subcategories?: Record<string, ServiceSubcategory>;
};

export type FlatServiceOption = {
  category: string;
  subcategory: string | null;
  name: string;
  price: string;
  value: string;
  label: string;
  groupLabel: string;
};

export const servicesData: Record<string, ServiceCategoryData> = {
  hair: {
    id: 'hair',
    title: 'Hair Services',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    description: 'Professional hair care and styling for every texture and style',
    gradient: 'linear-gradient(135deg, #3b1f0d 0%, #7a3b1e 60%, #a8581a 100%)',
    services: [
      {
        name: 'Relaxing',
        price: 'GH₵ 150',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Relaxing with Own Cream',
        price: 'GH₵ 100',
        image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2f0f18?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Washing',
        price: 'GH₵ 60 – 80',
        note: 'Depending on product used',
        image: 'https://media.istockphoto.com/id/2266903636/photo/beautiful-african-american-woman-receiving-luxurious-hair-wash-at-salon-spa.jpg?s=1024x1024&w=is&k=20&c=2O6IHJPSsEo2KZCqWDgIyer1-YSee59-xacU8zwpOOI=',
      },
      {
        name: 'Cornrow with Own Hair',
        price: 'GH₵ 50',
        image: 'https://media.istockphoto.com/id/2166823175/photo/detailed-of-daughters-hair-by-her-mother.jpg?s=1024x1024&w=is&k=20&c=LFcCOdqo7yrAa5DvXCIsPk4FCKBQJeWG9E_hoexA_-E=',
      },
      {
        name: 'Cornrow with Extension',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Hair Treatment',
        price: 'GH₵ 170',
        image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Ponytail with Extension',
        price: 'GH₵ 300',
        image: 'https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Ponytail without Extension',
        price: 'GH₵ 140',
        image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Installation',
        price: 'GH₵ 150',
        image: 'https://images.unsplash.com/photo-1562586566-fd69daa3da1a?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Braiding with Extension',
        price: 'GH₵ 300 – 450',
        note: 'Depending on style',
        image: 'https://media.istockphoto.com/id/2160005563/photo/home-hair-braiding-session-with-mixed-race-and-black-women.jpg?s=1024x1024&w=is&k=20&c=3bQ4hgGVTACQyivXl5YMOEjLK-7Q8qQrbuqfjAxaXQ4=',
      },
      {
        name: 'Braiding without Extension',
        price: 'GH₵ 250',
        image: 'https://plus.unsplash.com/premium_photo-1664875849368-596b1c113976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFpciUyMGJyYWlkc3xlbnwwfHwwfHx8MA%3D%3D',
      },
    ],
  },

  facials: {
    id: 'facials',
    title: 'Facials',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    description: 'Advanced skin care treatments for a radiant, glowing complexion',
    gradient: 'linear-gradient(135deg, #5c1a3a 0%, #9e3060 60%, #c9547a 100%)',
    services: [
      {
        name: 'Deep Cleansing Facial',
        price: 'GH₵ 350',
        image: 'https://i.pinimg.com/736x/8f/2f/33/8f2f33bb26e8ea62d66be185ec4d1c80.jpg',
      },
      {
        name: 'Derma-Planing',
        price: 'GH₵ 400',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  spa: {
    id: 'spa',
    title: 'Spa Services',
    coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
    description: 'Relaxing and rejuvenating body treatments to restore balance',
    gradient: 'linear-gradient(135deg, #0d2e2e 0%, #1a5c5c 60%, #2a8a7a 100%)',
    services: [
      {
        name: 'Swedish Massage (60 min)',
        price: 'GH₵ 300',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Deep Tissue Massage (60 min)',
        price: 'GH₵ 350',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Hot Stone Massage (60 min)',
        price: 'GH₵ 400',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Aromatherapy Massage',
        price: 'GH₵ 350',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Back Massage (30 min)',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Foot Massage (30 min)',
        price: 'GH₵ 100',
        image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Wood Therapy (60 min)',
        price: 'GH₵ 400',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  nails: {
    id: 'nails',
    title: 'Nails',
    coverImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    description: 'Manicure, pedicure and nail art for flawless fingertips',
    gradient: 'linear-gradient(135deg, #2e0d4a 0%, #5c1a8b 60%, #8a3ab8 100%)',
    services: [
      {
        name: 'Classic Pedicure',
        price: 'GH₵ 140',
        image: 'https://images.unsplash.com/photo-1604502796672-4bde92b5d7c3?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Manicure',
        price: 'GH₵ 100',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Pedicure with Gel Polish',
        price: 'GH₵ 180',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Stick On',
        price: 'GH₵ 80 – 100',
        image: 'https://images.unsplash.com/photo-1604756297957-c38aeabb85b5?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Stick On with Gel Polish',
        price: 'GH₵ 130',
        image: 'https://images.unsplash.com/photo-1604502796672-4bde92b5d7c3?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Acrylic Nails',
        price: 'GH₵ 120 – 300',
        note: 'Depending on design',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Acrylic Refill',
        price: 'GH₵ 150',
        image: 'https://images.unsplash.com/photo-1604756297957-c38aeabb85b5?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  waxing: {
    id: 'waxing',
    title: 'Waxing',
    coverImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80',
    description: 'Gentle and precise hair removal for silky smooth skin',
    gradient: 'linear-gradient(135deg, #0d2e1a 0%, #1a5c30 60%, #2a8a4a 100%)',
    services: [
      {
        name: 'Eyebrow Wax',
        price: 'GH₵ 80',
        image: 'https://images.unsplash.com/photo-1588776814546-ec7e1e09a5d9?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Underarm Wax',
        price: 'GH₵ 120',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Upper Lip Wax',
        price: 'GH₵ 50',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Chin Wax',
        price: 'GH₵ 70',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Lower Lip Wax',
        price: 'GH₵ 30',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Cheek Wax',
        price: 'GH₵ 50',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Belly Wax',
        price: 'GH₵ 80',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Chest Wax',
        price: 'GH₵ 80',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Back Wax',
        price: 'GH₵ 100',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Half Leg Wax',
        price: 'GH₵ 120',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Full Leg Wax',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Half Arm Wax',
        price: 'GH₵ 120',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Full Arm Wax',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Bikini Wax',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80',
      },
      {
        name: 'Brazilian Wax',
        price: 'GH₵ 200',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  lashes: {
    id: 'lashes',
    title: 'Lashes & Brows',
    coverImage: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=800&auto=format&fit=crop&q=80',
    description: 'Expert lash extensions and brow treatments for defined, captivating eyes',
    gradient: 'linear-gradient(135deg, #0d0d2e 0%, #1a1a5c 60%, #2a2a8a 100%)',
    subcategories: {
      brows: {
        label: 'Brow Treatments',
        services: [
          {
            name: 'Microblading',
            price: 'GH₵ 800',
            image: 'https://images.unsplash.com/photo-1588776814546-ec7e1e09a5d9?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Ombré Brows',
            price: 'GH₵ 500',
            image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Brow Lamination',
            price: 'GH₵ 200',
            image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Tinting',
            price: 'GH₵ 60',
            image: 'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=600&auto=format&fit=crop&q=80',
          },
        ],
      },
      classic: {
        label: 'Classic Set',
        services: [
          {
            name: 'Natural Set',
            price: 'GH₵ 100',
            image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Classic Cat Eye',
            price: 'GH₵ 150',
            image: 'https://images.unsplash.com/photo-1519058082700-08a9de7fd4f4?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Classic Refill',
            price: 'GH₵ 60',
            image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=600&auto=format&fit=crop&q=80',
          },
        ],
      },
      volume: {
        label: 'Volume Set',
        services: [
          {
            name: 'Volume Cat Eye',
            price: 'GH₵ 200',
            image: 'https://images.unsplash.com/photo-1519058082700-08a9de7fd4f4?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Wispy',
            price: 'GH₵ 210',
            image: 'https://images.unsplash.com/photo-1617029760553-40c7ebe3c0b4?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Volume Refill',
            price: 'GH₵ 70',
            image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=600&auto=format&fit=crop&q=80',
          },
        ],
      },
      hybrid: {
        label: 'Hybrid Set',
        services: [
          {
            name: 'Hybrid Cat Eye',
            price: 'GH₵ 180',
            image: 'https://images.unsplash.com/photo-1519058082700-08a9de7fd4f4?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Hybrid Wispy',
            price: 'GH₵ 200',
            image: 'https://images.unsplash.com/photo-1617029760553-40c7ebe3c0b4?w=600&auto=format&fit=crop&q=80',
          },
          {
            name: 'Hybrid Refill',
            price: 'GH₵ 80',
            image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=600&auto=format&fit=crop&q=80',
          },
        ],
      },
      removal: {
        label: 'Removal',
        services: [
          {
            name: 'Lash Removal',
            price: 'GH₵ 80',
            image: 'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=600&auto=format&fit=crop&q=80',
          },
        ],
      },
    },
  },
};

/** Flat list of all services — used to populate booking dropdown */
export function getAllServicesFlat(): FlatServiceOption[] {
  const all: FlatServiceOption[] = [];
  Object.values(servicesData).forEach((cat) => {
    if (cat.subcategories) {
      Object.values(cat.subcategories).forEach((sub) => {
        sub.services.forEach((s) => {
          all.push({
            category: cat.title,
            subcategory: sub.label,
            name: s.name,
            price: s.price,
            value: `${cat.title} › ${sub.label} › ${s.name}`,
            label: `${s.name} (${sub.label}) — ${s.price}`,
            groupLabel: cat.title,
          });
        });
      });
    } else if (cat.services) {
      cat.services.forEach((s) => {
        all.push({
          category: cat.title,
          subcategory: null,
          name: s.name,
          price: s.price,
          value: `${cat.title} › ${s.name}`,
          label: `${s.name} — ${s.price}`,
          groupLabel: cat.title,
        });
      });
    }
  });
  return all;
}
