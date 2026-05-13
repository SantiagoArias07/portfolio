"use client";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

export function HUD() {
  const [time, setTime] = useState("");
  const scroll = useScrollProgress();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pct = `${Math.round(scroll * 100).toString().padStart(3, "0")}%`;

  return (
    <>
      {/* Top-left */}
      <div
        className="fixed top-5 left-6 z-50 hidden lg:flex flex-col gap-0.5 pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          SAP.DEV // v1.0.0
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          STATUS:{" "}
          <span className="text-[var(--accent)]">ONLINE</span>
        </span>
      </div>

      {/* Top-right */}
      <div
        className="fixed top-5 right-6 z-50 hidden lg:flex flex-col gap-0.5 items-end pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider tabular-nums">
          {time}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          25.6866° N, 100.3161° W
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          MONTERREY, MX
        </span>
      </div>

      {/* Bottom-right: scroll % + ⌘K hint */}
      <div
        className="fixed bottom-5 right-6 z-50 hidden lg:flex flex-col items-end gap-1 select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider tabular-nums pointer-events-none">
          SCROLL {pct}
        </span>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("command-palette-open"))}
          className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider opacity-50 hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
          title="Open command palette"
        >
          ⌘K
        </button>
      </div>

      {/* Bottom-left */}
      <div
        className="fixed bottom-5 left-6 z-50 hidden lg:block pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          BUILT WITH NEXT.JS + R3F
        </span>
      </div>
    </>
  );
}
