"use client";

import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { stats } from "@/data/projects";

const STAT_ITEMS = [
  {
    label: "Total Projects",
    value: stats.projects,
    suffix: "",
    desc: "Built from scratch & maintained",
    accent: "text-accent-2",
  },
  {
    label: "Shipped & Completed",
    value: stats.completed,
    suffix: "",
    desc: "Live site + native Linux & Android builds",
    accent: "text-ok",
  },
  {
    label: "Under Development",
    value: stats.inDevelopment,
    suffix: "",
    desc: "Real repos, roadmaps & passing test suites",
    accent: "text-warn",
  },
  {
    label: "Technologies Mastered",
    value: stats.technologies,
    suffix: "+",
    desc: "Languages, engines, DBs & frameworks",
    accent: "text-accent-3",
  },
];

export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative border-y border-line bg-surface/50 py-16 sm:py-20"
    >
      <div className="shell">
        <h2 id="stats-heading" className="sr-only">
          Project and engineering metrics
        </h2>

        <Stagger className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {STAT_ITEMS.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex flex-col border-l-2 border-line pl-4 sm:pl-6 transition-colors duration-300 hover:border-line-strong">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text`}>
                    <Counter value={item.value} suffix={item.suffix} />
                  </span>
                </div>
                <span className="mt-2 font-mono text-xs uppercase tracking-wider text-text font-medium">
                  {item.label}
                </span>
                <span className="mt-1 text-xs text-muted">
                  {item.desc}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
