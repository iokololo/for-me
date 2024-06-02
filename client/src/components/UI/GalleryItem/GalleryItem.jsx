import React from "react";
import cl from "./GalleryItem.module.css";
import { useTranslation } from "react-i18next";

export const GalleryItem = ({ img, city, offers, style }) => {
  const { t } = useTranslation();
  const formattedOffers = parseInt(offers).toLocaleString("ru-RU");
  return (
    <div
      className={`${cl.root} ${style === "secondary" ? cl.main : cl.secondary}`}
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className={`${cl.city} title_smb`}>{city}</div>
      <div className={cl.bottom}>
        <div className={cl.offers}>
          <div className={cl.offerCount}>{formattedOffers}</div>
          <div className={cl.offerText}>{t("gallery.offers")}</div>
        </div>
      </div>
    </div>
  );
};
