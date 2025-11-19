import { test, expect } from '@playwright/test';

// ----------------------------------------------------------
//  Reliable Cookie Handler (handles OneTrust fully)
// ----------------------------------------------------------
async function handleCookieModal(page) {
  const banner = page.locator('#onetrust-banner-sdk');
  const acceptBtn = page.locator('#onetrust-accept-btn-handler');

  // Wait up to 5 seconds for the banner. If not present → skip
  const bannerVisible = await banner.isVisible().catch(() => false);
  if (!bannerVisible) return;

  await acceptBtn.waitFor({ state: 'visible'});
  await acceptBtn.click().catch(() => {});

  // Wait for overlays to disappear
  await page.waitForSelector('#onetrust-consent-sdk', { state: 'hidden'}).catch(() => {});
  await page.waitForTimeout(500);
}

// ----------------------------------------------------------
//  Test: Search restaurant offers in London for 2 people
// ----------------------------------------------------------
test('Successfully search for restaurant offers in London for 2 people', async ({ page }) => {

  // --------------------------
  // Navigate to homepage
  // --------------------------
  await test.step('Navigate to VoucherCodes homepage', async () => {
    await page.goto('https://www.vouchercodes.co.uk/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/VoucherCodes/);
    await handleCookieModal(page);
  });

  // --------------------------
  // Open Categories menu
  // --------------------------
  await test.step('Open Categories menu', async () => {
    await handleCookieModal(page);

    const categoriesButton = page.getByRole('button', { name: /categories/i });

    await categoriesButton.scrollIntoViewIfNeeded();
    await expect(categoriesButton).toBeVisible();
    await categoriesButton.click();
  });

  // --------------------------
  // Click "Restaurants" category
  // --------------------------
  await test.step('Select Restaurants category', async () => {
    await handleCookieModal(page);

    const restaurantsCategory = page.locator('a[data-qa="el:adminableCategory"]:has-text("Restaurants")');
    await expect(restaurantsCategory).toBeVisible();
    await restaurantsCategory.click();

  });

  // --------------------------
  // Validate Restaurant vouchers page
  // --------------------------
  await test.step('Verify restaurant vouchers page UI', async () => {
    await handleCookieModal(page);
    await page.waitForURL(/restaurant-vouchers/i);
    await expect(page.getByText('Find restaurant vouchers & offers near you', { exact: true })).toBeVisible();
    await expect(page.locator('label:has-text("Location")')).toBeVisible();
    await expect(page.locator('label:has-text("Day")')).toBeVisible();
    await expect(page.locator('label:has-text("People")')).toBeVisible();  });

  // --------------------------
  // Fill London + 2 people
  // --------------------------
  await test.step('Fill search form', async () => {
    await handleCookieModal(page);

    // Fill Location: London
    const locationInput = page.locator('#google-autocomplete');
    await locationInput.click();
    await locationInput.fill('London');

    // Select 2 people
    const peopleSelect = page.locator('#people-select');
    await peopleSelect.selectOption('2');
  });

  // --------------------------
  // Click Search button
  // --------------------------
  await test.step('Find restaurant vouchers', async () => {
    await handleCookieModal(page);

    // Use robust locator for the search button
    const findBtn = page.locator('button[data-qa="el:findRestaurantsVoucherButton"]');

    // Button enabling animation can take ~1s
    await page.waitForTimeout(1000);

    await expect(findBtn).toBeVisible();
    await expect(findBtn).toBeEnabled();
    await findBtn.click({ force: true });
  });

  // --------------------------
  // Validate search results
  // --------------------------
  await test.step('Validate search results page', async () => {
    // Wait for internal page transition
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/search/i, { timeout: 10000 });

    await expect(page.url()).toMatch(/search/);
  });

});
