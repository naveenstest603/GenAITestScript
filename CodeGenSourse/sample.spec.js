import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').press('CapsLock');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button')).toContainText('Login');
  await expect(page.getByPlaceholder('Username')).toHaveValue('Admin');
  await page.getByRole('button', { name: 'Login' }).click();
});

