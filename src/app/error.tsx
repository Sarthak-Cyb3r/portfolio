"use client";

import { useEffect } from "react";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900 text-sm font-mono font-semibold">
          ERR
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-fg">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-fg leading-relaxed">
            An unexpected error occurred while rendering this view.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="md">
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </Button>
          <Button href="/" variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4" />
            <span>Homepage</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
