import test, { expect } from "playwright/test";

test.describe("Get User Details", () => {
    test('GET Users Details', async ({ request }) => {
        const response = await request.get("/api/users/");
        //const responseBody = JSON.parse(await response.text());
        console.log(await response.text());
        expect(response.status()).toBe(200);
        //expect(responseBody.data.id).toBe(2);

    })
})