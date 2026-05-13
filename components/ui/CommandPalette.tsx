"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Award, Briefcase, Trophy, Layers, Mail,
  ExternalLink, Download, Copy, Settings2,
} from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const EMAIL = "santiago.ariasp.dev@gmail.com";
const GITHUB = "https://github.com/SantiagoArias07";
const LINKEDIN = "https://www.linkedin.com/in/santiago-arias-paul-49992b2b0/";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement);
  else el.scrollIntoView({ behavior: "smooth" });
}

const NAV_ITEMS = [
  { id: "hero",        label: "Hero",         Icon: Home },
  { id: "about",       label: "About",        Icon: User },
  { id: "credentials", label: "Credentials",  Icon: Award },
  { id: "work",        label: "Selected Work", Icon: Briefcase },
  { id: "hackathons",  label: "Hackathons",   Icon: Trophy },
  { id: "stack",       label: "Stack",        Icon: Layers },
  { id: "contact",     label: "Contact",      Icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const reduced = useReducedMotion();
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const openPalette = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setToast("");
    setTimeout(() => lastFocusRef.current?.focus(), 60);
  }, []);

  // ─── Global keyboard shortcuts + custom event ──────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) lastFocusRef.current = document.activeElement as HTMLElement;
          else setTimeout(() => lastFocusRef.current?.focus(), 60);
          return !prev;
        });
        return;
      }
      if (e.key === "/") {
        const tag = (document.activeElement?.tagName ?? "").toLowerCase();
        const ce = (document.activeElement as HTMLElement)?.isContentEditable;
        if (["input", "textarea", "select"].includes(tag) || ce) return;
        e.preventDefault();
        openPalette();
      }
    };
    const onCustomOpen = () => openPalette();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("command-palette-open", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("command-palette-open", onCustomOpen);
    };
  }, [openPalette]);

  // ─── Actions ──────────────────────────────────────────
  const nav = (id: string) => {
    closePalette();
    setTimeout(() => scrollToSection(id), 120);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setToast("Copied!");
    setTimeout(() => { setToast(""); closePalette(); }, 1500);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    closePalette();
  };

  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = "/cv.pdf";
    a.download = "Santiago_Arias_Paul_CV.pdf";
    a.click();
    closePalette();
  };

  const toggleReducedMotion = () => {
    const current = localStorage.getItem("prefers-reduced-motion");
    const next = current === "reduce" ? "no-preference" : "reduce";
    localStorage.setItem("prefers-reduced-motion", next);
    window.dispatchEvent(new CustomEvent("reduced-motion-change", { detail: next }));
    closePalette();
  };

  // ─── Framer Motion variants ────────────────────────────
  const backdropAnim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const dialogAnim = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.96 } };
  const transition = { duration: 0.15 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex"
          style={{ alignItems: "flex-start", justifyContent: "center" }}
          role="dialog"
          aria-modal
          aria-label="Command palette"
          onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); closePalette(); } }}
          {...backdropAnim}
          transition={transition}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={closePalette}
          />

          {/* Dialog */}
          <motion.div
            className="relative w-[calc(100%-2rem)] max-w-lg rounded-xl overflow-hidden"
            style={{
              marginTop: "25vh",
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
            {...dialogAnim}
            transition={transition}
          >
            <Command label="Command palette">
              {/* Input */}
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                />
              </div>

              {/* Inline toast */}
              {toast && (
                <div
                  className="text-center py-2 font-mono text-xs tracking-wider"
                  style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                >
                  {toast}
                </div>
              )}

              {/* List */}
              <Command.List style={{ maxHeight: "60vh", overflowY: "auto", padding: "0.5rem" }}>
                <Command.Empty>No commands found</Command.Empty>

                {/* Navigation */}
                <Command.Group heading="Navigation">
                  {NAV_ITEMS.map(({ id, label, Icon }) => (
                    <Command.Item
                      key={id}
                      value={`jump to ${label}`}
                      onSelect={() => nav(id)}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={14} aria-hidden />
                        <span>Jump to {label}</span>
                      </span>
                      <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                        →
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Contact */}
                <Command.Group heading="Contact">
                  <Command.Item value="copy email to clipboard" onSelect={copyEmail}>
                    <span className="flex items-center gap-2.5">
                      <Copy size={14} aria-hidden />
                      <span>Copy email</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      ⌘C
                    </span>
                  </Command.Item>
                  <Command.Item value="open github profile" onSelect={() => openLink(GITHUB)}>
                    <span className="flex items-center gap-2.5">
                      <ExternalLink size={14} aria-hidden />
                      <span>Open GitHub</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      ↗
                    </span>
                  </Command.Item>
                  <Command.Item value="open linkedin profile" onSelect={() => openLink(LINKEDIN)}>
                    <span className="flex items-center gap-2.5">
                      <ExternalLink size={14} aria-hidden />
                      <span>Open LinkedIn</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      ↗
                    </span>
                  </Command.Item>
                  <Command.Item value="download cv resume" onSelect={downloadCV}>
                    <span className="flex items-center gap-2.5">
                      <Download size={14} aria-hidden />
                      <span>Download CV</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      ↓
                    </span>
                  </Command.Item>
                </Command.Group>

                {/* Preferences */}
                <Command.Group heading="Preferences">
                  <Command.Item value="toggle reduced motion accessibility animations" onSelect={toggleReducedMotion}>
                    <span className="flex items-center gap-2.5">
                      <Settings2 size={14} aria-hidden />
                      <span>Toggle reduced motion</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      {reduced ? "on → off" : "off → on"}
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
