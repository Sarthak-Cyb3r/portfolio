"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface TravelingDeviceProps {
  velocity?: number;
  activeScreen?: "softify" | "ludo" | "studystack";
}

export const TravelingDevice = forwardRef<HTMLDivElement, TravelingDeviceProps>(
  function TravelingDevice({ velocity = 0, activeScreen = "softify" }, ref) {
    const isLudo = activeScreen === "ludo";
    const isStudy = activeScreen === "studystack";
    const screenSrc = isLudo
      ? "/projects/ludo/demo-board.png"
      : isStudy
      ? "/projects/studystack/dashboard.png"
      : "/projects/softify/01_homepage.png";

    // Modulate equalizer activity with velocity
    const barSpeed = Math.max(0.4, 1.2 - Math.min(0.8, Math.abs(velocity) * 0.001));

    return (
      <div
        ref={ref}
        id="traveling-hero-device"
        className="pointer-events-none select-none z-30 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Device Frame */}
        <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-[44px] p-2.5 bg-slate-900/95 border-2 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_rgba(37,99,235,0.2)] backdrop-blur-md">
          {/* Outer Metallic Bezel Highlight */}
          <div className="absolute inset-0 rounded-[44px] border border-white/20 pointer-events-none" />

          {/* Dynamic Island Pill */}
          <div className="absolute top-4 inset-x-0 mx-auto w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500/90 animate-pulse" />
            <div className="flex gap-0.5 items-end h-2.5">
              {[4, 8, 5].map((h, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-primary rounded-full"
                  style={{
                    height: `${h}px`,
                    animation: `pulse ${barSpeed}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-slate-950 border border-white/5">
            <Image
              src={screenSrc}
              alt="Softify client-side application interface"
              width={600}
              height={1300}
              priority
              className="w-full h-full object-cover object-top transition-opacity duration-500"
            />

            {/* Gloss Reflection Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40"
              style={{ mixBlendMode: "overlay" }}
            />

            {/* Bottom Floating Pill Bar with Velocity-Agitated Equalizer */}
            <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between z-20 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[11px] font-semibold text-white tracking-tight">
                  {isLudo ? "Ludo Real-Time" : isStudy ? "StudyStack" : "Softify v2.0.5"}
                </span>
              </div>
              <div className="flex items-end gap-1 h-3.5">
                {[4, 10, 7, 12, 6, 11, 5].map((baseHeight, idx) => {
                  const animatedHeight = Math.min(
                    14,
                    baseHeight + Math.min(6, Math.abs(velocity) * 0.005)
                  );
                  return (
                    <span
                      key={idx}
                      className="w-0.5 rounded-full bg-gradient-to-t from-primary to-accent"
                      style={{
                        height: `${animatedHeight}px`,
                        animation: `bounce ${barSpeed}s ease-in-out infinite alternate`,
                        animationDelay: `${idx * 0.08}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
