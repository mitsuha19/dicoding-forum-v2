/**
 * Skenario Pengujian E2E:
 * 1. Pengguna membuka halaman login.
 * 2. Pengguna mengisi email dan password dengan benar.
 * 3. Pengguna menekan tombol login.
 * 4. Sistem mengarahkan pengguna ke halaman utama (home).
 * 5. Halaman utama menampilkan teks "Forum Diskusi".
 */

import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("user can login successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/login");

    await page.waitForSelector('input[placeholder="Email"]', {
      timeout: 15000,
    });
    await page.fill('input[placeholder="Email"]', "test3@yopmail.com");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Login")');

    await page.waitForURL("http://localhost:3000/");

    // Pastikan heading utama muncul
    await expect(
      page.getByRole("heading", { name: /Forum Diskusi/i })
    ).toBeVisible();
  });
});
