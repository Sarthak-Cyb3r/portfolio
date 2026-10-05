"use client";

import { useSyncExternalStore } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

function subscribeSound(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("sound-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sound-change", callback);
  };
}

function getSoundSnapshot(): boolean {
  return sound.isEnabled();
}

export function SoundToggle({ className }: { className?: string }) {
  const enabled = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    () => false
  );

  const handleToggle = () => {
    sound.toggle();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("sound-change"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? "Mute interface audio feedback" : "Enable interface audio feedback"}
      title={enabled ? "Audio feedback enabled (click to mute)" : "Audio feedback muted (click to enable)"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-[var(--c-line)] text-[var(--c-muted)] transition-colors hover:border-[var(--c-line-strong)] hover:text-[var(--c-text)]",
        enabled && "text-accent-3 border-accent-3/40",
        className
      )}
    >
      {enabled ? (
        <SpeakerHigh size={17} weight="duotone" aria-hidden />
      ) : (
        <SpeakerSlash size={17} weight="regular" aria-hidden />
      )}
    </button>
  );
}
