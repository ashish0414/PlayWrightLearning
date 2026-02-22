class APIUtils {

  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const response = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );

    const responseJson = await response.json();
    return responseJson.token;
  }

  async createOrder(createOrderPayload) {

    const token = await this.getToken();

    const response = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );

    const responseJson = await response.json();

    return {
      token: token,
      orderId: responseJson.orders[0]
    };
  }
}

module.exports = APIUtils;