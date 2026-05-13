"use client";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

const EMAIL = "santiago.ariasp.dev@gmail.com";
const GITHUB = "https://github.com/SantiagoArias07";
const LINKEDIN = "https://www.linkedin.com/in/santiago-arias-paul-49992b2b0/";
const CV = "/cv.pdf";

// Minimal inline SVGs — 14×14 viewBox
const MailIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M7 0.5C3.41 0.5.5 3.41.5 7a6.5 6.5 0 004.44 6.17c.33.06.45-.14.45-.31v-1.08c-1.8.39-2.18-.87-2.18-.87-.3-.76-.72-.96-.72-.96-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.7.25-1.28.66-1.73-.07-.16-.29-.82.06-1.71 0 0 .54-.17 1.76.66.51-.14 1.06-.21 1.6-.22.54.01 1.09.08 1.6.22 1.22-.83 1.76-.66 1.76-.66.35.89.13 1.55.06 1.71.41.45.66 1.03.66 1.73 0 2.49-1.52 3.04-2.97 3.2.23.2.44.6.44 1.21v1.79c0 .17.12.37.45.31A6.5 6.5 0 0013.5 7C13.5 3.41 10.59.5 7 .5z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12.5 0h-11C.67 0 0 .67 0 1.5v11c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-11C14 .67 13.33 0 12.5 0zM4.25 11.5H2V5.25h2.25V11.5zM3.12 4.25a1.31 1.31 0 110-2.62 1.31 1.31 0 010 2.62zM12 11.5H9.75V8.38c0-.84-.015-1.93-1.175-1.93-1.18 0-1.36.92-1.36 1.87v3.175H5V5.25h2.16v1h.03c.3-.57 1.03-1.17 2.12-1.17C11.44 5.08 12 6.42 12 8.29V11.5z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const iconBtn =
  "w-4 h-4 inline-flex items-center justify-center text-[var(--text-tertiary)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-150 cursor-pointer";

export function HUD() {
  const [time, setTime] = useState("");
  const scroll = useScrollProgress();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pct = `${Math.round(scroll * 100).toString().padStart(3, "0")}%`;

  return (
    <>
      {/* Top-left */}
      <div
        className="fixed top-5 left-6 z-50 hidden lg:flex flex-col gap-0.5 pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          SAP.DEV // v1.0.0
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          STATUS:{" "}
          <span className="text-[var(--accent)]">ONLINE</span>
        </span>
      </div>

      {/* Top-right */}
      <div
        className="fixed top-5 right-6 z-50 hidden lg:flex flex-col gap-0.5 items-end pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider tabular-nums">
          {time}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          25.6515° N, 100.2897° W
        </span>
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider">
          MONTERREY, MX
        </span>
      </div>

      {/* Bottom-right: scroll % */}
      <div
        className="fixed bottom-5 right-6 z-50 hidden lg:block pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-wider tabular-nums">
          SCROLL {pct}
        </span>
      </div>

      {/* Bottom-left: contact icon strip */}
      <div
        className="fixed bottom-5 left-6 z-50 hidden lg:flex items-center gap-3 select-none"
      >
        <a href={`mailto:${EMAIL}`} aria-label="Email Santiago" className={iconBtn} title={EMAIL}>
          <MailIcon />
        </a>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={iconBtn} title="GitHub">
          <GitHubIcon />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={iconBtn} title="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href={CV} download aria-label="Download CV" className={iconBtn} title="Download CV">
          <DownloadIcon />
        </a>
      </div>
    </>
  );
}
