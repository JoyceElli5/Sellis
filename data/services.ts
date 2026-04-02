/**
 * Sellis Beauty Spa — Services Data
 * Single source of truth for all service categories and prices.
 * All prices in GH₵ (Ghana Cedis)
 */

export type ServiceEntry = {
  name: string;
  price: string;
  note?: string;
};

export type ServiceSubcategory = {
  label: string;
  services: ServiceEntry[];
};

export type ServiceCategoryData = {
  id: string;
  title: string;
  icon: string;
  description: string;
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
    icon: '✂️',
    description: 'Professional hair care and styling for every texture and style',
    services: [
      { name: 'Relaxing', price: 'GH₵ 150' },
      { name: 'Relaxing with Own Cream', price: 'GH₵ 100' },
      { name: 'Washing', price: 'GH₵ 60 – 80', note: 'Depending on product used' },
      { name: 'Cornrow with Own Hair', price: 'GH₵ 50' },
      { name: 'Cornrow with Extension', price: 'GH₵ 200' },
      { name: 'Hair Treatment', price: 'GH₵ 170' },
      { name: 'Ponytail with Extension', price: 'GH₵ 300' },
      { name: 'Ponytail without Extension', price: 'GH₵ 140' },
      { name: 'Installation', price: 'GH₵ 150' },
      { name: 'Braiding with Extension', price: 'GH₵ 300 – 450', note: 'Depending on style' },
      { name: 'Braiding without Extension', price: 'GH₵ 250' },
    ],
  },

  facials: {
    id: 'facials',
    title: 'Facials',
    icon: '🌸',
    description: 'Advanced skin care treatments for a radiant, glowing complexion',
    services: [
      { name: 'Deep Cleansing Facial', price: 'GH₵ 350' },
      { name: 'Derma-Planing', price: 'GH₵ 400' },
    ],
  },

  spa: {
    id: 'spa',
    title: 'Spa Services',
    icon: '🧖‍♀️',
    description: 'Relaxing and rejuvenating body treatments to restore balance',
    services: [
      { name: 'Swedish Massage (60 min)', price: 'GH₵ 300' },
      { name: 'Deep Tissue Massage (60 min)', price: 'GH₵ 350' },
      { name: 'Hot Stone Massage (60 min)', price: 'GH₵ 400' },
      { name: 'Aromatherapy Massage', price: 'GH₵ 350' },
      { name: 'Back Massage (30 min)', price: 'GH₵ 200' },
      { name: 'Foot Massage (30 min)', price: 'GH₵ 100' },
      { name: 'Wood Therapy (60 min)', price: 'GH₵ 400' },
    ],
  },

  nails: {
    id: 'nails',
    title: 'Nails',
    icon: '💅',
    description: 'Manicure, pedicure and nail art for flawless fingertips',
    services: [
      { name: 'Classic Pedicure', price: 'GH₵ 140' },
      { name: 'Manicure', price: 'GH₵ 100' },
      { name: 'Pedicure with Gel Polish', price: 'GH₵ 180' },
      { name: 'Stick On', price: 'GH₵ 80 – 100' },
      { name: 'Stick On with Gel Polish', price: 'GH₵ 130' },
      { name: 'Acrylic Nails', price: 'GH₵ 120 – 300', note: 'Depending on design' },
      { name: 'Acrylic Refill', price: 'GH₵ 150' },
    ],
  },

  waxing: {
    id: 'waxing',
    title: 'Waxing',
    icon: '🌿',
    description: 'Gentle and precise hair removal for silky smooth skin',
    services: [
      { name: 'Eyebrow Wax', price: 'GH₵ 80' },
      { name: 'Underarm Wax', price: 'GH₵ 120' },
      { name: 'Upper Lip Wax', price: 'GH₵ 50' },
      { name: 'Chin Wax', price: 'GH₵ 70' },
      { name: 'Lower Lip Wax', price: 'GH₵ 30' },
      { name: 'Cheek Wax', price: 'GH₵ 50' },
      { name: 'Belly Wax', price: 'GH₵ 80' },
      { name: 'Chest Wax', price: 'GH₵ 80' },
      { name: 'Back Wax', price: 'GH₵ 100' },
      { name: 'Half Leg Wax', price: 'GH₵ 120' },
      { name: 'Full Leg Wax', price: 'GH₵ 200' },
      { name: 'Half Arm Wax', price: 'GH₵ 120' },
      { name: 'Full Arm Wax', price: 'GH₵ 200' },
      { name: 'Bikini Wax', price: 'GH₵ 200' },
      { name: 'Brazilian Wax', price: 'GH₵ 200' },
    ],
  },

  lashes: {
    id: 'lashes',
    title: 'Lashes & Brows',
    icon: '👁️',
    description: 'Expert lash extensions and brow treatments for defined, captivating eyes',
    subcategories: {
      brows: {
        label: 'Brow Treatments',
        services: [
          { name: 'Microblading', price: 'GH₵ 800' },
          { name: 'Ombré Brows', price: 'GH₵ 500' },
          { name: 'Brow Lamination', price: 'GH₵ 200' },
          { name: 'Tinting', price: 'GH₵ 60' },
        ],
      },
      classic: {
        label: 'Classic Set',
        services: [
          { name: 'Natural Set', price: 'GH₵ 100' },
          { name: 'Classic Cat Eye', price: 'GH₵ 150' },
          { name: 'Classic Refill', price: 'GH₵ 60' },
        ],
      },
      volume: {
        label: 'Volume Set',
        services: [
          { name: 'Volume Cat Eye', price: 'GH₵ 200' },
          { name: 'Wispy', price: 'GH₵ 210' },
          { name: 'Volume Refill', price: 'GH₵ 70' },
        ],
      },
      hybrid: {
        label: 'Hybrid Set',
        services: [
          { name: 'Hybrid Cat Eye', price: 'GH₵ 180' },
          { name: 'Hybrid Wispy', price: 'GH₵ 200' },
          { name: 'Hybrid Refill', price: 'GH₵ 80' },
        ],
      },
      removal: {
        label: 'Removal',
        services: [{ name: 'Lash Removal', price: 'GH₵ 80' }],
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
