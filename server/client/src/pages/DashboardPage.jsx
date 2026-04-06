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

  // --- Aggregate data ---
  const categoryCounts = {};
  const categoryPrices = {};
  let fixedCount = 0;
  let rangeCount = 0;
  let variantCount = 0;
  let priceTotal = 0;
  let pricedCount = 0;
  let withImage = 0;
  let minPrice = Infinity;
  let maxPrice = 0;
  let minService = null;
  let maxService = null;

  for (const svc of services) {
    const cat = svc.categoryName;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

    if (svc.hasVariants) {
      variantCount++;
    } else if (svc.priceRange) {
      rangeCount++;
    } else {
      fixedCount++;
    }

    if (svc.price != null) {
      priceTotal += svc.price;
      pricedCount++;

      if (!categoryPrices[cat]) categoryPrices[cat] = { total: 0, count: 0 };
      categoryPrices[cat].total += svc.price;
      categoryPrices[cat].count++;

      if (svc.price < minPrice) { minPrice = svc.price; minService = svc; }
      if (svc.price > maxPrice) { maxPrice = svc.price; maxService = svc; }
    }

    if (svc.imageUrl) withImage++;
  }

  const avgPrice = pricedCount > 0 ? Math.round(priceTotal / pricedCount) : 0;
  const withoutImage = services.length - withImage;
  const priceSpread = pricedCount > 0 ? maxPrice - minPrice : 0;

  // Services per category average
  const avgPerCategory = categories.length > 0
    ? Math.round(services.length / categories.length)
    : 0;

  // Empty categories
  const emptyCategories = categories.filter((c) => !categoryCounts[c.name]);

  // Largest category
  const largestCategory = categories.reduce(
    (best, cat) => {
      const count = categoryCounts[cat.name] || 0;
      return count > best.count ? { name: cat.name, count } : best;
    },
    { name: '-', count: 0 }
  );

  // Most expensive category (by avg fixed price)
  const categoryAvgs = Object.entries(categoryPrices)
    .map(([name, { total, count }]) => ({ name, avg: Math.round(total / count) }))
    .sort((a, b) => b.avg - a.avg);

  // Lowest priced fixed-price services
  const lowestPriced = [...services]
    .filter((s) => s.price != null)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

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
        <div className="stat-card">
          <span className="stat-number">{avgPerCategory}</span>
          <span className="stat-label">Avg. per Category</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">GH₵{priceSpread}</span>
          <span className="stat-label">Price Spread</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{withImage}</span>
          <span className="stat-label">With Images</span>
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
        {minService && (
          <div className="stat-card small">
            <span className="stat-number">GH₵{minPrice}</span>
            <span className="stat-label">Cheapest: {minService.name}</span>
          </div>
        )}
        {maxService && (
          <div className="stat-card small">
            <span className="stat-number">GH₵{maxPrice}</span>
            <span className="stat-label">Priciest: {maxService.name}</span>
          </div>
        )}
        <div className="stat-card small">
          <span className="stat-number">{withoutImage}</span>
          <span className="stat-label">Missing Images</span>
        </div>
      </div>

      {/* Category insights */}
      <h2>Category Insights</h2>
      <div className="stats-grid">
        <div className="stat-card small">
          <span className="stat-number">{largestCategory.count}</span>
          <span className="stat-label">Most: {largestCategory.name}</span>
        </div>
        {categoryAvgs.length > 0 && (
          <div className="stat-card small">
            <span className="stat-number">GH₵{categoryAvgs[0].avg}</span>
            <span className="stat-label">Priciest: {categoryAvgs[0].name}</span>
          </div>
        )}
        {categoryAvgs.length > 1 && (
          <div className="stat-card small">
            <span className="stat-number">GH₵{categoryAvgs[categoryAvgs.length - 1].avg}</span>
            <span className="stat-label">Cheapest: {categoryAvgs[categoryAvgs.length - 1].name}</span>
          </div>
        )}
        {emptyCategories.length > 0 && (
          <div className="stat-card small">
            <span className="stat-number">{emptyCategories.length}</span>
            <span className="stat-label">Empty Categories</span>
          </div>
        )}
      </div>

      {/* Per-category breakdown */}
      <h2>By Category</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Services</th>
            <th className="hide-mobile">Avg. Price</th>
            <th className="hide-mobile">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const count = categoryCounts[cat.name] || 0;
            const pct = services.length > 0 ? Math.round((count / services.length) * 100) : 0;
            const catAvg = categoryPrices[cat.name]
              ? `GH₵${Math.round(categoryPrices[cat.name].total / categoryPrices[cat.name].count)}`
              : '-';
            return (
              <tr key={cat.id}>
                <td className="td-name">{cat.name}</td>
                <td>{count}</td>
                <td className="hide-mobile">{catAvg}</td>
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

        {/* Lowest priced */}
        <div>
          <h2>Lowest Priced</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {lowestPriced.map((svc) => (
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
