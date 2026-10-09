"use client";

import { useState, useSyncExternalStore } from "react";
import { Download, ChevronDown, Check, Copy, HelpCircle, Smartphone, Terminal, Apple } from "lucide-react";
import { detectPlatform } from "@/lib/os-detect";
import type { ProjectDownloads, DownloadArtifact } from "@/data/projects";
import { Button } from "@/components/ui/button";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function subscribeOs() {
  return () => {};
}

function getOsSnapshot() {
  return detectPlatform();
}

function getServerOsSnapshot() {
  return null;
}

export function DownloadButton({
  downloads,
}: {
  downloads: ProjectDownloads;
  projectName?: string;
}) {
  const detectedOs = useSyncExternalStore(
    subscribeOs,
    getOsSnapshot,
    getServerOsSnapshot
  );
  const [showAll, setShowAll] = useState(false);
  const [activeInstallHelp, setActiveInstallHelp] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const entries: { key: string; label: string; artifact: DownloadArtifact; icon: React.ReactNode }[] = [];
  if (downloads.apk) {
    entries.push({
      key: "apk",
      label: "Android APK",
      artifact: downloads.apk,
      icon: <Smartphone className="w-4 h-4" />,
    });
  }
  if (downloads.deb) {
    entries.push({
      key: "deb",
      label: "Linux .deb",
      artifact: downloads.deb,
      icon: <Terminal className="w-4 h-4" />,
    });
  }
  if (downloads.tar) {
    entries.push({
      key: "tar",
      label: "Linux x64 .tar.gz",
      artifact: downloads.tar,
      icon: <Terminal className="w-4 h-4" />,
    });
  }
  if (downloads.ipa) {
    entries.push({
      key: "ipa",
      label: "iOS Sideload .ipa",
      artifact: downloads.ipa,
      icon: <Apple className="w-4 h-4" />,
    });
  }

  if (entries.length === 0) return null;

  // Determine primary match
  let primary = entries[0];
  if (detectedOs === "android" && downloads.apk) {
    primary = entries.find((e) => e.key === "apk") || primary;
  } else if (detectedOs === "linux") {
    primary = entries.find((e) => e.key === "deb" || e.key === "tar") || primary;
  } else if (detectedOs === "ios" && downloads.ipa) {
    primary = entries.find((e) => e.key === "ipa") || primary;
  }

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative group">
          <Button
            href={primary.artifact.file}
            external
            variant="primary"
            shimmer
            className="font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download for {primary.label}</span>
            <span className="text-xs opacity-80">({formatBytes(primary.artifact.sizeBytes)})</span>
          </Button>
        </div>

        {entries.length > 1 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium"
          >
            <span>All downloads ({entries.length})</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </Button>
        )}
      </div>

      {/* Expanded list of all downloads with checksums & install guides */}
      {showAll && (
        <div className="mt-2 rounded-[14px] border border-border bg-card p-4 flex flex-col gap-4">
          <div className="text-xs font-semibold text-muted-fg uppercase tracking-wider">
            Available Builds & Checksums
          </div>
          <div className="divide-y divide-border">
            {entries.map(({ key, label, artifact, icon }) => (
              <div key={key} className="py-3 first:pt-0 last:pb-0 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-fg">
                    {icon}
                    <span>{label}</span>
                    <span className="text-xs text-muted-fg font-normal">
                      v{artifact.version} · {formatBytes(artifact.sizeBytes)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {artifact.installGuide && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveInstallHelp(activeInstallHelp === key ? null : key)
                        }
                        className="text-xs text-muted-fg hover:text-fg flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-muted"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Install help</span>
                      </button>
                    )}
                    <a
                      href={artifact.file}
                      download={artifact.fileName}
                      className="text-xs font-medium text-accent hover:underline px-2.5 py-1 rounded bg-muted/60"
                    >
                      Download
                    </a>
                  </div>
                </div>

                {/* SHA-256 Checksum */}
                {artifact.sha256 && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-muted-fg bg-muted/40 px-2 py-1 rounded">
                    <span className="shrink-0 font-semibold text-fg">SHA-256:</span>
                    <span className="truncate">{artifact.sha256}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(artifact.sha256!)}
                      aria-label="Copy SHA-256 checksum"
                      className="shrink-0 hover:text-fg cursor-pointer p-0.5"
                    >
                      {copiedHash === artifact.sha256 ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}

                {/* Collapsible installation instructions */}
                {activeInstallHelp === key && artifact.installGuide && (
                  <div className="p-3 bg-muted/30 border border-border/80 rounded-lg text-xs text-fg space-y-1.5 mt-1">
                    <div className="font-semibold text-muted-fg">Installation Guide:</div>
                    <ol className="list-decimal list-inside space-y-1 text-muted-fg">
                      {artifact.installGuide.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
