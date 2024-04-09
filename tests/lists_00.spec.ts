import { test, expect } from '@playwright/test';


test.describe.configure({
  mode: 'default',
});



test.beforeEach('Login before each test', async ({ page }) => {
  await page.goto('https://target110.brightarrow.com/r/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ryantest');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('RogerOf26');
  
  const [request] = await Promise.all([
    page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=3F71C6E3-2CF6-41F8-975B-59A373DC03F5") && response.status() === 200, {timeout: 60000}),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);

  await expect(page.getByText('Welcome, Ryan test')).toBeVisible();
  await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
  await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();

  
});





test('#001: Make list from Create List button', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Create List$/ }).click();
  await page.getByLabel('List Name').fill('auto list 1');
  const [request] = await Promise.all([
    //Failure here means automation was not able to connect to TargetAPI in under 60 secs.
    page.waitForResponse(response => response.url().includes("TargetAPI/api/dialList/GetListInfo?accessToken=3F71C6E3-2CF6-41F8-975B-59A373DC03F5&listID=") && response.status() === 200, {timeout: 60000}),
    page.getByRole('button', { name: 'Add' }).click()
  ]);
  await expect(page.getByText('List Details')).toBeVisible();
  //Failure here means screenshot comparison failed.
  await expect(page).toHaveScreenshot("001-createList-listDetailsNew-chromium-win32.png", { fullPage: true });

  await page.getByTestId('FastRewindIcon').click();
  await expect(page.getByRole('link', { name: 'auto list 1', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'test list 1', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'test list 2', exact: true })).toBeVisible();
  await expect(page).toHaveScreenshot("001-myLists-check-chromium-win32.png", {
    fullPage: true,
    mask: [page.locator('.listOfListsRow > td.listsTableColumns.advanced')],
  });
  
  await page.getByTestId('FastRewindIcon').click();
  await expect(page.getByText('Welcome, Ryan test')).toBeVisible();
  await expect(page).toHaveScreenshot("001-homePage-asExpected-check-chromium-win32.png", { fullPage: true });

});

