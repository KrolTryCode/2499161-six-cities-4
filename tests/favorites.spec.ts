import { test, expect } from '@playwright/test';

test.describe('Favorites page and button tests -- unauthorized', () => {
  test('should redirect to login page if unauthorized', async ({ page }) => {

    await page.goto('./favorites');
    await page.waitForURL('./login');

    expect(`${page.url()}`).toBe('http://localhost:5173/login');
    console.log(page.url())
  });

})


test.describe('favorites page and button tests -- authorized', () => {

  test('should add to favorites if authorized on main-page', async ({ page }) => {

    await page.goto('./login');
    await page.fill('input[name=email]', 'test-correct@example.com');
    await page.fill('input[name=password]', 'test-correct2322');
    await page.click('button[type=submit]');
    await page.waitForURL('./');

    await page.waitForSelector('.cities__card');
    await page.waitForSelector('.header__nav');

    const favoriteCount = page.locator('.header__favorite-count');
    await expect(favoriteCount).toHaveText('0');

    const bookmarkButton = page.locator('button.place-card__bookmark-button.button').first();
    await bookmarkButton.click();
    await expect(bookmarkButton).toHaveClass(/place-card__bookmark-button--active/);

    await expect(favoriteCount).toHaveText('1');

    const profileLink = page.locator('nav.header__nav >> a.headernav-link.headernav-link--profile');
    await profileLink.click();

    await expect(page).toHaveURL('./favorites');

    const favoritesSection = page.locator('section.favorites');
    await expect(favoritesSection).not.toHaveClass(/favorites--empty/);

  });

  test('should be empty favorites if didn\'t add', async ({ page }) => {

    await page.goto('./login');
    await page.fill('input[name=email]', 'test-2131@example.com');
    await page.fill('input[name=password]', 'test-correct1234');
    await page.click('button[type=submit]');
    await page.waitForURL('./');

    await page.waitForSelector('.cities__card');
    await page.waitForSelector('.header__nav');

    const favoriteCount = page.locator('.header__favorite-count');
    await expect(favoriteCount).toHaveText('0');

    const profileLink = page.locator('nav.header__nav >> a.headernav-link.headernav-link--profile');
    await profileLink.click();

    await expect(page).toHaveURL('./favorites');

    const favoritesSection = page.locator('section.favorites');
    await expect(favoritesSection).toHaveClass(/favorites--empty/);

  });
})
