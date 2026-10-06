"use client";

import { ArrowUpRight, Code, Cpu, GameController, Sparkle } from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/bits";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const PRINCIPLES = [
  {
    icon: Code,
    title: "Code you can run",
    body: "I don't stop at Figma or mockups. Every project has a runnable build, a live URL, or a double-clickable package.",
  },
  {
    icon: GameController,
    title: "Multiplayer & Interactive",
    body: "Real-time state synchronization, PWA mechanics, and cross-platform desktop & mobile packaging.",
  },
  {
    icon: Cpu,
    title: "Engineered Simplicity",
    body: "Static where possible, zero-bloat architecture, and strict TypeScript types. Fast loads and 60fps responsiveness.",
  },
  {
    icon: Sparkle,
    title: "Vibe coding with discipline",
    body: "Accelerated by AI, but vetted line-by-line. I read the diffs, write test suites, and understand every function I deploy.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="shell section"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr] lg:gap-16 items-start">
        {/* Left column: Bio */}
        <div>
          <Reveal>
            <SectionHeading
              kicker="About Me"
              title="Self-taught, 16, shipping things that actually work."
              lead="I started building because I wanted tools and games that didn't exist or had too much junk in them."
            />
          </Reveal>

          <Reveal delay={0.2} className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              I&apos;m Sarthak — a 16-year-old 11th grader studying in Chinmaya Vidyalaya and a self-taught developer
              who believes software should be fast, honest, and immediately usable.
              I spend my free hours in the terminal, experimenting with real-time
              protocols, native mobile &amp; desktop runtimes (Flutter, Electron &amp; Capacitor), and modern fullstack architectures.
            </p>
            <p>
              When I build, I don&apos;t just generate code and hope for the best.
              I test edge cases, package native binaries, and measure performance.
              Whether it&apos;s an ad-free 320kbps music streaming app like Softify, a multiplayer game like Ludo, or an academic planner like
              StudyStack, the goal is always a rock-solid artifact.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex items-center gap-4">
            <Button href={site.githubUrl} external variant="primary">
              Follow on GitHub
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </Button>
            <Button href="#process" variant="ghost">
              How I build
            </Button>
          </Reveal>
        </div>

        {/* Right column: Principles / Grid */}
        <div>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="card h-full p-6 transition-all duration-300 hover:border-line-strong hover:bg-surface-2/60">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-accent-2 border border-line">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-text font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
