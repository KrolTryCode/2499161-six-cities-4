import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('./login');
  });

  test('should render the login page', async ({ page }) => {
    await expect(page.locator('h1.login__title')).toHaveText('Sign in');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Sign in');
  });

  test('should have correct input types and attributes', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('should show validation error when submitting empty form', async ({ page }) => {

    await page.click('button[type="submit"]');

    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="password"]:invalid')).toBeVisible();
  });

  test('should redirect to the main page if the submission form is correct', async ({ page }) => {

    await page.fill('input[name=email]', 'test-correct@example.com');
    await page.fill('input[name=password]', 'test-correct1410');
    await page.click('button[type=submit]');
    await page.waitForURL('./');
    expect(page.url()).toBe('http://localhost:5173/');
  });

});
