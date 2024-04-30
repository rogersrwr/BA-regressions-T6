import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';



const jsonData = require('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/PW_Tester/datetime.json');


/*
test("setup checks", async ({ page }) => {
  test.slow();


});
*/

test('message check in firefox', async ({ page }) => {
  //const browser = await firefox.launch();
  //const page = await browser.newPage();
  //const msgString2 = 'test message at 2024-4-23_16-10';
  await page.goto('https://voice.google.com/about');
  await page.locator('#getVoiceToggle').getByRole('button', { name: 'For personal use' }).click();
  await page.getByRole('button', { name: 'Web' }).click();
  await page.getByLabel('Email or phone').fill('brightarrowtest1@gmail.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Enter your password').fill('RogerOf25');
  await page.getByLabel('Enter your password').press('Enter');
  //await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('tab', { name: 'Messages' }).click();
  //await page.getByLabel('Message by 79041: test').click();
  //await expect(page.getByLabel('Unread. Message by ‪79041‬:')).toBeVisible();
  await page.getByLabel('Unread. Message by ‪79041‬:').click();
  await expect(page.getByRole('list').getByText(`${jsonData.datetime}`, { exact: true })).toBeVisible();
  
  await page.goto('https://www.google.com/gmail/about/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  /*
  await page.getByLabel('Email or phone').fill('brightarrowtest1@gmail.com');
  await page.getByLabel('Email or phone').press('Enter');
  await page.getByLabel('Enter your password').fill('RogerOf25');
  await page.getByLabel('Enter your password').press('Enter');
  await page.getByRole('link', { name: `auto: ${jsonData.datetime} - Sent` }).click();
  */
  await page.getByRole('link', { name: 'BrightArrow1 brightarrowtest1' }).click();
  await expect(page.getByRole('link', { name: `${jsonData.datetime}` }).first()).toBeVisible();
  await page.getByRole('link', { name: `${jsonData.datetime}` }).first().click();
  await expect(page.getByText('test contact2', { exact: true })).toBeVisible();

  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill('8624385648');
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill('RogerOf26');
  await page.getByLabel('Enter your password').press('Enter');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
  await page.getByRole('button', { name: 'settings' }).click();
  await expect(page.getByText(`${jsonData.datetime}`)).toBeVisible();
});
