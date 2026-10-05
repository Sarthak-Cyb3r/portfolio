"use client";

import { Reveal } from "@/components/motion/reveal";
import { technologies } from "@/data/projects";

export function TechMarquee() {
  // Duplicate for seamless infinite loop
  const doubleTech = [...technologies, ...technologies];

  return (
    <section
      id="stack"
      aria-labelledby="tech-stack-heading"
      className="relative overflow-hidden border-y border-line bg-surface-2/40 py-12 sm:py-16"
    >
      <div className="shell mb-6 text-center">
        <Reveal>
          <p className="kicker mb-2">Capabilities</p>
          <h2 id="tech-stack-heading" className="text-xl sm:text-2xl text-text font-bold">
            Technologies & Tools I Build With
          </h2>
        </Reveal>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-3 sm:gap-4 py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
        >
          {doubleTech.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs sm:text-sm text-text transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-3 sm:gap-4 py-2 group-hover:[animation-play-state:paused] motion-reduce:hidden"
        >
          {doubleTech.map((tech, index) => (
            <div
              key={`dup-${tech}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs sm:text-sm text-text transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
