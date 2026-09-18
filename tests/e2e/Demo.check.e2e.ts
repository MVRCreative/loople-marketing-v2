import { expect, test } from '@playwright/test';

test.describe('Demo request', () => {
  test('navigates from schedule-demo CTA to form success state', async ({ page }) => {
    await page.route('**/api/demo-request', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Schedule Demo' })
      .click();

    await expect(page).toHaveURL(/\/demo\/?$/u);
    await expect(page.getByRole('heading', { name: 'Schedule Demo' })).toBeVisible();

    await page.getByLabel('Full name').fill('Alex Rivera');
    await page.getByLabel('Work email').fill('alex@northsidewrestling.example');
    await page.getByLabel('Organization').fill('Northside Wrestling Club');
    await page.getByRole('button', { name: 'Continue to scheduling' }).click();

    await expect(page.getByRole('heading', { name: 'Pick a time that works' })).toBeVisible();
    await expect(page.getByText(/Thanks, Alex/u)).toBeVisible();
    // Embed container mounts even when Calendly URL env is unset (fallback copy).
    await expect(
      page.getByTestId('calendly-embed').or(page.getByText(/Scheduling is not configured/u)),
    ).toBeVisible();
  });
});
