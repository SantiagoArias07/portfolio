"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

interface Achievement {
  id: string;
  date: string;
  title: string;
  context: string;
  result: string;
}

// TODO: Replace with real hackathon and achievement data
const achievements: Achievement[] = [
  {
    id: "ach-1",
    date: "2025.03",
    title: "Hackathon Alpha",
    context: "TODO: hackathon name, organizer, and theme",
    result: "TODO: placement or award",
  },
  {
    id: "ach-2",
    date: "2024.11",
    title: "Achievement Beta",
    context: "TODO: competition or recognition context",
    result: "TODO: outcome or award",
  },
  {
    id: "ach-3",
    date: "2024.09",
    title: "Hackathon Gamma",
    context: "TODO: hackathon name, organizer, and theme",
    result: "TODO: placement or award",
  },
  {
    id: "ach-4",
    date: "2024.06",
    title: "Achievement Delta",
    context: "TODO: competition or recognition context",
    result: "TODO: outcome or award",
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
            <span className="text-[var(--accent)]">achievements.</span>
          </h2>
        </div>

        <div className="border-t border-[var(--border)]">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={rowVariants}
              initial={reduced ? "show" : "hidden"}
              animate={inView ? "show" : "hidden"}
              className="group grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_180px] gap-x-8 gap-y-1 py-6 border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-raised)] -mx-2 px-2 rounded"
            >
              <div className="font-mono text-xs text-[var(--text-tertiary)] tabular-nums pt-0.5">
                {item.date}
              </div>

              <div>
                <div className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {item.context}
                </div>
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
