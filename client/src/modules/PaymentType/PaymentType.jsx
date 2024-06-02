import React, { useState, useEffect } from "react";
import ProductController from "../../service/ProductService";
import cl from "./PaymentType.module.css";
import { Button } from "../../components/UI/Button/Button";
import { maskToPrice } from "../../utils/mask";
import { useTranslation } from "react-i18next";

export const PaymentType = ({ id, setSelectedType, isFile }) => {
  const { t } = useTranslation();
  const [property, setProduct] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAuction, setIsAuction] = useState(false);

  const loadData = async () => {
    console.log(id);
    if (!id) return;
    const data = await ProductController.getProduct(id);
    setProduct(data.data);
    if (data?.data?.saleType === "auccion") {
      setIsAuction(true);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div className={cl.form}>
      <div className={cl.mainTitle}>{t("payment.ads.1")}</div>
      <div className={cl.subTitle}>
        {t("payment.ads.2")} <br />
        {t("payment.ads.3")}
      </div>
      {!isFile && !isAuction && (
        <div className={cl.inputs}>
          <div
            className={`${cl.radio} ${
              selectedOption === "book" ? cl.radioActive : null
            }`}
            onClick={() => setSelectedOption("book")}
          >
            <div className={cl.radioLeft}>
              <div
                className={`${cl.circle} ${
                  selectedOption === "book" ? cl.circleActive : null
                }`}
              ></div>
              <div className={cl.text}>{t("payment.reserveLot")}</div>
            </div>
            <div className={cl.radioRight}>{maskToPrice(property?.book)}</div>
          </div>

          <div
            className={`${cl.radio} ${
              selectedOption === "buy" ? cl.radioActive : null
            }`}
            onClick={() => setSelectedOption("buy")}
          >
            <div className={cl.radioLeft}>
              <div
                className={`${cl.circle} ${
                  selectedOption === "buy" ? cl.circleActive : null
                }`}
              ></div>
              <div className={cl.text}>{t("payment.fullPay")} </div>
            </div>
            <div className={cl.radioRight}>{maskToPrice(property?.price)}</div>
          </div>

          <div
            className={`${cl.radio} ${
              selectedOption === "contact" ? cl.radioActive : null
            }`}
            onClick={() => setSelectedOption("contact")}
          >
            <div className={cl.radioLeft}>
              <div
                className={`${cl.circle} ${
                  selectedOption === "contact" ? cl.circleActive : null
                }`}
              ></div>
              <div className={cl.text}>{t("payment.connectDev")}</div>
            </div>
            {/* <div className={cl.radioRight}>300 000 ₸</div> */}
          </div>
        </div>
      )}

      {isFile && (
        <div className={cl.inputs}>
          <div
            className={`${cl.radio} ${
              selectedOption === "file" ? cl.radioActive : null
            }`}
            onClick={() => setSelectedOption("file")}
          >
            <div className={cl.radioLeft}>
              <div
                className={`${cl.circle} ${
                  selectedOption === "file" ? cl.circleActive : null
                }`}
              ></div>
              <div className={cl.text}>{t("payment.fullPay")}</div>
            </div>
            <div className={cl.radioRight}>
              {maskToPrice(property?.filePrice)}
            </div>
          </div>
        </div>
      )}

      {isAuction && (
        <div className={cl.inputs}>
          <div
            className={`${cl.radio} ${
              selectedOption === "auction" ? cl.radioActive : null
            }`}
            onClick={() => setSelectedOption("auction")}
          >
            <div className={cl.radioLeft}>
              <div
                className={`${cl.circle} ${
                  selectedOption === "auction" ? cl.circleActive : null
                }`}
              ></div>
              <div className={cl.text}>{t("payment.buyPlace")}</div>
            </div>
            <div className={cl.radioRight}>{maskToPrice(property?.price)}</div>
          </div>
        </div>
      )}

      <Button
        type={"fill"}
        className={cl.btn}
        disabled={selectedOption === null}
        onClick={() => {
          if (selectedOption === null) return;
          setSelectedType(selectedOption);
        }}
      >
        {t("payment.continue")}
      </Button>
    </div>
  );
};
