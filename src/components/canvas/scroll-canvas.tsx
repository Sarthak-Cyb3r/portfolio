"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useScroll, useReducedMotion } from "motion/react";

const DynamicScrollScene = dynamic(() => import("./scroll-scene"), {
  ssr: false,
});

function subscribeNoop() {
  return () => {};
}

function checkWebGLSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function ScrollCanvas() {
  const hasWebGL = useSyncExternalStore(
    subscribeNoop,
    checkWebGLSnapshot,
    () => false,
  );
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Keep scroll progress in a ref for the Three.js useFrame loop
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollRef.current = latest;
    });

    const onPointerMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointerRef.current = {
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: (e.touches[0].clientY / window.innerHeight) * 2 - 1,
        };
      }
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        pointerRef.current = {
          x: Math.max(-1, Math.min(1, e.gamma / 30)),
          y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)),
        };
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    return () => {
      unsubscribe();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", onOrientation);
      }
    };
  }, [scrollYProgress]);

  if (!hasWebGL || reduced) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute right-[10%] top-[15%] h-96 w-96 rounded-full bg-gradient-to-br from-[#7C5CFF]/20 via-[#38E1FF]/15 to-transparent blur-3xl" />
        <div className="absolute left-[5%] top-[45%] h-80 w-80 rounded-full bg-gradient-to-tr from-[#38E1FF]/15 to-[#C6FF4A]/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
    >
      <DynamicScrollScene
        scrollProgress={scrollRef}
        pointer={pointerRef}
      />
    </div>
  );
}
