import ServiceItem from './ServiceItem';
import type { ServiceCategoryData } from '@/data/services';

type ServiceCategoryProps = {
  category: ServiceCategoryData;
};

export default function ServiceCategory({ category }: ServiceCategoryProps) {
  return (
    <section
      className="py-[72px] even:bg-cream"
      id={`cat-${category.id}`}
      data-cat-id={category.id}
    >
      <div className="container">
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-spa-md bg-gradient-to-br from-gold-dark to-gold text-2xl shadow-[0_4px_14px_rgba(168,134,90,0.35)]">
            {category.icon}
          </div>
          <div>
            <span className="mb-0.5 block text-[0.66rem] font-bold uppercase tracking-[3px] text-gold-dark">
              Our Services
            </span>
            <h2>{category.title}</h2>
          </div>
        </div>

        {category.subcategories ? (
          Object.values(category.subcategories).map((sub) => (
            <div key={sub.label}>
              <div className="mb-3.5 mt-7 inline-block rounded-full border border-gold-light bg-gold-pale px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-[2.5px] text-gold-dark">
                {sub.label}
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[18px]">
                {sub.services.map((svc) => (
                  <ServiceItem
                    key={svc.name}
                    service={svc}
                    category={category.title}
                    subcategory={sub.label}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[18px]">
            {category.services?.map((svc) => (
              <ServiceItem key={svc.name} service={svc} category={category.title} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
