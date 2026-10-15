import { expect, test, type Page } from '@playwright/test';

// The guided tour (site-tour.js) in both languages: every step must find its section.
async function walk(page: Page, path: string): Promise<string[]> {
  const skipped: string[] = [];
  page.on('console', (m) => { if (m.text().includes('[site-tour]')) skipped.push(m.text()); });
  await page.goto(`${path}?tour=start`);
  const tour = page.locator('[data-site-tour="portfolio"]');
  const titles: string[] = [];
  while (titles.length < 20) {
    const bubble = tour.locator('section.bubble');
    await expect(bubble).toBeVisible();
    const step = await bubble.getAttribute('data-step');
    titles.push((await tour.locator('h2').textContent()) ?? '');
    await tour.getByTestId('tour-next').click();
    if ((await tour.count()) === 0) break;
    await expect(bubble).not.toHaveAttribute('data-step', step!, { timeout: 10_000 });
  }
  expect(skipped).toEqual([]);
  return titles;
}

test('the tour walks through the German home page', async ({ page }) => {
  const titles = await walk(page, '/');
  expect(titles).toHaveLength(9);
  expect(titles[0]).toBe('Willkommen auf umut-aslan.dev');
  await expect(page.getByTestId('tour-launcher')).toBeVisible();
});

test('the English page gets the English tour', async ({ page }) => {
  const titles = await walk(page, '/en/');
  expect(titles[0]).toBe('Welcome to umut-aslan.dev');
  expect(titles).toHaveLength(9);
});

test('no tour and no launcher on the legal pages', async ({ page }) => {
  await page.goto('/impressum/?tour=start');
  await page.waitForTimeout(800);
  await expect(page.locator('[data-site-tour]')).toHaveCount(0);
});
