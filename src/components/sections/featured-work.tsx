"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, inProgressProjects } from "@/data/projects";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { DeviceFrame } from "@/components/ui/device-frame";
import { SoftifyInteractive } from "@/components/projects/softify-interactive";
import { LudoInteractive } from "@/components/projects/ludo-interactive";
import { MacOSTahoeInteractive } from "@/components/projects/macos-tahoe-interactive";

export function FeaturedWork() {
  const softify = projects.find((p) => p.slug === "softify")!;
  const ludo = projects.find((p) => p.slug === "ludo-vercel" || p.slug === "ludo")!;
  const macosTahoe = projects.find((p) => p.slug === "macos-tahoe")!;

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Selected Work"
          title="Engineered for reliability."
          description="Native mobile apps, zero-build multiplayer games, and desktop runtime hooks built from scratch."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
          {/* Card 1: Softify (Full-width 12-col Bento Card) */}
          <div className="lg:col-span-12 rounded-xl border border-border bg-card p-6 sm:p-10 shadow-xs hover:border-border-hover transition-colors">
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

                <p className="text-[16px] leading-relaxed text-muted-fg mb-5 max-w-[50ch]">
                  {softify.outcome}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {softify.highlightTech.map((tech) => (
                    <Chip key={tech} variant="outline" size="sm">
                      {tech}
                    </Chip>
                  ))}
                </div>

                {/* Micro-interactive preview */}
                <div className="w-full mb-6">
                  <SoftifyInteractive />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button href="/projects/softify" variant="primary" size="md">
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
                <div className="w-full max-w-[280px] sm:max-w-[300px] rounded-xl bg-muted/40 p-3 sm:p-4 border border-border">
                  <DeviceFrame
                    type="mobile"
                    src={softify.screenshots[0]}
                    alt="Softify mobile application interface showing music home feed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ludo (6-col Bento Card) */}
          <div className="lg:col-span-6 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:border-border-hover transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    {ludo.name}
                  </h3>
                  <Chip variant="success" size="sm">
                    {ludo.statusLabel}
                  </Chip>
                </div>
                <span className="text-xs font-mono text-muted-fg">Zero-build</span>
              </div>

              <p className="text-sm leading-relaxed text-muted-fg mb-4">
                {ludo.outcome}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
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

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
              {ludo.liveUrl && (
                <Button href={ludo.liveUrl} external variant="primary" size="sm">
                  <span>Play Online</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              )}
              <Button href={`/projects/${ludo.slug}`} variant="secondary" size="sm">
                <span>Case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Card 3: macOS Tahoe 26 on Linux Mint (6-col Bento Card) */}
          <div className="lg:col-span-6 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:border-border-hover transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    macOS Tahoe 26
                  </h3>
                  <Chip variant="success" size="sm">
                    {macosTahoe.statusLabel}
                  </Chip>
                </div>
                <span className="text-xs font-mono text-muted-fg">C Hook & GLSL</span>
              </div>

              <p className="text-sm leading-relaxed text-muted-fg mb-4">
                {macosTahoe.outcome}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {macosTahoe.highlightTech.map((tech) => (
                  <Chip key={tech} variant="outline" size="sm">
                    {tech}
                  </Chip>
                ))}
              </div>

              {/* Interactive C Hook & GLSL Curve Preview */}
              <div className="mb-6">
                <MacOSTahoeInteractive />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
              {macosTahoe.repoUrl && (
                <Button href={macosTahoe.repoUrl} external variant="primary" size="sm">
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              )}
              <Button href={`/projects/${macosTahoe.slug}`} variant="secondary" size="sm">
                <span>Case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* In progress projects */}
        {inProgressProjects.length > 0 && (
          <div className="mt-16">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-fg mb-4">
              Under Active Development
            </div>
            <div className="divide-y divide-border rounded-xl border border-border bg-card p-1 shadow-xs">
              {inProgressProjects.map((item) => (
                <div
                  key={item.name}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-fg">{item.name}</h4>
                      <Chip variant="default" size="sm">
                        {item.status}
                      </Chip>
                    </div>
                    <p className="text-xs text-muted-fg mt-1">
                      {item.oneLiner}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
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
        )}
      </div>
    </section>
  );
}
