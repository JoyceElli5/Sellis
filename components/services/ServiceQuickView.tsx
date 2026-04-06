"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceCategoryData } from "@/data/services";

interface ServiceQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  category: ServiceCategoryData | null;
}

export default function ServiceQuickView({ isOpen, onClose, category: incomingCategory }: ServiceQuickViewProps) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<ServiceCategoryData | null>(null);

  useEffect(() => {
    if (isOpen && incomingCategory) {
      setCategory(incomingCategory);
      // Small delay ensures the component renders off-screen before sliding in
      const t = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(t);
    } else {
      setShow(false);
      // Wait for the 0.5s CSS transition to finish before unmounting from the DOM
      const t = setTimeout(() => setCategory(null), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen, incomingCategory]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!category) return null;

  const bookHref = `/booking?service=${encodeURIComponent(category.title)}`;

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
          opacity: show ? 1 : 0,
          pointerEvents: show ? "auto" : "none",
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
          transform: show ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Category Hero */}
        <div
          style={{
            position: "relative",
            height: 180,
            flexShrink: 0,
            background: category.gradient,
            overflow: "hidden",
          }}
        >
          {category.coverImage && (
            <Image
              src={category.coverImage}
              alt={category.title}
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
            ✕
          </button>

          {/* Category label */}
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
              {category.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: "18px 22px 12px", borderBottom: "1px solid #f0e4d4" }}>
          <p style={{ fontSize: "0.88rem", color: "#6b4c3b", lineHeight: 1.6, margin: 0 }}>
            {category.description}
          </p>
        </div>

        {/* Service list — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
          {category.subcategories ? (
            Object.values(category.subcategories).map((sub) => (
              <div key={sub.label} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#a8865a",
                    marginBottom: 10,
                    padding: "4px 10px",
                    background: "#f5ede0",
                    borderRadius: 20,
                    display: "inline-block",
                  }}
                >
                  {sub.label}
                </div>
                {sub.services.map((svc) => (
                  <ServiceRow
                    key={svc.name}
                    name={svc.name}
                    price={svc.price}
                    note={svc.note}
                    bookHref={`/booking?service=${encodeURIComponent(`${category.title} › ${sub.label} › ${svc.name}`)}`}
                    onClose={onClose}
                  />
                ))}
              </div>
            ))
          ) : (
            category.services?.map((svc) => (
              <ServiceRow
                key={svc.name}
                name={svc.name}
                price={svc.price}
                note={svc.note}
                bookHref={`/booking?service=${encodeURIComponent(`${category.title} › ${svc.name}`)}`}
                onClose={onClose}
              />
            ))
          )}
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
            Book {category.title}
          </Link>
        </div>
      </div>
    </>
  );
}

/* ── Individual service row inside the drawer ─────────────────── */
function ServiceRow({
  name,
  price,
  note,
  bookHref,
  onClose,
}: {
  name: string;
  price: string;
  note?: string;
  bookHref: string;
  onClose: () => void;
}) {
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
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#2c1810" }}>{name}</div>
        {note && (
          <div style={{ fontSize: "0.72rem", color: "#9e7b68", marginTop: 2, fontStyle: "italic" }}>
            {note}
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--font-playfair, serif)",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#a8865a",
          whiteSpace: "nowrap",
        }}
      >
        {price}
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
