"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../component/AdminLayout";
import type { BannerConfig } from "@/components/DeliveryBanner";
import type { ModalConfig } from "@/components/AnnouncementModal";

const DEFAULT_BANNER: BannerConfig = {
  enabled: false,
  message: "Shop open 7 AM – 10 PM daily • Book your appointment today",
};

const DEFAULT_MODAL: ModalConfig = {
  enabled: false,
  imageUrl: "",
  title: "",
  body: "",
  ctaText: "",
  ctaLink: "",
};

/* ── Shared field styles ─────────────────────────────────────── */
const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
const label: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  color: "#6b4c3b",
};
const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #f0e4d4",
  borderRadius: 8,
  fontSize: "0.92rem",
  color: "#2c1810",
  background: "#faf5ef",
  outline: "none",
  fontFamily: "inherit",
};
const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: "28px 28px 32px",
  boxShadow: "0 2px 12px rgba(44,24,16,0.07)",
  marginBottom: 28,
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-playfair, serif)",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#2c1810",
  marginBottom: 20,
  paddingBottom: 12,
  borderBottom: "1px solid #f0e4d4",
};
const toggleRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 20,
};

export default function AnnouncementPage() {
  const [banner, setBanner] = useState<BannerConfig>(DEFAULT_BANNER);
  const [modal, setModal] = useState<ModalConfig>(DEFAULT_MODAL);
  const [bannerSaved, setBannerSaved] = useState(false);
  const [modalSaved, setModalSaved] = useState(false);

  useEffect(() => {
    try {
      const b = localStorage.getItem("sellis_banner");
      if (b) setBanner(JSON.parse(b));
      const m = localStorage.getItem("sellis_announcement");
      if (m) setModal(JSON.parse(m));
    } catch { /* ignore */ }
  }, []);

  function saveBanner() {
    localStorage.setItem("sellis_banner", JSON.stringify(banner));
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
  }

  function saveModal() {
    localStorage.setItem("sellis_announcement", JSON.stringify(modal));
    // Reset session dismiss so admin can preview it again
    sessionStorage.removeItem("sellis_modal_dismissed");
    setModalSaved(true);
    setTimeout(() => setModalSaved(false), 2500);
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 640 }}>

        {/* ── Banner ─────────────────────────────────────── */}
        <div style={card}>
          <h2 style={sectionTitle}>Announcement Banner</h2>
          <p style={{ fontSize: "0.85rem", color: "#9e7b68", marginBottom: 20, marginTop: -8 }}>
            A scrolling strip at the top of every page. Use it for hours, promos, or quick notices.
          </p>

          <div style={toggleRow}>
            <Toggle
              checked={banner.enabled}
              onChange={(v) => setBanner({ ...banner, enabled: v })}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: banner.enabled ? "#2c1810" : "#9e7b68" }}>
              {banner.enabled ? "Banner is live" : "Banner is hidden"}
            </span>
          </div>

          <div style={{ ...field, marginBottom: 20 }}>
            <span style={label}>Message</span>
            <input
              style={input}
              value={banner.message}
              onChange={(e) => setBanner({ ...banner, message: e.target.value })}
              placeholder="e.g. Shop open 7 AM – 10 PM • 20% off all facials this week!"
            />
            <span style={{ fontSize: "0.75rem", color: "#9e7b68" }}>
              Separate multiple announcements with a bullet •
            </span>
          </div>

          <SaveButton onClick={saveBanner} saved={bannerSaved} />
        </div>

        {/* ── Announcement Modal ─────────────────────────── */}
        <div style={card}>
          <h2 style={sectionTitle}>Announcement Modal</h2>
          <p style={{ fontSize: "0.85rem", color: "#9e7b68", marginBottom: 20, marginTop: -8 }}>
            A pop-up shown to visitors once per session. Great for promotions, events, or important news.
          </p>

          <div style={toggleRow}>
            <Toggle
              checked={modal.enabled}
              onChange={(v) => setModal({ ...modal, enabled: v })}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: modal.enabled ? "#2c1810" : "#9e7b68" }}>
              {modal.enabled ? "Modal is live" : "Modal is hidden"}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={field}>
              <span style={label}>Image URL</span>
              <input
                style={input}
                value={modal.imageUrl}
                onChange={(e) => setModal({ ...modal, imageUrl: e.target.value })}
                placeholder="https://example.com/promo-banner.jpg"
              />
              <span style={{ fontSize: "0.75rem", color: "#9e7b68" }}>
                Paste a full image URL. Leave blank to show a text-only modal.
              </span>
            </div>

            <div style={field}>
              <span style={label}>Title</span>
              <input
                style={input}
                value={modal.title}
                onChange={(e) => setModal({ ...modal, title: e.target.value })}
                placeholder="e.g. 30% Off All Services This Weekend!"
              />
            </div>

            <div style={field}>
              <span style={label}>Body Text</span>
              <textarea
                style={{ ...input, minHeight: 90, resize: "vertical" }}
                value={modal.body}
                onChange={(e) => setModal({ ...modal, body: e.target.value })}
                placeholder="Write a short message for your visitors..."
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={field}>
                <span style={label}>CTA Button Text</span>
                <input
                  style={input}
                  value={modal.ctaText}
                  onChange={(e) => setModal({ ...modal, ctaText: e.target.value })}
                  placeholder="e.g. Book Now"
                />
              </div>
              <div style={field}>
                <span style={label}>CTA Link</span>
                <input
                  style={input}
                  value={modal.ctaLink}
                  onChange={(e) => setModal({ ...modal, ctaLink: e.target.value })}
                  placeholder="e.g. /booking"
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
            <SaveButton onClick={saveModal} saved={modalSaved} />
            {modal.enabled && (
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "0.82rem",
                  color: "#9e7b68",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Preview on site ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#c9a870" : "#ddd",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
          display: "block",
        }}
      />
    </button>
  );
}

function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 28px",
        background: saved
          ? "linear-gradient(135deg, #5a8a5a, #7ab87a)"
          : "linear-gradient(135deg, #a8865a, #c9a870)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: "0.9rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.3s",
        letterSpacing: "0.3px",
      }}
    >
      {saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );
}
