/** Data resolved once at build time. Network failures never break the build. */

export interface ModStats {
  version: string;
  releases: number;
  downloads: number;
  daysToLatest: number;
  live: boolean;
}

const FALLBACK: ModStats = { version: '0.10.2', releases: 7, downloads: 158, daysToLatest: 5, live: false };
let cached: Promise<ModStats> | undefined;

export function getModStats(): Promise<ModStats> {
  cached ??= fetchModStats();
  return cached;
}

async function fetchModStats(): Promise<ModStats> {
  try {
    const res = await fetch('https://thunderstore.io/c/skul-the-hero-slayer/api/v1/package/', {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const all = (await res.json()) as {
      full_name: string;
      versions: { version_number: string; downloads: number; date_created: string }[];
    }[];
    const pkg = all.find((p) => p.full_name === 'DocRun-SkulInsight_QoL');
    if (!pkg?.versions.length) throw new Error('package not found');
    const dates = pkg.versions.map((v) => Date.parse(v.date_created));
    return {
      version: pkg.versions[0].version_number,
      releases: pkg.versions.length,
      downloads: pkg.versions.reduce((n, v) => n + v.downloads, 0),
      daysToLatest: Math.max(1, Math.round((Math.max(...dates) - Math.min(...dates)) / 86_400_000)),
      live: true,
    };
  } catch (err) {
    console.warn(`[build] Thunderstore stats unavailable, using fallback: ${err}`);
    return FALLBACK;
  }
}

export const buildInfo = {
  sha: (process.env.GIT_SHA ?? 'local').slice(0, 7),
  date: process.env.BUILD_DATE ?? new Date().toISOString(),
};

/** Whole years since the given month (1-based). */
export function yearsSince(year: number, month: number): number {
  const now = new Date();
  return Math.max(1, Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12));
}
