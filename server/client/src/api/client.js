const BASE = '/api';

function getToken() {
  return localStorage.getItem('sellis_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Public
  getCategories: () => request('/categories'),
  getServices: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/services${query ? `?${query}` : ''}`);
  },

  // Admin - Categories
  createCategory: (data) =>
    request('/admin/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    request(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) =>
    request(`/admin/categories/${id}`, { method: 'DELETE' }),

  // Admin - Services
  createService: (data) =>
    request('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id, data) =>
    request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id) =>
    request(`/admin/services/${id}`, { method: 'DELETE' }),
};
