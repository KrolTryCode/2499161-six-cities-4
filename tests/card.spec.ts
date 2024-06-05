import { test, expect } from '@playwright/test';

test.describe('Offers rendering', () => {
  test('should load the cards correctly', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );

    await page.waitForSelector('.places__list');

    await expect(page.locator('.place-card')).toHaveCount(20);
    await expect(page.locator('.places__found')).toHaveText('20 places to stay in Paris');

  });
})
