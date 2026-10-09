"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";

const ABOUT_PARAGRAPH =
  "I am an independent software developer focused on systems architecture, client-side intelligence, and cross-platform native execution. Rather than building ephemeral web prototypes or unvalidated concepts, I engineer resilient tools, games, and applications that run offline, respect user privacy, and compile into verifiable binaries.";

const VALUES = [
  {
    title: "Working software first",
    desc: "If it cannot be compiled, installed, and verified on a real machine, it is not done.",
  },
  {
    title: "Respect the device",
    desc: "Zero tracking, client-side data persistence, and minimal memory footprints.",
  },
  {
    title: "Disciplined engineering",
    desc: "Understand every line of code, eliminate edge cases, and verify with automated tests.",
  },
] as const;

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mr-[0.3em]">
      <motion.span style={{ opacity }} className="text-fg transition-opacity">
        {word}
      </motion.span>
    </span>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = ABOUT_PARAGRAPH.split(" ");

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="About"
          title="Building with intention."
          description="A quiet commitment to verifiable code, local-first performance, and craft."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Scroll-scrubbed word opacity reveal */}
          <div ref={containerRef} className="lg:col-span-7">
            <p className="text-xl sm:text-2xl font-medium leading-[1.6] text-muted-fg/40 select-none">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
          </div>

          {/* Right Column: 3 One-Line Values */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="p-5.5 rounded-2xl bg-card/85 dark:bg-card/70 backdrop-blur-xl border border-border shadow-xs hover:border-primary/40 transition-all duration-200 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-fg">
                    {val.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-fg leading-relaxed pl-4.5">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
