"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DEFAULT_MESSAGE = "Shop open 7 AM – 10 PM daily • Book your appointment today";

export interface BannerConfig {
  enabled: boolean;
  message: string;
}

export default function DeliveryBanner() {
  const pathname = usePathname();
  const [config, setConfig] = useState<BannerConfig>({
    enabled: true,
    message: DEFAULT_MESSAGE,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("sellis_banner");
      if (stored) {
        setConfig(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  if (pathname?.startsWith("/admin")) return null;
  if (!mounted || !config.enabled || !config.message.trim()) return null;

  // Duplicate the message so the marquee loops seamlessly
  const repeated = `${config.message}  •  ${config.message}  •  ${config.message}  •  ${config.message}`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#bd6325",
        color: "#fff",
        padding: "8px 0",
        overflow: "hidden",
        zIndex: 50,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        <span style={{ fontSize: "0.85rem", fontWeight: 500, paddingRight: "2rem" }}>
          {repeated}
        </span>
        {/* Duplicate for seamless loop */}
        <span style={{ fontSize: "0.85rem", fontWeight: 500, paddingRight: "2rem" }}>
          {repeated}
        </span>
      </div>
    </div>
  );
}
