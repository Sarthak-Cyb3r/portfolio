"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { Smartphone, Apple, Terminal, Globe } from "lucide-react";

export function HeroDevice3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Scroll scrubbed transformation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.92]);

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
      className="relative w-full max-w-[500px] lg:max-w-[540px] aspect-[4/3] sm:aspect-[1/1] flex items-center justify-center [perspective:1200px]"
    >
      {/* Ambient background glow & particles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent blur-3xl opacity-70 animate-pulse" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[
          { top: "15%", left: "10%", delay: 0 },
          { top: "25%", right: "12%", delay: 1.2 },
          { bottom: "20%", left: "18%", delay: 2.4 },
          { bottom: "35%", right: "8%", delay: 0.8 },
        ].map((pt, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            style={{ top: pt.top, left: pt.left, right: pt.right }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pt.delay,
            }}
          />
        ))}
      </div>

      {/* 3D Transform Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scrollScale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Angled Desktop / Tablet Frame */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-2 sm:right-4 top-8 sm:top-12 w-[240px] sm:w-[320px] aspect-[16/10] rounded-xl border border-white/20 dark:border-white/10 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden [transform:translateZ(20px)_rotateY(-8deg)_rotateX(6deg)] hidden sm:block"
        >
          {/* Mockup titlebar */}
          <div className="h-6 bg-slate-900/10 dark:bg-white/5 border-b border-border/60 flex items-center px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="text-[9px] font-mono text-muted-fg/70 ml-2">Softify Desktop</span>
          </div>
          <div className="relative w-full h-[calc(100%-24px)] bg-slate-950/20">
            <Image
              src="/projects/softify/05_now_playing_self_aware.png"
              alt="Softify desktop player view"
              fill
              className="object-cover object-top opacity-85"
              sizes="320px"
            />
          </div>
        </motion.div>

        {/* Foreground Flagship Mobile Phone Frame */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20 w-[210px] sm:w-[240px] rounded-[38px] border-[5px] border-slate-900/90 dark:border-slate-800 bg-slate-950 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] [transform:translateZ(60px)]"
        >
          {/* Screen Notch / Dynamic Island */}
          <div className="absolute top-3 inset-x-0 mx-auto w-16 h-3 bg-slate-900 rounded-full z-30" />

          {/* Screen Glass */}
          <div className="relative w-full aspect-[9/19.5] rounded-[30px] overflow-hidden bg-slate-950">
            <Image
              src="/projects/softify/01_homepage.png"
              alt="Softify mobile application interface showing music home feed"
              fill
              priority
              className="object-cover object-top"
              sizes="240px"
            />
            {/* Screen sheen reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Orbiting Platform Badges */}
        <motion.div
          className="absolute -left-2 sm:left-4 top-16 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 dark:bg-card/80 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(80px)]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
          <span>Android</span>
        </motion.div>

        <motion.div
          className="absolute -right-2 sm:right-2 bottom-20 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 dark:bg-card/80 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(70px)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Apple className="w-3.5 h-3.5 text-sky-500" />
          <span>iOS</span>
        </motion.div>

        <motion.div
          className="absolute left-6 sm:left-12 bottom-12 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 dark:bg-card/80 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(85px)]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          <span>Linux</span>
        </motion.div>

        <motion.div
          className="absolute right-12 sm:right-20 top-6 z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 dark:bg-card/80 backdrop-blur-md px-3 py-1.5 shadow-lg text-xs font-medium text-fg [transform:translateZ(75px)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          <span>Web</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
