"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "@phosphor-icons/react";
import { sound } from "@/lib/sound";

export function CopySnippet({
  command,
  label,
}: {
  command: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      sound.playChime();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 p-3 font-mono text-xs">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <Terminal size={16} className="text-accent-2 shrink-0" />
        {label && <span className="text-faint text-[0.7rem] uppercase">{label}:</span>}
        <code className="text-text truncate select-all">{command}</code>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1 text-muted hover:border-line-strong hover:text-text transition-colors shrink-0"
      >
        {copied ? (
          <>
            <Check size={13} weight="bold" className="text-ok" />
            <span className="text-ok font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
