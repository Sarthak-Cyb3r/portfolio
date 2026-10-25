"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error("Application error boundary triggered:", error);

    // Auto-recover from deployment chunk mismatch
    const isChunkError =
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch dynamically imported module");

    if (isChunkError) {
      const hasReloaded = sessionStorage.getItem("chunk_reload_attempted");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_reload_attempted", "true");
        window.location.reload();
      }
    }
  }, [error]);

  const handleHardReset = () => {
    setReloading(true);
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

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

        {error && (
          <div className="text-left bg-slate-900/90 text-rose-300 p-4 rounded-xl border border-rose-500/30 text-xs font-mono max-h-48 overflow-auto shadow-inner">
            <p className="font-bold text-rose-400 mb-1">{error.name}: {error.message}</p>
            {error.digest && <p className="text-muted-fg text-[10px]">Digest: {error.digest}</p>}
            {error.stack && (
              <pre className="text-[10px] text-slate-400 whitespace-pre-wrap mt-2 overflow-x-auto">
                {error.stack.slice(0, 500)}
              </pre>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="md">
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </Button>
          <Button onClick={handleHardReset} variant="outline" size="md" disabled={reloading}>
            <Trash2 className="w-4 h-4" />
            <span>Clear cache & Reload</span>
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
