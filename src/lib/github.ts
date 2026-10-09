export interface CommitData {
  relativeTime: string;
  repo: string;
  url: string;
}

/**
 * Fetch the real latest commit date from GitHub API server-side with revalidation.
 * Fails safely by returning null if the API is unreachable or rate-limited.
 */
export async function getLatestSoftifyCommit(): Promise<CommitData | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Sarthak-Cyb3r/softify/commits?per_page=1",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "sarthak-portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || !data[0]?.commit?.author?.date) {
      return null;
    }

    const dateStr = data[0].commit.author.date;
    const commitDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - commitDate.getTime();

    if (diffMs < 0 || isNaN(diffMs)) {
      return null;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    let relativeTime = "";
    if (diffDays > 0) {
      relativeTime = `${diffDays}d ago`;
    } else if (diffHours > 0) {
      relativeTime = `${diffHours}h ago`;
    } else {
      const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      relativeTime = `${diffMinutes}m ago`;
    }

    return {
      relativeTime,
      repo: "softify",
      url: "https://github.com/Sarthak-Cyb3r/softify",
    };
  } catch {
    return null;
  }
}
