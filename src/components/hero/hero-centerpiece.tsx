"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { HandPointing } from "@phosphor-icons/react";
import { SceneFallback } from "./scene-fallback";
import { sound } from "@/lib/sound";

const DynamicScene3D = dynamic(() => import("./scene-3d"), {
  ssr: false,
  loading: () => <SceneFallback />,
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

export function HeroCenterpiece() {
  const hasWebGL = useSyncExternalStore(
    subscribeNoop,
    checkWebGLSnapshot,
    () => false,
  );
  const reduced = useReducedMotion();
  const pointerRef = useRef({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const canRender3D = hasWebGL && !reduced;

  useEffect(() => {
    // Desktop mouse move
    const onPointerMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    // Mobile device orientation (gyroscope tilt)
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-1.5, Math.min(1.5, e.gamma / 25));
        const tiltY = Math.max(-1.5, Math.min(1.5, (e.beta - 45) / 25));
        pointerRef.current = { x: tiltX, y: tiltY };
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", onOrientation);
      }
    };
  }, []);

  // Touch drag interactions for mobile users
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setHasInteracted(true);
      sound.haptic(14);
      const touch = e.touches[0];
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!lastTouchRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = (touch.clientX - lastTouchRef.current.x) / 50;
    const dy = (touch.clientY - lastTouchRef.current.y) / 50;

    pointerRef.current = {
      x: Math.max(-2, Math.min(2, pointerRef.current.x + dx)),
      y: Math.max(-2, Math.min(2, pointerRef.current.y + dy)),
    };

    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing select-none"
    >
      {canRender3D ? (
        <>
          <DynamicScene3D pointer={pointerRef} />
          {/* Subtle Mobile Gesture Badge */}
          {!hasInteracted && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full border border-accent-2/40 bg-surface/90 px-3 py-1 font-mono text-[0.65rem] text-accent-2 shadow-lg backdrop-blur-md animate-pulse pointer-events-none lg:hidden">
              <HandPointing size={13} weight="fill" />
              <span>Swipe 3D Core</span>
            </div>
          )}
        </>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}
