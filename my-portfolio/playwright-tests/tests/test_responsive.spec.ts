import { test, expect } from "@playwright/test";

const viewports = [
  { name: "Mobile", width: 320, height: 905 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Desktop", width: 1280, height: 720 },
];

viewports.forEach(viewport => {
  test(`Portfolio should be responsive on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("https://larsenvini.pages.dev");

    // Verify **updated header styles**
    const heading1 = page.locator("h1.text-2xl.sm\\:text-3xl.font-semibold.text-gray-900");
    await expect(heading1).toBeVisible();

    // Ensure subtitle is correct
    const heading3 = page.locator("h3.text-4xl.text-black.mb-6");
    await expect(heading3).toBeVisible();
  });
});