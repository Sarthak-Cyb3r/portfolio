import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted border border-border text-sm font-mono font-semibold text-accent">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-fg">
            Page not found
          </h1>
          <p className="text-sm text-muted-fg leading-relaxed">
            The page you requested could not be found or has moved to a new URL.
          </p>
        </div>

        <div>
          <Button href="/" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to homepage</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
