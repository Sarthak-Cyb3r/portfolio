"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** "/projects/studystack/dashboard.png" -> "dashboard" */
const humanize = (src: string) =>
  (src.split("/").pop() ?? "").replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

/**
 * Screenshot gallery: one large image plus a thumbnail row.
 *
 * Thumbnails are real buttons, so switching works with click, Tab + Enter or
 * Space. The current image is announced through a polite live region.
 * Non-active images load lazily.
 */
export function Gallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const index = Math.min(active, images.length - 1);
  const current = images[index];
  const currentLabel = `${name} ${humanize(current)} screenshot, image ${
    index + 1
  } of ${images.length}`;

  return (
    <figure className="m-0 flex flex-col gap-4">
      <div className="card relative overflow-hidden p-0">
        <div className="relative aspect-[16/10] w-full bg-surface-2">
          <Image
            key={current}
            src={current}
            alt={currentLabel}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 72rem, 100vw"
            loading={index === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="tabular pointer-events-none absolute bottom-3 right-3 rounded-full border border-line bg-bg-deep/75 px-3 py-1 font-mono text-[0.7rem] text-text backdrop-blur"
          >
            {index + 1} / {images.length}
          </span>
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {currentLabel}
      </p>

      {images.length > 1 ? (
        <ul className="flex flex-wrap gap-3">
          {images.map((src, i) => (
            <li key={`${src}-${i}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Show ${name} screenshot ${i + 1} of ${images.length}`}
                className={cn(
                  "relative block h-16 w-28 overflow-hidden rounded-lg border transition-colors duration-200 sm:h-20 sm:w-36",
                  i === index
                    ? "border-2 border-accent"
                    : "border-line hover:border-line-strong",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  width={288}
                  height={162}
                  loading="lazy"
                  sizes="9rem"
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  );
}
