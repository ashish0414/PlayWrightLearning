const { expect, test, request } = require("@playwright/test");
let webContext
let createOrdereResponseJson

test.beforeAll("Login API and cookies storage", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder('email@example.com').fill("trace-feudal2t@icloud.com")
    await page.getByPlaceholder('enter your passsword').fill("hacmi2-Hidnoc-pidmej")
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    await context.close();
    webContext = await browser.newContext({ storageState: 'state.json' });


})
test('create Orders and verify order Page', async () => {
    const noOrders = { data: [], message: "No Orders" }
    const page = await webContext.newPage()
    const apiContext = await request.newContext()
    await page.goto("https://rahulshettyacademy.com/client/");

    const token = await page.evaluate(() => {
        return window.localStorage.getItem('token');
    });
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
    createOrdereResponseJson = await createOrdereResponse.json();
    console.log(createOrdereResponseJson);

    //await page.goto("https://rahulshettyacademy.com/client/");
    //await page.waitForLoadState('networkidle');
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(noOrders)
        })
    });
    await page.getByRole('button', { name: 'Orders' }).click();
    await page.waitForLoadState('networkidle');
    expect(await page.url()).toContain("dashboard/myorders");
    expect(await page.getByText("No Orders")).toBeVisible();
    //await page.locator('tbody tr').waitFor()

    await page.pause();
})
test('Request API interecept for order id whcih is not present', async () => {
    const page = await webContext.newPage()
    const apiContext = await request.newContext()
    await page.goto("https://rahulshettyacademy.com/client/");
    const token = await page.evaluate(() => {
        return window.localStorage.getItem('token');
    });
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
    createOrdereResponseJson = await createOrdereResponse.json();
    console.log(createOrdereResponseJson);
    await page.getByRole('button', { name: 'Orders' }).click();
    await page.waitForLoadState('networkidle');
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ 
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' 
        })
    )
    await page.locator('tbody tr').filter({ hasText: createOrdereResponseJson.orders[0] }).first().locator('td', { hasText: 'View' }).click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause()
})
