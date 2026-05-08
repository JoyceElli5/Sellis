"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getServices } from "@/lib/api/public";
import { getMeta } from "@/lib/categoryMeta";
import { formatPrice } from "@/lib/api/types";
import type { ApiCategory, ApiService } from "@/lib/api/types";
import type { QuickViewCategory } from "@/components/services/ServiceQuickView";
import ServiceQuickView from "@/components/services/ServiceQuickView";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeIn from "@/components/ui/FadeIn";
import HIcon from '@/components/ui/HIcon';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function FeaturedServices() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [services, setServices] = useState<ApiService[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingSvcs, setLoadingSvcs] = useState(false);
  const [quickView, setQuickView] = useState<{
    category: QuickViewCategory;
    services: ApiService[];
  } | null>(null);

  // Load categories once
  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) setActiveId(cats[0].id);
      })
      .catch(() => {})
      .finally(() => setLoadingCats(false));
  }, []);

  // Load services whenever active category changes
  const loadServices = useCallback((categoryId: string) => {
    setLoadingSvcs(true);
    getServices({ category: categoryId, size: 50 })
      .then((res) => setServices(res.content))
      .catch(() => setServices([]))
      .finally(() => setLoadingSvcs(false));
  }, []);

  useEffect(() => {
    if (activeId) loadServices(activeId);
  }, [activeId, loadServices]);

  const activeCategory = categories.find((c) => c.id === activeId);

  function openQuickView(cat: ApiCategory, svcs: ApiService[]) {
    setQuickView({
      category: { id: cat.id, name: cat.name, description: cat.description, meta: getMeta(cat.slug) },
      services: svcs,
    });
  }

  return (
    <>
      <section className="section bg-cream" id="services-preview">
        <div className="container">
          <FadeIn>
            <SectionHeader
              label="What We Offer"
              title="Our Signature Services"
              subtitle="Explore our most-loved treatments, crafted to bring out your natural beauty"
            />
          </FadeIn>

          {/* ── Category tabs ───────────────────────────────── */}
          {!loadingCats && (
            <FadeIn>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 30, scrollbarWidth: "none" }}>
                {categories.map((cat) => {
                  const active = activeId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveId(cat.id)}
                      className={`chip-toggle shrink-0 px-5 py-[9px] ${
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
            </FadeIn>
          )}

          {/* ── Service cards ───────────────────────────────── */}
          {loadingSvcs ? (
            <div style={{ display: "flex", gap: 20 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="soft-pulse"
                  style={{
                    width: 260,
                    height: 360,
                    borderRadius: 20,
                    background: "#f0e4d4",
                    flexShrink: 0,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="card-rail">
              <div className="card-rail-track">
                {services.map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    svc={svc}
                    category={activeCategory!}
                    onQuickView={() => openQuickView(activeCategory!, services)}
                  />
                ))}
              </div>
            </div>
          )}

          <FadeIn>
            <div className="motion-fade-up" style={{ marginTop: 40, textAlign: "center" }}>
              <Link href="/services" className="btn btn-primary">
                View Full Service Menu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ServiceQuickView
        isOpen={!!quickView}
        onClose={() => setQuickView(null)}
        category={quickView?.category ?? null}
        services={quickView?.services ?? []}
      />
    </>
  );
}

/* ── Service card ────────────────────────────────────────────── */
function ServiceCard({
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
    <div
      className="group motion-fade-up surface-card relative h-[360px] w-[260px] shrink-0 overflow-hidden rounded-spa-lg border-0"
    >
      <div
        style={{ position: "absolute", inset: 0, background: meta.gradient }}
        className="scale-100 will-change-transform transition-transform duration-700 ease-smooth group-hover:scale-[1.08]"
      >
        <Image src={bg} alt={svc.name} fill style={{ objectFit: "cover", opacity: 0.65 }} unoptimized />
      </div>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "18px 20px 22px" }}>
        <div style={{ marginTop: "auto" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: 4, lineHeight: 1.3, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            {svc.name}
          </h3>
          <p className="mb-2 line-clamp-2 text-[0.74rem] leading-relaxed text-white/80">
            {svc.description ?? 'Your skin and body reset, tailored by our specialists.'}
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1rem", color: "#edd9b8", marginBottom: 18 }}>
            {formatPrice(svc)}
          </p>

          <div
            className="flex gap-2 transition-all duration-300 ease-out max-md:translate-y-0 max-md:opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <Link
              href={bookHref}
              className="flex-1 rounded-full bg-linear-to-br from-gold-dark to-gold py-[10px] text-center text-[0.78rem] font-bold tracking-[0.4px] text-white transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Now
            </Link>
            <button
              onClick={onQuickView}
              aria-label="Open quick view"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-[6px] transition-all duration-200 hover:scale-105 hover:bg-white/30 active:scale-95"
            >
              <HIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
