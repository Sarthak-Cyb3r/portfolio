"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, inProgressProjects } from "@/data/projects";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Spotlight } from "@/components/ui/spotlight";
import { SoftifyInteractive } from "@/components/projects/softify-interactive";
import { LudoInteractive } from "@/components/projects/ludo-interactive";
import { StudyStackInteractive } from "@/components/projects/studystack-interactive";

export function FeaturedWork() {
  const softify = projects.find((p) => p.slug === "softify")!;
  const ludo = projects.find((p) => p.slug === "ludo-vercel" || p.slug === "ludo")!;
  const studystack = projects.find((p) => p.slug === "studystack")!;

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-border/80 bg-dot-pattern/40">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Selected Work"
          title="Engineered for reliability."
          description="Native mobile apps, zero-build multiplayer games, and deterministic scheduling algorithms built from scratch."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Card 1: Flagship Softify (Full Width 12-col Bento Card) */}
          <div className="lg:col-span-12">
            <Spotlight className="rounded-2xl border border-border bg-card/85 dark:bg-card/70 backdrop-blur-xl p-6 sm:p-10 shadow-sm hover:border-primary/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Content Column */}
                <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                      {softify.name}
                    </h3>
                    <Chip variant="success" size="sm">
                      {softify.statusLabel}
                    </Chip>
                  </div>

                  <p className="text-[17px] leading-[1.6] text-muted-fg mb-6 max-w-[50ch]">
                    {softify.outcome}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {softify.highlightTech.map((tech) => (
                      <Chip key={tech} variant="outline" size="md">
                        {tech}
                      </Chip>
                    ))}
                  </div>

                  {/* Micro-interactive preview */}
                  <div className="w-full mb-8">
                    <SoftifyInteractive />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button href="/projects/softify" variant="primary" size="md" shimmer>
                      <span>Case study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    {softify.repoUrl && (
                      <Button href={softify.repoUrl} external variant="secondary" size="md">
                        <span>View Source</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Visual Column */}
                <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
                  <div className="w-full max-w-[300px] sm:max-w-[320px] rounded-2xl bg-muted/30 p-3 sm:p-5 shadow-inner">
                    <DeviceFrame
                      type="mobile"
                      src={softify.screenshots[0]}
                      alt="Softify mobile application interface showing music home feed"
                    />
                  </div>
                </div>
              </div>
            </Spotlight>
          </div>

          {/* Card 2: Ludo (6-col Bento Card) */}
          <div className="lg:col-span-6">
            <Spotlight className="h-full rounded-2xl border border-border bg-card/85 dark:bg-card/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-bold tracking-tight text-fg">
                      {ludo.name}
                    </h3>
                    <Chip variant="success" size="sm">
                      {ludo.statusLabel}
                    </Chip>
                  </div>
                  <span className="text-xs font-mono text-muted-fg">Zero-build</span>
                </div>

                <p className="text-[15px] leading-[1.6] text-muted-fg mb-4">
                  {ludo.outcome}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ludo.highlightTech.map((tech) => (
                    <Chip key={tech} variant="outline" size="sm">
                      {tech}
                    </Chip>
                  ))}
                </div>

                {/* Interactive Dice Preview */}
                <div className="mb-6">
                  <LudoInteractive />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/80">
                {ludo.liveUrl && (
                  <Button href={ludo.liveUrl} external variant="primary" size="sm" shimmer>
                    <span>Play Online</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button href={`/projects/${ludo.slug}`} variant="secondary" size="sm">
                  <span>Case study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Spotlight>
          </div>

          {/* Card 3: StudyStack (6-col Bento Card) */}
          <div className="lg:col-span-6">
            <Spotlight className="h-full rounded-2xl border border-border bg-card/85 dark:bg-card/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-bold tracking-tight text-fg">
                      {studystack.name}
                    </h3>
                    <Chip variant="success" size="sm">
                      {studystack.statusLabel}
                    </Chip>
                  </div>
                  <span className="text-xs font-mono text-muted-fg">455 Tests</span>
                </div>

                <p className="text-[15px] leading-[1.6] text-muted-fg mb-4">
                  {studystack.outcome}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {studystack.highlightTech.map((tech) => (
                    <Chip key={tech} variant="outline" size="sm">
                      {tech}
                    </Chip>
                  ))}
                </div>

                {/* Interactive Flashcard & Focus Timer Preview */}
                <div className="mb-6">
                  <StudyStackInteractive />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/80">
                {studystack.liveUrl && (
                  <Button href={studystack.liveUrl} external variant="primary" size="sm" shimmer>
                    <span>Open Live App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button href={`/projects/${studystack.slug}`} variant="secondary" size="sm">
                  <span>Case study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Spotlight>
          </div>
        </div>

        {/* Honest "In progress" row below (Accounty) */}
        <div className="mt-16 sm:mt-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-fg mb-4">
            Under Active Development
          </div>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card/80 backdrop-blur-md p-1 shadow-sm">
            {inProgressProjects.map((item) => (
              <div
                key={item.name}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-semibold text-fg">{item.name}</h4>
                    <Chip variant="default" size="sm">
                      {item.status}
                    </Chip>
                  </div>
                  <p className="text-sm text-muted-fg mt-1 max-w-[55ch]">
                    {item.oneLiner}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {item.stack.map((stk) => (
                    <Chip key={stk} variant="outline" size="sm">
                      {stk}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
