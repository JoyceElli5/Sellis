import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Modal from '../components/Modal';
import CategoryForm from '../components/CategoryForm';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchCategories = useCallback(() => {
    setLoading(true);
    api.getCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = async (data) => {
    await api.createCategory(data);
    setShowForm(false);
    fetchCategories();
  };

  const handleUpdate = async (data) => {
    await api.updateCategory(editing.id, data);
    setEditing(null);
    fetchCategories();
  };

  const handleDelete = async () => {
    await api.deleteCategory(deleting.id);
    setDeleting(null);
    fetchCategories();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Categories</h1>
        <button className="btn primary" onClick={() => setShowForm(true)}>+ New Category</button>
      </div>

      {loading ? (
        <div className="page-loading">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="empty-state">No categories found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th className="hide-mobile">Slug</th>
              <th className="hide-mobile">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.displayOrder}</td>
                <td className="td-name">{cat.name}</td>
                <td className="hide-mobile"><code>{cat.slug}</code></td>
                <td className="hide-mobile">{cat.description || '\u2013'}</td>
                <td className="td-actions">
                  <button className="btn-sm" onClick={() => setEditing(cat)}>Edit</button>
                  <button className="btn-sm danger" onClick={() => setDeleting(cat)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CategoryForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <CategoryForm category={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <div className="confirm-delete">
            <h2>Delete Category</h2>
            <p>Are you sure you want to delete <strong>{deleting.name}</strong>?</p>
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
