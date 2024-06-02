import React, { useState, useEffect } from "react";
import { Icon } from "../../components/UI/Icon/Icon";
import { Button } from "../../components/UI/Button/Button";
import cl from "./PaymentMethod.module.css";
import PaymentService from "../../service/PaymentService.js";
import ProductService from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ITEM_TYPE = ["Покупка", "Бронь", "auction"];

export const PaymentMethod = ({ id, setCurrentStep, selectedType, isFile }) => {
  const { t } = useTranslation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [property, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const req = await ProductService.getProduct(id);
      setProduct(req?.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const paymentHandler = () => {
    if (selectedPaymentMethod === "card") {
      cardPayment();
      return;
    }
  };

  const cardPayment = async () => {
    try {
      const req = isFile
        ? await PaymentService.createPayment(property?.filePrice, "file", id)
        : await PaymentService.createPayment(
            selectedType == "buy" || selectedType == "auction"
              ? property?.price
              : property?.book,
            selectedType == "buy"
              ? ITEM_TYPE[0]
              : selectedType === "book"
              ? ITEM_TYPE[1]
              : selectedType === "auction"
              ? ITEM_TYPE[2]
              : null,
            id
          );
      const createPaymentObject = function (auth, invoiceId, amount) {
        const paymentObject = {
          invoiceId: invoiceId,
          invoiceIdAlt: invoiceId,
          backLink: "https://example.kz/success.html",
          failureBackLink: "https://example.kz/failure.html",
          postLink: "https://example.kz/",
          failurePostLink: "https://example.kz/order/1123/fail",
          language: "rus",
          description: "Оплата в интернет магазине",
          accountId: "test",
          terminal: "67e34d63-102f-4bd1-898e-370781d0074d",
          amount: amount,
          currency: "KZT",
          cardSave: true,
        };
        paymentObject.auth = auth;
        return paymentObject;
      };

      const checkPaymentStatus = async () => {
        const request = await PaymentService.checkPaymentStatus(
          req?.data?.invoiceId
        );
      };

      window?.halyk?.showPaymentWidget(
        createPaymentObject(
          req?.data?.auth,
          req?.data?.invoiceId,
          isFile
            ? property?.filePrice
            : selectedType == "buy" || selectedType === "auction"
            ? property?.price
            : property?.book
        ),
        (e) => {
          if (e.success === true) {
            checkPaymentStatus(e);
            navigate("/");
          } else {
            console.log(e);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cl.root}>
      <div className={cl.breadcrumb}>
        <div
          className={`${cl.backButtonMobile} ${cl.backButton}`}
          onClick={() => {
            setCurrentStep(0);
          }}
        >
          <div className={cl.icon}>
            <Icon name="arrowDown" />
          </div>
          <div className={cl.buttonText}>{t("payment.back")}</div>
        </div>
      </div>
      <div
        className={cl.backButton}
        onClick={() => {
          setCurrentStep(0);
        }}
      >
        <div className={cl.icon}>
          <Icon name="arrowDown" />
        </div>
        <div className={cl.buttonText}>{t("payment.back")}</div>
      </div>

      <div className={cl.paymentMethodText}>{t("payment.choose")}</div>

      <div className={cl.inputs}>
        <div
          className={`${cl.radio} ${
            selectedPaymentMethod === "card" && cl.radioActive
          }`}
          onClick={() => {
            setSelectedPaymentMethod("card");
          }}
        >
          <div className={cl.radioIcon}>
            <Icon name="card" />
          </div>
          <div className={cl.radioText}>{t("payment.card")}</div>
        </div>

        <div
          className={`${cl.radio} ${
            selectedPaymentMethod === "qr" && cl.radioActive
          }`}
          onClick={() => {
            setSelectedPaymentMethod("qr");
          }}
        >
          <div className={cl.radioIcon}>
            <Icon name="kaspi" />
          </div>
          <div className={cl.radioText}>{t("payment.qr")}</div>
        </div>
      </div>
      <div className={cl.btnView}>
        <Button
          type={"fill"}
          className={cl.btn}
          disabled={selectedPaymentMethod === null && !isLoading}
          onClick={paymentHandler}
        >
          {t("payment.continue")}
        </Button>
      </div>
    </div>
  );
};
