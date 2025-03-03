import { test, expect } from '@playwright/test';

test.describe("Resume Button Functionality", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://larsenvini.pages.dev"); // Load the portfolio page
  });

  test("Resume button should have the correct PDF link", async ({ page }) => {
    // Locate the Resume button
    const resumeButton = page.locator('a[href="/Vinicius_Larsen_Santos_Dev.pdf"]');

    // Verify the button exists & is visible
    await expect(resumeButton).toBeVisible();

    // Verify the button points to the correct PDF link
    await expect(resumeButton).toHaveAttribute("href", "/Vinicius_Larsen_Santos_Dev.pdf");
  });

});
