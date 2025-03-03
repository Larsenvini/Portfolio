import { test, expect } from "@playwright/test";

test.describe("Mobile Navbar Behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://larsenvini.pages.dev");
    await page.setViewportSize({ width: 320, height: 800 });
  });

  test("Clicking the hamburger menu should open the mobile nav", async ({ page }) => {
    const menuButton = page.locator("button:has-text('☰')");
    
    // Click Hamburger ☰ and wait for visibility
    await menuButton.click();
    await page.waitForTimeout(500);

    // Ensure **only the mobile nav** is visible
    const menu = page.locator("nav:below(button:has-text('☰'))");
    await expect(menu).toBeVisible();
  });

  test("Clicking a nav link in mobile should close the menu", async ({ page }) => {
    await page.click("button:has-text('☰')"); // Open menu
    await page.waitForTimeout(500);

    const aboutLink = page.locator("nav:below(button:has-text('☰')) a[href='#about']"); 
    await aboutLink.click();
    await page.waitForTimeout(500);

    // Ensure the menu is **now hidden**
    const menu = page.locator("nav:below(button:has-text('☰'))");
    await expect(menu).not.toBeVisible();
  });
});