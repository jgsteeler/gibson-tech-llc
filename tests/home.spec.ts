import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
});

test('homepage presents consulting expertise without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Resilient Distributed Systems\.\s*Audit-Grade Security\.\s*Pragmatic Leadership\./,
  );
  await expect(page.locator('#about')).toContainText('Johnny Gibson');
  await expect(page.locator('#about')).toContainText('25 years');
  expect(errors).toEqual([]);
});

test('navigation reaches each homepage section', async ({ page }) => {
  await page.goto('/');
  for (const [name, id] of [
    ['Consulting', 'capabilities'],
    ['Mentorship', 'leadership'],
    ['Selected Work', 'work'],
    ['About', 'about'],
  ]) {
    await page.getByRole('navigation').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('theme changes persist across reloads without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const theme of ['light', 'dark']) {
    await page.getByRole('button', { name: 'Toggle dark/light theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('discovery mode does not ship prices or booking offers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.price-tag, .rate-note')).toHaveCount(0);
  await expect(page.getByRole('link', {
    name: /Book Audit Sprint|Retain Fractional Advisory|Schedule Team Workshop|Explore Team Workshop|Initiate C2C Engagement/,
  })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/\$\s*\d/);
});

test('portfolio logos load in both themes and links match configuration', async ({ page }) => {
  await page.goto('/');
  for (const [name, url] of [
    ['Divergent Flow', process.env.VITE_DIVERGENT_FLOW_URL ?? 'https://getdivergentflow.com'],
    ['WrenchQ', process.env.VITE_WRENCHQ_URL ?? 'https://track.gibsonservice.co/'],
  ]) {
    await expect(page.locator('#work').getByRole('link', { name: `Visit ${name} ↗` })).toHaveAttribute('href', url);
    await expect(page.getByRole('contentinfo').getByRole('link', { name, exact: true })).toHaveAttribute('href', url);
  }
  for (const theme of ['dark', 'light']) {
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    for (const name of ['Divergent Flow', 'WrenchQ']) {
      const logo = page.locator('#work').getByRole('img', { name, exact: true });
      await logo.scrollIntoViewIfNeeded();
      await expect(logo).toBeVisible();
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    if (theme === 'dark') await page.getByRole('button', { name: 'Toggle dark/light theme' }).click();
  }
});
