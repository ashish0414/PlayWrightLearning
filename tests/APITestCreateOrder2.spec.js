const { expect,test } = require("@playwright/test");
let webContext

test.beforeAll("Login API and cookies storage", async ({browser}) => {
        const context = await browser.newContext()
        const page = await context.newPage();
        
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.getByPlaceholder('email@example.com').fill("trace-feudal2t@icloud.com")
        await page.getByPlaceholder('enter your passsword').fill("hacmi2-Hidnoc-pidmej")
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForLoadState('networkidle');
        await context.storageState({path: 'state.json'});
        await context.close();
        webContext = await browser.newContext({storageState: 'state.json'});
        
  
})
test('Verify Orders Page', async () => {
    const page  =await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Orders' }).click();
    await page.waitForLoadState('networkidle');
    await page.pause();
})