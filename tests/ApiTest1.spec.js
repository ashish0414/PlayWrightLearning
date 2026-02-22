import { test, expect } from '@playwright/test';

test.describe("API Testing with Playwright", () => {
  test("GET Request - Verfiy Response Status", async ({ request }) => {
    const response = await request.get("/api/users?page=1");
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
  });
  test("POST Request - Create User", async ({ request }) => {
    const payload = {
      email: 'george.bluth1@reqres.in',
      first_name: 'George1',
      last_name: 'Bluth1',
      avatar: 'https://reqres.in/img/faces/1-image.jpg'
    }

    const response = await request.post("/api/users",{data: payload});
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);

    // const getResponse = await request.get(`api/users/${parseInt(responseBody.id)}`);
    // expect(getResponse.status()).toBe(200);
    // const getResponseBody = await getResponse.json();
    // console.log(getResponseBody);
  })
  test('PUT Request - Update User', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'zion resident'
    }

    const response = await request.put("/api/users/2",{data: payload});
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  })
  test('DELETE Request - Delete User', async ({ request }) => {
    const response = await request.delete("/api/users/2");
    expect(response.status()).toBe(204);
  })
})