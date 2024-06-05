import { test, expect } from '@playwright/test';

test.describe('Filter test', () => {

  test('should be correct filter of cards by - Popular', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );

    await page.waitForSelector('.cities__card');
    await expect(page.locator('.place-card')).toHaveCount(20);

    const sortingTypeSpan = page.locator('.places__sorting-type');
    const textContent = await sortingTypeSpan.textContent();
    console.log(textContent);
    expect(textContent).toEqual("Popular")

  });

  test('should be correct filter of cards by - Price: low to high', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );

    await page.waitForSelector('.cities__card');
    const pricesBefore = await page.locator('.place-card__price-value').allTextContents();
    const sortedHandPrices = pricesBefore.map(price => price.slice(1,)).sort();

    await page.click('.places__sorting-type');
    await page.click('text="Price: low to high"');

    await page.waitForSelector('.cities__card');

    const sortingTypeSpan = page.locator('.places__sorting-type');
    const textContent = await sortingTypeSpan.textContent();
    console.log(textContent);
    expect(textContent).toEqual("Price: low to high")

    const pricesAfter = await page.locator('.place-card__price-value').allTextContents();
    const filteredPrices = pricesAfter.map(price => price.slice(1,));

    console.log(sortedHandPrices);
    console.log(filteredPrices);
    expect(sortedHandPrices).toEqual(filteredPrices);

  });

  test('should be correct filter of cards by - Price: high to low', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );

    await page.waitForSelector('.cities__card');
    const pricesBefore = await page.locator('.place-card__price-value').allTextContents();
    const sortedHandPrices = pricesBefore.map(price => price.slice(1,)).sort().reverse();

    await page.click('.places__sorting-type');
    await page.click('text="Price: high to low"');

    await page.waitForSelector('.cities__card');

    const sortingTypeSpan = page.locator('.places__sorting-type');
    const textContent = await sortingTypeSpan.textContent();
    console.log(textContent);
    expect(textContent).toEqual("Price: high to low")

    const pricesAfter = await page.locator('.place-card__price-value').allTextContents();
    const filteredPrices = pricesAfter.map(price => price.slice(1,));

    console.log(sortedHandPrices);
    console.log(filteredPrices);
    expect (sortedHandPrices).toEqual(filteredPrices);

  });

  test('should be correct filter of cards by - Top rated first', async ({ page }) => {

    await page.goto('./');

    await page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    );

    await page.waitForSelector('.cities__card');

    const articlesBefore = await page.$$('.cities__card.place-card');

    const ratingBefore: number[] = [];
    for (const article of articlesBefore) {
      const spanElement = await article.$('span[style]');
      if (spanElement) {
        const widthStyle = await spanElement.evaluate(node => node.style.width);
        const widthPercentage = widthStyle.substring(0, widthStyle.length - 1);
        ratingBefore.push(Number(widthPercentage));
        console.log(`Width: ${widthPercentage}%`);
      } else {
        console.log('No span element with style found in this article.');
      }
    }
    console.log(ratingBefore);
    const sortedHandRating = ratingBefore.sort((a, b) => b - a);
    console.log(sortedHandRating);

    await page.click('.places__sorting-type');
    await page.click('text="Top rated first"');

    await page.waitForSelector('.cities__card');

    const articlesAfter = await page.$$('.cities__card.place-card');

    const ratingAfter: number[] = [];
    for (const article of articlesAfter) {
      const spanElement = await article.$('span[style]');
      if (spanElement) {
        const widthStyle = await spanElement.evaluate(node => node.style.width);
        const widthPercentage = widthStyle.substring(0, widthStyle.length - 1);
        ratingAfter.push(Number(widthPercentage));
        console.log(`Width: ${widthPercentage}%`);
      } else {
        console.log('No span element with style found in this article.');
      }
    }
    console.log(ratingAfter);
    console.log(typeof ratingAfter);
    console.log(typeof sortedHandRating);

    expect (sortedHandRating).toEqual(ratingAfter);

  });
});
