"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function HeroDevice3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] lg:max-w-[520px] aspect-[4/3] flex items-center justify-center [perspective:1000px]"
    >
      {/* 3D Transform Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Desktop Window Preview */}
        <div className="absolute right-0 top-4 w-[280px] sm:w-[340px] aspect-[16/10] rounded-xl border border-border bg-card shadow-xl overflow-hidden [transform:translateZ(10px)] hidden sm:block">
          {/* Window Titlebar */}
          <div className="h-7 bg-muted/60 border-b border-border flex items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <span className="text-[10px] font-mono text-muted-fg">softify_engine.rs — 60 FPS</span>
            <div className="w-4" />
          </div>

          {/* Desktop Screenshot */}
          <div className="relative w-full h-[calc(100%-28px)] bg-muted/20">
            <Image
              src="/projects/softify/05_now_playing_self_aware.png"
              alt="Softify desktop audio engine view"
              fill
              className="object-cover object-top opacity-90"
              sizes="340px"
            />
          </div>
        </div>

        {/* Foreground Mobile Phone Frame */}
        <div className="relative z-20 w-[200px] sm:w-[225px] rounded-[36px] border-[4px] border-border bg-card p-2 shadow-2xl [transform:translateZ(40px)]">
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-3 inset-x-0 mx-auto w-14 h-3 bg-slate-900 dark:bg-slate-800 rounded-full z-30" />

          {/* Screen Content */}
          <div className="relative w-full aspect-[9/19.5] rounded-[28px] overflow-hidden bg-slate-950">
            <Image
              src="/projects/softify/01_homepage.png"
              alt="Softify mobile music interface"
              fill
              priority
              className="object-cover object-top"
              sizes="225px"
            />
            {/* Subtle Screen Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Crisp Engineering Status Badge */}
        <div className="absolute left-2 sm:left-6 bottom-4 z-30 inline-flex items-center gap-2 rounded-lg border border-border bg-card/95 backdrop-blur-md px-3 py-1.5 shadow-md text-xs font-mono text-fg [transform:translateZ(55px)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>v3.0.1 Verified</span>
        </div>
      </motion.div>
    </div>
  );
}
