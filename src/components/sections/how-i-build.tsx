"use client";

import {
  BugBeetle,
  Package,
  Sparkle,
  TerminalWindow,
} from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/bits";
import { processSteps } from "@/data/site";

const iconMap = {
  Sparkle,
  TerminalWindow,
  BugBeetle,
  Package,
};

export function HowIBuild() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="shell section"
    >
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <SectionHeading
            align="center"
            kicker="The Vibe Coding Workflow"
            title="How I build software that survives."
            lead="Speed with AI is meaningless without discipline. Here is how I go from initial spark to shipping real installers."
          />
        </Reveal>
      </div>

      <div className="mt-14 sm:mt-18">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Sparkle;
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <StaggerItem key={step.title}>
                <div className="card relative h-full flex flex-col p-6 transition-all duration-300 hover:border-line-strong hover:-translate-y-1 bg-surface">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-2">
                      STEP {stepNumber}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-text">
                      <Icon size={18} weight="duotone" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg text-text font-bold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted mt-auto">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
