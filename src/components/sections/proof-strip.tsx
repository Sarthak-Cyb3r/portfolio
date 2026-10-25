"use client";

import { GitCommit, ShieldCheck, Activity, Layers } from "lucide-react";
import { Stat } from "@/components/ui/stat";
import { VERIFIED_TEST_STATS } from "@/data/site";
import type { CommitData } from "@/lib/github";

interface ProofStripProps {
  latestCommit?: CommitData | null;
}

export function ProofStrip({ latestCommit }: ProofStripProps) {
  return (
    <section
      id="stats"
      aria-labelledby="proof-heading"
      className="relative py-14 sm:py-18 border-y border-border/80 bg-card/60 backdrop-blur-md"
    >
      {/* Top and Bottom Glowing Hairlines */}
      <div className="absolute top-0 inset-x-0 glowing-divider" />
      <div className="absolute bottom-0 inset-x-0 glowing-divider" />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <h2 id="proof-heading" className="sr-only">
          Verified Engineering Metrics
        </h2>

        {/* 4 Real Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-border/70">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-muted-fg uppercase tracking-wider">Live</span>
            </div>
            <Stat
              value={4}
              label="Platforms shipped"
              sublabel="Android, iOS, Linux, Web"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-mono text-muted-fg uppercase tracking-wider">Tests passing</span>
            </div>
            <Stat
              value={VERIFIED_TEST_STATS.totalPassing}
              label="Automated tests passing"
              sublabel="170 Softify unit & integration tests"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[11px] font-mono text-muted-fg uppercase tracking-wider">Codebases</span>
            </div>
            <Stat
              value={3}
              label="Flagship projects"
              sublabel="Clean architecture & zero-build"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-mono text-muted-fg uppercase tracking-wider">Releases</span>
            </div>
            <Stat
              value={30}
              label="GitHub releases"
              sublabel="Softify v3.0.1 latest"
            />
          </div>
        </div>

        {/* Commit status bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-fg">
          {latestCommit ? (
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <GitCommit className="w-3.5 h-3.5 text-fg" />
              <span>
                Last commit <strong className="text-fg font-medium">{latestCommit.relativeTime}</strong> to{" "}
                <a
                  href={latestCommit.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  {latestCommit.repo}
                </a>
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5 text-muted-fg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified in Softify repository test suite</span>
          </div>
        </div>
      </div>
    </section>
  );
}
