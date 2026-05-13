"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

interface Credential {
  id: string;
  title: string;
  org: string;
  description: string;
  detail: string;
  year: string;
  status: string;
  tag: string;
  link: string;
  linkLabel: string;
}

const credentials: Credential[] = [
  {
    id: "gallagher",
    title: "Gallagher Foundation",
    org: "Scholarship",
    description:
      "One of Mexico's most selective merit-based scholarships, awarded to students at Tecnológico de Monterrey who demonstrate exceptional academic performance, leadership, and community commitment.",
    detail:
      "5 scholars selected per year in Mexico — exclusively at Tec de Monterrey Campus Monterrey. The scholarship operates in 3 countries and provides full tuition coverage plus ongoing mentorship from leaders.",
    year: "2025",
    status: "Active",
    tag: "SCHOLARSHIP",
    link: "https://gallagherfoundation.org",
    linkLabel: "gallagherfoundation.org ↗",
  },
  {
    id: "codex",
    title: "CODEX",
    org: "Tec de Monterrey",
    description:
      "High-performance competitive programming program at Tec de Monterrey, training elite students in algorithms, data structures, and problem-solving under contest conditions.",
    detail:
      "Rigorous weekly training sessions in competitive programming — ICPC-style problems, optimization challenges, and algorithmic thinking applied to real engineering constraints.",
    year: "2025",
    status: "Active",
    tag: "PROGRAM",
    link: "https://www.instagram.com/p/DNW4lJis5nT/",
    linkLabel: "INSTAGRAM ↗",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

export function CredentialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="credentials" label="03 / CREDENTIALS">
      <div ref={ref}>
        <div className="mb-12">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-none tracking-tight text-[var(--text-primary)]">
            Credibility
            <br />
            <span className="text-[var(--accent)]">anchors.</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Not buried in a résumé line — these define how I approach every
            problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.id}
              custom={i}
              variants={cardVariants}
              initial={reduced ? "show" : "hidden"}
              animate={inView ? "show" : "hidden"}
              className="group relative rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-8 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--bg-overlay)]"
              data-cursor="hover"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest block mb-2">
                    {cred.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {cred.title}
                  </h3>
                  <span className="text-sm text-[var(--text-tertiary)] font-mono">
                    {cred.org}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {cred.year}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="text-xs text-[var(--accent)]">
                      {cred.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                {cred.description}
              </p>

              <p className="text-[var(--text-tertiary)] text-xs leading-relaxed font-mono border-t border-[var(--border)] pt-4 mb-4">
                {cred.detail}
              </p>

              <a
                href={cred.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors tracking-widest"
                data-cursor="hover"
              >
                {cred.linkLabel}
              </a>

              {/* Accent corner glow */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                style={{
                  background:
                    "radial-gradient(circle at top right, var(--accent-dim) 0%, transparent 70%)",
                }}
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
