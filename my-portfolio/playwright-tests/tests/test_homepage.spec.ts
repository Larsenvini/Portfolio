import { test, expect } from "@playwright/test";

test("Portfolio Homepage Should Load and Display Correct Heading", async ({ page }) => {
  await page.goto("https://larsenvini.pages.dev");

  // Updated selector to match new header styles
  const heading1 = page.locator('h1.text-2xl.sm\\:text-3xl.font-semibold.text-gray-900');
  await expect(heading1).toHaveText("Vinicius Larsen");

  const heading3 = page.locator('h3.text-4xl.text-black.mb-6');
  await expect(heading3).toHaveText("QA Automation Engineer");
});