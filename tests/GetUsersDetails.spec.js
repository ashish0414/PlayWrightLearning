import test, { expect } from "playwright/test";

test.describe("Get User Details", () => {
    test('GET Users Details', async ({ request }) => {
        const response = await request.get("/api/users?page=2");
        //const responseBody = JSON.parse(await response.text());
        console.log(await response.json());
        expect(response.status()).toBe(200);
        //expect(responseBody.data.id).toBe(2);

    })
})