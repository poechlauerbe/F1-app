// tests/playwright/example.test.js
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('Home');
});
