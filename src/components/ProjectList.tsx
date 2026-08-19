"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { Project } from "@/lib/content";

const PREVIEW_W = 340;
const PREVIEW_H = 212;
const EDGE = 20;

export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  // Unique per list so the highlight never animates between two lists.
  const id = useId();
  const [canPreview, setCanPreview] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Previews are a pointer affordance — skip them on touch and on narrow screens.
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setCanPreview(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Projects with more than one screenshot cycle through them while hovered.
  useEffect(() => {
    if (active === null || projects[active].previews.length < 2) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % projects[active].previews.length),
      1600
    );
    return () => clearInterval(id);
  }, [active, projects]);

  // Raw cursor position, smoothed into the preview card's transform.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 260, damping: 30, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 260, damping: 30, mass: 0.4 });
  // A touch of tilt in the direction the card is travelling.
  const yVelocity = useVelocity(y);
  const rotate = useSpring(
    useTransform(yVelocity, [-1600, 0, 1600], [6, 0, -6], { clamp: true }),
    { stiffness: 300, damping: 26 }
  );

  function select(index: number) {
    setActive(index);
    setFrame(0);
  }

  function handleMove(event: React.MouseEvent) {
    if (!canPreview || !listRef.current) return;
    const list = listRef.current.getBoundingClientRect();
    // Keep the card in the right margin: never left of the list, never off screen.
    const nextX = Math.min(
      Math.max(event.clientX + 32, list.right - 60),
      window.innerWidth - PREVIEW_W - EDGE
    );
    const nextY = Math.min(
      Math.max(event.clientY - PREVIEW_H / 2, EDGE),
      window.innerHeight - PREVIEW_H - EDGE
    );
    mouseX.set(nextX);
    mouseY.set(nextY);
  }

  return (
    <div
      ref={listRef}
      className="relative flex flex-col gap-8 lg:gap-0"
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(null)}
    >
      {projects.map((project, index) => {
        const isExternal = project.href.startsWith("http");
        return (
          <a
            key={project.name}
            href={project.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            onMouseEnter={() => select(index)}
            onFocus={() => select(index)}
            onBlur={() => setActive(null)}
            className="group relative -mx-3 flex flex-col gap-3 rounded-md px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:py-3"
          >
            {active === index && (
              <motion.span
                layoutId={`highlight-${id}`}
                className="absolute inset-0 -z-10 rounded-md bg-[var(--bg-subtle)]"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <span className="flex items-baseline justify-between gap-6">
              <span className="flex min-w-0 flex-col lg:flex-row lg:items-baseline lg:gap-3">
                <span className="whitespace-nowrap text-text transition-colors duration-200 group-hover:text-[var(--accent)]">
                  {project.name}
                </span>
                <span className="text-muted lg:truncate">
                  {project.description}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.09em] text-faint transition-colors duration-200 group-hover:text-[var(--accent)]">
                {project.tag}
              </span>
            </span>
            {/* Touch and small screens get the screenshot inline — no hover to reveal it. */}
            <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] lg:hidden">
              <Image
                src={project.previews[0]}
                alt={`${project.name} screenshot`}
                fill
                sizes="(max-width: 700px) 100vw, 640px"
                className="object-cover"
              />
            </span>
          </a>
        );
      })}

      {canPreview &&
        createPortal(
          <motion.div
          aria-hidden
          style={{ x, y, rotate }}
          className="pointer-events-none fixed left-0 top-0 z-50"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{ width: PREVIEW_W, height: PREVIEW_H }}
                className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--preview-shadow)]"
              >
                {projects.flatMap((project, index) =>
                  project.previews.map((src, shot) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      fill
                      sizes="340px"
                      className="object-cover transition-opacity duration-300"
                      style={{
                        opacity:
                          active === index &&
                          shot === frame % project.previews.length
                            ? 1
                            : 0,
                      }}
                    />
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>,
          document.body
        )}

    </div>
  );
}
