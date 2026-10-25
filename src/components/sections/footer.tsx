export function Footer() {
  return (
    <footer className="relative border-t border-border/80 bg-bg pt-16 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Giant Monolithic Wordmark */}
        <div
          aria-hidden="true"
          className="text-[13vw] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-fg/15 to-fg/5 uppercase font-sans mb-8 pointer-events-none"
        >
          SARTHAK
        </div>

        {/* Single clean credit line */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-fg text-center">
          <span>© 2026 Sarthak</span>
          <span>·</span>
          <span>Engineered with Next.js, Motion &amp; GSAP</span>
        </div>
      </div>
    </footer>
  );
}
