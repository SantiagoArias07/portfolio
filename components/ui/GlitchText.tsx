"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type GlitchTrigger = "mount" | "periodic" | "inview";

interface GlitchTextProps {
  text: string;
  trigger?: GlitchTrigger;
  active?: boolean;
  className?: string;
}

export function GlitchText({
  text,
  trigger = "periodic",
  active = false,
  className = "",
}: GlitchTextProps) {
  const reduced = useReducedMotion();
  const [glitching, setGlitching] = useState(trigger === "mount");

  useEffect(() => {
    if (reduced) return;

    if (trigger === "mount") {
      const t = setTimeout(() => setGlitching(false), 800);
      return () => clearTimeout(t);
    }

    if (trigger === "periodic") {
      let timeout: ReturnType<typeof setTimeout>;
      const schedule = () => {
        const delay = 4000 + Math.random() * 6000;
        timeout = setTimeout(() => {
          setGlitching(true);
          setTimeout(() => {
            setGlitching(false);
            schedule();
          }, 600);
        }, delay);
      };
      schedule();
      return () => clearTimeout(timeout);
    }

    if (trigger === "inview") {
      if (active) {
        setGlitching(true);
        const t = setTimeout(() => setGlitching(false), 800);
        return () => clearTimeout(t);
      }
    }
  }, [reduced, trigger, active]);

  const isActive = !reduced && glitching;

  return (
    <span
      className={`${isActive ? "glitch-active" : ""} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}
