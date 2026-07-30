import { expect, test } from '@playwright/test';

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('should display the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Keep the whole community moving.' }),
      ).toBeVisible();
      await expect(page.getByRole('link', { name: 'Platform' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Communities' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Pricing' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Resources' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Sign in' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Get started' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Explore the platform' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'The system that keeps the whole community moving.' }),
      ).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Feature index' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Support' }).first()).toBeVisible();
    });

    test('should cycle the roles and access demo through each role', async ({ page }) => {
      await page.goto('/');

      const demo = page.getByText('Northside Wrestling Club');
      await demo.scrollIntoViewIfNeeded();

      await expect(demo).toBeVisible();
      await expect(page.getByText('Community settings')).toBeVisible();
      // The loop rewrites the permission list as the faux cursor switches roles.
      await expect(page.getByText('Owner role & transfer')).toBeVisible({ timeout: 15_000 });
      await expect(page.getByText('Admin tools')).toBeVisible({ timeout: 15_000 });
    });

    test('should open a member profile from the directory demo', async ({ page }) => {
      await page.goto('/');

      const demo = page.getByText('Member directory');
      await demo.scrollIntoViewIfNeeded();

      await expect(demo).toBeVisible();
      // The search types itself, then the faux cursor opens the matching member.
      await expect(page.getByText('2 of 4 members')).toBeVisible({ timeout: 15_000 });
      await expect(page.getByText('Dependent · age 11')).toBeVisible({ timeout: 15_000 });
      await expect(page.getByText('Fall youth wrestling')).toBeVisible();
    });

    test('should publish a program in the program setup demo', async ({ page }) => {
      await page.goto('/');

      const demo = page.getByText('New program');
      await demo.scrollIntoViewIfNeeded();

      await expect(demo).toBeVisible();
      // The name types itself, the terms stream in, then the cursor publishes.
      await expect(page.getByText('Published · open for registration')).toBeVisible({
        timeout: 20_000,
      });
      await expect(page.getByText('1 · $120.00 collected')).toBeVisible({ timeout: 20_000 });
    });

    test('should complete the family checkout demo', async ({ page }) => {
      await page.goto('/');

      const demo = page.getByText('Register for Fall youth wrestling');
      await demo.scrollIntoViewIfNeeded();

      await expect(demo).toBeVisible();
      // The faux cursor selects the child, accepts the waiver, then pays.
      await expect(page.getByText('Registration confirmed')).toBeVisible({ timeout: 20_000 });
      await expect(page.getByText('$120.00 paid · receipt emailed')).toBeVisible();
    });

    test('should navigate to the pricing stub', async ({ page }) => {
      await page.goto('/');

      await page
        .getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: 'Pricing' })
        .click();

      await expect(page).toHaveURL(/pricing$/u);
      await expect(page.getByRole('heading', { name: 'Pricing' })).toBeVisible();
    });
  });
});
