"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getServices } from "@/lib/api/public";
import { getMeta } from "@/lib/categoryMeta";
import { formatPrice } from "@/lib/api/types";
import type { ApiCategory, ApiService } from "@/lib/api/types";
import type { QuickViewCategory } from "@/components/services/ServiceQuickView";
import ServiceQuickView from "@/components/services/ServiceQuickView";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/home/CtaSection";
import PageHero from '@/components/ui/PageHero';
import HIcon from '@/components/ui/HIcon';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function ServicesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState<{
    category: QuickViewCategory;
    services: ApiService[];
  } | null>(null);

  useEffect(() => {
    Promise.all([getCategories(), getServices({ size: 300 })])
      .then(([cats, svcs]) => {
        setCategories(cats);
        setServices(svcs.content);
        if (cats.length > 0) setActiveSection(cats[0].id);
      })
      .catch(() => {
        setCategories([]);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, ApiService[]> = {};
    for (const svc of services) {
      if (!grouped[svc.categoryId]) grouped[svc.categoryId] = [];
      grouped[svc.categoryId].push(svc);
    }
    return grouped;
  }, [services]);

  useEffect(() => {
    if (categories.length === 0) return;
    const onScroll = () => {
      const y = window.scrollY + 180;
      for (const cat of categories) {
        const el = document.getElementById(`cat-${cat.id}`);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          setActiveSection(cat.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  function jumpToCategory(id: string) {
    const target = document.getElementById(`cat-${id}`);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
  }

  function openQuickView(cat: ApiCategory, svcs: ApiService[]) {
    setQuickView({
      category: {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        meta: getMeta(cat.slug),
      },
      services: svcs,
    });
  }

  return (
    <main>
      <Navbar />
      <PageHero
        label="Sellis Beauty Spa"
        title="Our Services & Pricing"
        subtitle="A complete treatment catalog with clear pricing, descriptions, and booking actions."
        imageUrl="/sellis1.jpeg"
      />

      {!loading && (
        <div className="sticky top-(--nav-height) z-100 border-b border-cream-dark bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto">
            {categories.map((cat) => {
              const active = activeSection === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => jumpToCategory(cat.id)}
                  className={`chip-toggle shrink-0 ${
                    active
                      ? "border-transparent bg-brown-dark text-white shadow-[0_8px_18px_rgba(44,24,16,0.28)]"
                      : "border-cream-dark bg-transparent text-text-secondary hover:border-gold-light hover:bg-gold-pale/35"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <section className="bg-off-white pb-[72px] pt-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-[260px_1fr]">
          <aside className="sticky top-[calc(var(--nav-height)+24px)] hidden h-fit rounded-spa-lg border border-cream-dark bg-white p-5 shadow-spa-sm lg:block">
            <p className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[2px] text-text-light">
              Categories
            </p>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const active = activeSection === cat.id;
                const count = servicesByCategory[cat.id]?.length ?? 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => jumpToCategory(cat.id)}
                    className={`flex w-full items-center justify-between rounded-spa-sm px-3 py-2.5 text-left text-[0.82rem] font-bold transition-colors ${
                      active ? "bg-brown-dark text-white" : "text-text-secondary hover:bg-cream"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[0.7rem] ${active ? "text-white/75" : "text-text-light"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-44 rounded-spa-lg bg-cream-dark soft-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-10">
                {categories.map((cat) => {
                  const catServices = servicesByCategory[cat.id] ?? [];
                  return (
                    <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
                      <div className="mb-5 flex items-end justify-between gap-4 border-b border-cream-dark pb-3">
                        <div>
                          <span className="mb-1 block text-[0.68rem] font-extrabold uppercase tracking-[2px] text-gold-dark">
                            Our Services
                          </span>
                          <h2 className="text-[1.7rem] font-extrabold text-brown-dark">{cat.name}</h2>
                          {cat.description && <p className="mt-1 max-w-[680px] text-[0.88rem]">{cat.description}</p>}
                        </div>
                        <button
                          onClick={() => openQuickView(cat, catServices)}
                          className="hidden items-center gap-1.5 rounded-full border border-cream-dark bg-white px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[1px] text-text-secondary transition-colors hover:border-gold hover:text-gold-dark md:inline-flex"
                        >
                          quick view
                          <HIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.8} />
                        </button>
                      </div>

                      {catServices.length === 0 ? (
                        <p className="text-[0.88rem] text-text-light">No treatments available in this category yet.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {catServices.map((svc) => (
                            <ServiceCatalogCard key={svc.id} svc={svc} category={cat} onQuickView={() => openQuickView(cat, catServices)} />
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Found Something You Love?"
        subtext="Book your appointment in minutes — we'll confirm via WhatsApp."
      />
      <Footer />

      <ServiceQuickView
        isOpen={!!quickView}
        onClose={() => setQuickView(null)}
        category={quickView?.category ?? null}
        services={quickView?.services ?? []}
      />
    </main>
  );
}

function ServiceCatalogCard({
  svc,
  category,
  onQuickView,
}: {
  svc: ApiService;
  category: ApiCategory;
  onQuickView: () => void;
}) {
  const meta = getMeta(category?.slug ?? "");
  const bg = svc.imageUrl ?? meta.coverImage;
  const bookHref = `/booking?service=${encodeURIComponent(`${category?.name ?? ""} › ${svc.name}`)}`;

  return (
    <article className="surface-card group overflow-hidden">
      <div className="relative h-44 overflow-hidden border-b border-cream-dark" style={{ background: meta.gradient }}>
        <Image
          src={bg}
          alt={svc.name}
          fill
          style={{ objectFit: "cover", opacity: 0.86 }}
          className="scale-100 transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[1px] text-brown-dark">
          {formatPrice(svc)}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-[1rem] font-extrabold text-brown-dark">{svc.name}</h3>
        <p className="text-[0.84rem] leading-relaxed text-text-secondary">
          {svc.description ?? "A focused ritual for glow, relief, and deep relaxation."}
        </p>
        {svc.hasVariants && svc.variants.length > 0 && (
          <p className="text-[0.76rem] font-semibold text-text-light">
            {svc.variants.map((v) => `${v.name}: GH₵ ${v.price}`).join(" · ")}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={onQuickView}
            className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.8px] text-gold-dark transition-colors hover:text-brown-dark"
          >
            Quick view
            <HIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.8} />
          </button>
          <Link
            href={bookHref}
            className="rounded-full bg-linear-to-br from-gold-dark to-gold px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.8px] text-white transition-transform duration-200 hover:scale-[1.02]"
          >
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}
