/**
 * Skenario Pengujian End-to-End (sesuai requirement reviewer):
 * 1. User membuka halaman login.
 * 2. User mengisi email & password yang valid (akun nyata di Forum API).
 * 3. User menekan tombol Login.
 * 4. Aplikasi memanggil API login asli dan menyimpan token.
 * 5. User diarahkan ke halaman utama ("/").
 * 6. Halaman utama menampilkan heading "Forum Diskusi".
 */

import { test, expect } from '@playwright/test';

test.describe('Login Flow (E2E Real API)', () => {
  test('user can login via UI and see home page', async ({ page }) => {
    // 1. buka halaman login
    await page.goto('http://localhost:3000/auth/login');

    // 2. isi form
    await page.fill('input[placeholder="Email"]', 'test3@yopmail.com');
    await page.fill('input[placeholder="Password"]', '123456');

    // 3. klik tombol login
    await page.click('button:has-text("Login")');

    // 4. tunggu redirect ke halaman utama
    await page.waitForURL('http://localhost:3000/', {
      timeout: 15000,
    });

    // 5. pastikan halaman utama tampil
    await expect(
      page.getByRole('heading', { name: /Forum Diskusi/i })
    ).toBeVisible();
  });
});
