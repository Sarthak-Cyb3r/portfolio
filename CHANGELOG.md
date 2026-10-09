# Changelog

All notable architectural and design improvements to Sarthak's portfolio are documented here.

## [3.3.0] - 2026-10-10

### Refinements & Accessibility Hardening
- **Single Global Footer**: Eliminated duplicate footer elements between Scene 9 and layout. Simplified root `Footer` to a single credit line (`© 2026 Sarthak · Engineered with Next.js, Motion & GSAP`) and removed scrapable mailto anchors.
- **Hero H1 Crawler & Screen Reader Accessibility**: Exposed full sentence (`"I build and ship real apps: Android, iOS, Linux and web."`) via `aria-label` and `sr-only` span across both `CinematicStage` and `Hero` while preserving visual rotating keyword. Fixed missing space in `"Shipped native across "` label.
- **Verified Metrics & Privacy Grounding**: Replaced `"Zero invented numbers."` and `"VERIFIED COMPILER STATS"` with `"By the numbers."`. Replaced unverifiable `"0 Cloud telemetry"` stat with verified GitHub releases count (`9 GitHub releases` across native platforms). Removed absolute privacy claims that contradicted Ludo's Firestore architecture.
- **Benefit-First Softify Scene Copy**: Rewrote Softify showcase text to two punchy benefit-oriented sentences focusing on ad-free streaming, instant offline playback, and custom EQ. Moved technical deep-dive terms (subword trigrams, Catmull-Rom Bézier spline DSP, ISO-BMFF chunk offset shifting) to the dedicated case study page (`/projects/softify`).
- **Softify Release Tag Consistency**: Verified and synchronized `v2.0.5` release tag consistently across hero status pill, scene badge, case study data, download assets, and documentation.
- **Accessible Kinetic Marquee**: Tagged duplicated copies with `aria-hidden="true"`, added hover-pause (`hover:[animation-play-state:paused]`), and disabled animations and skew transforms under `prefers-reduced-motion`.
- **Labelled Cinematic / Classic Switch & Contact Copy**: Renamed stage switcher to an accessible labelled switch with `aria-pressed`, explicit stage states, and persisted preference in `localStorage`. Rewrote contact copy to natural phrasing (`"Get in touch directly below"`).

## [3.2.0] - 2026-10-09

### Phase 3: Scroll Animation, Effects & Animated Typography
- **Synchronized Scroll Engine**: Wired Lenis smooth scroll directly into GSAP ticker (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`).
- **100svh Pinned Master Stage (`CinematicStage`)**: Orchestrated 10 sequential scenes (`s0` to `s9`) along a pinned ScrollTrigger timeline with ~30% exit/entrance overlap and snap-to-labels. Maintained single semantic `<h1>` invariant and `inert` accessibility attribute on inactive scenes.
- **Persistent 3D Traveling Device (`TravelingDevice`)**: Metallic device frame persisting and morphing across scenes 0 through 5 (Hero -> Metrics -> Softify -> Ludo -> StudyStack -> Toolchain) with velocity-modulated equalizer audio bars and screen state switching.
- **Velocity-Reactive Dynamics**: Real-time scroll velocity modulates kinetic marquee skew (`clamp(-4, 4, vel * 0.003)`), motion blur, and Softify waveform frequency/amplitude.
- **HUD & Scene Rail**: Right-aligned HUD with mechanical digit-roll counter ("01 / 10"), vertical progress gauge, clickable scene dot tooltips, keyboard navigation (Arrow keys, Space, Home, End), and hash deep-linking (`#hero`, `#stats`, `#softify`, `#ludo`, `#studystack`, `#tech`, `#methods`, `#terminal`, `#about`, `#contact`).
- **Animated Typography**: Added Google `Roboto_Flex` variable display font with weight/width wave (`VariableWaveHeading`), `ScrambleTextPlugin` cipher decode (`ScrambleText`), cycling headline swap on Softify, tabular numerals, and masked footer wordmark.
- **12 Non-Repeating Transitions**: Masked line reveals, perspective tilt-in, zoom-through, 3D card flip / rotateY, stack fan-out, SVG DrawSVG path conduit, horizontal multi-layer parallax, clip-path inset wipe, background morph, number roll, and clip-path circle wipe.
- **Classic View Fallback**: Accessible persistent toggle between Cinematic Stage and Classic View, with automatic fallback for `prefers-reduced-motion` and low-power environments.
- **Motion Specification (`MOTION.md`)**: Comprehensive documentation covering timeline architecture, transition vocabulary, typography techniques, interactive physics, and frame budgets.

## [3.1.0] - 2026-10-09

### Trust & Precision Fixes
- **About Typography & Spacing**: Fixed word-by-word reveal dropped whitespace by replacing `inline-block mr-[0.3em]` with natural typographic `inline` spans followed by standard whitespace (`{" "}`). Added `aria-label` to parent `<p>` and `aria-hidden="true"` to child spans. Verified visually at 1440px and 390px viewports.
- **Server-Side GitHub Commit Activity**: Replaced client-side fetch and "recently" fallback with a server-side GitHub API integration in `src/lib/github.ts` using Next.js 1-hour ISR revalidation (`revalidate: 3600`). Hides line completely without layout shift if API fails.
- **Ludo Fact Grounding**: Removed unverifiable `"0ms state latency"` claim from `LudoInteractive` footer; replaced with verifiable repository facts: `"2–6 players · Android, Linux, Web"`.
- **Test & CI Status Verification**: Updated proof strip badge from "CI Verified" to "Tests passing" and cited repository test suites (625 total tests: 455 StudyStack + 170 Softify) due to absence of GitHub Actions workflow runs.
- **Softify Version Consistency**: Synchronized version `v2.0.5` across hero status pill, case study notes, and downloads. Aligned Linux asset name to `.tar.gz` (`Softify-Linux-x64.tar.gz`), eliminating AppImage mentions.
- **Unified Tech Grouping**: Merged disparate tech sections into ONE grouped list of 4 clean categories (Mobile, Web, Backend & Data, Tooling), capped at 12 items, with concise 1-2 word chips. Removed redundant marquees.
- **Terminal Console Cleanliness**: Removed fake `"v2.4 (Production Shell)"` string from terminal output; retained only authentic commands.
- **Canonical URL & Domain Redirects**: Standardized on `https://sarthak-cyb3r.vercel.app` as single canonical URL across `SITE_URL`, `metadataBase`, `alternates.canonical`, and absolute OG/Twitter image URLs. Added permanent 301 redirects in `next.config.ts` and `vercel.json` for alias domains.
- **Public README Rewrite**: Rewrote `README.md` with accurate `package.json` dependency versions (Next.js 16.3.8, React 19.2.8, Motion 14, Tailwind 4), hero preview image, animation overview, setup instructions, and feature lists. Removed Torus Knot, calculator claims, and all emoji headings.
- **Quality Gates**: Verified clean compile with Next.js 16.3.8 App Router SSG (10 static pages), 0 ESLint warnings/errors, 0 TypeScript errors (`npx tsc --noEmit`), and 32/32 audit checks passing.

## [3.0.0] - 2026-10-09

### Summary
Complete visual overhaul elevating the portfolio into a funded, award-level SaaS landing page inspired by Linear, Vercel, Raycast, Resend, and Magic UI. Kept the clean, disciplined layout and 100% verified trust constraints while incorporating high-craft interactive features, 3D spring tilt physics, and cinematic motion.

### 1. Motion & Cinematic Preloader
- **Cinematic Intro Sequence (`Preloader`)**: First-visit session check via `sessionStorage` (`portfolio_intro_seen`), SVG monogram "S" path draw (`pathLength 0 -> 1`), masked letter-by-letter reveal ("S A R T H A K"), gradient progress bar, and upward curtain wipe revealing the page. Bypassed immediately if `prefers-reduced-motion` is set.
- **Precision Custom Cursor (`CustomCursor`)**: Multi-layered spring follower (inner point + outer halo) with reactive scaling and accent tint when hovering clickable elements. Automatically disabled on touchscreen/coarse devices and reduced-motion modes.
- **Accent Scroll Progress Bar (`ScrollProgress`)**: Top fixed 2px reading progress bar rendered with an animated gradient from Primary (`#2563EB`) via Secondary (`#7C3AED`) to Accent (`#EC4899`).

### 2. Floating Dock Navigation
- **Floating Glass Dock (`Navbar`)**: Floating pill dock (`backdrop-blur-xl`, `bg-card/85`), active-section indicator pill sliding between links via `layoutId="active-nav-indicator"`, auto-hiding on scroll-down and revealing on scroll-up, live indicator dot, ⌘K trigger, theme toggle, and mobile responsive drawer.

### 3. Hero Visuals & 3D Interactive Device
- **Spotlight & Radial Wash**: Cursor-following radial spotlight mask dynamically illuminating the dot grid around the cursor.
- **Text Shimmer Headline**: Masked line-by-line reveal with gradient text shimmer on "Android, iOS, Linux and web."
- **Border Beam Shimmer Button**: Primary CTA equipped with GPU-accelerated animated border beam traveling the perimeter and internal light sweep.
- **HeroDevice3D Standout Visual**: Dual-device perspective mockup featuring a floating phone running Softify (`01_homepage.png`) and an angled desktop tablet in the background (`05_now_playing_self_aware.png`), mouse tilt tracking with spring physics, floating sparks, and orbiting platform badges (Android, iOS, Linux, Web).

### 4. Interactive Bento Grid & Micro-Apps
- **Softify Micro-App (`SoftifyInteractive`)**: Playable audio waveform equalizer with multi-frequency bouncing bars, on-device SQLite FTS5 search simulator with instant filtering, and platform badges.
- **Ludo Micro-App (`LudoInteractive`)**: Interactive 3D rolling dice with realistic tumble animations, dot pip faces (1–6), roll history streak, and live turn indicator.
- **StudyStack Micro-App (`StudyStackInteractive`)**: 3D interactive flashcard with card flip revealing the SM-2 algorithm formula, and functional Pomodoro focus timer with start/pause/reset.

### 5. Architecture Conduit & Proof Strip
- **Animated Beam Conduit (`Tech`)**: SVG architecture diagram connecting Core Foundations → Sarthak Engine → Target Platforms with animated glowing particle beams flowing along conduits. Dual-row infinite marquee with edge fade masks and pause-on-hover.
- **Proof Strip**: Animated Number Ticker counters, glowing hairline dividers, live GitHub commit pulse with recent activity sparkline blocks, and 100% verified test counts (625 total passing tests).

### 6. Timeline & macOS Glass Terminal
- **Scroll-Driven Timeline (`HowIBuild`)**: Scroll-linked gradient line drawing down between methodology phases as user scrolls.
- **macOS Glass Terminal (`TerminalConsole`)**: Translucent dark glass window with scanline overlay, macOS window dots, auto-typing demo sequence on first scroll into view, interactive CLI commands, and mobile suggested chips.

### 7. Footer Watermark & Case Studies
- **Contact**: Animated gradient headline, magnetic "Copy email" button with success ripple, live timezone indicator ("IST · UTC+5:30").
- **Footer**: Giant typographic watermark ("SARTHAK") anchoring the base with low opacity.
- **Case Study Pages (`/projects/[slug]`)**: Animated SVG architecture diagrams with flowing conduits, sticky Table of Contents, and floating bottom download bar with Border Beam.

---

## [2.0.0] - 2026-10-09

### Summary
Complete redesign and upgrade of the portfolio into a minimalist, SaaS-grade, premium site inspired by Linear, Vercel, and Stripe design standards. Replaced dark-neon cyberpunk theme with a light-first design system featuring a single blue accent (`#2563EB`), verified claims, and production-tested engineering case studies.

---

### 1. Content, Trust & Safety Fixes
- **School and Personal Information**: Removed all school references from titles, metadata, OpenGraph, JSON-LD, badges, about copy, and footer. Kept age ("16") as one quiet statement on the homepage.
- **Scrapable Email Protection**: Removed raw email text from nav, hero, and footer. Placed email once in the Contact section accompanied by a dedicated "Copy email" button. Centralized email in `EMAIL` constant in `src/data/site.ts`.
- **Test Metric Reconciliation**: Eliminated conflicting test numbers (457 vs 455). Reconciled against repository sources of truth: 455 passing tests in StudyStack (`PROJECT_STATUS.md`) and 170 in Softify (`README.md`), totalling 625 passing automated tests.
- **Tone & Copy Sanitization**: Removed defensive/edgy phrases including `"Zero Fake Links / Pure Code"`, `"No templates"`, `"0 Build Errors"`, `"vibe coder"`, `"01 // HERO"`, and fake version strings. Replaced with calm, factual engineering descriptions.
- **Softify Framing**: Reframed from "free/ad-free 320kbps music streamer" into an engineering case study highlighting Clean Architecture, on-device SQLite FTS5 search & recommendation intelligence, offline ISO-BMFF MP4 atom shifting, and zero cloud telemetry. Explicitly documented iOS installation via sideloading (AltStore, SideStore, TrollStore).
- **Ludo Architecture Realism**: Corrected "WebSocket/Firestore" to "Firestore real-time listeners" with anonymous Firebase authentication and zero-build static frontend.
- **Accounty Realism**: Removed fake chart data (`-$420/mo`). Replaced with honest "In Progress" listing reflecting active prototyping without fabricated metrics.
- **Heading Hierarchy**: Eliminated duplicate `<h1>` tags across pages. Every page now contains exactly one semantic `<h1>`.

---

### 2. Design System & Typography
- **Design Tokens**: Persisted specification to `design-system/sarthak-portfolio/MASTER.md`.
  - Light mode (default): Background `#F8FAFC`, Surface `#FFFFFF`, Foreground `#1E293B`, Muted Foreground `#475569`, Border `rgba(15,23,42,0.08)`, Muted `#E9EFF8`, Accent `#2563EB`, On-Accent `#FFFFFF`.
  - Dark mode: Background `#0B0F17`, Surface `#111827`, Foreground `#F8FAFC`, Muted Foreground `#94A3B8`, Accent `#3B82F6`.
  - Persisted with `localStorage` and a blocking inline script to guarantee zero flash of unstyled content (FOUC).
- **Subtle Radial Wash**: Replaced neon diffuse blobs with a single subtle top-right radial wash (`<= 6% opacity`).
- **Typography**: Swapped Bricolage Grotesque and Instrument Sans for **Plus Jakarta Sans** (400, 500, 600 weights). Restricted Geist Mono strictly to code blocks, sha256 checksums, and the interactive terminal console.
- **Layout & Spacing**: 1120px container (`max-w-[1120px]`), 8px grid alignment, and 120-160px section spacing.
- **Icons**: Transitioned exclusively to **Lucide React** (SVG). Removed all emoji from the UI and deleted `@phosphor-icons/react` dependencies in new components.
- **Primitives Built**: Created reusable primitives for `Button` (44px min-height, focus rings), `Chip`, `Card` (14px radius, 1px border, 2px lift), `SectionHeader`, `Stat` (HTML-first rendering), `DownloadButton`, and `DeviceFrame`.

---

### 3. Homepage Redesign
- **Sticky Navbar**: Hairline border, backdrop blur on scroll, Sarthak logo, direct section links (Work · About · Contact), ⌘K search trigger, light/dark theme toggle, and GitHub link. Includes clean mobile slide-down sheet menu.
- **Hero**: Clean status pill (`Softify v2.0 is out →`), masked line-by-line H1 reveal, one-line subtext, primary "View work" and secondary "GitHub" buttons, single device-framed Softify mobile screenshot, and quiet platform row ("Shipped on Android · iOS · Linux · Web").
- **Selected Work**: 3 flagship cards (Softify, Ludo, StudyStack) with identical structure (thumbnail/device frame, title, one-line outcome, 3 tech chips, status chip, primary action + case study). Alternating left/right desktop layout, followed by honest "In Progress" row for Accounty.
- **Proof Strip**: Replaced arbitrary metrics and marquee with 4 verified HTML-first stats (4 platforms shipped, 625 automated tests passing, 3 flagship projects, 0 cloud telemetry) and a live, fail-safe "Last commit X ago" GitHub API indicator.
- **Tech**: Replaced moving marquee with a static, clean 4-group grid (12 tools total: Mobile, Web, Backend & Data, Tooling).
- **How I Build**: 4 concise, one-sentence methodology cards with a subtle desktop connecting line.
- **Terminal Console**: Toned-down light neutral card with pure Geist Mono interior. Implemented real commands (`help`, `whoami`, `projects`, `skills`, `download`, `contact`, `theme`, `clear`) and mobile-friendly tappable chips. Removed matrix and fake benchmark tests.
- **About**: One concise paragraph with scroll-scrubbed word opacity reveal (20% to 100%) paired with 3 one-line engineering values.
- **Contact**: Clean card with "Let's build something.", "I reply within a day.", one-click "Copy email" button with feedback, and GitHub profile link.
- **Footer**: Ultra-minimalist footer: `© 2026 Sarthak` with GitHub and Email icons only.
- **Command Palette**: Re-architected ⌘K modal with keyboard navigation, section jumping, project deep-links, and theme toggle.

---

### 4. Case Studies (`/projects/*`)
- **Full Case Study Template**: Standardized across Softify, Ludo, and StudyStack:
  1. Header with platforms, status, and test count badge.
  2. Overview (The Problem + The Solution & Outcome).
  3. Real screenshots displayed inside responsive `DeviceFrame` components.
  4. Vector SVG system architecture diagram tailored to each project's layers.
  5. 3–4 Key architectural decisions with detailed engineering rationales.
  6. Challenges encountered and concrete lessons learned.
  7. Technical stack chips.
  8. Chronological release notes.
  9. Standalone `DownloadButton` featuring OS auto-detection (Android, Linux, iOS), file sizes, verified SHA-256 checksums with copy buttons, and collapsible installation help.
  10. Previous / Next case study navigation.
  11. Desktop sticky mini-nav for quick section jumping.

---

### 5. Motion & Performance
- **Motion Rules**: Configured global easing `cubic-bezier(0.22, 1, 0.36, 1)`, no bounce/overshoot. Durations between 300ms and 900ms. Animate only transform, opacity, and entry blur.
- **Lenis Smooth Scroll**: Added Lenis smooth scrolling (`lerp: 0.09`) with automatic anchor offsets for the sticky header. Disabled automatically when `prefers-reduced-motion` is active.
- **Critical Path Clean-Up**: Removed React Three Fiber / Three.js 3D canvas and custom mouse cursor from the critical page path, accelerating First Contentful Paint and preventing layout shifts.
- **OpenGraph & SEO**: Generated clean 1200x630 OG image (`/og.png`) and per-project OpenGraph images featuring real screenshot composites and crisp typography. Configured JSON-LD Person and SoftwareApplication schemas.
