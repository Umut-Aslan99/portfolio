import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Counts Playwright `test(` declarations so the site reports its real suite size. */
export function countTests(dir = join(process.cwd(), 'tests')): number {
  try {
    return readdirSync(dir)
      .filter((f) => f.endsWith('.spec.ts'))
      .reduce((n, f) => n + (readFileSync(join(dir, f), 'utf8').match(/^\s*test\(/gm)?.length ?? 0), 0);
  } catch {
    return 0;
  }
}
