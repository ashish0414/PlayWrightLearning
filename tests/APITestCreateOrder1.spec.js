const { expect, test , request} = require("@playwright/test");
const APIUtils = require("../tests/APIUtils/APIUtils");
const apiLoginPayload = {"userEmail":"trace-feudal2t@icloud.com","userPassword":"hacmi2-Hidnoc-pidmej"}
//let apiContext
//let token
let createOrderResponse
test.beforeAll('Login using api and get token', async () => {
    const apiContext = await request.newContext();
    const apiUtil = new APIUtils(apiContext, apiLoginPayload);
    createOrderResponse = await apiUtil.createOrder({
        "orders": [
            {
                "country": "India",
                "productOrderedId": "6960eae1c941646b7a8b3ed3"
            }
        ]
    });


})
test('Verify Orders Page', async ({ page }) => {

  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, createOrderResponse.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.getByRole('button', { name: 'Orders' }).click();

  const row = page.locator('tbody tr')
    .filter({ hasText: createOrderResponse.orderId })
    .first();

  await expect(row.locator('th'))
    .toHaveText(createOrderResponse.orderId);

  await row.locator('button', { hasText: 'Delete' }).click();
});