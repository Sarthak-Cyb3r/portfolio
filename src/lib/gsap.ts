import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register all GSAP plugins once in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    Flip,
    SplitText,
    ScrambleTextPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin
  );
}

export {
  gsap,
  ScrollTrigger,
  Flip,
  SplitText,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
};
