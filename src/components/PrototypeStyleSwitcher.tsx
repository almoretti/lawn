"use client";

// PROTOTYPE — THROWAWAY. Floating style-direction switcher paired with
// app/prototype-styles.css. Cycles html[data-style] so five candidate visual
// systems can be judged against the real app. Dev-only; delete both files
// once a direction wins.
import { useCallback, useEffect, useState } from "react";

const STYLES: Array<{ key: string; label: string }> = [
  { key: "current", label: "Current — brutalist" },
  { key: "clean", label: "1 · Clean SaaS" },
  { key: "clinical", label: "2 · Numan Clinical" },
  { key: "dark", label: "3 · Dark Studio" },
  { key: "airy", label: "4 · Airy Editorial" },
  { key: "compact", label: "5 · Compact Pro" },
];

const STORAGE_KEY = "lawn-proto-style";

function readInitial(): string {
  if (typeof window === "undefined") return "current";
  const fromUrl = new URLSearchParams(window.location.search).get("style");
  if (fromUrl && STYLES.some((s) => s.key === fromUrl)) return fromUrl;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && STYLES.some((s) => s.key === stored)) return stored;
  return "current";
}

export function PrototypeStyleSwitcher() {
  const [styleKey, setStyleKey] = useState("current");

  useEffect(() => {
    setStyleKey(readInitial());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.style = styleKey;
    window.localStorage.setItem(STORAGE_KEY, styleKey);
  }, [styleKey]);

  const cycle = useCallback((direction: 1 | -1) => {
    setStyleKey((current) => {
      const index = STYLES.findIndex((s) => s.key === current);
      return STYLES[(index + direction + STYLES.length) % STYLES.length].key;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") cycle(-1);
      if (event.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  if (!import.meta.env.DEV) return null;

  const active = STYLES.find((s) => s.key === styleKey) ?? STYLES[0];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#111",
        color: "#fff",
        borderRadius: 999,
        padding: "8px 14px",
        fontFamily: "system-ui, sans-serif",
        fontSize: 13,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        userSelect: "none",
      }}
    >
      <button
        aria-label="Previous style"
        onClick={() => cycle(-1)}
        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
      >
        ←
      </button>
      <span style={{ minWidth: 170, textAlign: "center", fontWeight: 600 }}>{active.label}</span>
      <button
        aria-label="Next style"
        onClick={() => cycle(1)}
        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
      >
        →
      </button>
    </div>
  );
}
