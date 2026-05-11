"use client";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ScrollIndicator() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2" aria-hidden>
      <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest">
        SCROLL
      </span>
      <div className="flex flex-col gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-px h-2 bg-[var(--text-tertiary)] mx-auto"
            style={
              !reduced
                ? {
                    animation: `scroll-bounce 1.4s ease-in-out ${i * 0.18}s infinite`,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
