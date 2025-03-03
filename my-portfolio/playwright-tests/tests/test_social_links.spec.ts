import { test, expect } from '@playwright/test';

test.describe("Social Links Functionality", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://larsenvini.pages.dev"); // Open portfolio page before each test
  });

  test("LinkedIn button should open LinkedIn site (handle login redirects)", async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Wait for a new tab to open
      page.click('a[href="https://linkedin.com/in/vinilarsen"]'), // Click LinkedIn button
    ]);

    await newPage.waitForLoadState("domcontentloaded");

    // Instead of checking for exact profile URL, verify we landed anywhere on LinkedIn
    await expect(newPage).toHaveURL(/https:\/\/www\.linkedin\.com\/.*/); 
    await newPage.close();
  });

  test("GitHub button should open the correct URL", async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Wait for a new tab to open
      page.click('a[href="https://github.com/Larsenvini"]'), // Click GitHub button
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await expect(newPage).toHaveURL("https://github.com/Larsenvini");
    await newPage.close();
  });

  test("Email button should have the correct mailto link", async ({ page }) => {
    // Use `.first()` to avoid strict mode errors (if multiple mailto links exist)
    const emailButton = page.locator('a[href^="mailto:"]').first();
    await expect(emailButton).toHaveAttribute("href", "mailto:larsenvinicius8@gmail.com");

    // Optional: Simulate click (but Playwright cannot verify mail client opening)
    await emailButton.click();
  });

});