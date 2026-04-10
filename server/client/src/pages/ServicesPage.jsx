import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Modal from '../components/Modal';
import ServiceForm from '../components/ServiceForm';

function formatPrice(service) {
  if (service.hasVariants && service.variants?.length > 0) {
    return service.variants.map((v) => `${v.name}: GH₵${v.price}`).join(' | ');
  }
  if (service.priceRange) {
    return `GH₵${service.priceRange.min} - GH₵${service.priceRange.max}`;
  }
  if (service.price != null) {
    return `GH₵${service.price}`;
  }
  return '-';
}

function ServiceImage({ service }) {
  if (service.imageUrl) {
    return <img src={service.imageUrl} alt={service.name} className="td-image" />;
  }
  const initials = service.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return <div className="td-image-placeholder">{initials}</div>;
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchServices = useCallback(() => {
    setLoading(true);
    const params = { page, size: 20 };
    if (search) params.search = search;
    if (filterCategory) params.category = filterCategory;

    api.getServices(params)
      .then((res) => {
        setServices(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page, search, filterCategory]);

  useEffect(() => {
    api.getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreate = async (data) => {
    await api.createService(data);
    setShowForm(false);
    fetchServices();
  };

  const handleUpdate = async (data) => {
    await api.updateService(editing.id, data);
    setEditing(null);
    fetchServices();
  };

  const handleDelete = async () => {
    await api.deleteService(deleting.id);
    setDeleting(null);
    fetchServices();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Services</h1>
        <button className="btn primary" onClick={() => setShowForm(true)}>+ New Service</button>
      </div>

      <form className="filters" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
        <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(0); }}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </form>

      {loading ? (
        <div className="page-loading">Loading...</div>
      ) : services.length === 0 ? (
        <div className="empty-state">No services found.</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th className="hide-mobile">Category</th>
                <th>Pricing</th>
                <th className="hide-mobile">Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id}>
                  <td>
                    <div className="td-service-info">
                      <ServiceImage service={svc} />
                      <span className="td-name">{svc.name}</span>
                    </div>
                  </td>
                  <td className="hide-mobile"><span className="category-badge">{svc.categoryName}</span></td>
                  <td className="td-price">{formatPrice(svc)}</td>
                  <td className="hide-mobile">
                    <span className={`type-badge ${svc.hasVariants ? 'variants' : svc.priceRange ? 'range' : 'fixed'}`}>
                      {svc.hasVariants ? 'Variants' : svc.priceRange ? 'Range' : 'Fixed'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button className="btn-sm" onClick={() => setEditing(svc)}>Edit</button>
                    <button className="btn-sm danger" onClick={() => setDeleting(svc)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
              <span>Page {page + 1} of {totalPages}</span>
              <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          )}
        </>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <ServiceForm categories={categories} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <ServiceForm service={editing} categories={categories} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <div className="confirm-delete">
            <h2>Delete Service</h2>
            <p>Are you sure you want to delete <strong>{deleting.name}</strong>? This action uses soft delete.</p>
            <div className="form-actions">
              <button className="btn secondary" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="btn danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
