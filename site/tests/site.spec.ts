import { test, expect } from '@playwright/test';

test('German home renders every section', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Umut Aslan/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Werkhalle');
  for (const id of ['problems', 'projects', 'method', 'cv', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test('English home is a full translation', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('shop');
  await expect(page.getByRole('heading', { name: 'Problems I solve' })).toBeVisible();
});

test('language switch links both versions', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.lang').click();
  await expect(page).toHaveURL(/\/en\/$/);
  await page.locator('a.lang').click();
  await expect(page).toHaveURL(/\/$/);
});

test('theme toggle flips and persists across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme-resolved', 'dark');
  await page.locator('#theme').click();
  await expect(html).toHaveAttribute('data-theme-resolved', 'light');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('live projects link to their subdomain, planned ones do not', async ({ page }) => {
  await page.goto('/');
  const live = page.locator('#projects article[data-status="live"]');
  expect(await live.count()).toBeGreaterThan(0);
  for (const card of await live.all()) {
    await expect(card.getByRole('link', { name: /Öffnen/ })).toHaveAttribute('href', /^https:\/\/[\w-]+\.umut-aslan\.dev/);
  }
  for (const card of await page.locator('#projects article[data-status="planned"]').all()) {
    await expect(card.getByRole('link', { name: /Öffnen/ })).toHaveCount(0);
  }
});

test('makes no third-party requests (no tracking, self-hosted fonts)', async ({ page, baseURL }) => {
  const foreign: string[] = [];
  page.on('request', (r) => { if (!r.url().startsWith(baseURL!) && !r.url().startsWith('data:')) foreign.push(r.url()); });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.mouse.wheel(0, 20000);
  await page.waitForLoadState('networkidle');
  expect(foreign).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
});

test('no horizontal scrolling at any width', async ({ page }) => {
  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test('content is visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#problems article').first()).toHaveCSS('opacity', '1');
});

test('legal pages are reachable from the footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Impressum' }).click();
  await expect(page.getByRole('heading', { name: 'Impressum' })).toBeVisible();
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Datenschutz' }).click();
  await expect(page.getByRole('heading', { name: 'Datenschutzerklärung' })).toBeVisible();
});

test('SEO basics: canonical, hreflang, sitemap', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://umut-aslan.dev/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://umut-aslan.dev/en/');
  expect((await request.get('/sitemap-index.xml')).ok()).toBe(true);
});
