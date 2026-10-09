"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { processSteps } from "@/data/site";
import { Spotlight } from "@/components/ui/spotlight";
import { CheckCircle2, Wrench, ShieldCheck, Rocket } from "lucide-react";

const STEP_ICONS = [Wrench, CheckCircle2, ShieldCheck, Rocket];

export function HowIBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 sm:py-32 border-t border-border/80 bg-dot-pattern/40">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Methodology"
          title="How I build software."
          description="A disciplined workflow from user friction to reproducible, checksum-verified native binaries."
        />

        {/* Scroll-driven Vertical Timeline */}
        <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
          {/* Static Background Guideline */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-border/80" />

          {/* Dynamic Scroll-drawn Glowing Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-1/2 top-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_12px_rgba(37,99,235,0.8)] origin-top"
          />

          {/* Steps */}
          <div className="flex flex-col gap-12 sm:gap-16">
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
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-card shadow-md">
                      <span className="text-xs font-mono font-bold text-primary">{step.step}</span>
                      <div className="absolute -inset-1 rounded-full border border-primary/30 animate-pulse pointer-events-none" />
                    </div>
                  </div>

                  {/* Card Content Column */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <Spotlight className="rounded-2xl border border-border bg-card/85 dark:bg-card/70 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono text-muted-fg uppercase tracking-widest font-semibold">
                          Phase {step.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-fg tracking-tight mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-fg">
                        {step.body}
                      </p>
                    </Spotlight>
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
