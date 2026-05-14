"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

interface Project {
  id: string;
  name: string;
  role: string;
  year: string;
  stack: string[];
  problem: string;
  solution: string;
  deployUrl: string | null;
  repoUrl: string | null;
  previewBg?: string;
}

// TODO: Add preview screenshots — place images at /public/projects/weekfive.png
// and /public/projects/climateroots.png, then replace ProjectPreviewPlaceholder
// with <Image src="/projects/weekfive.png" alt="WeekFive preview" fill className="object-cover" />
const projects: Project[] = [
  {
    id: "climateroots",
    name: "ClimateRoots",
    role: "Solo Developer — Design & Engineering",
    year: "2026",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "Resend", "Server Actions"],
    problem:
      "SOSAC runs a 1,100 m² regenerated urban garden in Monterrey — a living lab for urban ecology. They needed a digital home that matched the quality of the physical space, not an off-the-shelf template.",
    solution:
      "Custom Next.js App Router site: 6 interactive SVG garden zones, 12-species filterable plant catalogue with static detail pages (SSG), community registration via Resend Server Actions, and an 8-species infinite-scroll fauna gallery. Light/dark mode via circular clip-path animation. SOSAC invited future collaboration post-delivery.",
    deployUrl: "https://climateroots.vercel.app",
    repoUrl: "https://github.com/SantiagoArias07/sosac-climate-roots",
  },
  {
    id: "weekfive",
    name: "WeekFive",
    role: "Solo Developer — Software Engineering",
    year: "2026",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Node.js", "Express", "SQLite", "JWT"],
    problem:
      "Week Five — Tec de Monterrey's peak of simultaneous deadlines — exposed a gap: no tool consolidated task tracking, exam scheduling, weighted GPA, and Pomodoro study sessions in a single workflow.",
    solution:
      "Bilingual (EN/ES) full-stack platform across 10 pages: full task CRUD with overdue detection, weighted GPA auto-calculation, exam-to-study-session generator, 25-min Pomodoro timer, and auto-generated notifications. Modular Zustand stores per resource. Express + SQLite API on Railway persistent Volume with JWT auth.",
    deployUrl: "https://weekfive-nine.vercel.app",
    repoUrl: "https://github.com/SantiagoArias07/week-five",
    previewBg: "#f8f9fa",
  },
];

const projectImages: Record<string, string> = {
  weekfive: "/projects/weekfive.png",
  climateroots: "/projects/climateroots.png",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay: i * 0.15 },
  }),
};

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial={reduced ? "show" : "hidden"}
      animate={inView ? "show" : "hidden"}
      className="group relative rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] overflow-hidden transition-colors duration-300 hover:border-[rgba(0,255,136,0.3)]"
      data-cursor="crosshair"
      aria-label={`Project: ${project.name}`}
    >
      {/* Project preview image — click opens live site */}
      {project.deployUrl ? (
        <a
          href={project.deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} live site`}
          data-cursor="crosshair"
          className="relative block w-full overflow-hidden border-b border-[var(--border)]"
          style={{ aspectRatio: "16 / 9", backgroundColor: project.previewBg ?? "var(--bg-overlay)" }}
        >
          <Image
            src={projectImages[project.id]}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 72rem"
            priority={index === 0}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.45)" }}>
            <span className="font-mono text-xs tracking-widest text-[var(--accent)] border border-[var(--accent)] px-3 py-1.5 rounded">
              VISIT ↗
            </span>
          </div>
        </a>
      ) : (
        <div
          className="relative w-full overflow-hidden border-b border-[var(--border)]"
          style={{ aspectRatio: "16 / 9", backgroundColor: project.previewBg ?? "var(--bg-overlay)" }}
        >
          <Image
            src={projectImages[project.id]}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 72rem"
            priority={index === 0}
          />
        </div>
      )}

      <div className="p-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
          <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest">
            {project.year}
          </span>
          <span className="font-mono text-xs text-[var(--text-tertiary)]">
            {project.role}
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-none">
          {project.name}
        </h3>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-[var(--accent)] border border-[var(--accent)] border-opacity-30 rounded px-2.5 py-1 tracking-wider"
              style={{ borderColor: "rgba(0,255,136,0.3)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest mb-2">
              PROBLEM
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest mb-2">
              SOLUTION
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 border-t border-[var(--border)] pt-6">
          {project.deployUrl ? (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors tracking-widest"
              data-cursor="hover"
            >
              LIVE ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest">
              LIVE // TODO
            </span>
          )}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors tracking-widest"
              data-cursor="hover"
            >
              REPO ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest">
              REPO // TODO
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <SectionWrapper id="work" label="04 / SELECTED WORK">
      <div ref={ref}>
        <div className="mb-12">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-none tracking-tight text-[var(--text-primary)]">
            Selected
            <br />
            <span className="text-[var(--text-primary)]">work.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
