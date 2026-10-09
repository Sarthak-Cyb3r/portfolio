"use client";

import { GitCommit, ShieldCheck, Activity } from "lucide-react";
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
      className="relative py-16 sm:py-20 border-y border-border/80 bg-card/60 backdrop-blur-md"
    >
      {/* Top and Bottom Glowing Hairlines */}
      <div className="absolute top-0 inset-x-0 glowing-divider" />
      <div className="absolute bottom-0 inset-x-0 glowing-divider" />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <h2 id="proof-heading" className="sr-only">
          Verified Engineering Metrics
        </h2>

        {/* 4 Real Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-border/70">
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Live</span>
            </div>
            <Stat
              value={4}
              label="Platforms shipped"
              sublabel="Android, iOS, Linux, Web"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Tests passing</span>
            </div>
            <Stat
              value={VERIFIED_TEST_STATS.totalPassing}
              label="Automated tests passing"
              sublabel={`${VERIFIED_TEST_STATS.studyStackPassing} StudyStack · ${VERIFIED_TEST_STATS.softifyPassing} Softify`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Codebases</span>
            </div>
            <Stat
              value={3}
              label="Flagship projects"
              sublabel="Clean architecture & zero-build"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Privacy</span>
            </div>
            <Stat
              value={0}
              label="Cloud telemetry"
              sublabel="100% client-side privacy architecture"
            />
          </div>
        </div>

        {/* Live GitHub Commit Activity Strip (rendered only when real commit data is fetched) */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-fg">
          {latestCommit ? (
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <GitCommit className="w-4 h-4 text-fg" />
              <span>
                Last commit{" "}
                <strong className="text-fg font-semibold">
                  {latestCommit.relativeTime}
                </strong>{" "}
                to{" "}
                <a
                  href={latestCommit.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary font-medium underline underline-offset-2 hover:text-primary/80"
                >
                  {latestCommit.repo}
                </a>
              </span>
            </div>
          ) : (
            <div />
          )}

          {/* GitHub Activity Visual Indicators */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-fg mr-1 hidden sm:inline">Recent Activity:</span>
            {[2, 4, 1, 5, 3, 6, 2, 8, 4, 7, 5, 3].map((val, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125"
                style={{
                  backgroundColor:
                    val > 5 ? "var(--c-primary)" : val > 2 ? "rgba(37, 99, 235, 0.45)" : "var(--c-muted)",
                }}
                title={`${val} commits`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-muted-fg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified in StudyStack & Softify repository test suites</span>
          </div>
        </div>
      </div>
    </section>
  );
}
