import apiClient from './client';
import type {
  ApiCategory,
  ApiService,
  ApiResponse,
  PagedResponse,
  LoginResponse,
  ServicePayload,
  CategoryPayload,
} from './types';

/* ── Auth ───────────────────────────────────────────────────── */

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', {
    email,
    password,
  });
  return data.data;
}

export function saveToken(token: string) {
  localStorage.setItem('sellis_admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('sellis_admin_token');
}

export function getToken(): string | null {
  return typeof window !== 'undefined'
    ? localStorage.getItem('sellis_admin_token')
    : null;
}

/* ── Admin: Categories ──────────────────────────────────────── */

export async function adminGetCategories(): Promise<ApiCategory[]> {
  const { data } = await apiClient.get<ApiResponse<ApiCategory[]>>('/api/categories');
  return data.data;
}

export async function createCategory(payload: CategoryPayload): Promise<ApiCategory> {
  const { data } = await apiClient.post<ApiResponse<ApiCategory>>(
    '/api/admin/categories',
    payload
  );
  return data.data;
}

export async function updateCategory(id: string, payload: CategoryPayload): Promise<ApiCategory> {
  const { data } = await apiClient.put<ApiResponse<ApiCategory>>(
    `/api/admin/categories/${id}`,
    payload
  );
  return data.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await apiClient.delete(`/api/admin/categories/${id}`);
}

/* ── Admin: Services ────────────────────────────────────────── */

export async function adminGetServices(params?: {
  category?: string;
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

export async function createService(payload: ServicePayload): Promise<ApiService> {
  const { data } = await apiClient.post<ApiResponse<ApiService>>(
    '/api/admin/services',
    payload
  );
  return data.data;
}

export async function updateService(id: string, payload: ServicePayload): Promise<ApiService> {
  const { data } = await apiClient.put<ApiResponse<ApiService>>(
    `/api/admin/services/${id}`,
    payload
  );
  return data.data;
}

export async function deleteService(id: string): Promise<void> {
  await apiClient.delete(`/api/admin/services/${id}`);
}
