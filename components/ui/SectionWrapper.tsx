"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface SectionWrapperProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  label,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setTyped(label);
      return;
    }
    setStarted(true);
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(label.slice(0, i));
      if (i >= label.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [isInView, label, reduced]);

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6 lg:px-8 xl:max-w-6xl">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <div className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest mb-3 h-4">
            {typed}
            {started && typed.length < label.length && !reduced && (
              <span
                className="inline-block w-[1ch]"
                style={{ animation: "cursor-blink 0.7s step-end infinite" }}
              >
                _
              </span>
            )}
          </div>
          <motion.div
            className="h-px bg-[var(--accent)] origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: reduced ? 0 : 0.15,
            }}
          />
        </div>

        {children}
      </div>
    </section>
  );
}
