"use client";
import { useRef } from "react";
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
}

// TODO: Replace placeholders with real project data, images, and links
const projects: Project[] = [
  {
    id: "project-1",
    name: "Project Alpha",
    role: "Lead Frontend Engineer",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"],
    problem:
      "TODO: Describe the user problem or business challenge this project addressed.",
    solution:
      "TODO: Describe the technical approach, key decisions, and measurable outcomes.",
    deployUrl: null, // TODO: add deploy URL
    repoUrl: null,   // TODO: add repo URL
  },
  {
    id: "project-2",
    name: "Project Beta",
    role: "Frontend Engineer",
    year: "2024",
    stack: ["React", "TypeScript", "Three.js", "WebGL", "Node.js"],
    problem:
      "TODO: Describe the user problem or business challenge this project addressed.",
    solution:
      "TODO: Describe the technical approach, key decisions, and measurable outcomes.",
    deployUrl: null, // TODO: add deploy URL
    repoUrl: null,   // TODO: add repo URL
  },
];

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
      {/* Preview placeholder — TODO: replace with next/image or video */}
      <div
        className="relative w-full h-56 sm:h-64 bg-[var(--bg-overlay)] border-b border-[var(--border)] overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,255,136,0.06) 0%, transparent 70%)",
          }}
        >
          {/* TODO: <Image src={project.image} alt="" fill className="object-cover" /> */}
          <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest">
            PREVIEW // TODO
          </span>
        </div>
      </div>

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
