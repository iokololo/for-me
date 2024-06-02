import PaymentService from "../services/PaymentService.js";

class PaymentController {
  async createPayment(req, res) {
    try {
      const { amount, type, item } = req.body;
      const user = req.user?.data?._id;
      const payment = await PaymentService.createPayment(
        amount,
        user,
        type,
        item
      );
      return res.status(payment.status).json(payment);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async checkPayment(req, res) {
    try {
      const { invoiceID } = req.body;
      const payment = await PaymentService.checkPayment(invoiceID);
      return res.status(payment.status).json(payment);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async downloadStatistic(req, res) {
    try {
      const ress = await PaymentService.downloadStatistic(req, res);
      return ress;
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
}

export default new PaymentController();
