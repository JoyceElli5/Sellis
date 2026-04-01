import ServiceItem from './ServiceItem';
import styles from './ServiceCategory.module.css';

export default function ServiceCategory({ category }) {
  return (
    <section className={styles.section} id={`cat-${category.id}`} data-cat-id={category.id}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.catIcon}>{category.icon}</div>
          <div>
            <span className={styles.catLabel}>Our Services</span>
            <h2>{category.title}</h2>
          </div>
        </div>

        {category.subcategories ? (
          Object.values(category.subcategories).map((sub) => (
            <div key={sub.label}>
              <div className={styles.subLabel}>{sub.label}</div>
              <div className={styles.grid}>
                {sub.services.map((svc) => (
                  <ServiceItem key={svc.name} service={svc} category={category.title} subcategory={sub.label} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.grid}>
            {category.services.map((svc) => (
              <ServiceItem key={svc.name} service={svc} category={category.title} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
