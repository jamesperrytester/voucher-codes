import { test, expect } from '@playwright/test';

test('Deliberate failure: incorrect URL and screenshot', async ({ page }) => {
	await page.goto('https://www.vouchercodes.co.uk/');
	// Intentionally check for a wrong URL
	try {
		await expect(page).toHaveURL('https://www.vouchercodes.co.uk/this-url-does-not-exist');
	} catch (error) {
		// Take screenshot and log error
		await page.screenshot({ path: 'failed-url-check.png', fullPage: true });
		console.log('Deliberate failure: URL did not match. Screenshot saved as failed-url-check.png');
		throw error;
	}
});
