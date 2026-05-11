"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Variant = "default" | "hover" | "crosshair" | "label";

const sizes: Record<Variant, number> = {
  default: 10,
  hover: 36,
  crosshair: 44,
  label: 80,
};

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 28, stiffness: 350 });
  const y = useSpring(rawY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (reduced || isTouch) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const c = (el.dataset.cursor ?? "default") as Variant;
        setVariant(c);
        setLabel(el.dataset.cursorLabel ?? "");
        return;
      }
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, [tabindex]"
      );
      setVariant(interactive ? "hover" : "default");
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
    };
  }, [reduced, isTouch, rawX, rawY]);

  if (reduced || isTouch) return null;

  const size = sizes[variant];

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
      aria-hidden
    >
      <motion.div
        className="rounded-full bg-white flex items-center justify-center overflow-hidden"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", damping: 22, stiffness: 350 }}
      >
        {variant === "crosshair" && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="text-black"
            aria-hidden
          >
            <line x1="9" y1="0" x2="9" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
        {variant === "label" && label && (
          <span className="text-[9px] font-mono font-medium text-black px-2 leading-none whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
