import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/project-filters";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/bits";
import { projects, stats } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Every app, game and tool built end to end by ${site.name} — a real builder shipping working software. ${projects.length} projects with live demos, source code and real downloads; filter by status, search, or tech stack.`,
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-20 h-72 w-72 rounded-full bg-accent-2/10 blur-[100px]"
      />

      <div className="shell relative pb-24 pt-28 sm:pb-32 sm:pt-36">
        {/* SectionHeading renders an h2 — this is the page's single h1. */}
        <h1 className="sr-only">
          Projects — apps, games and tools built by {site.name}
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-line pb-10">
          <Reveal>
            <SectionHeading
              kicker="Project Directory"
              title="Everything I've built, end to end"
              lead={`${stats.projects} projects across multiplayer gaming, academic planning, audio systems, and financial analytics. Real code, real installers, no placeholders.`}
            />
          </Reveal>

          {/* Quick HUD status strip */}
          <Reveal delay={0.15} className="shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-line bg-surface/80 p-3.5 backdrop-blur-md font-mono text-xs">
              <div className="flex flex-col px-2">
                <span className="text-[0.65rem] text-faint uppercase">Projects</span>
                <span className="text-base font-bold text-text">{stats.projects} Total</span>
              </div>
              <div className="flex flex-col px-2 border-l border-line/60">
                <span className="text-[0.65rem] text-faint uppercase">Shipped</span>
                <span className="text-base font-bold text-ok">{stats.completed} Ready</span>
              </div>
              <div className="flex flex-col px-2 border-l border-line/60">
                <span className="text-[0.65rem] text-faint uppercase">In Dev</span>
                <span className="text-base font-bold text-warn">{stats.inDevelopment} Active</span>
              </div>
              <div className="flex flex-col px-2 border-l border-line/60">
                <span className="text-[0.65rem] text-faint uppercase">Test Gates</span>
                <span className="text-base font-bold text-accent-3">455 Green</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          <ProjectFilters />
        </div>
      </div>
    </div>
  );
}
