"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { processSteps } from "@/data/site";
import { CheckCircle2, Wrench, ShieldCheck, Rocket } from "lucide-react";

const STEP_ICONS = [Wrench, CheckCircle2, ShieldCheck, Rocket];

export function HowIBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Methodology"
          title="How I build software."
          description="A disciplined workflow from user friction to reproducible, checksum-verified native binaries."
        />

        {/* Vertical Timeline */}
        <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
          {/* Static Background Guideline */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-border" />

          {/* Dynamic Scroll-drawn Indicator */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-1/2 top-4 w-px -translate-x-1/2 bg-primary origin-top"
          />

          {/* Steps */}
          <div className="flex flex-col gap-10 sm:gap-14">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];

              return (
                <div
                  key={step.step}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Timeline Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-xs">
                      <span className="text-[11px] font-mono font-semibold text-fg">{step.step}</span>
                    </div>
                  </div>

                  {/* Card Content Column */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:border-border-hover transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4 text-muted-fg" />
                        <span className="text-[11px] font-mono text-muted-fg uppercase tracking-wider">
                          Phase {step.step}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-fg tracking-tight mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-fg">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
