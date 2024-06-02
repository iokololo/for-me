import { ITEM_TYPE } from "../models/Payment.js";
import models from "../models/index.js";
import axios from "axios";
import PDFDocument from "pdf-creator-node";
import path from "path";
import { TGBot } from "../index.js";

class PaymentService {
  async checkUser(user) {
    if (!user || !user.isVerified) {
      return false;
    }
  }

  async getToken(amount, invoiceId) {
    const formdata = new FormData();
    formdata.append("grant_type", "client_credentials");
    formdata.append(
      "scope",
      "usermanagement email_send verification statement statistics payment"
    );
    formdata.append("client_id", "test");
    formdata.append("client_secret", "yF587AV9Ms94qN2QShFzVR3vFnWkhjbAK3sG");
    formdata.append("invoiceID", invoiceId);
    formdata.append("amount", amount);
    formdata.append("currency", "KZT");
    formdata.append("terminal", "67e34d63-102f-4bd1-898e-370781d0074d");

    const authPayment = axios.post(process.env.PAYMENT_AUTH_URL, formdata, {
      headers: {
        "Content-Type": "form-data",
      },
    });

    return authPayment;
  }

  async generateUniqueInvoiceId() {
    const invoiceId = Math.floor(100000 + Math.random() * 900000);
    try {
      const payment = await models.Payment.findOne({ invoiceId: invoiceId });
      if (payment) {
        this.generateUniqueInvoiceId();
      } else {
        return invoiceId;
      }
    } catch (e) {
      return invoiceId;
    }
    return invoiceId;
  }

  async createPayment(amount, userId, type, item) {
    try {
      const user = await models.User.findById(userId);
      if (!this.checkUser(user)) {
        return { status: 401, data: "Account error" };
      }
      const invoiceId = await this.generateUniqueInvoiceId();

      const payment = await models.Payment.create({
        user: user,
        amount: amount,
        invoiceID: invoiceId,
        userId: userId,
        type: type,
        product: item,
      });

      await payment.save();
      const authData = await this.getToken(amount, invoiceId);
      return { status: 200, data: { auth: authData.data, invoiceId } };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async checkPayment(invoiceID) {
    try {
      const payment = await models.Payment.findOne({ invoiceID: invoiceID });
      if (!payment) {
        return { status: 404, data: "Payment not found" };
      }

      if (payment.success) {
        return { status: 200, data: "Payment success" };
      }

      const authData = await this.getToken(payment.amount, invoiceID);

      const response = await axios.get(
        process.env.PAYMENT_CHECK_URL + invoiceID,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authData.data.access_token,
          },
        }
      );
      console.log(payment);
      const product = await models.Product.findById(payment.product);
      if (response?.data?.transaction?.statusName === "CHARGE") {
        payment.success = true;
        payment.ip = response.data.transaction.ip;
        payment.ipCountry = response.data.transaction.ipCountry;
        payment.ipCity = response.data.transaction.ipCity;
        payment.phone = response.data.transaction.phone;
        payment.email = response.data.transaction.email;
        payment.statusID = response.data.transaction.statusID;
        payment.issuer = response.data.transaction.issuer;
        payment.cardMask = response.data.transaction.cardMask;
        payment.cardType = response.data.transaction.cardType;
        payment.transactionID = response.data.transaction.id;
        await payment.save();

        if (payment.type === ITEM_TYPE[0]) {
          const sell = await models.Sells.create({
            user: payment.user,
            product: payment.product,
            payment: payment,
          });
          await sell.save();
          product.isSold = true;
        }
        if (payment.type === ITEM_TYPE[1]) {
          const booking = await models.Bookings.create({
            user: payment.user,
            product: payment.product,
            payment: payment,
          });
          await booking.save();
          product.isBooked = true;
        }
        if (payment.type === ITEM_TYPE[2]) {
          const file = product.file;
          const newFileAccess = await models.File.create({
            user: payment.user,
            product: payment.product,
            payment: payment,
            file: file,
          });
          await newFileAccess.save();
        }
        if (payment.type === ITEM_TYPE[3]) {
          const auction = await models.Auction.create({
            user: payment.user,
            product: payment.product,
            payment: payment,
          });
          await auction.save();
        }
        await product.save();

        try {
          console.log("sending tg notification");
          await TGBot.sendMessage(process.env.TG_CHAT_ID, `Новый платеж.`);
        } catch (e) {
          console.log("error sending tg notification");
          console.log(e);
        }

        return { status: 200, data: "Payment success" };
      }
      if (response?.data?.transaction?.statusName === "REJECTED") {
        return { status: 205, data: "Payment rejected" };
      }
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async downloadStatistic(req, res) {
    try {
      const auctionsData = await models.Auction.find({})
        .populate("user")
        .populate("product")
        .exec();
      const bookingData = await models.Bookings.find({})
        .populate("user")
        .populate("product")
        .exec();
      const sellsData = await models.Sells.find({})
        .populate("user")
        .populate("product")
        .exec();
      const analyticsData = await models.File.find({});
      const feedbackData = await models.Contact.find({});

      const filePath = path.join(`data.pdf`);

      const html = `
        <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
        <h1>Статистика</h1>
        <table>
          <thead>
          <tr>
            <th>Брони</th>
            <th>Аукционы</th>
            <th>Аналитика</th>
            <th>Лоты</th>
            <th>Заявки на обратную связь</th>
          </tr>
          </thead>
          <tbody>
            ${`
              <tr>
                <td>${bookingData?.length}</td>
                <td>${auctionsData?.length}</td>
                <td>${analyticsData?.length}</td>
                <td>${feedbackData?.length}</td>
                <td>${sellsData?.length}</td>
              </tr>
            `}
          </tbody>
        </table>
        <h2>Аукцион</h2>
        <table>
          <thead>
          <tr>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Объект</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          ${auctionsData?.map(
            (data) =>
              `
              <tr>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/User/records/${data?.user?._id}/show">${data?.user?.name}</a>
                </td>
                <td>${data?.user.phone}</td>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/Product/records/${data?.product?._id}/show">${data?.product?.title}</a>
                </td>
                <td>${data?.createdAt}</td>
              </tr>
              `
          )}
          </tbody>
        </table>
        <h2>Бронь</h2>
        <table>
          <thead>
          <tr>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Объект</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          ${bookingData?.map(
            (data) =>
              `
              <tr>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/User/records/${data?.user?._id}/show">${data?.user?.name}</a>
                </td>
                <td>${data?.user.phone}</td>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/Product/records/${data?.product?._id}/show">${data?.product?.title}</a>
                </td>
                <td>${data?.createdAt}</td>
              </tr>
              `
          )}
          </tbody>
        </table>

        <h2>Продажа</h2>
        <table>
          <thead>
          <tr>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Объект</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          ${sellsData?.map(
            (data) =>
              `
              <tr>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/User/records/${data?.user?._id}/show">${data?.user?.name}</a>
                </td>
                <td>${data?.user.phone}</td>
                <td>
                  <a href="http://admin.inlot.kz/admin/resources/Product/records/${data?.product?._id}/show">${data?.product?.title}</a>
                </td>
                <td>${data?.createdAt}</td>
              </tr>
              `
          )}
          </tbody>
        </table>
        </body>
        </html>`;
      const options = {
        format: "A3",
        orientation: "landscape",
        border: "10mm",
      };
      const document = {
        html,
        data: {
          auctionsData,
          bookingData,
          sellsData,
        },
        path: filePath,
      };
      await PDFDocument.create(document, options);
      return res.status(200).download(filePath);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

export default new PaymentService();
