import { test, expect } from '@playwright/test';

const textReview = "Текст для формы комментария длиной больше пятидесяти символов 123213r1b124214gf";
const rateReview = "perfect";

test('should not submit review to an unauthorized user', async ({ page }) => {

  await page.goto('./');

  await page.getByTestId('place--title__test').first().click();
  await page.waitForSelector('.offer__gallery');

  const isVisible = await page.locator('.reviews__form').isVisible();
  expect(isVisible).toBeTruthy();

  await page.fill('[name="review"]', textReview);
  await page.getByTitle(rateReview).click();

  const submitButton = page.locator('button.reviews__submit.form__submit.button');
  await expect(submitButton).toBeDisabled();
});

test('should send review by authorized user', async ({ page }) => {
  const email = 'sdfbhsdfsdf@sadasdqr.ru';
  const password = 'wer12y321ujfe'
  const RATING = rateReview;
  const COMMENT = textReview;

  await page.goto('http://localhost:5173/login');

  await page.fill('input[name=email]', email);
  await page.fill('input[name=password]', password);
  await page.click('button[type=submit]');
  await page.waitForSelector('.cities__card');

  await page.locator('.place-card__name').first().click();

  await page.waitForSelector('.reviews');
  await expect(page.locator('.reviews__form')).toBeVisible();

  await page.fill('[name="review"]', COMMENT);
  await page.getByTitle(RATING).click();
  expect(page.locator('button[type="submit"]')).toBeEnabled();

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes('/comments') && resp.status() === 201
    ),
    page.click('button[type="submit"]'),
  ]);

  const reviewText = await page.locator('.reviews__text').first().textContent();
  const reviewAuthor = (await page.locator('.reviews__user-name').first().textContent())?.trim();
  expect(reviewText).toBe(COMMENT);
  expect(reviewAuthor).toBe('sdfbhsdfsdf');
});
