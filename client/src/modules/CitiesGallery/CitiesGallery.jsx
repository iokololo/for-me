import React, { useEffect, useState } from "react";
import cl from "./CitiesGallery.module.css";
import ProductService from "../../service/ProductService";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CitiesGallery = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const loadData = async () => {
    const response = await ProductService.getBooks();
    setItems(response?.data);

    console.log("Books ", items)
  };

  const handlePrev = () => {
    if (selected > 1) {
      setSelected(selected - 1);
    }
  };
  const handleNext = () => {
    if (selected < items.length - 2) {
      setSelected(selected + 1);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!items) {
    return null;
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.pc}>
        <div className={cl.leftControll} onClick={handleNext}>
          <Icon name='next' />
        </div>
        <div
          className={cl.small}
          onClick={() => {
            navigate(`/product/${items[selected - 1]?._id }`);
          }}
          style={{
            background: `url(${
              items[selected - 1]?.images[0]
            }`,
          }}
        >
          <div className={cl.city}>
            {
              items[selected - 1]?.title[
                i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
              ]
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected - 1]?.totalOffers}</div>
            <div className={cl.topB}>{t("section4.city")}</div>
          </div>
        </div>
        <div
          className={cl.big}
          style={{
            background: `url(${
              items[selected]?.images[0]
            }`,
          }}
          onClick={() => {
            navigate(`/product/${items[selected]?._id }`);
          }}
        >
          <div className={cl.city}>
            {
              items[selected]?.title[
                i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
              ]
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected]?.totalOffers}</div>
            <div className={cl.topB}>{t("section4.city")}</div>
          </div>
        </div>
        <div
          className={cl.small}
          style={{
            background: `url(${
              items[selected + 1]?.images[0]
            }`,
          }}
          onClick={() => {
            navigate(`/product/${items[selected + 1]?._id }`);
          }}
        >
          <div className={cl.city}>
            {
              items[selected + 1]?.title[
                i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
              ]
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected + 1]?.totalOffers}</div>
            <div className={cl.topB}>{t("section4.city")}</div>
          </div>
        </div>
        <div className={cl.rightControll} onClick={handlePrev}>
          <Icon name='prev' />
        </div>
      </div>
      <div className={cl.mobile}>
        <div className={cl.mobileWrapper}>
          {items.map((item) => (
            <div
              className={cl.card}
              style={{
                background: `url(${
                 item?.images[0]
                })`,
              }}
              onClick={() => {
                navigate(`/product/${items[selected]?._id }`);
              }}
            >
              <div className={cl.cardTop}>
                {
                  item?.title[
                    i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                  ]
                }
              </div>
              <div className={cl.cardBottom}>
                <div className={cl.cardBottomTitle}>{item?.totalOffers}</div>
                <div className={cl.cardBottomSubTitle}>
                  {t("section4.city")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
