# Motion, Transition & Typography Architecture Specification

**Project:** Sarthak Developer Portfolio  
**Engine:** GSAP 3.15.0 + ScrollTrigger + Lenis 1.3.26 + Motion 14.0.0  
**Quality Standards:** Linear / Vercel / Apple product pages  

---

## 1. Scroll Engine Infrastructure

- **Lenis ↔ GSAP Synchronization**:
  ```ts
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **100svh Pinned Master Stage**: The desktop and mobile cinematic viewport remains pinned at `fixed inset-0 h-[100svh]` while a spacer element of `10 * 100vh` drives native scrolling.
- **Timeline Snapping**: Scrubbed with `scrub: 0.7` and snapped to scene labels (`s0` through `s9`) with `snapTo: "labels"`, duration range `0.35s – 0.8s`, and `power2.inOut` easing.
- **Overlap**: Each scene's entrance begins with `<30%` overlap during the previous scene's exit to eliminate blank frames.
- **Accessibility & Accessibility Fallback**:
  - `prefers-reduced-motion` automatically bypasses pinning and activates **Classic View**.
  - A persistent view mode switcher pill (`[Cinematic Stage / Classic View]`) allows instant toggling.
  - Inactive scenes in cinematic mode receive `inert={true}` to prevent keyboard focus traps and off-screen screen-reader pollution.

---

## 2. Scene Timeline & Transition Breakdown

| Scene | ID | Hash | Transition Type | Easing | Duration | Shared Element Anchor |
|---|---|---|---|---|---|---|
| **0** | `hero` | `#hero` | **Masked Line Reveal & Char Stagger** | `expo.out` | 1.0s | Hero right: `x: 70%, y: -4%, rotateY: 14deg, scale: 0.95` |
| **1** | `stats` | `#stats` | **Perspective Tilt-In** (`rotateX: 18deg -> 0deg`) | `expo.out` / `power3.in` | 1.0s | Metrics lower-left: `x: -80%, y: 18%, rotateY: -12deg, scale: 0.75` |
| **2** | `softify` | `#softify` | **Zoom-Through Focal Expansion** | `expo.out` / `power3.in` | 1.0s | Softify center-right: `x: 55%, y: 0%, rotateY: 6deg, scale: 1.05` |
| **3** | `ludo` | `#ludo` | **3D Card Flip / rotateY** (`rotateY: -45deg -> 0deg`) | `expo.out` / `power3.in` | 1.0s | Ludo right: `x: 65%, y: 12%, rotateY: 18deg, scale: 0.85` |
| **4** | `studystack` | `#studystack` | **Stack Fan-Out** | `expo.out` / `power3.in` | 1.0s | StudyStack upper-right: `x: 70%, y: -8%, rotateY: -10deg, scale: 0.82` |
| **5** | `tech` | `#tech` | **SVG Path Drawing (DrawSVG Conduits)** | `expo.out` / `power3.in` | 1.0s | Toolchain bottom-center: `x: 0%, y: 32%, rotateX: 25deg, scale: 0.65` |
| **6** | `how-i-build` | `#how-i-build` | **Horizontal Slide Multi-Layer Parallax** | `expo.out` / `power3.in` | 1.0s | Settles and fades out into workflow workstation |
| **7** | `terminal` | `#terminal` | **Clip-Path Inset Wipe** (`inset(0% 100% 0% 0%)`) | `power4.out` / `power3.in` | 1.0s | Terminal console focus |
| **8** | `about` | `#about` | **Background Morph & Scrubbed Read-Along** | `expo.out` / `power3.in` | 1.0s | Typography centerpiece |
| **9** | `contact` | `#contact` | **Clip-Path Circle Wipe** (`circle(0% -> 150%)`) | `power3.out` | 1.2s | Contact CTA & giant footer wordmark |

---

## 3. Animated Typography System

1. **Hero H1**: Masked line reveal with rotating keyword vertical roll (`Android` ↔ `iOS` ↔ `Linux` ↔ `Web`) inside a width-interpolated mask.
2. **Scrubbed Read-Along**: About paragraph words interpolate opacity from `0.2` to `1.0` along the scroll timeline with standard typographic whitespace.
3. **Variable-Font Weight Wave**: `Roboto_Flex` heading with `wght` (100–1000) and `wdth` (25–151) axes animating a travelling weight wave on hover and scene activation.
4. **Scramble/Decode**: `ScrambleTextPlugin` decodes uppercase stat eyebrow labels from random hex/ascii glyphs (`0123456789ABCDEF!@#$%^&*`) in `0.8s`.
5. **Kinetic Marquee**: Scroll-velocity-modulated marquee strip applying real-time dynamic skew (`Math.max(-4, Math.min(4, velocity * 0.003))`) degrees.
6. **Tabular Numeral Roll**: Number tickers roll with tabular figures and a subtle glow pulse at the final verified value.
7. **Sticky Headline Swap**: Softify headline swaps between `"On-Device Intelligence"`, `"5-Band DSP Equalizer"`, and `"Zero Cloud Telemetry"` with masked cross-fade transitions.
8. **Footer Wordmark**: Giant `"SARTHAK"` anchor rising with letter-by-letter mask stagger and low-opacity ambient shimmer.

---

## 4. Signature Interactive Effects

1. **Persistent Traveling 3D Device (`TravelingDevice`)**: A high-craft metallic bezel smartphone mockup traveling through scenes 0 through 5 with interpolated 3D transforms (`x`, `y`, `rotateX`, `rotateY`, `rotateZ`, `scale`), dynamic screen swapping, and velocity-agitated equalizer bars.
2. **Velocity-Agitated Softify Waveform**: Audio equalizer bar heights and animation frequencies scale proportionally with scroll speed and settle into an idle rhythm when stationary.
3. **Physics Dice Roll (`LudoInteractive`)**: Click-to-roll 3D tumble with `rotateX(720deg)`, `rotateY(540deg)`, and `rotateZ(360deg)` using `power4.out` and `bounce.out` easing, landing on an authentic roll value (1 to 6).
4. **SM-2 Algorithm Flip Card (`StudyStack`)**: Interactive 3D card flip revealing the mathematical memory decay formula on demand.
5. **Magnetic Copy Email**: Border Beam button morphing from copy icon to emerald checkmark with clipboard feedback.

---

## 5. Performance, Memory & Frame Budget

- **Hardware Acceleration**: Only `transform`, `opacity`, `filter`, and `clip-path` are animated. Reflow triggers (`letter-spacing`, `font-size`, `width`/`height` layouts) are avoided during active scroll ticks.
- **GPU Layer Management**: `will-change: transform` is restricted exclusively to the active scene and traveling device.
- **Frame Rate Target**: 60 FPS verified across desktop and mobile viewports with smooth trackpad inertia and keyboard navigation.
