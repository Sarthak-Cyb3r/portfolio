import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.cover ?? project.screenshots[0];

  return (
    <Card className="group overflow-hidden bg-card border border-border flex flex-col h-full hover-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border">
        {image ? (
          <Image
            src={image}
            alt={`${project.name} cover`}
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 400px"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-fg font-semibold text-2xl">
            {project.name[0]}
          </div>
        )}

        <div className="absolute top-3 left-3">
          <Chip
            variant={project.status === "completed" ? "success" : "default"}
            size="sm"
          >
            {project.statusLabel}
          </Chip>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-fg leading-relaxed line-clamp-2">
            {project.outcome}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.highlightTech.map((tech) => (
              <Chip key={tech} variant="outline" size="sm">
                {tech}
              </Chip>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline pt-2 border-t border-border w-full justify-between"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
