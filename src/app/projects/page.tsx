import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/project-filters";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production applications across native mobile, desktop, and web environments. Real code, real installers, no placeholders.",
};

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-24 max-w-[1120px] mx-auto px-4 sm:px-6">
      <SectionHeader
        as="h1"
        label="Project Directory"
        title="All Projects"
        description="A complete index of native mobile apps, multiplayer games, and systems software built end-to-end."
      />

      <ProjectFilters />
    </div>
  );
}
