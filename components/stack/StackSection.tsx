"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

interface StackItem {
  name: string;
  context: string;
}

interface StackCategory {
  label: string;
  items: StackItem[];
}

const stack: StackCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", context: "daily driver, strict mode always on" },
      { name: "JavaScript", context: "where TS isn't an option" },
      { name: "Python", context: "algorithms, scripting, data work" },
      { name: "C++", context: "competitive programming via CODEX" },
      { name: "Java", context: "OOP fundamentals and academic projects" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React / Next.js", context: "SPA and App Router — production choice" },
      { name: "Tailwind CSS", context: "utility-first, v4 with design tokens" },
      { name: "Framer Motion", context: "scroll-driven animations and transitions" },
      { name: "Three.js / R3F", context: "3D scenes and WebGL experimentation" },
      { name: "GSAP", context: "complex timelines and ScrollTrigger sequences" },
    ],
  },
  {
    label: "Application & database",
    items: [
      { name: "Node.js + Express", context: "REST APIs and server-side logic" },
      { name: "SQLite", context: "embedded persistent storage, zero-config" },
      { name: "PostgreSQL", context: "relational data at scale" },
      { name: "JWT + bcrypt", context: "stateless auth and password hashing" },
      { name: "Resend", context: "transactional email via Server Actions" },
    ],
  },
  {
    label: "Tooling & Deploy",
    items: [
      { name: "Git / GitHub", context: "feature branches, conventional commits" },
      { name: "Figma", context: "design → code handoff and component specs" },
      { name: "Vercel", context: "frontend deploy, preview, and edge config" },
      { name: "Railway", context: "backend + persistent volume hosting" },
    ],
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

export function StackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  let idx = 0;

  return (
    <SectionWrapper id="stack" label="06 / STACK">
      <div ref={ref}>
        <div className="mb-12">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-none tracking-tight text-[var(--text-primary)]">
            Tools I trust
            <br />
            <span className="text-[var(--text-primary)]">in production.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
          {stack.map((category) => (
            <div key={category.label}>
              <h3 className="font-mono text-[10px] text-[var(--accent)] tracking-widest mb-6">
                {category.label.toUpperCase()}
              </h3>
              <div>
                {category.items.map((item) => {
                  const i = idx++;
                  return (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={itemVariants}
                      initial={reduced ? "show" : "hidden"}
                      animate={inView ? "show" : "hidden"}
                      className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--bg-raised)] -mx-2 px-2 rounded cursor-default"
                      data-cursor="hover"
                    >
                      <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors min-w-[140px] text-sm sm:text-base">
                        {item.name}
                      </span>
                      <span className="text-xs text-[var(--text-tertiary)] font-mono leading-relaxed">
                        {item.context}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
