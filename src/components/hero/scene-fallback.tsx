"use client";

export function SceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Aurora glow blobs */}
      <div className="absolute h-64 w-64 rounded-full bg-gradient-to-tr from-[#7C5CFF]/30 to-[#38E1FF]/20 blur-3xl" />
      <div className="absolute h-48 w-48 rounded-full bg-gradient-to-br from-[#38E1FF]/25 to-[#C6FF4A]/15 blur-2xl translate-x-12 translate-y-8" />

      {/* Geometric SVG lattice emblem */}
      <div className="relative flex h-72 w-72 items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none text-[#38E1FF]/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Outer circle */}
          <circle cx="100" cy="100" r="90" strokeDasharray="4 6" opacity="0.5" />
          {/* Inner rings */}
          <ellipse cx="100" cy="100" rx="80" ry="35" opacity="0.6" />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="35"
            transform="rotate(60 100 100)"
            opacity="0.6"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="35"
            transform="rotate(120 100 100)"
            opacity="0.6"
          />
          {/* Central polygon */}
          <polygon
            points="100,45 145,75 145,125 100,155 55,125 55,75"
            stroke="url(#fallback-aurora)"
            strokeWidth="1.8"
          />
          <defs>
            <linearGradient id="fallback-aurora" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="50%" stopColor="#38E1FF" />
              <stop offset="100%" stopColor="#C6FF4A" />
            </linearGradient>
          </defs>
        </svg>

        {/* Core pulsing icon or glowing nucleus */}
        <div className="absolute h-10 w-10 rounded-full bg-gradient-to-br from-[#7C5CFF] via-[#38E1FF] to-[#C6FF4A] shadow-[0_0_30px_rgba(56,225,255,0.6)]" />
      </div>
    </div>
  );
}
