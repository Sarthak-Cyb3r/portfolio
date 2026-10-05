"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Tilt } from "@/components/motion/interactive";
import { Chip, StatusBadge } from "@/components/ui/bits";
import type { Project } from "@/data/projects";

const CHIP_LIMIT = 5;

const humanize = (src: string) =>
  (src.split("/").pop() ?? "").replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

export function ProjectCard({ project }: { project: Project }) {
  const image = project.cover ?? project.screenshots[0];
  const chips = project.stack.slice(0, CHIP_LIMIT);
  const remaining = project.stack.length - chips.length;
  const imageAlt = image
    ? `${project.name} ${humanize(image) || "cover"} screenshot`
    : `${project.name} screenshot`;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Tilt className="h-full">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="card group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-line-strong has-[a:focus-visible]:shadow-[0_0_0_2px_var(--color-accent)]"
      >
        {/* Dynamic spotlight gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 225, 255, 0.12), transparent 75%)`,
          }}
        />

        {/* HUD Crosshairs */}
        <span className="hud-crosshair -left-[4px] -top-[4px] opacity-40 group-hover:opacity-100 transition-opacity z-20" />
        <span className="hud-crosshair -right-[4px] -top-[4px] opacity-40 group-hover:opacity-100 transition-opacity z-20" />
        <span className="hud-crosshair -left-[4px] -bottom-[4px] opacity-40 group-hover:opacity-100 transition-opacity z-20" />
        <span className="hud-crosshair -right-[4px] -bottom-[4px] opacity-40 group-hover:opacity-100 transition-opacity z-20" />

        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[calc(1rem-1px)] bg-surface-2">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              width={1600}
              height={1000}
              sizes="(min-width: 1280px) 25rem, (min-width: 640px) 45vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="grid-bg grid h-full w-full place-items-center">
              <span
                aria-hidden
                className="font-display text-5xl text-faint"
              >
                {project.name.slice(0, 1)}
              </span>
            </div>
          )}

          <div className="absolute left-3 top-3 z-20">
            <StatusBadge status={project.status} className="glass shadow-sm" />
          </div>
        </div>

        <div className="relative z-20 flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-xl text-text font-bold group-hover:text-accent-2 transition-colors">
              {project.name}
            </h3>
            {project.status === "completed" ? (
              <span className="font-mono text-[0.65rem] text-ok bg-ok-soft px-2 py-0.5 rounded-full border border-ok/30">
                Ready
              </span>
            ) : null}
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-5">
            {chips.length > 0 ? (
              <ul
                className="flex flex-wrap gap-1.5"
                aria-label={`${project.name} technologies`}
              >
                {chips.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
                {remaining > 0 ? (
                  <li>
                    <Chip className="text-text">+{remaining}</Chip>
                  </li>
                ) : null}
              </ul>
            ) : null}

            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-link transition-colors duration-200 after:absolute after:inset-0 after:z-10 after:rounded-[1rem] after:content-[''] hover:text-text"
            >
              View project
              <ArrowRight
                size={15}
                weight="bold"
                aria-hidden
                className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:group-hover/link:translate-x-0"
              />
            </Link>
          </div>
        </div>
      </article>
    </Tilt>
  );
}
