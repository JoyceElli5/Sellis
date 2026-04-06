"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import type { ServiceCategoryData } from "@/data/services";
import ServiceQuickView from "@/components/services/ServiceQuickView";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/home/CtaSection";

const categories = Object.values(servicesData);

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const [quickViewCat, setQuickViewCat] = useState<ServiceCategoryData | null>(null);

  const activeCategory = categories.find((c) => c.id === activeId)!;

  const services = activeCategory.services
    ? activeCategory.services.map((s) => ({ ...s, subcategory: undefined }))
    : Object.values(activeCategory.subcategories ?? {}).flatMap((sub) =>
        sub.services.map((s) => ({ ...s, subcategory: sub.label }))
      );

  return (
    <main>
      <Navbar />

      {/* ── Page hero ──────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: "calc(var(--nav-height) + 64px)",
          paddingBottom: 72,
          textAlign: "center",
          background: "linear-gradient(150deg,#1a0e09_0%,#3D2B1F_35%,#7A5040_65%,#C9A870_100%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1733342654514-820af792c969?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D')` }}
          aria-hidden
        />
        <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden />
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-br from-[rgba(26,14,9,0.7)] via-[rgba(61,43,31,0.5)] to-[rgba(168,134,90,0.2)]"
          aria-hidden
        />

        <div style={{ position: "relative", zIndex: 4, padding: "0 24px" }}>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#e2c598",
              display: "block",
              marginBottom: 10,
            }}
          >
            Sellis Beauty Spa
          </span>
          <h1
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 14px",
              textShadow: "0 2px 14px rgba(0,0,0,0.45)",
            }}
          >
            Our Services &amp; Pricing
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Browse our full menu of luxury beauty treatments. Every price includes expert care and premium products.
          </p>
        </div>
      </div>

      {/* ── Sticky category tabs ───────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: "var(--nav-height)",
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #f0e4d4",
          boxShadow: "0 2px 8px rgba(44,24,16,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            gap: 8,
            overflowX: "auto",
            scrollbarWidth: "none",
            justifyContent: "center",
            flexWrap: "wrap",
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
                  padding: "8px 20px",
                  borderRadius: 50,
                  border: active ? "none" : "1.5px solid #f0e4d4",
                  background: active
                    ? "linear-gradient(135deg, #a8865a, #c9a870)"
                    : "transparent",
                  color: active ? "#fff" : "#6b4c3b",
                  fontWeight: 700,
                  fontSize: "0.76rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: active ? "0 4px 14px rgba(168,134,90,0.35)" : "none",
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Service cards ──────────────────────────────────── */}
      <section
        style={{
          padding: "52px 24px 72px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Category heading */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: activeCategory.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
          </div>
          <div>
            <span
              style={{
                fontSize: "0.66rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#a8865a",
                display: "block",
                marginBottom: 2,
              }}
            >
              Our Services
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#2c1810",
                margin: 0,
              }}
            >
              {activeCategory.title}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#6b4c3b", marginTop: 4 }}>
              {activeCategory.description}
            </p>
          </div>
        </div>

        {/* Horizontal scroll of service cards */}
        <div
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              minWidth: "max-content",
            }}
          >
            {services.map((svc, i) => (
              <PageServiceCard
                key={`${activeId}-${svc.name}-${i}`}
                name={svc.name}
                price={svc.price}
                image={svc.image}
                note={svc.note}
                subcategory={svc.subcategory}
                category={activeCategory}
                onQuickView={() => setQuickViewCat(activeCategory)}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Found Something You Love?"
        subtext="Book your appointment in minutes — we'll confirm via WhatsApp."
      />

      <Footer />

      <ServiceQuickView
        isOpen={!!quickViewCat}
        onClose={() => setQuickViewCat(null)}
        category={quickViewCat}
      />
    </main>
  );
}

/* ── Service card for the services page ─────────────────────── */
function PageServiceCard({
  name,
  price,
  image,
  note,
  subcategory,
  category,
  onQuickView,
}: {
  name: string;
  price: string;
  image: string;
  note?: string;
  subcategory?: string;
  category: ServiceCategoryData;
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

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
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
          padding: "18px 20px 22px",
        }}
      >
        {/* Subcategory badge (if applicable) */}
        {subcategory && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: "0.66rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {subcategory}
          </div>
        )}

        {/* Name + price */}
        <div style={{ marginTop: "auto" }}>
          <h3
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 4,
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {name}
          </h3>
          {note && (
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", marginBottom: 4, fontStyle: "italic" }}>
              {note}
            </p>
          )}
          <p
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#edd9b8",
              marginBottom: 18,
            }}
          >
            {price}
          </p>

          {/* Two buttons */}
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
              }}
            >
              Book Now
            </Link>
            <button
              onClick={onQuickView}
              aria-label="View all services in this category"
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
              }}
            >
              ⓘ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
