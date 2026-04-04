import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getCategories(), api.getServices({ size: 200 })])
      .then(([catRes, svcRes]) => {
        setCategories(catRes.data);
        setServices(svcRes.data.content || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">Loading...</div>;

  // Aggregate data
  const categoryCounts = {};
  let fixedCount = 0;
  let rangeCount = 0;
  let variantCount = 0;
  let priceTotal = 0;
  let pricedCount = 0;

  for (const svc of services) {
    categoryCounts[svc.categoryName] = (categoryCounts[svc.categoryName] || 0) + 1;

    if (svc.hasVariants) {
      variantCount++;
    } else if (svc.priceRange) {
      rangeCount++;
    } else {
      fixedCount++;
    }

    if (svc.price) {
      priceTotal += svc.price;
      pricedCount++;
    }
  }

  const avgPrice = pricedCount > 0 ? Math.round(priceTotal / pricedCount) : 0;

  // Recently added (last 5 by createdAt)
  const recent = [...services]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Highest priced fixed-price services
  const topPriced = [...services]
    .filter((s) => s.price != null)
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {/* Top-level stats */}
      <div className="stats-grid">
        <div className="stat-card clickable" onClick={() => navigate('/services')}>
          <span className="stat-number">{services.length}</span>
          <span className="stat-label">Total Services</span>
        </div>
        <div className="stat-card clickable" onClick={() => navigate('/categories')}>
          <span className="stat-number">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">GH₵{avgPrice}</span>
          <span className="stat-label">Avg. Price (fixed)</span>
        </div>
      </div>

      {/* Pricing breakdown */}
      <h2>Pricing Breakdown</h2>
      <div className="stats-grid">
        <div className="stat-card small clickable" onClick={() => navigate('/services')}>
          <span className="stat-number">{fixedCount}</span>
          <span className="stat-label">Fixed Price</span>
        </div>
        <div className="stat-card small clickable" onClick={() => navigate('/services')}>
          <span className="stat-number">{rangeCount}</span>
          <span className="stat-label">Price Range</span>
        </div>
        <div className="stat-card small clickable" onClick={() => navigate('/services')}>
          <span className="stat-number">{variantCount}</span>
          <span className="stat-label">With Variants</span>
        </div>
      </div>

      {/* Per-category breakdown */}
      <h2>By Category</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Services</th>
            <th className="hide-mobile">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const count = categoryCounts[cat.name] || 0;
            const pct = services.length > 0 ? Math.round((count / services.length) * 100) : 0;
            return (
              <tr key={cat.id}>
                <td className="td-name">{cat.name}</td>
                <td>{count}</td>
                <td className="hide-mobile">
                  <div className="bar-cell">
                    <div className="bar" style={{ width: `${pct}%` }} />
                    <span>{pct}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="dashboard-columns">
        {/* Recently added */}
        <div>
          <h2>Recently Added</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((svc) => (
                <tr key={svc.id}>
                  <td>
                    <div className="td-name">{svc.name}</div>
                    <div className="td-sub">{svc.categoryName}</div>
                  </td>
                  <td className="td-price">
                    {svc.price != null
                      ? `GH₵${svc.price}`
                      : svc.priceRange
                        ? `GH₵${svc.priceRange.min} - GH₵${svc.priceRange.max}`
                        : 'Variants'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top priced */}
        <div>
          <h2>Highest Priced</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {topPriced.map((svc) => (
                <tr key={svc.id}>
                  <td>
                    <div className="td-name">{svc.name}</div>
                    <div className="td-sub">{svc.categoryName}</div>
                  </td>
                  <td className="td-price">GH₵{svc.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
