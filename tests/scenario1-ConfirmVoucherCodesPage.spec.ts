import { test, expect } from '@playwright/test';

test('Confirm VoucherCodes page loads and header exists', async ({ page }) => {
  await test.step('Navigate to VoucherCodes homepage', async () => {
    await page.goto('https://www.vouchercodes.co.uk/');
  });

  await test.step('Confirm URL is correct', async () => {
    await expect(page).toHaveURL('https://www.vouchercodes.co.uk/');
  });

  await test.step('Confirm page title contains "VoucherCodes"', async () => {
    await expect(page).toHaveTitle(/VoucherCodes/);
  });

  await test.step('Accept cookie modal if present', async () => {
    const cookieButton = page.locator('button:has-text("Accept")');
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  });

  await test.step('Wait for logo before checking title', async () => {
    await page.waitForSelector('a[data-qa="el:vcLogoLink"]', { timeout: 10000 });
    await expect(page).toHaveTitle(/VoucherCodes/);
  });

  await test.step('Confirm VoucherCodes logo link is present', async () => {
    const logoLink = page.locator('a[data-qa="el:vcLogoLink"]');
    await expect(logoLink).toBeVisible();
  });

  await test.step('Confirm search bar is present', async () => {
    const searchBar = page.locator('form[data-qa="el:search"] input[data-qa="el:searchInput"]');
    await expect(searchBar).toBeVisible();
  });
});
