// Test script

import { test, expect } from '@playwright/test';

const orangeHRMLoginPage = new OrangeHRMLoginPage(page);

test('TC_01 - Verify if user can login with valid credentials', async ({ page }) => {
  await orangeHRMLoginPage.gotoLoginPage();
  await orangeHRMLoginPage.enterUsername('Admin');
  await orangeHRMLoginPage.enterPassword('admin123');
  await orangeHRMLoginPage.clickLoginButton();
  // Add assertions to verify user is able to login successfully with valid credentials
});

test('TC_02 - Verify error message is displayed for invalid credentials', async ({ page }) => {
  await orangeHRMLoginPage.gotoLoginPage();
  await orangeHRMLoginPage.enterUsername('InvalidUser');
  await orangeHRMLoginPage.enterPassword('InvalidPassword');
  await orangeHRMLoginPage.clickLoginButton();
  // Add assertions to verify error message is displayed for invalid credentials
});

test('TC_03 - Verify user cannot login with empty username and password', async ({ page }) => {
  await orangeHRMLoginPage.gotoLoginPage();
  await orangeHRMLoginPage.clickLoginButton();
  // Add assertions to verify user cannot login with empty username and password
});

test('TC_04 - Verify user cannot login with only username filled', async ({ page }) => {
  await orangeHRMLoginPage.gotoLoginPage();
  await orangeHRMLoginPage.enterUsername('Admin');
  await orangeHRMLoginPage.clickLoginButton();
  // Add assertions to verify user cannot login with only username filled
});

test('TC_05 - Verify user cannot login with only password filled', async ({ page }) => {
  await orangeHRMLoginPage.gotoLoginPage();
  await orangeHRMLoginPage.enterPassword('admin123');
  await orangeHRMLoginPage.clickLoginButton();
  // Add assertions to verify user cannot login with only password filled
});