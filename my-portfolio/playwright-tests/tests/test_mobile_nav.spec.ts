import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation Scroll Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://larsenvini.pages.dev");
    await page.setViewportSize({ width: 320, height: 800 });
  });

  test("Clicking About should scroll to About section", async ({ page }) => {
    await page.click("button:has-text('☰')"); // Open menu
    await page.waitForTimeout(500);

    // Click "About" and force scroll
    const aboutLink = page.locator("nav:below(button:has-text('☰')) a[href='#about']");
    await aboutLink.waitFor();
    await aboutLink.click();
    await page.evaluate(() => document.querySelector("#about")?.scrollIntoView());

    // Validate About section is in view
    const aboutHeading = page.locator("h2", { hasText: "About Me" });
    await expect(aboutHeading).toBeVisible();
  });

  test("Clicking Projects should scroll to Projects section", async ({ page }) => {
    await page.click("button:has-text('☰')"); // Open menu
    await page.waitForTimeout(500);

    const projectsLink = page.locator("nav:below(button:has-text('☰')) a[href='#projects']");
    await projectsLink.waitFor();
    await projectsLink.click();
    await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView());

    await expect(page.locator("h2", { hasText: "Projects" })).toBeVisible();
  });
});