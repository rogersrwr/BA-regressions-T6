import { test, expect, firefox } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';
const { App } = require('@slack/bolt');


const username = process.env.ACCT_LOGIN;
const password = process.env.ACCT_PASSWORD;
const phone = process.env.PHONE_NUMBER;
const parent_pass = process.env.PARENT_PASS;
const email = process.env.EMAIL;
const e_pass = process.env.EMAIL_PASS;
const phone2 = process.env.PHONE_ALT;
const username2 = process.env.ACCT_LOGIN2;
const username3 = process.env.ACCT_LOGIN3;
const username4 = process.env.ACCT_LOGIN4;




const app = new App({ 
  token: process.env.O_AUTH,
  signingSecret: process.env.SIGN_SECRET,
});

//const channelId = 'C06KJ8ML7PA';    //channelId for personal test server
const channelId = 'C06LGR0MJRW';       //channelId for BA slack, automated_test_alerts channel

const jsonData = require('D:/a/BA-regressions-T6/BA-regressions-T6/datetime.json');

test.beforeAll('', async ({ }) => {
});

test.describe.configure({
  mode: 'default',
});


test.beforeEach('', async ({ page }) => {
  //await page.goto('https://target110.brightarrow.com/r/');
  // await page.getByLabel('Username').click();
  // await page.getByLabel('Username').fill(`${username}`);
  // await page.getByLabel('Password').click();
  // await page.getByLabel('Password').fill(`${password}`);
  
  // const [request] = await Promise.all([
  //   page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
  //   page.getByRole('button', { name: 'Sign in' }).click()
  // ]);

  // await expect(page.getByText('Welcome, Ryan test')).toBeVisible();
  // await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
  // await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();  
});


test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  console.log(`${testInfo.title} finished in ${testInfo.duration}`); 
  
  // if (testInfo.status !== testInfo.expectedStatus) {
  //   console.log(`Did not run as expected, ended up at ${page.url()}`);
  //   jsonData.failures = true;
  //   const jsonString = JSON.stringify(jsonData, null, 2);
  //   fs.writeFileSync('D:/a/BA-regressions-T6/BA-regressions-T6/datetime.json', jsonString);
  // }
  
});


test.afterAll(async ({  }) => {
  

    await app.client.chat.postMessage({
      token: process.env.O_AUTH,
      channel: channelId,
      text: `:white_check_mark: Tests ran successfully. Visit https://rogersrwr.github.io/BA-regressions-T6/ for full results.`,
    });

  
});


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
