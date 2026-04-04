import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const PRICING_MODES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'range', label: 'Price Range' },
  { value: 'variants', label: 'Variants' },
];

export default function ServiceForm({ service, categories, onSubmit, onCancel }) {
  const isEdit = !!service;

  const getInitialMode = () => {
    if (!service) return 'fixed';
    if (service.hasVariants && service.variants?.length > 0) return 'variants';
    if (service.priceRange) return 'range';
    return 'fixed';
  };

  const [name, setName] = useState(service?.name || '');
  const [categoryId, setCategoryId] = useState(service?.categoryId || '');
  const [description, setDescription] = useState(service?.description || '');
  const [imageUrl, setImageUrl] = useState(service?.imageUrl || '');
  const [pricingMode, setPricingMode] = useState(getInitialMode);
  const [price, setPrice] = useState(service?.price || '');
  const [rangeMin, setRangeMin] = useState(service?.priceRange?.min || '');
  const [rangeMax, setRangeMax] = useState(service?.priceRange?.max || '');
  const [variants, setVariants] = useState(
    service?.variants?.length > 0
      ? service.variants.map((v) => ({ name: v.name, price: v.price }))
      : [{ name: '', price: '' }]
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const addVariant = () => setVariants([...variants, { name: '', price: '' }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));
  const updateVariant = (i, field, value) => {
    const updated = [...variants];
    updated[i] = { ...updated[i], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      name,
      categoryId,
      description: description || null,
      imageUrl: imageUrl || null,
      price: null,
      priceRange: null,
      variants: null,
    };

    if (pricingMode === 'fixed') {
      payload.price = parseFloat(price);
    } else if (pricingMode === 'range') {
      payload.priceRange = { min: parseFloat(rangeMin), max: parseFloat(rangeMax) };
    } else {
      payload.variants = variants
        .filter((v) => v.name && v.price)
        .map((v) => ({ name: v.name, price: parseFloat(v.price) }));
    }

    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Service' : 'New Service'}</h2>
      {error && <div className="form-error">{error}</div>}

      <label>
        Service Image
        <ImageUpload value={imageUrl} onChange={setImageUrl} />
      </label>

      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Category
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>
        Description (optional)
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      </label>

      <label>
        Pricing Type
        <div className="pricing-tabs">
          {PRICING_MODES.map((m) => (
            <button
              type="button"
              key={m.value}
              className={`tab ${pricingMode === m.value ? 'active' : ''}`}
              onClick={() => setPricingMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </label>

      {pricingMode === 'fixed' && (
        <label>
          Price
          <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
      )}

      {pricingMode === 'range' && (
        <div className="row">
          <label>
            Min Price
            <input type="number" step="0.01" min="0" value={rangeMin} onChange={(e) => setRangeMin(e.target.value)} required />
          </label>
          <label>
            Max Price
            <input type="number" step="0.01" min="0" value={rangeMax} onChange={(e) => setRangeMax(e.target.value)} required />
          </label>
        </div>
      )}

      {pricingMode === 'variants' && (
        <div className="variants-section">
          {variants.map((v, i) => (
            <div key={i} className="variant-row">
              <input
                type="text"
                placeholder="Variant name"
                value={v.name}
                onChange={(e) => updateVariant(i, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                value={v.price}
                onChange={(e) => updateVariant(i, 'price', e.target.value)}
                required
              />
              {variants.length > 1 && (
                <button type="button" className="btn-icon danger" onClick={() => removeVariant(i)}>X</button>
              )}
            </div>
          ))}
          <button type="button" className="btn-sm" onClick={addVariant}>+ Add Variant</button>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
