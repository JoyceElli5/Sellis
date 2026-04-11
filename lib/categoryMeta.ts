/**
 * Visual metadata for each service category.
 * Keyed by the slug the Spring Boot DataSeeder assigns.
 * Update coverImage to a real spa photo URL once available.
 */
export interface CategoryMeta {
  gradient: string;
  coverImage: string;
}

export const categoryMeta: Record<string, CategoryMeta> = {
  'hair-services': {
    gradient: 'linear-gradient(135deg, #3b1f0d 0%, #7a3b1e 60%, #a8581a 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  },
  facials: {
    gradient: 'linear-gradient(135deg, #5c1a3a 0%, #9e3060 60%, #c9547a 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
  },
  'spa-services': {
    gradient: 'linear-gradient(135deg, #0d2e2e 0%, #1a5c5c 60%, #2a8a7a 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
  },
  nails: {
    gradient: 'linear-gradient(135deg, #2e0d4a 0%, #5c1a8b 60%, #8a3ab8 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
  },
  waxing: {
    gradient: 'linear-gradient(135deg, #0d2e1a 0%, #1a5c30 60%, #2a8a4a 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80',
  },
  'lashes-brows': {
    gradient: 'linear-gradient(135deg, #0d0d2e 0%, #1a1a5c 60%, #2a2a8a 100%)',
    coverImage:
      'https://images.unsplash.com/photo-1583001809873-a128495da465?w=800&auto=format&fit=crop&q=80',
  },
};

/** Default fallback for any category not in the map above. */
export const defaultMeta: CategoryMeta = {
  gradient: 'linear-gradient(135deg, #2c1810 0%, #6b4c3b 100%)',
  coverImage:
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
};

export function getMeta(slug: string): CategoryMeta {
  return categoryMeta[slug] ?? defaultMeta;
}
