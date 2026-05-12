"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface ModalConfig {
  enabled: boolean;
  imageUrl: string;
  title: string;
  body: string;
  ctaText: string;
  ctaLink: string;
}

export default function AnnouncementModal() {
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sellis_announcement");
      if (!stored) return;

      const cfg: ModalConfig = JSON.parse(stored);
      if (!cfg.enabled) return;

      // Show once per session
      const dismissed = sessionStorage.getItem("sellis_modal_dismissed");
      if (dismissed) return;

      setConfig(cfg);
      // Small delay so the page loads first
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    } catch {
      // ignore
    }
  }, []);

  function close() {
    setVisible(false);
    sessionStorage.setItem("sellis_modal_dismissed", "1");
  }

  if (!visible || !config) return null;

  const hasImage = config.imageUrl?.trim();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(44,24,16,0.65)",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          animation: "fadeIn 0.25s ease",
        }}
      >
        {/* Modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            maxWidth: 480,
            width: "100%",
            boxShadow: "0 20px 60px rgba(44,24,16,0.3)",
            animation: "slideUp 0.3s ease",
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close announcement"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.45)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              lineHeight: 1,
              zIndex: 10,
              fontWeight: 700,
            }}
          >
            ✕
          </button>

          {/* Image */}
          {hasImage && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image
                src={config.imageUrl}
                alt={config.title || "Announcement"}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          )}

          {/* Content */}
          <div style={{ padding: "28px 28px 24px" }}>
            {config.title && (
              <h2
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#2c1810",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {config.title}
              </h2>
            )}

            {config.body && (
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#6b4c3b",
                  lineHeight: 1.65,
                  marginBottom: config.ctaText ? 22 : 0,
                  whiteSpace: "pre-line",
                }}
              >
                {config.body}
              </p>
            )}

            {config.ctaText && (
              <a
                href={config.ctaLink || "#"}
                onClick={close}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #a8865a, #c9a870)",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                {config.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </>
  );
}
