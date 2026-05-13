"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlitchText } from "@/components/ui/GlitchText";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const META = [
  { label: "LOCATION", value: "Monterrey, MX" },
  { label: "PROGRAM", value: "B.S. in Computer Science and Technology" },
  { label: "INSTITUTION", value: "Tec de Monterrey" },
  { label: "GRADUATION", value: "2029 (expected)" },
  { label: "STATUS", value: "Open to opportunities" },
  { label: "LANGUAGES", value: "ES / EN" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about" label="02 / ABOUT">
      <motion.div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20"
        variants={stagger}
        initial={reduced ? "show" : "hidden"}
        animate={inView ? "show" : "hidden"}
      >
        {/* Main content — 2/3 width */}
        <div className="lg:col-span-2">
          <motion.h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight text-[var(--text-primary)] mb-10"
            variants={fadeUp}
          >
            <GlitchText text="I build interfaces" trigger="inview" active={inView} />
            <br />
            <span className="text-[var(--accent)]">that feel alive.</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 font-light"
            variants={fadeUp}
          >
            I&apos;m Santiago — a Computer Science and Technology student at Tec de Monterrey focused on software engineering with a strong emphasis on frontend craft. I care about the 200ms that makes a transition feel right, the API design that makes a codebase survivable, and the product decision that makes both matter.
          </motion.p>

          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed mb-6"
            variants={fadeUp}
          >
            I build modern web interfaces using TypeScript and React, focusing on performance, clarity, and user experience. I regularly integrate APIs and design backend interactions that keep systems maintainable and predictable, working with Node.js, Express, and relational databases when needed. I also write Python for algorithms and scripting, C++ for competitive programming, and Java when the problem calls for it. I reach for Three.js and GSAP when something needs to move in a way that stops people mid-scroll. I think in systems: a design token is a contract, a component is a promise, and a millisecond of jank is a broken one.
          </motion.p>

          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed"
            variants={fadeUp}
          >
            Outside the codebase I compete in hackathons, train in competitive
            programming through{" "}
            <span className="text-[var(--text-primary)] font-medium">CODEX</span> —
            Tec&apos;s high-performance programming program — and hold the{" "}
            <span className="text-[var(--text-primary)] font-medium">
              Fundación Gallagher scholarship
            </span>
            , one of the most selective merit awards in Mexico. Currently
            looking for a software engineering role where craft and ambition are both on
            the table.
          </motion.p>
        </div>

        {/* Metadata column — 1/3 width */}
        <motion.div
          className="flex flex-col gap-8 font-mono text-sm lg:pt-2"
          variants={fadeUp}
        >
          {META.map(({ label, value }) => (
            <div key={label}>
              <div className="text-[10px] text-[var(--accent)] tracking-widest mb-1">
                {label}
              </div>
              <div className="text-[var(--text-secondary)]">{value}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
