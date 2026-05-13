"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login, saveToken } from "@/lib/api/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password);
      saveToken(res.token);
      router.replace("/admin");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #2c1810 0%, #6b4c3b 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 20,
          padding: "40px 36px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Image
            src="/logo.png"
            alt="Sellis Beauty Spa"
            width={56}
            height={56}
            style={{ borderRadius: 12, marginBottom: 14 }}
          />
          <h1
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#2c1810",
              margin: "0 0 4px",
            }}
          >
            Admin Login
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#9e7b68", margin: 0 }}>
            Sellis Beauty Spa
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              style={{
                marginBottom: 16,
                padding: "11px 14px",
                borderRadius: 8,
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                fontSize: "0.84rem",
                color: "#991b1b",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#6b4c3b",
                marginBottom: 7,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sellisspa.com"
              autoComplete="email"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1.5px solid #f0e4d4",
                background: "#faf5ef",
                fontSize: "0.9rem",
                color: "#2c1810",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#6b4c3b",
                marginBottom: 7,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1.5px solid #f0e4d4",
                background: "#faf5ef",
                fontSize: "0.9rem",
                color: "#2c1810",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              border: "none",
              background: loading
                ? "#d4b896"
                : "linear-gradient(135deg, #a8865a, #c9a870)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.4px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
