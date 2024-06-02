import React from "react";
import cl from "./ProductCard.module.css";
import propertyImage from "../../../assets/images/property.png";
import { Icon } from "../Icon/Icon.jsx";
import { maskToPrice } from "../../../utils/mask.js";
import { useTimer } from "react-timer-hook";
import { useTranslation } from "react-i18next";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductService from "../../../service/ProductService";

export const ProductCard = ({ item, type, customWidth, className }) => {
  console.log(22, "Product Card Item: ", item)
  const time = item?.timer ? new Date(item?.timer) : new Date();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { days, hours, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (user?.userData?.favorites?.items?.includes(item?._id)) {
      await ProductService.removeFavorite(item?._id);
    } else {
      await ProductService.addFavorite(item?._id);
    }
    // reload
    window.location.reload();
  };

  if (!item) {
    return (
      <SkeletonTheme>
        <div
          className={cl.root}
          style={{
            width: customWidth ? `${customWidth}px` : "223px",
          }}
        >
          {item?.isTimer ? (
            <Skeleton className={cl.imgMin} />
          ) : (
            <Skeleton src={propertyImage} className={cl.img} />
          )}
          <div className={cl.texts}>
            <div className={`${cl.title} hlsb`}>
              <Skeleton />
            </div>
            <div className={cl.price}>
              <Skeleton />
            </div>
            {item?.isTimer && (
              <div className={cl.timer}>
                <div className={cl.icon}>
                  <Icon name='timer' />
                </div>
                <div className={cl.time}>
                  <div className={cl.block}>
                    <div className={cl.top}>
                      {days > 9 ? (
                        <>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton />
                        </>
                      )}
                    </div>
                    <div className={cl.bottom}>
                      <Skeleton />
                    </div>
                  </div>
                  <svg
                    width='3'
                    height='10'
                    viewBox='0 0 3 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='1.5' cy='1.5' r='1.5' fill='#CBD6FA' />
                    <circle cx='1.5' cy='8.5' r='1.5' fill='#CBD6FA' />
                  </svg>

                  <div className={cl.block}>
                    <div className={cl.top}>
                      {hours > 9 ? (
                        <>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton />
                        </>
                      )}
                    </div>
                    <div className={cl.bottom}>
                      <Skeleton />
                    </div>
                  </div>
                  <svg
                    width='3'
                    height='10'
                    viewBox='0 0 3 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='1.5' cy='1.5' r='1.5' fill='#CBD6FA' />
                    <circle cx='1.5' cy='8.5' r='1.5' fill='#CBD6FA' />
                  </svg>

                  <div className={cl.block}>
                    <div className={cl.top}>
                      {minutes > 9 ? (
                        <>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                          <div className={cl.digit}>
                            <Skeleton />
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton />
                        </>
                      )}
                    </div>
                    <div className={cl.bottom}>
                      <Skeleton />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div
      onClick={() => navigate(`/product/${item?._id}`)}
      className={`${cl.root} ${className} ${
        type == "search" ? cl.search : null
      }`}
      style={
        {
          // width: customWidth ? `${customWidth}px` : "223px",
        }
      }
    >
      {item?.isTimer ? (
        <img
          src={`${item?.images?.length ? item?.images[0] : ''}`}
          className={cl.imgMin}
        />
      ) : (
        <img
          src={item?.images?.length ? item?.images[0] : ''}
          className={cl.img}
        />
      )}
      <div className={cl.texts}>
        <div className={`${cl.title} hlsb`}>
          {
            item?.title[
              i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
            ]
          }
        </div>
        <div className={cl.priceFlex}>
          <div className={cl.price}>{maskToPrice(item?.price)}</div>
          <div className={cl.favorite} onClick={handleFavorite}>
            <div className={cl.favIcon}>
              {user?.userData?.favorites?.items?.includes(item?._id) ? (
                <Icon name={"favoriteFilled"} />
              ) : (
                <Icon name={"favorite"} />
              )}
            </div>
          </div>
        </div>
        {item?.isTimer && (
          <div className={cl.timer}>
            <div className={cl.icon}>
              <Icon name='timer' />
            </div>
            <div className={cl.time}>
              <div className={cl.block}>
                <div className={cl.top}>
                  {days > 9 ? (
                    <>
                      <div className={cl.digit}>
                        {days.toString().split("")[0]}
                      </div>
                      <div className={cl.digit}>
                        {days.toString().split("")[1]}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cl.digit}>0</div>
                      <div className={cl.digit}>{days}</div>
                    </>
                  )}
                </div>
                <div className={cl.bottom}>{t("propertyCard.days")}</div>
              </div>
              <svg
                width='3'
                height='10'
                viewBox='0 0 3 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='1.5' cy='1.5' r='1.5' fill='#CBD6FA' />
                <circle cx='1.5' cy='8.5' r='1.5' fill='#CBD6FA' />
              </svg>

              <div className={cl.block}>
                <div className={cl.top}>
                  {hours > 9 ? (
                    <>
                      <div className={cl.digit}>
                        {hours.toString().split("")[0]}
                      </div>
                      <div className={cl.digit}>
                        {hours.toString().split("")[1]}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cl.digit}>0</div>
                      <div className={cl.digit}>{hours}</div>
                    </>
                  )}
                </div>
                <div className={cl.bottom}>{t("propertyCard.hour")}</div>
              </div>
              <svg
                width='3'
                height='10'
                viewBox='0 0 3 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='1.5' cy='1.5' r='1.5' fill='#CBD6FA' />
                <circle cx='1.5' cy='8.5' r='1.5' fill='#CBD6FA' />
              </svg>

              <div className={cl.block}>
                <div className={cl.top}>
                  {minutes > 9 ? (
                    <>
                      <div className={cl.digit}>
                        {minutes.toString().split("")[0]}
                      </div>
                      <div className={cl.digit}>
                        {minutes.toString().split("")[1]}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cl.digit}>0</div>
                      <div className={cl.digit}>{minutes}</div>
                    </>
                  )}
                </div>
                <div className={cl.bottom}>{t("propertyCard.min")}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
