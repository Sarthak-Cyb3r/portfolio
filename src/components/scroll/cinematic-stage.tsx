"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  GitCommit,
  Copy,
  Check,
  Smartphone,
  Globe,
  Database,
  Terminal as TerminalIcon,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SceneRail, SCENES_META } from "@/components/scroll/scene-rail";
import { TravelingDevice } from "@/components/scroll/traveling-device";
import { ScrambleText } from "@/components/scroll/scramble-text";
import { KineticMarquee } from "@/components/scroll/kinetic-marquee";
import { VariableWaveHeading } from "@/components/scroll/variable-wave-heading";
import { BorderBeam } from "@/components/ui/border-beam";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";
import { projects } from "@/data/projects";
import { EMAIL, GITHUB_URL, VERIFIED_TEST_STATS } from "@/data/site";
import type { CommitData } from "@/lib/github";

// Classic Fallback Sections
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Tech } from "@/components/sections/tech";
import { HowIBuild } from "@/components/sections/how-i-build";
import { TerminalConsole } from "@/components/sections/terminal-console";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

interface CinematicStageProps {
  latestCommit?: CommitData | null;
}

const HERO_KEYWORDS = ["Android", "iOS", "Linux", "Web"] as const;

export function CinematicStage({ latestCommit }: CinematicStageProps) {
  const [viewMode, setViewMode] = useState<"cinematic" | "classic">("cinematic");
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Softify headline swap state
  const [softifyHeadlineIdx, setSoftifyHeadlineIdx] = useState(0);

  // Interactive dice state for Ludo
  const [diceVal, setDiceVal] = useState(6);
  const [diceRolling, setDiceRolling] = useState(false);

  // Interactive StudyStack flashcard flip
  const [cardFlipped, setCardFlipped] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLElement | null)[]>([]);

  // Rotating hero keyword interval
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % HERO_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Softify headline cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setSoftifyHeadlineIdx((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Roll dice with realistic 3D tumble physics
  const rollPhysicsDice = () => {
    if (diceRolling) return;
    setDiceRolling(true);

    const diceEl = document.getElementById("ludo-physics-dice");
    if (diceEl) {
      gsap.to(diceEl, {
        rotateX: "+=720",
        rotateY: "+=540",
        rotateZ: "+=360",
        scale: 1.15,
        duration: 0.65,
        ease: "power4.out",
        onComplete: () => {
          const finalRoll = Math.floor(Math.random() * 6) + 1;
          setDiceVal(finalRoll);
          gsap.to(diceEl, {
            scale: 1,
            duration: 0.25,
            ease: "bounce.out",
            onComplete: () => setDiceRolling(false),
          });
        },
      });
    } else {
      setTimeout(() => {
        setDiceVal(Math.floor(Math.random() * 6) + 1);
        setDiceRolling(false);
      }, 600);
    }
  };

  const copyEmailAddress = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saved = localStorage.getItem("sarthak-view-mode");
    if (prefersReduced || saved === "classic") {
      queueMicrotask(() => {
        setViewMode("classic");
      });
    }
  }, []);

  const toggleViewMode = () => {
    const nextMode = viewMode === "cinematic" ? "classic" : "cinematic";
    setViewMode(nextMode);
    localStorage.setItem("sarthak-view-mode", nextMode);
  };

  const navigateToScene = useCallback((sceneIdx: number) => {
    if (viewMode !== "cinematic" || !masterTlRef.current) {
      const targetId = SCENES_META[sceneIdx]?.id;
      if (targetId) {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const st = masterTlRef.current.scrollTrigger;
    if (st) {
      const targetProgress = sceneIdx / (SCENES_META.length - 1);
      const scrollY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  }, [viewMode]);

  // Keyboard navigation across scenes
  useEffect(() => {
    if (viewMode !== "cinematic") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        navigateToScene(Math.min(SCENES_META.length - 1, currentScene + 1));
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        navigateToScene(Math.max(0, currentScene - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        navigateToScene(0);
      } else if (e.key === "End") {
        e.preventDefault();
        navigateToScene(SCENES_META.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, currentScene, navigateToScene]);

  // Master ScrollTrigger timeline initialization
  useEffect(() => {
    if (viewMode !== "cinematic") return;
    if (!stageRef.current || !spacerRef.current) return;

    const scenesCount = SCENES_META.length;
    const sceneElements = scenesRef.current.filter(Boolean) as HTMLDivElement[];

    // Set initial scene states
    sceneElements.forEach((el, i) => {
      if (i === 0) {
        gsap.set(el, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
      } else {
        gsap.set(el, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
      }
    });

    // Initial device anchor (Hero right)
    if (deviceRef.current) {
      gsap.set(deviceRef.current, {
        xPercent: 70,
        yPercent: -4,
        rotateY: 14,
        rotateZ: -6,
        rotateX: 8,
        scale: 0.95,
        opacity: 1,
      });
    }

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: () => `+=${scenesCount * window.innerHeight}`,
        scrub: 0.7,
        pin: stageRef.current,
        snap: {
          snapTo: "labels",
          duration: { min: 0.35, max: 0.8 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const vel = self.getVelocity();
          setVelocity(vel);

          const activeIdx = Math.min(
            scenesCount - 1,
            Math.max(0, Math.round(self.progress * (scenesCount - 1)))
          );
          setCurrentScene(activeIdx);

          // Sync URL hash gently
          const currentMeta = SCENES_META[activeIdx];
          if (currentMeta && window.location.hash !== currentMeta.hash) {
            window.history.replaceState(null, "", currentMeta.hash);
          }
        },
      },
    });

    masterTlRef.current = master;

    // Build timeline transitions between scene pairs
    // Each step: s(i) -> s(i+1)
    const stepDuration = 1.0;

    // Transition 0 -> 1: Hero to Metrics (Perspective tilt-in)
    master.addLabel("s0");
    master.to(sceneElements[0], {
      opacity: 0,
      yPercent: -20,
      filter: "blur(6px)",
      duration: stepDuration * 0.7,
      ease: "power3.in",
      onComplete: () => {
        if (sceneElements[0]) sceneElements[0].style.pointerEvents = "none";
      },
    });
    master.fromTo(
      sceneElements[1],
      {
        opacity: 0,
        visibility: "visible",
        rotateX: 18,
        scale: 0.92,
        yPercent: 25,
      },
      {
        opacity: 1,
        rotateX: 0,
        scale: 1,
        yPercent: 0,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[1]) sceneElements[1].style.pointerEvents = "auto";
        },
      },
      "<30%" // 30% overlap
    );
    // Device travels: hero -> metrics (lower-left anchor)
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          xPercent: -80,
          yPercent: 18,
          rotateY: -12,
          rotateZ: 4,
          scale: 0.75,
          duration: stepDuration,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Transition 1 -> 2: Metrics to Softify (Zoom-Through focal expansion)
    master.addLabel("s1");
    master.to(sceneElements[1], {
      opacity: 0,
      scale: 1.1,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[2],
      {
        opacity: 0,
        visibility: "visible",
        scale: 0.85,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[2]) sceneElements[2].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    // Device travels: metrics -> Softify (zooms to center-right focal anchor)
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          xPercent: 55,
          yPercent: 0,
          rotateY: 6,
          rotateZ: 0,
          scale: 1.05,
          duration: stepDuration,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Transition 2 -> 3: Softify to Ludo (3D Card Flip / rotateY with perspective)
    master.addLabel("s2");
    master.to(sceneElements[2], {
      opacity: 0,
      rotateY: 45,
      scale: 0.9,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[3],
      {
        opacity: 0,
        visibility: "visible",
        rotateY: -45,
        scale: 0.9,
      },
      {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[3]) sceneElements[3].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    // Device travels: Softify -> Ludo (angles beside interactive dice)
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          xPercent: 65,
          yPercent: 12,
          rotateY: 18,
          rotateZ: -8,
          scale: 0.85,
          duration: stepDuration,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Transition 3 -> 4: Ludo to StudyStack (Stack Fan-Out)
    master.addLabel("s3");
    master.to(sceneElements[3], {
      opacity: 0,
      scale: 0.85,
      yPercent: 15,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[4],
      {
        opacity: 0,
        visibility: "visible",
        yPercent: -20,
        scale: 0.95,
      },
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[4]) sceneElements[4].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    // Device travels: Ludo -> StudyStack (upper right anchor)
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          xPercent: 70,
          yPercent: -8,
          rotateY: -10,
          rotateZ: 4,
          scale: 0.82,
          duration: stepDuration,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Transition 4 -> 5: StudyStack to Tech (SVG path drawing / DrawSVG conduit)
    master.addLabel("s4");
    master.to(sceneElements[4], {
      opacity: 0,
      filter: "blur(6px)",
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[5],
      {
        opacity: 0,
        visibility: "visible",
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[5]) sceneElements[5].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    // Device travels: docks bottom center as workstation anchor
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          xPercent: 0,
          yPercent: 32,
          rotateX: 25,
          rotateY: 0,
          rotateZ: 0,
          scale: 0.65,
          duration: stepDuration,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Transition 5 -> 6: Tech to How I Build (Horizontal slide with multi-layer parallax)
    master.addLabel("s5");
    master.to(sceneElements[5], {
      opacity: 0,
      xPercent: -40,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[6],
      {
        opacity: 0,
        visibility: "visible",
        xPercent: 40,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[6]) sceneElements[6].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    // Fade out traveling device as we enter detailed workflow & terminal
    if (deviceRef.current) {
      master.to(
        deviceRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: stepDuration * 0.5,
          ease: "power2.in",
        },
        "<"
      );
    }

    // Transition 6 -> 7: How I Build to Terminal (Clip-path inset wipe)
    master.addLabel("s6");
    master.to(sceneElements[6], {
      opacity: 0,
      scale: 0.95,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[7],
      {
        opacity: 0,
        visibility: "visible",
        clipPath: "inset(0% 100% 0% 0%)",
      },
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: stepDuration * 0.7,
        ease: "power4.out",
        onStart: () => {
          if (sceneElements[7]) sceneElements[7].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );

    // Transition 7 -> 8: Terminal to About (Background morph & scrubbed read-along)
    master.addLabel("s7");
    master.to(sceneElements[7], {
      opacity: 0,
      scale: 0.9,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[8],
      {
        opacity: 0,
        visibility: "visible",
        yPercent: 20,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: stepDuration * 0.7,
        ease: "expo.out",
        onStart: () => {
          if (sceneElements[8]) sceneElements[8].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );

    // Transition 8 -> 9: About to Contact & Footer (Clip-path circle wipe from CTA)
    master.addLabel("s8");
    master.to(sceneElements[8], {
      opacity: 0,
      yPercent: -15,
      duration: stepDuration * 0.7,
      ease: "power3.in",
    });
    master.fromTo(
      sceneElements[9],
      {
        opacity: 0,
        visibility: "visible",
        clipPath: "circle(0% at 50% 60%)",
      },
      {
        opacity: 1,
        clipPath: "circle(150% at 50% 60%)",
        duration: stepDuration * 0.8,
        ease: "power3.out",
        onStart: () => {
          if (sceneElements[9]) sceneElements[9].style.pointerEvents = "auto";
        },
      },
      "<30%"
    );
    master.addLabel("s9");

    // Deep link handling on initial load
    if (window.location.hash) {
      const targetHash = window.location.hash;
      const targetIdx = SCENES_META.findIndex((m) => m.hash === targetHash);
      if (targetIdx > 0) {
        setTimeout(() => {
          navigateToScene(targetIdx);
        }, 400);
      }
    }

    return () => {
      master.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [viewMode, navigateToScene]);

  const softify = projects.find((p) => p.slug === "softify")!;
  const ludo = projects.find((p) => p.slug === "ludo-vercel" || p.slug === "ludo")!;
  const studystack = projects.find((p) => p.slug === "studystack")!;

  // --------------------------------------------------------------------------
  // CLASSIC VIEW RENDER (Accessible / Reduced Motion / Toggleable Fallback)
  // --------------------------------------------------------------------------
  if (viewMode === "classic") {
    return (
      <div className="relative">
        <Hero />
        <ProofStrip latestCommit={latestCommit} />
        <FeaturedWork />
        <Tech />
        <HowIBuild />
        <TerminalConsole />
        <About />
        <Contact />

        {/* Floating View Mode Switcher Button */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            type="button"
            onClick={toggleViewMode}
            aria-pressed={false}
            aria-label="View mode switch: currently Classic. Click to switch to Cinematic Stage."
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 dark:bg-card/75 backdrop-blur-xl border border-border text-xs font-mono font-medium text-fg shadow-lg hover:border-primary/50 transition-all focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none"
          >
            <span className="text-muted-fg">Stage:</span>
            <span className="flex items-center gap-1.5 font-semibold text-fg">
              <Monitor className="w-3.5 h-3.5 text-secondary" />
              <span>Classic</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-fg px-1.5 py-0.5 rounded-md bg-muted/80 ml-1">
              Switch
            </span>
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // CINEMATIC STAGE RENDER (100svh Pinned Master Timeline)
  // --------------------------------------------------------------------------
  return (
    <div className="relative">
      {/* Spacer Element that drives the native scroll height for GSAP ScrollTrigger */}
      <div
        ref={spacerRef}
        className="w-full pointer-events-none"
        style={{ height: `${SCENES_META.length * 100}vh` }}
      />

      {/* Floating Scene Rail & HUD */}
      <SceneRail
        currentScene={currentScene}
        totalScenes={SCENES_META.length}
        scrollProgress={scrollProgress}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onNavigateToScene={navigateToScene}
      />

      {/* Pinned 100svh Master Stage Container */}
      <div
        ref={stageRef}
        className="fixed inset-0 h-[100svh] w-full overflow-hidden bg-bg text-fg select-none flex items-center justify-center"
        style={{
          perspective: "1400px",
        }}
      >
        {/* Ambient Aurora / Spotlight Background Layer */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-0 hero-radial-wash pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

        {/* Traveling 3D Device (Persists and morphs across scenes 0 to 5) */}
        <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center z-30">
          <TravelingDevice
            ref={deviceRef}
            velocity={velocity}
            activeScreen={
              currentScene === 3 ? "ludo" : currentScene === 4 ? "studystack" : "softify"
            }
          />
        </div>

        {/* ================================================================== */}
        {/* SCENE 0: HERO                                                      */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[0] = el;
          }}
          id="hero"
          inert={currentScene !== 0 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[680px]">
            {/* Status Pill with Border Beam */}
            <div className="inline-flex mb-6">
              <Link
                href="/projects/softify"
                className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 dark:bg-card/60 backdrop-blur-md border border-border text-xs font-mono text-muted-fg hover:border-primary/50 transition-all shadow-xs overflow-hidden"
              >
                <BorderBeam size={60} duration={8} delay={1} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-fg font-medium">Softify v2.0.5 is out</span>
                <span className="text-muted-fg group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </div>

            {/* Headline with Masked Word Reveal & Rotating Keyword */}
            <h1
              aria-label="I build and ship real apps: Android, iOS, Linux and web."
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.06] text-fg mb-6"
            >
              <span className="sr-only">I build and ship real apps: Android, iOS, Linux and web.</span>
              <span aria-hidden="true">
                I build and ship real apps:{" "}
                <span className="inline-block relative text-primary overflow-hidden align-baseline">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={HERO_KEYWORDS[keywordIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-gradient-shimmer"
                    >
                      {HERO_KEYWORDS[keywordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-fg leading-relaxed mb-8 max-w-[55ch]">
              Solo builder, age 16. Softify, Ludo and StudyStack are live, downloadable and
              tested across native platforms.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="#softify" variant="primary" size="lg" shimmer>
                <span>Explore Showcase</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={GITHUB_URL} external variant="secondary" size="lg">
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs font-mono text-muted-fg flex-wrap">
              <span>Shipped native across </span>
              <span className="text-fg font-semibold">Android · iOS · Linux · Web</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 1: METRICS & PROOF (Perspective Tilt-In)                    */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[1] = el;
          }}
          id="stats"
          inert={currentScene !== 1 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[700px] ml-auto">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <ScrambleText
                text="BY THE NUMBERS"
                className="text-xs uppercase tracking-widest text-primary font-semibold"
                trigger={currentScene === 1}
              />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg mb-4">
              By the numbers.
            </h2>
            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-10">
              Every count below compiles directly from source code test runners, GitHub commits,
              and native packaging pipelines.
            </p>

            {/* 4 Real Stats Bento Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm">
                <Stat value={4} label="Platforms shipped" sublabel="Android, iOS, Linux, Web" />
              </div>
              <div className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm">
                <Stat
                  value={VERIFIED_TEST_STATS.totalPassing}
                  label="Automated tests passing"
                  sublabel={`${VERIFIED_TEST_STATS.studyStackPassing} StudyStack · ${VERIFIED_TEST_STATS.softifyPassing} Softify`}
                />
              </div>
              <div className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm">
                <Stat value={3} label="Flagship codebases" sublabel="Clean architecture" />
              </div>
              <div className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm">
                <Stat
                  value={9}
                  label="GitHub releases"
                  sublabel="Softify v2.0.5 latest · Multi-platform"
                />
              </div>
            </div>

            {/* Live Commit Strip */}
            {latestCommit && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card/80 border border-border text-xs font-mono text-muted-fg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <GitCommit className="w-4 h-4 text-fg" />
                <span>
                  Last commit <strong className="text-fg">{latestCommit.relativeTime}</strong> to{" "}
                  <a
                    href={latestCommit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline font-medium"
                  >
                    {latestCommit.repo}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 2: SOFTIFY FLAGSHIP (Zoom-Through)                           */}
        {/* ================================================================== */}
        <section
          ref={(el) => {
            scenesRef.current[2] = el;
          }}
          id="work"
          data-scene="softify"
          inert={currentScene !== 2 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[620px]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                Flagship Case Study 01
              </span>
              <Chip variant="success" size="sm">
                v2.0.5 Live
              </Chip>
            </div>

            {/* Sticky Headline Swap */}
            <div className="h-16 sm:h-20 overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={softifyHeadlineIdx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-3xl sm:text-5xl font-black tracking-tight text-fg"
                >
                  {softifyHeadlineIdx === 0 && "On-Device Intelligence."}
                  {softifyHeadlineIdx === 1 && "5-Band DSP Equalizer."}
                  {softifyHeadlineIdx === 2 && "Instant Offline Playback."}
                </motion.h2>
              </AnimatePresence>
            </div>

            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-6">
              Stream music ad-free with instant offline playback and studio-grade audio controls.
              Enjoy fast on-device search and custom equalization without ads, subscriptions, or interruptions.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {softify.highlightTech.map((t) => (
                <Chip key={t} variant="outline" size="md">
                  {t}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/projects/softify" variant="primary" size="md" shimmer>
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={softify.liveUrl} external variant="secondary" size="md">
                <span>Launch Web Player</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SCENE 3: LUDO MULTIPLAYER (3D Card Flip)                          */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[3] = el;
          }}
          id="ludo"
          inert={currentScene !== 3 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[620px]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                Flagship Case Study 02
              </span>
              <Chip variant="default" size="sm">
                Zero-Build
              </Chip>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-fg mb-4">
              Multiplayer without build steps.
            </h2>

            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-6">
              Real-time board game for 2 to 6 players across classic cross, pentagon, and hexagon
              geometries. Built with vanilla JavaScript, HTML5 Canvas, and Firestore real-time
              listeners.
            </p>

            {/* Interactive Physics Dice Box */}
            <div className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm flex items-center justify-between mb-8 max-w-[420px]">
              <div>
                <div className="text-xs font-semibold text-fg mb-1">Interactive Physics Dice</div>
                <div className="text-[11px] font-mono text-muted-fg">
                  {diceRolling ? "Rolling physics tumble..." : `Landed on: ${diceVal}`}
                </div>
              </div>

              <button
                id="ludo-physics-dice"
                type="button"
                onClick={rollPhysicsDice}
                disabled={diceRolling}
                aria-label="Roll physics dice"
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-slate-200 border-2 border-slate-300 shadow-lg flex items-center justify-center text-xl font-black text-slate-900 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              >
                {diceVal}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/projects/ludo-vercel" variant="primary" size="md">
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={ludo.liveUrl} external variant="secondary" size="md">
                <span>Play Live Room</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 4: STUDYSTACK (Stack Fan-Out)                               */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[4] = el;
          }}
          id="studystack"
          inert={currentScene !== 4 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[620px]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                Flagship Case Study 03
              </span>
              <Chip variant="default" size="sm">
                455 Tests Passing
              </Chip>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-fg mb-4">
              Deterministic revision scheduling.
            </h2>

            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-6">
              A comprehensive JEE prep analytics engine. Features automated spaced-repetition
              intervals (SM-2), test diagnostic breakdowns, and 455 passing unit and integration
              tests.
            </p>

            {/* Interactive Flashcard with Flip Animation */}
            <div
              onClick={() => setCardFlipped(!cardFlipped)}
              className="p-5 rounded-2xl bg-card/90 dark:bg-card/75 border border-border shadow-sm mb-8 max-w-[420px] cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/70 text-xs font-mono text-muted-fg">
                <span>SM-2 Memory Decay Model</span>
                <span className="text-primary">Click to flip</span>
              </div>
              <div className="text-sm font-semibold text-fg">
                {cardFlipped ? (
                  <span className="text-primary font-mono">
                    I(n) = I(n-1) × EF, where EF′ = EF + (0.1 - (5 - q) × (0.08 + (5 - q) × 0.02))
                  </span>
                ) : (
                  <span>
                    How does StudyStack schedule optimal review intervals before memory decay?
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/projects/studystack" variant="primary" size="md">
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={studystack.liveUrl} external variant="secondary" size="md">
                <span>Open StudyStack</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 5: TECH / ARCHITECTURE CONDUIT (SVG DrawSVG & Kinetic Marquee) */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[5] = el;
          }}
          id="tech"
          inert={currentScene !== 5 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="text-center max-w-[700px] mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Engineering Foundations
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-fg mt-2">
              Core stack & tooling.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { cat: "Mobile", icon: Smartphone, items: ["Flutter", "Dart", "Android SDK"] },
              { cat: "Web", icon: Globe, items: ["Next.js", "TypeScript", "Tailwind CSS"] },
              { cat: "Backend & Data", icon: Database, items: ["SQLite FTS5", "Firestore", "Node.js"] },
              { cat: "Tooling", icon: TerminalIcon, items: ["Git", "Linux", "Capacitor"] },
            ].map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.cat}
                  className="p-5 rounded-2xl bg-card/85 dark:bg-card/70 border border-border shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/70 text-xs font-semibold text-fg">
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{group.cat}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((it) => (
                      <Chip key={it} variant="outline" size="sm">
                        {it}
                      </Chip>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kinetic Marquee with velocity skew */}
          <KineticMarquee velocity={velocity} />
        </div>

        {/* ================================================================== */}
        {/* SCENE 6: HOW I BUILD (Horizontal Slide Parallax)                    */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[6] = el;
          }}
          id="how-i-build"
          inert={currentScene !== 6 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-fg mt-2">
              Engineering with discipline.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Identify friction",
                desc: "Every project starts from personal usage friction—unreliable networks, bloated accounts, or opaque state.",
              },
              {
                step: "02",
                title: "Architect decoupled",
                desc: "Clean architecture isolating domain logic from audio drivers, network listeners, and render layers.",
              },
              {
                step: "03",
                title: "Stress edge cases",
                desc: "Offline atom shifting, parametric 6-player polygons, and battery-efficient isolate concurrency.",
              },
              {
                step: "04",
                title: "Verify & package",
                desc: "Automated regression test suites and multi-platform compilation for Android, Linux, and Web.",
              },
            ].map((p) => (
              <div
                key={p.step}
                className="p-5 rounded-2xl bg-card/85 dark:bg-card/70 border border-border shadow-xs flex flex-col justify-between h-[200px]"
              >
                <div className="text-xs font-mono font-bold text-primary">{p.step}</div>
                <div>
                  <h3 className="text-sm font-bold text-fg mb-1.5">{p.title}</h3>
                  <p className="text-xs text-muted-fg leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 7: TERMINAL CONSOLE (Clip-Path Inset Wipe)                   */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[7] = el;
          }}
          id="terminal"
          inert={currentScene !== 7 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="w-full max-w-[840px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  Command Line
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-fg mt-1">
                  Interactive Console
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-fg">zsh · UTF-8</span>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 shadow-2xl p-5 font-mono text-xs max-h-[380px] overflow-y-auto">
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-400">sarthak@portfolio</span>
              </div>
              <div className="space-y-2">
                <p className="text-primary font-semibold">Sarthak Terminal</p>
                <p className="text-slate-400">
                  Native Flutter · Next.js 16 · SQLite FTS5 · Zero Telemetry
                </p>
                <p className="text-slate-300">
                  Available commands:{" "}
                  <span className="text-primary underline">whoami</span> ·{" "}
                  <span className="text-primary underline">projects</span> ·{" "}
                  <span className="text-primary underline">download</span> ·{" "}
                  <span className="text-primary underline">contact</span>
                </p>
                <div className="pt-2 flex items-center gap-2 text-emerald-400">
                  <span>➜</span>
                  <span>~</span>
                  <span className="text-white">whoami</span>
                </div>
                <p className="text-slate-300">
                  16-year-old solo software developer. Building native Android, iOS, Linux, and
                  web applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 8: ABOUT (Background Morph & Variable Weight Wave)            */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[8] = el;
          }}
          id="about"
          inert={currentScene !== 8 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 z-20"
        >
          <div className="max-w-[780px]">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              About
            </span>

            {/* Variable Font Weight Wave Heading */}
            <VariableWaveHeading
              text="Building with intention."
              className="text-3xl sm:text-5xl font-black tracking-tight text-fg mt-2 mb-6"
              trigger={currentScene === 8}
            />

            <p
              aria-label="I am an independent software developer focused on systems architecture, client-side intelligence, and cross-platform native execution. Rather than building ephemeral web prototypes or unvalidated concepts, I engineer resilient tools, games, and applications that run offline, respect user privacy, and compile into verifiable binaries."
              className="text-lg sm:text-2xl font-medium leading-[1.6] text-fg select-none mb-8"
            >
              {[
                "I",
                "am",
                "an",
                "independent",
                "software",
                "developer",
                "focused",
                "on",
                "systems",
                "architecture,",
                "client-side",
                "intelligence,",
                "and",
                "cross-platform",
                "native",
                "execution.",
                "Rather",
                "than",
                "building",
                "ephemeral",
                "web",
                "prototypes",
                "or",
                "unvalidated",
                "concepts,",
                "I",
                "engineer",
                "resilient",
                "tools,",
                "games,",
                "and",
                "applications",
                "that",
                "run",
                "offline,",
                "respect",
                "user",
                "privacy,",
                "and",
                "compile",
                "into",
                "verifiable",
                "binaries.",
              ].map((w, i) => (
                <span key={i} aria-hidden="true" className="inline text-fg">
                  {w}{" "}
                </span>
              ))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Working software", desc: "If it cannot be compiled on a real machine, it is not done." },
                { title: "Respect the device", desc: "Zero tracking, local persistence, minimal memory footprints." },
                { title: "Disciplined craft", desc: "Understand every line of code, eliminate edge cases." },
              ].map((v) => (
                <div key={v.title} className="p-4 rounded-xl bg-card/80 border border-border">
                  <div className="text-xs font-bold text-fg mb-1">{v.title}</div>
                  <div className="text-xs text-muted-fg leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SCENE 9: CONTACT & FOOTER WORDMARK (Circle Wipe & Watermark)        */}
        {/* ================================================================== */}
        <div
          ref={(el) => {
            scenesRef.current[9] = el;
          }}
          id="contact"
          inert={currentScene !== 9 ? true : undefined}
          className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-6 sm:px-10 py-12 sm:py-16 z-20"
        >
          <div className="max-w-[640px]">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Get in Touch
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-fg mt-2 mb-4">
              Let&apos;s build something real.
            </h2>
            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-8">
              Open to technical collaborations, systems engineering, and open source
              inquiries. Get in touch directly below.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Magnetic copy email button with checkmark morph */}
              <button
                type="button"
                onClick={copyEmailAddress}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-white font-medium text-sm shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
              >
                <BorderBeam size={70} duration={6} />
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>

              <Button href={GITHUB_URL} external variant="secondary" size="lg">
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-8 text-xs font-mono text-muted-fg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available · IST (UTC+5:30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
