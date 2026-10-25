"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Smartphone, Apple, Terminal, Globe } from "lucide-react";

export function HeroDevice3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

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
      className="relative w-full max-w-[500px] lg:max-w-[540px] aspect-[4/3] flex items-center justify-center [perspective:1200px]"
    >
      {/* Ambient Luminous Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-primary/25 via-secondary/15 to-transparent blur-3xl opacity-60 animate-pulse" />
      </div>

      {/* 3D Transform Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Desktop Window Frame */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 sm:right-4 top-6 w-[260px] sm:w-[320px] aspect-[16/10] rounded-xl border border-white/15 dark:border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden [transform:translateZ(20px)_rotateY(-6deg)_rotateX(4deg)] hidden sm:block"
        >
          {/* Mockup Titlebar */}
          <div className="h-6.5 bg-slate-900/40 border-b border-border/80 flex items-center px-2.5 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] font-mono text-muted-fg ml-2">Softify Desktop (Linux x64)</span>
          </div>
          <div className="relative w-full h-[calc(100%-26px)] bg-slate-950/40">
            <Image
              src="/projects/softify/05_now_playing_self_aware.png"
              alt="Softify desktop audio engine view"
              fill
              className="object-cover object-top opacity-90"
              sizes="320px"
            />
          </div>
        </motion.div>

        {/* Foreground Mobile Phone Frame */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-[210px] sm:w-[235px] rounded-[38px] border-[5px] border-slate-800/90 dark:border-slate-800 bg-slate-950 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] [transform:translateZ(60px)]"
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 inset-x-0 mx-auto w-16 h-3 bg-slate-900 rounded-full z-30" />

          {/* Screen Content */}
          <div className="relative w-full aspect-[9/19.5] rounded-[30px] overflow-hidden bg-slate-950">
            <Image
              src="/projects/softify/01_homepage.png"
              alt="Softify mobile application interface"
              fill
              priority
              className="object-cover object-top"
              sizes="235px"
            />
            {/* Screen Sheen Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Orbiting Platform Badges with Spatial Z-Translation */}
        <motion.div
          className="absolute -left-2 sm:left-4 top-14 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(80px)]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
          <span>Android</span>
        </motion.div>

        <motion.div
          className="absolute -right-2 sm:right-2 bottom-16 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(70px)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <Apple className="w-3.5 h-3.5 text-sky-500" />
          <span>iOS</span>
        </motion.div>

        <motion.div
          className="absolute left-6 sm:left-10 bottom-8 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(85px)]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          <span>Linux</span>
        </motion.div>

        <motion.div
          className="absolute right-10 sm:right-16 top-4 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(75px)]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          <span>Web</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
