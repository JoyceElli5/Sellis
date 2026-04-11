"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ApiService } from "@/lib/api/types";
import { formatPrice } from "@/lib/api/types";
import type { CategoryMeta } from "@/lib/categoryMeta";

export interface QuickViewCategory {
  id: string;
  name: string;
  description: string | null;
  meta: CategoryMeta;
}

interface ServiceQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  category: QuickViewCategory | null;
  services: ApiService[];
}

export default function ServiceQuickView({
  isOpen,
  onClose,
  category,
  services,
}: ServiceQuickViewProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!category) return null;

  const bookHref = `/booking?service=${encodeURIComponent(category.name)}`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(44,24,16,0.55)",
          zIndex: 400,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 440,
          background: "#fff",
          zIndex: 401,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(44,24,16,0.18)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Hero */}
        <div
          style={{
            position: "relative",
            height: 180,
            flexShrink: 0,
            background: category.meta.gradient,
            overflow: "hidden",
          }}
        >
          <Image
            src={category.meta.coverImage}
            alt={category.name}
            fill
            style={{ objectFit: "cover", opacity: 0.7 }}
            unoptimized
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
            }}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          <div style={{ position: "absolute", bottom: 18, left: 20 }}>
            <h2
              style={{
                color: "#fff",
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "1.35rem",
                fontWeight: 700,
                margin: 0,
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              {category.name}
            </h2>
          </div>
        </div>

        {/* Description */}
        {category.description && (
          <div style={{ padding: "18px 22px 12px", borderBottom: "1px solid #f0e4d4" }}>
            <p style={{ fontSize: "0.88rem", color: "#6b4c3b", lineHeight: 1.6, margin: 0 }}>
              {category.description}
            </p>
          </div>
        )}

        {/* Service list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
          {services.length === 0 ? (
            <p style={{ color: "#9e7b68", fontSize: "0.88rem", textAlign: "center", marginTop: 24 }}>
              No services found.
            </p>
          ) : (
            services.map((svc) => (
              <ServiceRow
                key={svc.id}
                svc={svc}
                categoryName={category.name}
                onClose={onClose}
              />
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: "18px 22px", borderTop: "1px solid #f0e4d4", background: "#fff" }}>
          <Link
            href={bookHref}
            onClick={onClose}
            style={{
              display: "block",
              textAlign: "center",
              background: "linear-gradient(135deg, #a8865a, #c9a870)",
              color: "#fff",
              padding: "13px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: "0.92rem",
              letterSpacing: "0.4px",
              textDecoration: "none",
            }}
          >
            Book {category.name}
          </Link>
        </div>
      </div>
    </>
  );
}

function ServiceRow({
  svc,
  categoryName,
  onClose,
}: {
  svc: ApiService;
  categoryName: string;
  onClose: () => void;
}) {
  const bookHref = `/booking?service=${encodeURIComponent(`${categoryName} › ${svc.name}`)}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 0",
        borderBottom: "1px solid #f5ede0",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#2c1810" }}>{svc.name}</div>
        {svc.hasVariants && svc.variants.length > 0 && (
          <div style={{ fontSize: "0.72rem", color: "#9e7b68", marginTop: 2 }}>
            {svc.variants.map((v) => `${v.name}: GH₵ ${v.price}`).join(" · ")}
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--font-playfair, serif)",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "#a8865a",
          whiteSpace: "nowrap",
        }}
      >
        {formatPrice(svc)}
      </div>
      <Link
        href={bookHref}
        onClick={onClose}
        style={{
          background: "linear-gradient(135deg, #a8865a, #c9a870)",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: 20,
          fontSize: "0.68rem",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Book
      </Link>
    </div>
  );
}
