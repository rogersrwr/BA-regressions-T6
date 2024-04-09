import { test, expect } from '@playwright/test';

test("setup checks", async ({ page }) => {

  
  await page.goto('https://target110.brightarrow.com/r/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ryantest');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('RogerOf26');
  
  const [request] = await Promise.all([
    page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);
  
  await expect(page.getByText('Welcome, Ryan test')).toBeVisible();
  await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
  await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();


  await page.locator('div').filter({ hasText: /^My Lists$/ }).click();
  await page.getByRole('button', { name: 'ryan test' }).click();

  await page.getByLabel('Search').click();
  await page.getByLabel('Search').fill('auto list 1');
  //await page.getByLabel('Search').press('Enter');

  const [request2] = await Promise.all([
    page.waitForResponse(response => response.url().includes("TargetAPI/api/dialList/GetListsFromFolder?accessToken=") && response.status() === 200, {timeout: 60000}),
    page.getByLabel('Search').press('Enter')
  ]);

  const myElement = page.locator('.listOfListsRow > td').first();

  if (await myElement.isVisible()) {
    await page.locator('input[name="cb_lists2039717"]').check();
    await page.getByRole('button', { name: 'Select an Action' }).click();
    await page.getByRole('button', { name: 'Delete a list' }).click();
    //await page.getByRole('button', { name: 'OK' }).click();
    const [request3] = await Promise.all([
      page.waitForResponse(response => response.url().includes("TargetAPI/api/dialList/DeleteList?accessToken=") && response.status() === 200, {timeout: 60000}),
      page.getByRole('button', { name: 'OK' }).click()
    ]);
  }

  await expect(page.getByText('ryan test Lists (0)')).toBeVisible();
  
});
