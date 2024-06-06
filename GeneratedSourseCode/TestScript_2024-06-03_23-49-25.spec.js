// Test script


import { test, expect } from '@playwright/test';

const ecommercePage = new ECommercePage(page);

test('TC_01 - Verify if user can add items to cart successfully', async ({ page }) => {
  await ecommercePage.gotoECommerceWebsite();
  await ecommercePage.browseAndAddToCart();
  await ecommercePage.proceedToCheckout();
  // Add assertions to verify user is able to add items to cart and proceed to checkout without any errors
});

test('TC_02 - Verify if user can enter shipping information', async ({ page }) => {
  await ecommercePage.gotoECommerceWebsite();
  await ecommercePage.browseAndAddToCart();
  await ecommercePage.proceedToCheckout();
  await ecommercePage.enterShippingInformation();
  // Add assertions to verify user is able to enter shipping information without any issues
});

test('TC_03 - Verify if user can enter payment information', async ({ page }) => {
  await ecommercePage.gotoECommerceWebsite();
  await ecommercePage.browseAndAddToCart();
  await ecommercePage.proceedToCheckout();
  await ecommercePage.enterShippingInformation();
  await ecommercePage.enterPaymentInformation();
  // Add assertions to verify user is able to enter payment information without any errors
});

test('TC_04 - Verify if user can place order successfully', async ({ page }) => {
  await ecommercePage.gotoECommerceWebsite();
  await ecommercePage.browseAndAddToCart();
  await ecommercePage.proceedToCheckout();
  await ecommercePage.enterShippingInformation();
  await ecommercePage.enterPaymentInformation();
  await ecommercePage.placeOrder();
  // Add assertions to verify user is able to successfully place order and receive confirmation
});