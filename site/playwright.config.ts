import { defineConfig, devices } from '@playwright/test';

const port = 4321;
/** Set BASE_URL to test a running container (CI does this: test what ships). */
const external = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: external ?? `http://localhost:${port}`, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: external ? undefined : {
    command: `npx astro preview --port ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
  },
});
