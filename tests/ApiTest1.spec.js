import { test, expect } from '@playwright/test';

test.describe("API Testing with Playwright", () => {
  test("GET Request - Verfiy Response Status", async ({ request }) => {
    const response = await request.get("/api/users/3");
    expect(response.status()).toBe(200);
    //const data = await response.json();
    console.log(response.status());
  });
})