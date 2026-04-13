"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HIcon from "@/components/ui/HIcon";
import { Cancel01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import type { ServiceCategoryData, ServiceEntry } from "@/data/services";

export type QuickViewSelection = {
  category: Pick<ServiceCategoryData, "id" | "title" | "description" | "gradient" | "coverImage">;
  service: ServiceEntry;
  subcategory?: string;
};

interface ServiceQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  selection: QuickViewSelection | null;
}

export default function ServiceQuickView({ isOpen, onClose, selection }: ServiceQuickViewProps) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!selection) return null;

  const { category, service, subcategory } = selection;
  const bookingValue = subcategory
    ? `${category.title} › ${subcategory} › ${service.name}`
    : `${category.title} › ${service.name}`;
  const bookHref = `/booking?service=${encodeURIComponent(bookingValue)}`;

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
        data-open={isOpen ? "true" : "false"}
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
          transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      >
        {/* Header / Hero */}
        <div
          style={{
            position: "relative",
            height: 200,
            flexShrink: 0,
            background: category.gradient,
            overflow: "hidden",
          }}
        >
          {(service.image || category.coverImage) && (
            <Image
              src={service.image || category.coverImage || ""}
              alt={service.name}
              fill
              style={{ objectFit: "cover", opacity: 0.7 }}
              unoptimized
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
            }}
          />

          {/* Close button */}
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
            <HIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
          </button>

          <div className="sqv-stagger" style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}>
            {subcategory && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 10,
                }}
              >
                {subcategory}
              </div>
            )}
            <h2
              style={{
                color: "#fff",
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "1.45rem",
                fontWeight: 700,
                margin: 0,
                textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                lineHeight: 1.2,
              }}
            >
              {service.name}
            </h2>
            <div
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.82rem", fontWeight: 600 }}>
                {category.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#edd9b8",
                  whiteSpace: "nowrap",
                }}
              >
                {service.price}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
          <div
            className="sqv-stagger"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "14px 14px",
              borderRadius: 12,
              background: "#faf5ef",
              border: "1px solid #f0e4d4",
              marginBottom: 14,
            }}
          >
            <div style={{ marginTop: 1, color: "#a8865a" }}>
              <HIcon icon={InformationCircleIcon} size={18} strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "0.86rem", color: "#6b4c3b", lineHeight: 1.6, margin: 0 }}>
              {category.description}
            </p>
          </div>

          {service.note && (
            <div
              className="sqv-stagger"
              style={{
                fontSize: "0.84rem",
                color: "#6b4c3b",
                lineHeight: 1.7,
                borderLeft: "3px solid #c9a870",
                paddingLeft: 12,
                marginTop: 8,
              }}
            >
              <span style={{ fontWeight: 700, color: "#2c1810" }}>Note:</span> {service.note}
            </div>
          )}

          <div className="sqv-stagger" style={{ marginTop: 18 }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#a8865a",
                marginBottom: 10,
              }}
            >
              Quick details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              <div
                style={{
                  border: "1px solid #f0e4d4",
                  borderRadius: 12,
                  padding: "12px 14px",
                  background: "#fff",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#9e7b68", fontWeight: 700 }}>Category</div>
                <div style={{ marginTop: 2, fontSize: "0.92rem", color: "#2c1810", fontWeight: 700 }}>
                  {category.title}
                </div>
              </div>
              {subcategory && (
                <div
                  style={{
                    border: "1px solid #f0e4d4",
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: "#fff",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#9e7b68", fontWeight: 700 }}>Subcategory</div>
                  <div style={{ marginTop: 2, fontSize: "0.92rem", color: "#2c1810", fontWeight: 700 }}>
                    {subcategory}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            padding: "18px 22px",
            borderTop: "1px solid #f0e4d4",
            background: "#fff",
          }}
        >
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
              transition: "opacity 0.2s",
            }}
          >
            Book this service
          </Link>
        </div>
      </div>

      <style>{`
        [data-open="true"] .sqv-stagger {
          animation: sqv-stagger-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes sqv-stagger-in {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { scroll-behavior: auto !important; }
        }
      `}</style>
    </>
  );
}
