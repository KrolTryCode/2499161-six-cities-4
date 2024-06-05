import { test, expect } from '@playwright/test';

test('should navigate to offer page', async ({ page }) => {
  await page.goto('./');
  const card = await page.locator('.cities__card').first();
  const cardName = await card.locator('.place-card__name').textContent();
  const cardCost = await card.locator('.place-card__price-value').textContent();

  await card.click();

  await page.waitForURL(/offer*/gi)
  await expect(page.locator('.offer__name')).toHaveText(cardName!!);
  await expect(page.locator('.offer__price-value')).toHaveText(cardCost!!);
});
