import { useState } from 'react';

export default function CategoryForm({ category, onSubmit, onCancel }) {
  const isEdit = !!category;
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [displayOrder, setDisplayOrder] = useState(category?.displayOrder || 0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({ name, description: description || null, displayOrder });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Category' : 'New Category'}</h2>
      {error && <div className="form-error">{error}</div>}

      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Description (optional)
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      </label>

      <label>
        Display Order
        <input type="number" min="0" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} />
      </label>

      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
