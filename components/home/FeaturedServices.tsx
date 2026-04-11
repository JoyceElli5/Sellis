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
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 36, scrollbarWidth: "none" }}>
                {categories.map((cat) => {
                  const active = activeId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveId(cat.id)}
                      style={{
                        flexShrink: 0,
                        padding: "9px 20px",
                        borderRadius: 50,
                        border: active ? "none" : "1.5px solid #f0e4d4",
                        background: active ? "linear-gradient(135deg, #a8865a, #c9a870)" : "transparent",
                        color: active ? "#fff" : "#6b4c3b",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        boxShadow: active ? "0 4px 14px rgba(168,134,90,0.35)" : "none",
                      }}
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
            <div style={{ overflowX: "auto", scrollbarWidth: "none", paddingBottom: 8 }}>
              <div style={{ display: "flex", gap: 20, minWidth: "max-content" }}>
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
            <div style={{ marginTop: 40, textAlign: "center" }}>
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
      className="group"
      style={{ position: "relative", width: 260, height: 360, borderRadius: 20, overflow: "hidden", flexShrink: 0 }}
    >
      <div
        style={{ position: "absolute", inset: 0, background: meta.gradient, transition: "transform 0.5s ease" }}
        className="group-hover:scale-105"
      >
        <Image src={bg} alt={svc.name} fill style={{ objectFit: "cover", opacity: 0.65 }} unoptimized />
      </div>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "18px 20px 22px" }}>
        <div style={{ marginTop: "auto" }}>
          <h3 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: 4, lineHeight: 1.3, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            {svc.name}
          </h3>
          <p style={{ fontFamily: "var(--font-playfair, serif)", fontWeight: 700, fontSize: "1rem", color: "#edd9b8", marginBottom: 18 }}>
            {formatPrice(svc)}
          </p>

          <div
            className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ display: "flex", gap: 8, transition: "all 0.3s ease" }}
          >
            <Link
              href={bookHref}
              style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #a8865a, #c9a870)", color: "#fff", padding: "10px 0", borderRadius: 50, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.4px", textDecoration: "none" }}
            >
              Book Now
            </Link>
            <button
              onClick={onQuickView}
              aria-label="View all services"
              style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              ⓘ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
