import { ScrollCanvas } from "@/components/canvas/scroll-canvas";
import { ScrollNavHud } from "@/components/motion/scroll-nav-hud";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FeaturedBento } from "@/components/sections/featured-bento";
import { TerminalConsole } from "@/components/sections/terminal-console";
import { TechMarquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { HowIBuild } from "@/components/sections/how-i-build";

export default function Home() {
  return (
    <>
      <ScrollCanvas />
      <ScrollNavHud />
      <Hero />
      <Stats />
      <FeaturedBento />
      <TerminalConsole />
      <TechMarquee />
      <About />
      <HowIBuild />
    </>
  );
}
