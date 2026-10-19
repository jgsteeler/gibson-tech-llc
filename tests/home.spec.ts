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

test('publishes crawl directives, sitemap, metadata, and accurate structured data', async ({ page, request }) => {
  const showSmallBusinessConsulting = process.env.VITE_SHOW_SMALL_BUSINESS_CONSULTING === 'true';
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://gibsontechworks.com/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://gibsontechworks.com/assets/banner.jpg',
  );

  const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
  const schema = JSON.parse(schemaText ?? '{}');
  const schemaTypes = schema['@graph'].map((entity: { '@type': string }) => entity['@type']);
  expect(schemaTypes).toContain('Organization');
  expect(schemaTypes).toContain('Person');
  expect(schemaTypes).not.toContain('FAQPage');
  expect(schema['@graph'].find((entity: { '@type': string }) => entity['@type'] === 'Organization')
    .contactPoint.email).toBe('johnny@gibsontechworks.com');
  expect(schemaText).not.toMatch(/\$\s*\d/);

  const robotsResponse = await request.get('/robots.txt');
  expect(robotsResponse.ok()).toBe(true);
  const robots = await robotsResponse.text();
  expect(robots).toContain('User-agent: GPTBot\nAllow: /');
  expect(robots).toContain('Sitemap: https://gibsontechworks.com/sitemap-index.xml');

  const sitemapIndexResponse = await request.get('/sitemap-index.xml');
  expect(sitemapIndexResponse.ok()).toBe(true);
  const sitemapIndex = await sitemapIndexResponse.text();
  expect(sitemapIndex).toContain('sitemap-0.xml');

  const sitemapResponse = await request.get('/sitemap-0.xml');
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain('https://gibsontechworks.com/');
  if (showSmallBusinessConsulting) {
    expect(sitemap).toContain('https://gibsontechworks.com/consulting/');
    const consultingResponse = await page.goto('/consulting/');
    expect(consultingResponse?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Rapid App Development for Local Business Bottlenecks' })).toBeVisible();
  } else {
    expect(sitemap).not.toContain('https://gibsontechworks.com/consulting/');
    expect((await request.get('/consulting/')).status()).toBe(404);
  }

  const llmsResponse = await request.get('/llms.txt');
  expect(llmsResponse.ok()).toBe(true);
  const llms = await llmsResponse.text();
  expect(llms).toContain('Gibson Tech, LLC');
  expect(llms).toContain('[johnny@gibsontechworks.com](mailto:johnny@gibsontechworks.com)');
  expect(llms.includes('Divergent Flow')).toBe(
    process.env.VITE_SHOW_DIVERGENT_FLOW_SHOWCASE === 'true',
  );
  expect(llms.includes('WrenchQ')).toBe(process.env.VITE_SHOW_WRENCHQ_SHOWCASE === 'true');
  expect(llms).not.toMatch(/\$\s*\d/);
});

test('navigation reaches each homepage section', async ({ page }) => {
  await page.goto('/');
  for (const [name, id] of [
    ['Consulting', 'capabilities'],
    ['Mentorship', 'leadership'],
    ['About', 'about'],
    ['Contact', 'contact'],
  ]) {
    await page.getByRole('navigation').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('email contact is available without a form, SMS, or a commercial offer', async ({ page }) => {
  await page.goto('/');
  const contact = page.getByRole('region', { name: 'Start with the problem you need to solve.' });
  await expect(contact).toBeVisible();
  await expect(contact.getByRole('link', { name: 'Email Johnny', exact: true })).toHaveAttribute(
    'href',
    'mailto:johnny@gibsontechworks.com?subject=Gibson%20Tech%20Inquiry',
  );
  await expect(contact.getByRole('link', { name: 'johnny@gibsontechworks.com', exact: true })).toHaveAttribute(
    'href',
    'mailto:johnny@gibsontechworks.com',
  );
  await expect(contact).toContainText('Opens your email app');
  await expect(contact).toContainText('confidential system details');
  await expect(contact.getByRole('link', { name: 'Gibson Tech on LinkedIn ↗' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/company/gibson-tech-llc/',
  );
  const heroEmail = page.locator('.hero').getByRole('link', {
    name: process.env.VITE_SHOW_DETAILED_HERO_CTA === 'true' ? 'Initiate C2C Engagement' : 'Email Johnny',
    exact: true,
  });
  await expect(heroEmail).toHaveAttribute('href', /^mailto:johnny@gibsontechworks\.com\?subject=/);
  for (const href of await page.locator('a[href^="mailto:"]').evaluateAll(
    links => links.map(link => link.getAttribute('href')),
  )) {
    const emailUrl = new URL(href!);
    expect(emailUrl.pathname).toBe('johnny@gibsontechworks.com');
    expect([...emailUrl.searchParams.keys()].every(key => key === 'subject')).toBe(true);
  }
  await expect(page.locator('form, a[href^="sms:"], a[href^="tel:"]')).toHaveCount(0);
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

test('commercial page content follows its build-time feature flags', async ({ page }) => {
  const showDetailedHeroCta = process.env.VITE_SHOW_DETAILED_HERO_CTA === 'true';
  const showPenTestPricing = process.env.VITE_SHOW_PEN_TEST_SPRINT_PRICING === 'true';
  const showFractionalRetainer = process.env.VITE_SHOW_FRACTIONAL_RETAINER === 'true';
  const showAiWorkshop = process.env.VITE_SHOW_AI_WORKSHOP_OFFERING === 'true';

  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Initiate C2C Engagement' })).toHaveCount(
    showDetailedHeroCta ? 1 : 0,
  );
  await expect(page.locator('.price-tag')).toHaveCount(
    Number(showPenTestPricing) + Number(showFractionalRetainer) + Number(showAiWorkshop),
  );
  await expect(page.getByRole('link', { name: 'Book Audit Sprint' })).toHaveCount(
    showPenTestPricing ? 1 : 0,
  );
  await expect(page.getByRole('link', { name: 'Retain Fractional Advisory' })).toHaveCount(
    showFractionalRetainer ? 1 : 0,
  );
  await expect(page.getByRole('link', { name: 'Schedule Team Workshop' })).toHaveCount(
    showAiWorkshop ? 1 : 0,
  );
  if (!(showPenTestPricing || showFractionalRetainer || showAiWorkshop)) {
    await expect(page.locator('body')).not.toContainText(/\$\s*\d/);
  }
});

test('portfolio content follows its build-time feature flags', async ({ page }) => {
  const showDivergentFlow = process.env.VITE_SHOW_DIVERGENT_FLOW_SHOWCASE === 'true';
  const showWrenchQ = process.env.VITE_SHOW_WRENCHQ_SHOWCASE === 'true';
  const showPortfolio = showDivergentFlow || showWrenchQ;

  await page.goto('/');
  await expect(page.locator('#work')).toHaveCount(showPortfolio ? 1 : 0);
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Selected Work', exact: true }),
  ).toHaveCount(showPortfolio ? 1 : 0);

  for (const [name, enabled, url] of [
    [
      'Divergent Flow',
      showDivergentFlow,
      process.env.VITE_DIVERGENT_FLOW_URL ?? 'https://getdivergentflow.com',
    ],
    ['WrenchQ', showWrenchQ, process.env.VITE_WRENCHQ_URL ?? 'https://track.gibsonservice.co/'],
  ] as const) {
    if (enabled) {
      await expect(page.locator('#work')).toContainText(name);
      await expect(page.locator('#work').getByRole('link', { name: `Visit ${name} ↗` })).toHaveAttribute(
        'href',
        url,
      );
      await expect(page.getByRole('contentinfo')).toContainText(name);
    } else {
      await expect(page.locator('body')).not.toContainText(name);
    }
  }
});
