"use client";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { GlitchText } from "@/components/ui/GlitchText";
import { ScrollIndicator } from "./ScrollIndicator";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

const GradientFallback = () => (
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, rgba(0,255,136,0.08) 0%, transparent 60%), var(--bg-base)",
    }}
  />
);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <GradientFallback /> }
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* 3D background — SSR disabled via next/dynamic */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {reduced ? <GradientFallback /> : <HeroScene />}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(10,10,10,0.55) 65%, var(--bg-base) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={container}
        initial={reduced ? "show" : "hidden"}
        animate="show"
      >
        {/* Mono label */}
        <motion.div variants={fadeUp}>
          <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-[0.3em] block mb-8">
            01 / HERO
          </span>
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          className="font-bold leading-none tracking-tight text-[var(--text-primary)] mb-6"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
          variants={fadeUp}
        >
          <GlitchText text="SANTIAGO" trigger="mount" />
          <br />
          <GlitchText text="ARIAS" trigger="periodic" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-sm sm:text-base text-[var(--text-secondary)] tracking-widest"
          variants={fadeUp}
        >
          Full-stack Engineer&nbsp;&nbsp;/&nbsp;&nbsp;Tec de Monterrey
        </motion.p>

        {/* Accent line */}
        <motion.div
          className="mx-auto mt-8 h-px bg-[var(--accent)] opacity-40"
          style={{ width: "clamp(80px, 20vw, 200px)" }}
          variants={fadeUp}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.6, duration: 0.6 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
