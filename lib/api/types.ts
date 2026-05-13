/* ─────────────────────────────────────────────────────────────
   Sellis Beauty Spa — API type definitions
   Mirrors the Spring Boot model / DTO layer exactly.
───────────────────────────────────────────────────────────── */

export interface PriceRange {
  min: number;
  max: number;
}

export interface ServiceVariant {
  name: string;
  price: number;
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiService {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string | null;
  /** Set when pricing mode is fixed */
  price: number | null;
  /** Set when pricing mode is range */
  priceRange: PriceRange | null;
  /** Set when pricing mode is variants */
  variants: ServiceVariant[];
  hasVariants: boolean;
  /** Cloudinary URL — may be null until uploaded via CMS */
  imageUrl: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: string;
}

/** Payload for POST/PUT /api/admin/services */
export interface ServicePayload {
  name: string;
  categoryId: string;
  description?: string;
  price?: number;
  priceRange?: PriceRange;
  variants?: ServiceVariant[];
  imageUrl?: string;
}

/** Payload for POST/PUT /api/admin/categories */
export interface CategoryPayload {
  name: string;
  description?: string;
  displayOrder?: number;
}

/** Human-readable price string derived from an ApiService */
export function formatPrice(svc: ApiService): string {
  if (svc.price !== null && svc.price !== undefined) {
    return `GH₵ ${svc.price.toLocaleString()}`;
  }
  if (svc.priceRange) {
    return `GH₵ ${svc.priceRange.min.toLocaleString()} – ${svc.priceRange.max.toLocaleString()}`;
  }
  if (svc.hasVariants && svc.variants.length > 0) {
    const prices = svc.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max
      ? `GH₵ ${min.toLocaleString()}`
      : `GH₵ ${min.toLocaleString()} – ${max.toLocaleString()}`;
  }
  return 'Contact for price';
}
