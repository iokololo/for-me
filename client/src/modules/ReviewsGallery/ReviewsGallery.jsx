import React, { useEffect, useState } from "react";
import cl from "./ReviewsGallery.module.css";
import ProductService from "../../service/ProductService.js";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ReviewsGallery = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const loadData = async () => {
    const response = [
      {
        _id: "1",
            title: "Great location",
            text: "Love the neighborhood, close to everything you need!",
            authorName: "John Doe"
      },
      {
        _id: "2",
            title: "Quiet and cozy",
            text: "Perfect place for families, very peaceful.",
            authorName: "Jane Smith"
      },
      {
        _id: "3",
            title: "Modern and stylish",
            text: "Great modern amenities and stylish interiors.",
            authorName: "Emily Johnson"
      }
    ];
    setItems(response);

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
        >
          <div className={cl.city}>
            {
              items[selected - 1]?.title
            }
          </div>

          <div className={cl.reviewText} >
            {
              items[selected - 1]?.text
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected - 1]?.authorName}</div>
            <div className={cl.topB}>{t("section4.city")}</div>
          </div>
        </div>
        <div
          className={cl.big}
          onClick={() => {
            navigate(`/product/${items[selected]?._id }`);
          }}
        >
          <div className={cl.city}>
            {
              items[selected]?.title
            }
          </div>
          <div className={cl.reviewText} >
            {
              items[selected]?.text
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected]?.authorName}</div>
            <div className={cl.topB}>{t("section4.city")}</div>
          </div>
        </div>
        <div
          className={cl.small}
          onClick={() => {
            navigate(`/product/${items[selected + 1]?._id }`);
          }}
        >
          <div className={cl.city}>
            {
              items[selected + 1]?.title
            }
          </div>
          <div className={cl.reviewText} >
            {
              items[selected + 1]?.text
            }
          </div>
          <div className={cl.bottom}>
            <div className={cl.top}>{items[selected + 1]?.authorName}</div>
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

              <div className={cl.reviewText}>
                {
                  item?.text
                }
              </div>  

              <div className={cl.cardBottom}>
                <div className={cl.cardBottomTitle}>{item?.authorName}</div>
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
