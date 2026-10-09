import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface DeviceFrameProps {
  type?: "mobile" | "desktop";
  src?: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function DeviceFrame({
  type = "mobile",
  src,
  alt = "App preview",
  className,
  children,
  width = 600,
  height = 1200,
  priority = false,
}: DeviceFrameProps) {
  if (type === "mobile") {
    return (
      <div
        className={cn(
          "relative mx-auto rounded-[36px] p-2 bg-slate-900 border border-slate-750 shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden",
          className
        )}
      >
        {/* Dynamic Island / speaker notch */}
        <div className="absolute top-4 inset-x-0 mx-auto w-24 h-4 bg-black rounded-full z-20 pointer-events-none" />

        {/* Screen Content */}
        <div className="relative rounded-[28px] overflow-hidden bg-slate-950 aspect-[9/19.5]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              sizes="(max-width: 768px) 100vw, 420px"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            children
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-[14px] bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden",
        className
      )}
    >
      {/* Desktop browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        <div className="mx-auto w-2/5 h-5 bg-card/80 border border-border/80 rounded-md flex items-center justify-center text-[10px] text-muted-fg font-mono">
          app.local
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative overflow-hidden bg-slate-950">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="w-full h-auto object-cover"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
