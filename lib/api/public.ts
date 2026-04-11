import apiClient from './client';
import type { ApiCategory, ApiService, ApiResponse, PagedResponse } from './types';

/** GET /api/categories — all active categories ordered by displayOrder */
export async function getCategories(): Promise<ApiCategory[]> {
  const { data } = await apiClient.get<ApiResponse<ApiCategory[]>>('/api/categories');
  return data.data;
}

/** GET /api/services — paginated, optionally filtered by categoryId or search term */
export async function getServices(params?: {
  category?: string;  // categoryId
  search?: string;
  page?: number;
  size?: number;
}): Promise<PagedResponse<ApiService>> {
  const { data } = await apiClient.get<ApiResponse<PagedResponse<ApiService>>>(
    '/api/services',
    { params }
  );
  return data.data;
}

/** GET /api/services/:id */
export async function getService(id: string): Promise<ApiService> {
  const { data } = await apiClient.get<ApiResponse<ApiService>>(`/api/services/${id}`);
  return data.data;
}
