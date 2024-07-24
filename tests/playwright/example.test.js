// tests/playwright/example.test.js
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL to match your app's URL
  await expect(page).toHaveTitle('Home'); // Replace with your app's title
});
