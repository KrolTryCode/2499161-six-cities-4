import { test, expect, Locator } from '@playwright/test';

test.describe('Change cities test', () => {
  test('should render offers by city', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );
    await expect(page.locator('.place-card')).toHaveCount(20);

    const isActive = async (locator: Locator) => {
      const classAttribute = await locator.getAttribute('class');
      return classAttribute?.includes('tabs__item--active') || false;
    };


    await page.waitForSelector('.locations__item-link');

    const cities = await page.locator('.locations__item-link').all();
    for (const city of cities) {
      await city.click();

      await expect(page.locator('.place-card')).toHaveCount(20);

      const currentCity = await city.textContent();
      console.log(currentCity);

      const hasActiveClass = await isActive(city);
      expect(hasActiveClass).toBeTruthy();

      await expect(page.locator('.places__found')).toHaveText(`20 places to stay in ${currentCity}`);
    }
  });
})
