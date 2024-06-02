import { $authHost, $host } from "./index";

class PaymentService {
  async createPayment(amount, type, item) {
    try {
      const response = await $authHost.post("/payment/create", {
        amount,
        type,
        item,
      });
      if (response.status == 200) {
        return response.data;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  }

  async checkPaymentStatus(invoiceID) {
    try {
      const response = await $authHost.post("/payment/check", {
        invoiceID,
      });
      if (response.status == 200) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new PaymentService();
