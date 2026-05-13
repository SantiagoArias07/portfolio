"use client";
import { useEffect } from "react";

const FLAG = "__sap_console_signature_shown__";

export function ConsoleSignature() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w[FLAG]) return;
      w[FLAG] = true;

      const ascii = [
        "  ███████╗  █████╗  ██████╗ ",
        "  ██╔════╝ ██╔══██╗ ██╔══██╗",
        "  ███████╗ ███████║ ██████╔╝",
        "  ╚════██║ ██╔══██║ ██╔═══╝ ",
        "  ███████║ ██║  ██║ ██║     ",
        "  ╚══════╝ ╚═╝  ╚═╝ ╚═╝     ",
      ].join("\n");

      const s = {
        ascii:   "color:#6b6b6b;font-family:monospace;font-size:11px;line-height:1.2;",
        heading: "color:#ededed;font-family:-apple-system,system-ui,sans-serif;font-size:14px;font-weight:600;padding:6px 0;",
        body:    "color:#a1a1a1;font-family:-apple-system,system-ui,sans-serif;font-size:12px;line-height:1.5;",
        accent:  "color:#00ff88;font-family:monospace;font-size:12px;",
        muted:   "color:#6b6b6b;font-family:monospace;font-size:11px;padding-top:4px;",
      };

      console.log("%c" + ascii, s.ascii);
      console.log("%cLooking for full-stack engineers?", s.heading);
      console.log("%cYou found one.", s.body);
      console.log("");
      console.log("%c→ %csantiago.ariasp.dev@gmail.com", s.accent, s.body);
      console.log("%c→ %cgithub.com/SantiagoArias07", s.accent, s.body);
      console.log("%c→ %clinkedin.com/in/santiago-arias-paul-49992b2b0", s.accent, s.body);
      console.log("");
      console.log("%cBuilt with Next.js, R3F, Tailwind v4, Framer Motion.", s.muted);
      console.log("%cIf you’re reading this, you have good instincts. Let’s talk.", s.muted);
    } catch {
      // Silently fail — console signature should never break the app
    }
  }, []);

  return null;
}
