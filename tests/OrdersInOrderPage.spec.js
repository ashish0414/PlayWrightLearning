const { expect, test, request } = require("@playwright/test");
const apiLoginPayload = {"userEmail":"trace-feudal2t@icloud.com","userPassword":"hacmi2-Hidnoc-pidmej"}
let apiContext
let token
test.beforeAll('Loginnusing api and get token', async () => {
 apiContext = await request.newContext();
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: apiLoginPayload
    });
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
     token = responseJson.token;
    console.log(token);
    
})

test('Verify Orders Page', async ({ page }) => {
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    const createOrdereResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: {
            "orders": [
                {
                    "country": "India",
                    "productOrderedId": "6960eae1c941646b7a8b3ed3"
                }
            ]
        },
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    expect(createOrdereResponse.ok()).toBeTruthy();
    const createOrdereResponseJson = await createOrdereResponse.json();

    await page.getByRole('button', { name: 'Orders' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody tr').filter({ hasText: createOrdereResponseJson.orders[0] }).first().locator('th').textContent().then(orderId => {
        expect(orderId.trim()).toBe(createOrdereResponseJson.orders[0]);
    })
    await page.locator('tbody tr').filter({ hasText: createOrdereResponseJson.orders[0] }).first().locator('td', { hasText: 'Delete' }).click();
})