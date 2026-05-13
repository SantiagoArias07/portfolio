"use client";
import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/animations";

const EMAIL = "santiago.ariasp.dev@gmail.com";
const GITHUB = "https://github.com/SantiagoArias07";
const LINKEDIN = "https://www.linkedin.com/in/santiago-arias-paul-49992b2b0/";
// TODO: Add CV PDF to /public and update this path
const CV_PATH = "/cv.pdf";

const BUILD_YEAR = new Date().getFullYear();

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper id="contact" label="07 / CONTACT">
      <div ref={ref}>
        {/* CTA */}
        <motion.div
          className="mb-16"
          custom={0}
          variants={fadeUp}
          initial={reduced ? "show" : "hidden"}
          animate={inView ? "show" : "hidden"}
        >
          <h2 className="font-bold leading-none tracking-tight text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
            Let&apos;s build
            <br />
            <span className="text-[var(--accent)]">something.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg leading-relaxed">
            I&apos;m actively looking for software engineering roles and interesting
            collaborations. If you&apos;re building something ambitious, let&apos;s talk.
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          className="mb-12"
          custom={1}
          variants={fadeUp}
          initial={reduced ? "show" : "hidden"}
          animate={inView ? "show" : "hidden"}
        >
          <div className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest mb-3">
            EMAIL
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200 break-all"
              data-cursor="hover"
            >
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="font-mono text-xs border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-tertiary)] hover:text-[var(--accent)] px-3 py-1.5 rounded transition-all duration-200 tracking-widest cursor-pointer"
              aria-label="Copy email address to clipboard"
              data-cursor="hover"
            >
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>
        </motion.div>

        {/* Secondary links */}
        <motion.div
          className="flex flex-wrap gap-8 mb-24"
          custom={2}
          variants={fadeUp}
          initial={reduced ? "show" : "hidden"}
          animate={inView ? "show" : "hidden"}
        >
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 tracking-widest"
            data-cursor="hover"
          >
            GITHUB ↗
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 tracking-widest"
            data-cursor="hover"
          >
            LINKEDIN ↗
          </a>
          <a
            href={CV_PATH}
            download
            className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 tracking-widest"
            data-cursor="hover"
          >
            CV ↓
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="border-t border-[var(--border)] pt-8"
          custom={3}
          variants={fadeUp}
          initial={reduced ? "show" : "hidden"}
          animate={inView ? "show" : "hidden"}
          role="contentinfo"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
            <div className="flex flex-wrap gap-6">
              <span>SAP.DEV // v1.0.0</span>
              <span>© {BUILD_YEAR} Santiago Arias Paul</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <span>Built with Next.js + R3F</span>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                data-cursor="hover"
              >
                SOURCE ↗
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </SectionWrapper>
  );
}
