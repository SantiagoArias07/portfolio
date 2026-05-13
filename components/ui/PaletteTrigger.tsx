"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function PaletteTrigger() {
  const reduced = useReducedMotion();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("command-palette-open"));
  };

  const transition = reduced ? "none" : "all 200ms ease-out";

  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={openPalette}
      className="fixed bottom-14 right-4 md:bottom-16 md:right-6 z-50 inline-flex items-center select-none"
      style={{
        padding: "0.5rem 0.75rem",
        background: "rgba(17, 17, 17, 0.8)",
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        transition,
        outline: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--accent)";
        el.style.background = "var(--bg-overlay)";
        if (!reduced) el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border)";
        el.style.background = "rgba(17, 17, 17, 0.8)";
        el.style.transform = "translateY(0)";
      }}
      onMouseDown={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.background = "var(--accent-dim)";
      }}
      onMouseUp={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--bg-overlay)";
        if (!reduced) el.style.transform = "translateY(-1px)";
      }}
      onFocus={(e) => {
        const el = e.currentTarget;
        el.style.outline = "2px solid var(--accent)";
        el.style.outlineOffset = "2px";
        el.style.borderColor = "var(--accent)";
        el.style.background = "var(--bg-overlay)";
        if (!reduced) el.style.transform = "translateY(-1px)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget;
        el.style.outline = "none";
        el.style.borderColor = "var(--border)";
        el.style.background = "rgba(17, 17, 17, 0.8)";
        el.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          color: "var(--text-secondary)",
          transition,
        }}
      >
        {isMac ? "⌘K" : "Ctrl K"}
      </span>
    </button>
  );
}
