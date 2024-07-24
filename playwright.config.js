const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright', // Directory where your Playwright tests are located
  timeout: 30000, // Timeout for each test in milliseconds
  use: {
    headless: true, // Run tests in headless mode
    baseURL: 'http://localhost:3000', // Base URL for your app
    browserName: 'chromium', // Browser for running tests (chromium, firefox, or webkit)
  },
});
