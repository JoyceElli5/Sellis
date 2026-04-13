"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import type { ServiceCategoryData } from "@/data/services";
import ServiceQuickView, { type QuickViewSelection } from "@/components/services/ServiceQuickView";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeIn from "@/components/ui/FadeIn";
import HIcon from "@/components/ui/HIcon";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

const categories = Object.values(servicesData);

export default function FeaturedServices() {
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const [quickView, setQuickView] = useState<QuickViewSelection | null>(null);

  const activeCategories = categories.filter((c) => c.id === activeId);

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
          <FadeIn>
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 4,
                marginBottom: 36,
                scrollbarWidth: "none",
              }}
            >
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
                      background: active
                        ? "linear-gradient(135deg, #a8865a, #c9a870)"
                        : "transparent",
                      color: active ? "#fff" : "#6b4c3b",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: active
                        ? "0 4px 14px rgba(168,134,90,0.35)"
                        : "none",
                    }}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ── Service cards for active category ───────────── */}
          <div
            style={{
              overflowX: "auto",
              scrollbarWidth: "none",
              paddingBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                minWidth: "max-content",
              }}
            >
              {activeCategories.map((cat) => {
                const services = cat.services
                  ? cat.services
                  : Object.values(cat.subcategories ?? {}).flatMap((s) => s.services);

                return services.map((svc, i) => (
                  <ServiceCard
                    key={`${cat.id}-${svc.name}-${i}`}
                    name={svc.name}
                    price={svc.price}
                    image={svc.image}
                    category={cat}
                    subcategory={
                      cat.subcategories
                        ? Object.values(cat.subcategories).find((sub) =>
                            sub.services.some((s) => s.name === svc.name)
                          )?.label
                        : undefined
                    }
                    onQuickView={() =>
                      setQuickView({
                        category: {
                          id: cat.id,
                          title: cat.title,
                          description: cat.description,
                          gradient: cat.gradient,
                          coverImage: cat.coverImage,
                        },
                        service: svc,
                        subcategory: cat.subcategories
                          ? Object.values(cat.subcategories).find((sub) =>
                              sub.services.some((s) => s.name === svc.name)
                            )?.label
                          : undefined,
                      })
                    }
                  />
                ));
              })}
            </div>
          </div>

          {/* ── Footer link ─────────────────────────────────── */}
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
        selection={quickView}
      />
    </>
  );
}

/* ── Individual service card ─────────────────────────────────── */
function ServiceCard({
  name,
  price,
  image,
  category,
  subcategory,
  onQuickView,
}: {
  name: string;
  price: string;
  image: string;
  category: ServiceCategoryData;
  subcategory?: string;
  onQuickView: () => void;
}) {
  const bookValue = subcategory
    ? `${category.title} › ${subcategory} › ${name}`
    : `${category.title} › ${name}`;
  const bookHref = `/booking?service=${encodeURIComponent(bookValue)}`;

  return (
    <div
      className="group"
      style={{
        position: "relative",
        width: 260,
        height: 360,
        borderRadius: 20,
        overflow: "hidden",
        flexShrink: 0,
        cursor: "default",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: category.gradient,
          transition: "transform 0.5s ease",
        }}
        className="group-hover:scale-105"
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover", opacity: 0.65 }}
          unoptimized
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px 20px 22px",
        }}
      >
        {/* Category badge */}
        <div
          style={{
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {category.title}
        </div>

        {/* Service name + price */}
        <div style={{ marginTop: "auto" }}>
          <h3
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 6,
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#edd9b8",
              marginBottom: 18,
              fontFamily: "var(--font-playfair, serif)",
            }}
          >
            {price}
          </p>

          {/* Two buttons — slide up on hover */}
          <div
            className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ display: "flex", gap: 8, transition: "all 0.3s ease" }}
          >
            <Link
              href={bookHref}
              style={{
                flex: 1,
                textAlign: "center",
                background: "linear-gradient(135deg, #a8865a, #c9a870)",
                color: "#fff",
                padding: "10px 0",
                borderRadius: 50,
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.4px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Book Now
            </Link>
            <button
              onClick={onQuickView}
              aria-label="Quick view"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              <HIcon icon={InformationCircleIcon} size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
