"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../component/AdminLayout";
import {
  adminGetCategories,
  adminGetServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/api/admin";
import { formatPrice } from "@/lib/api/types";
import type { ApiCategory, ApiService, ServicePayload } from "@/lib/api/types";
import HIcon from '@/components/ui/HIcon';
import { Delete02Icon } from '@hugeicons/core-free-icons';

const emptyPayload: ServicePayload = {
  name: "",
  categoryId: "",
  description: "",
  price: undefined,
  imageUrl: "",
};

export default function AdminServicesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeCatId, setActiveCatId] = useState<string>("");
  const [services, setServices] = useState<ApiService[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingSvcs, setLoadingSvcs] = useState(false);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<ApiService | null>(null);
  const [form, setForm] = useState<ServicePayload>(emptyPayload);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    adminGetCategories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) setActiveCatId(cats[0].id);
      })
      .finally(() => setLoadingCats(false));
  }, []);

  const loadServices = useCallback((catId: string) => {
    setLoadingSvcs(true);
    adminGetServices({ category: catId, size: 100 })
      .then((res) => setServices(res.content))
      .catch(() => setServices([]))
      .finally(() => setLoadingSvcs(false));
  }, []);

  useEffect(() => {
    if (activeCatId) loadServices(activeCatId);
  }, [activeCatId, loadServices]);

  function openCreate() {
    setForm({ ...emptyPayload, categoryId: activeCatId });
    setEditTarget(null);
    setFormError("");
    setModal("create");
  }

  function openEdit(svc: ApiService) {
    setForm({
      name: svc.name,
      categoryId: svc.categoryId,
      description: svc.description ?? "",
      price: svc.price ?? undefined,
      imageUrl: svc.imageUrl ?? "",
    });
    setEditTarget(svc);
    setFormError("");
    setModal("edit");
  }

  async function handleSave() {
    setFormError("");
    if (!form.name.trim()) { setFormError("Name is required."); return; }
    if (!form.categoryId) { setFormError("Category is required."); return; }
    setSaving(true);
    try {
      const payload: ServicePayload = {
        ...form,
        price: form.price ? Number(form.price) : undefined,
        description: form.description || undefined,
        imageUrl: form.imageUrl || undefined,
      };
      if (modal === "edit" && editTarget) {
        await updateService(editTarget.id, payload);
      } else {
        await createService(payload);
      }
      setModal(null);
      loadServices(activeCatId);
    } catch {
      setFormError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteService(deleteId);
      setDeleteId(null);
      loadServices(activeCatId);
    } catch {
      // ignore
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminLayout>
      {/* ── Category tabs ──────────────────────────────────── */}
      {!loadingCats && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {categories.map((cat) => {
            const active = activeCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 50,
                  border: active ? "none" : "1.5px solid #f0e4d4",
                  background: active ? "linear-gradient(135deg, #a8865a, #c9a870)" : "#fff",
                  color: active ? "#fff" : "#6b4c3b",
                  fontWeight: 700,
                  fontSize: "0.76rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: active ? "0 4px 14px rgba(168,134,90,0.3)" : "none",
                }}
              >
                {cat.name}
              </button>
            );
          })}
          <button
            onClick={openCreate}
            style={{
              marginLeft: "auto",
              padding: "8px 20px",
              borderRadius: 50,
              border: "none",
              background: "#2c1810",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.76rem",
              letterSpacing: "0.8px",
              cursor: "pointer",
            }}
          >
            + Add Service
          </button>
        </div>
      )}

      {/* ── Services table ─────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(44,24,16,0.07)",
          overflow: "hidden",
        }}
      >
        {loadingSvcs ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9e7b68", fontSize: "0.9rem" }}>
            Loading…
          </div>
        ) : services.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9e7b68", fontSize: "0.9rem" }}>
            No services in this category yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0e4d4" }}>
                {["Name", "Price", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 18px",
                      textAlign: "left",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "#9e7b68",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc, i) => (
                <tr
                  key={svc.id}
                  style={{
                    borderBottom: i < services.length - 1 ? "1px solid #f5ede0" : "none",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#2c1810" }}>
                      {svc.name}
                    </div>
                    {svc.description && (
                      <div style={{ fontSize: "0.75rem", color: "#9e7b68", marginTop: 2 }}>
                        {svc.description.slice(0, 60)}{svc.description.length > 60 ? "…" : ""}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "0.88rem", fontWeight: 600, color: "#a8865a", whiteSpace: "nowrap" }}>
                    {formatPrice(svc)}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        background: svc.active ? "#dcfce7" : "#fee2e2",
                        color: svc.active ? "#166534" : "#991b1b",
                      }}
                    >
                      {svc.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => openEdit(svc)}
                        style={btnStyle("edit")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(svc.id)}
                        style={btnStyle("delete")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Create / Edit modal ────────────────────────────── */}
      {modal && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#2c1810",
                margin: "0 0 20px",
              }}
            >
              {modal === "edit" ? "Edit Service" : "New Service"}
            </h2>

            {formError && (
              <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 8, background: "#fef2f2", border: "1px solid #fca5a5", fontSize: "0.82rem", color: "#991b1b" }}>
                {formError}
              </div>
            )}

            <div style={{ display: "grid", gap: 14 }}>
              <Field label="Service Name *">
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Deep Tissue Massage"
                  style={inputStyle}
                />
              </Field>

              <Field label="Category *">
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  style={inputStyle}
                >
                  <option value="" disabled>Select category…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>

              <Field label="Price (GH₵)">
                <input
                  type="number"
                  min={0}
                  value={form.price ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="Leave blank if price varies"
                  style={inputStyle}
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short description…"
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </Field>

              <Field label="Image URL">
                <input
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://…"
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={btnStyle("cancel")}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} style={btnStyle("save")}>
                {saving ? "Saving…" : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm modal ───────────────────────────── */}
      {deleteId && (
        <div style={overlayStyle} onClick={() => setDeleteId(null)}>
          <div style={{ ...modalStyle, maxWidth: 380, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
              <HIcon icon={Delete02Icon} size={36} strokeWidth={1.8} className="text-red-600" />
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.1rem", fontWeight: 700, color: "#2c1810", margin: "0 0 10px" }}>
              Delete Service?
            </h2>
            <p style={{ fontSize: "0.86rem", color: "#6b4c3b", marginBottom: 22 }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={btnStyle("cancel")}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} style={btnStyle("danger")}>
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

/* ── Helpers ──────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "#6b4c3b",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 13px",
  borderRadius: 8,
  border: "1.5px solid #f0e4d4",
  background: "#faf5ef",
  fontSize: "0.88rem",
  color: "#2c1810",
  outline: "none",
  boxSizing: "border-box",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(44,24,16,0.5)",
  zIndex: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  background: "#fff",
  borderRadius: 16,
  padding: "32px 28px",
  boxShadow: "0 20px 60px rgba(44,24,16,0.2)",
  maxHeight: "90vh",
  overflowY: "auto",
};

function btnStyle(type: "edit" | "delete" | "save" | "cancel" | "danger"): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    fontWeight: 700,
    fontSize: "0.78rem",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.4px",
  };
  if (type === "edit")   return { ...base, background: "#f0e4d4", color: "#6b4c3b" };
  if (type === "delete") return { ...base, background: "#fef2f2", color: "#991b1b" };
  if (type === "save")   return { ...base, background: "linear-gradient(135deg, #a8865a, #c9a870)", color: "#fff", padding: "10px 24px" };
  if (type === "cancel") return { ...base, background: "#f0e4d4", color: "#6b4c3b", padding: "10px 20px" };
  if (type === "danger") return { ...base, background: "#dc2626", color: "#fff", padding: "10px 20px" };
  return base;
}
