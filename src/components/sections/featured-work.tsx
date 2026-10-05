"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/bits";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section
      id="work"
      aria-labelledby="featured-work-heading"
      className="shell section"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <div>
            <SectionHeading
              kicker="Featured Projects"
              title="Built to solve real problems."
              lead="Games, study systems and utility tools with live demos, native builds and real code."
            />
          </div>
        </Reveal>

        <Reveal delay={0.2} className="shrink-0">
          <Button href="/projects" variant="quiet">
            Browse all ({projects.length})
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 sm:mt-16">
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
