# Reference Study & Visual Intelligence (REFERENCES.md)

Analysis of award-winning SaaS landing pages: **Linear**, **Vercel**, **Raycast**, **Resend**, **Framer**, **Magic UI**, and **Aceternity UI**.

---

## 10 Concrete Observations for High-Craft SaaS Portfolios

1. **Hero Depth & Lighting Hierarchy**:
   Premium SaaS sites never place flat text on a blank background. They build subtle atmospheric depth: an ambient radial aurora wash (top-center or behind the centerpiece), layered with a faint grid/dot matrix that fades out via radial alpha mask (`radial-gradient(ellipse at center, black 40%, transparent 80%)`).

2. **Hero Centerpiece Mechanics**:
   The hero visual is never a static PNG card. In Linear and Raycast, product mockups have subtle 3D tilt perspective, ambient floating keyframes (`translateY(-6px)` slowly), crisp device bezels, and secondary orbiting badges (platform icons, status indicators) that react smoothly to cursor tilt.

3. **Floating Glass Dock Navigation**:
   Top navigation floats as an elevated capsule pill (`rounded-full`, `backdrop-blur-xl`, `border border-border/80`, `shadow-sm`). It includes active tab indicators, hover magnification/spring micro-interactions, theme toggle, and auto-hides on downward scroll while immediately returning on scroll up.

4. **Cinematic First-Visit Preloader**:
   Top Framer and design engineer sites feature an ultra-snappy 1.2s–1.6s intro sequence on initial session entry: SVG logo stroke draw (`pathLength 0 -> 1`), masked title reveal, and an upward curtain wipe into the page. Subsequent navigations check `sessionStorage` and skip immediately to keep DX instant.

5. **Cursor-Tracked Spotlight & Bento Cards**:
   Cards in Linear and Magic UI track mouse movement `(clientX, clientY)` relative to the card bounds, projecting an ethereal radial spotlight across the surface and illuminating the 1px hairline border with localized glow.

6. **Dual-Row Marquee with Gradient Fade Masks**:
   Tech stacks and badges look static when stacked in simple bullet lists. Linear/Vercel present them in dual-row infinite marquees with opposing translation directions, hover-pause interaction, and dual-ended alpha masks (`mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent)`).

7. **Animated Beams Architecture**:
   Diagrams transition from static boxes to living conduits: SVG curved bezier paths with continuous flowing gradient particles depicting data and distribution pipelines (e.g. Code → Engines → Multi-platform compilation).

8. **Live Interactive Mini-Demos Inside Bento Cells**:
   High-craft portfolios let visitors play with micro-interactions directly inside the bento grid: an animated audio waveform in Softify, a 3D dice roll simulator for Ludo, and a priority streak/flip interaction for StudyStack.

9. **Scroll-Driven Timeline & Number Tickers**:
   Process workflows use an interactive vertical timeline where a glowing SVG path draws progressively as the user scrolls, triggering milestone nodes. Stats use high-frame-rate Number Tickers that initialize with raw HTML values for SSR/SEO and count up smoothly on first viewport entry.

10. **Tactile Shimmer Buttons & Border Beams**:
    CTAs command attention through moving light strokes: rotating border beam rays around button perimeters and subtle sweeping gradient shimmers (`shimmer-slide`) rather than flat solid blocks.
