/**
 * Isomorphic-safe OS detection for the download panel.
 *
 * - Safe to call during SSR (returns `null` — the server has no navigator).
 * - Safe to call in a `useEffect` (the first paint stays deterministic so the
 *   server HTML and the client's first render match exactly).
 * - Never guesses: a visitor on an OS we ship nothing for (macOS / watchOS)
 *   gets `null` rather than a download they cannot use.
 */

export type Platform = "linux" | "android" | "windows" | "ios";

/** User-Agent Client Hints — not yet part of TypeScript's DOM lib. */
interface UserAgentDataLike {
  platform?: string;
  mobile?: boolean;
}

interface NavigatorLike {
  userAgent?: string;
  platform?: string;
  userAgentData?: UserAgentDataLike;
}

type ParseResult =
  | { state: "match"; platform: Platform }
  /** OS recognised, but we ship no build for it (macOS, …). */
  | { state: "unsupported" }
  | { state: "unknown" };

/**
 * Order matters:
 * 1. `android` first because Android UAs also contain "Linux".
 * 2. `ios` next for iPhone / iPad / iPod devices.
 * 3. macOS before `win` because "darwin" contains "win".
 * 4. `linux` last so desktop Linux, X11 and Chrome OS resolve correctly.
 */
function parsePlatform(raw: string | undefined | null): ParseResult {
  if (!raw) return { state: "unknown" };
  const value = raw.toLowerCase();

  if (value.includes("android")) return { state: "match", platform: "android" };

  if (/(iphone|ipad|ipod|ios\b)/.test(value)) {
    return { state: "match", platform: "ios" };
  }

  if (/(mac|darwin|watch)/.test(value)) {
    return { state: "unsupported" };
  }

  if (value.includes("win")) return { state: "match", platform: "windows" };

  if (/(linux|x11|cros|ubuntu|debian|fedora)/.test(value)) {
    return { state: "match", platform: "linux" };
  }

  return { state: "unknown" };
}

/** First candidate that resolves wins; an identified-but-unsupported OS short-circuits to `null`. */
function firstMatch(...candidates: Array<string | undefined | null>): Platform | null {
  for (const candidate of candidates) {
    const result = parsePlatform(candidate);
    if (result.state === "match") return result.platform;
    if (result.state === "unsupported") return null;
  }
  return null;
}

/**
 * Best-effort platform for preselecting the download tab.
 * Returns `null` when unknown (SSR) or when there is no build for this OS.
 */
export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;

  const nav = navigator as unknown as NavigatorLike;
  const hints = nav.userAgentData;

  if (hints && typeof hints === "object") {
    const fromHints = parsePlatform(hints.platform);
    if (fromHints.state === "match") return fromHints.platform;
    if (fromHints.state === "unsupported") return null;
    // Handheld Chrome without a usable platform string → Android.
    if (hints.mobile === true) return "android";
    return firstMatch(nav.userAgent, nav.platform);
  }

  return firstMatch(nav.userAgent, nav.platform);
}
