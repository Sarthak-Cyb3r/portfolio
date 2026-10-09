import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted border border-border text-sm font-mono font-semibold text-accent">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-fg">
            Project not found
          </h1>
          <p className="text-sm text-muted-fg leading-relaxed">
            This project is not published or the URL has changed.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button href="/projects" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4" />
            <span>All projects</span>
          </Button>
          <Button href="/" variant="secondary" size="md">
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
