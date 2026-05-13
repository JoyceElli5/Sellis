import type { ApiCategory, ApiService } from './types';

export function normalizeService(svc: ApiService & { _id?: string }): ApiService {
  return { ...svc, id: svc.id ?? svc._id ?? '' };
}

export function normalizeCategory(cat: ApiCategory & { _id?: string }): ApiCategory {
  const id = cat.id ?? cat._id ?? '';
  const slug = cat.slug ?? cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { ...cat, id, slug };
}
