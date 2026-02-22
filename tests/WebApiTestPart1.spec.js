const {test, expect, request} = require('@playwright/test');
let token;
test.describe.configure({ mode: 'serial' });

test.describe("UI Serial flow API Testing with Playwright", () => {
    test("Login API and cookies storage", async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.getByPlaceholder('email@example.com').fill("trace-feudal2t@icloud.com")
        await page.getByPlaceholder('enter your passsword').fill("hacmi2-Hidnoc-pidmej")
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForLoadState('networkidle');
        token  = await page.evaluate(() => {
            return window.localStorage.getItem('token');
        });
        console.log(token);
  
    })
    test("Navigate to dashboard page and verify token", async ({page}) => {
        await page.addInitScript(token => {
            window.localStorage.setItem('token', token);
        }, token);
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('button', { name: ' Sign Out ' })).toBeVisible();
    })
})