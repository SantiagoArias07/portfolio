"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

interface AchievementLink {
  label: string;
  url: string;
}

interface Achievement {
  id: string;
  date: string;
  title: string;
  context: string;
  result: string;
  links?: AchievementLink[];
}

const achievements: Achievement[] = [
  {
    id: "ach-1",
    date: "2026.04.10",
    title: "Capital One Hackathon",
    context: "SharedSavings — collaborative financial goals platform. JavaScript · Python · CSS · HTML. Built with team.",
    result: "Participated",
    links: [
      { label: "capitalone.com ↗", url: "https://www.capitalone.com" },
      { label: "INSTAGRAM ↗", url: "https://www.instagram.com/p/DXftGpejUtK/?img_index=1" },
      { label: "REPO ↗", url: "https://github.com/efavilaa/CapitalOne_Apr26" },
    ],
  },
  {
    id: "ach-2",
    date: "2025.05.15",
    title: "Gen Técnico 2025",
    context: "Hackathon organized by Tenaris TAMSA. Awarded as part of the Beca Roberto Rocca program.",
    result: "Participated",
    links: [
      { label: "robertorocca.org ↗", url: "https://www.robertorocca.org/es/gen-tecnico" },
    ],
  },
  {
    id: "ach-3",
    date: "2024.05.15",
    title: "Gen Técnico 2024",
    context: "Hackathon organized by Tenaris TAMSA. Awarded as part of the Beca Roberto Rocca program.",
    result: "Participated",
    links: [
      { label: "robertorocca.org ↗", url: "https://www.robertorocca.org/es/gen-tecnico" },
    ],
  },
  {
    id: "ach-4",
    date: "2023",
    title: "Programming Certification",
    context: "Computación del Golfo — competitive programming certification.",
    result: "Certified",
    links: [
      { label: "cg.edu.mx ↗", url: "https://www.cg.edu.mx" },
    ],
  },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

export function HackathonsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="hackathons" label="05 / HACKATHONS">
      <div ref={ref}>
        <div className="mb-12">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-none tracking-tight text-[var(--text-primary)]">
            Competitions &amp;
            <br />
            <span className="text-[var(--text-primary)]">achievements.</span>
          </h2>
        </div>

        {/* Vertical timeline connector */}
        <div className="relative border-t border-[var(--border)]">
          <div
            className="absolute left-[44px] sm:left-[50px] top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--border)" }}
            aria-hidden
          />

          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={rowVariants}
              initial={reduced ? "show" : "hidden"}
              animate={inView ? "show" : "hidden"}
              className="group grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_180px] gap-x-8 gap-y-1 py-6 border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-raised)] relative"
            >
              {/* Accent dot sitting on the vertical line */}
              <span
                className="absolute left-[44px] sm:left-[50px] top-[1.65rem] -translate-x-1/2 w-[5px] h-[5px] rounded-full pointer-events-none"
                style={{ backgroundColor: "var(--accent)" }}
                aria-hidden
              />

              <div className="font-mono text-xs text-[var(--text-tertiary)] tabular-nums pt-0.5">
                {item.date}
              </div>

              <div>
                <div className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mb-2">
                  {item.context}
                </div>
                {item.links && (
                  <div className="flex flex-wrap gap-3">
                    {item.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors tracking-widest"
                        data-cursor="hover"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-start-2 sm:col-start-auto font-mono text-xs text-[var(--accent)] tracking-wider pt-0.5 sm:text-right">
                {item.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>

  );
}
