/**
 * Tujuan pengujian (versi CI-friendly):
 * 1. User dianggap sudah login (tanpa call API login asli).
 * 2. User buka halaman home (/).
 * 3. Halaman utama menampilkan teks "Forum Diskusi".
 *
 * Catatan:
 * - Ini bypass form login supaya CI gak tergantung backend auth.
 */

import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("user can see home page after being authenticated", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          token: "FAKE_TOKEN_FOR_TEST",
          user: {
            id: "user-123",
            name: "Test User",
            email: "test3@yopmail.com",
          },
        })
      );
    });

    // Akses halaman utama
    await page.goto("http://localhost:3000/");

    // Pastikan heading utama muncul
    await expect(
      page.getByRole("heading", { name: /Forum Diskusi/i })
    ).toBeVisible();
  });
});
