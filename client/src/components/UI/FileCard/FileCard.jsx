import React from "react";
import cl from "./FileCard.module.css";
import fileCardImage from "../../../assets/images/fileCard.png";
import { Icon } from "../Icon/Icon";
import { maskToPrice } from "../../../utils/mask.js";
import { useTimer } from "react-timer-hook";
import { useTranslation } from "react-i18next";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductService from "../../../service/ProductService";

export const FileCard = ({ item, type, customWidth, className, file }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "http://admin.inlot.kz/uploads/" + file;
    link.href = "http://admin.inlot.kz/uploads/" + file;
    // link.href = ExamplePdf;
    link.click();
  };

  if (!item) {
    return (
      <SkeletonTheme>
        <div className={cl.root}>
          <Skeleton src={fileCardImage} className={cl.img} />
          <div className={cl.texts}>
            <div className={`${cl.title} hlsb`}>
              <Skeleton />
            </div>
            <div className={cl.price}>
              <Skeleton />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div
      onClick={() => handleDownload()}
      className={`${cl.root} ${className} ${
        type == "search" ? cl.search : null
      }`}
    >
      <img src={fileCardImage} className={cl.img} />
      <div className={cl.texts}>
        <div className={`${cl.title}`}>
          {t("fileCard.geoAnalysis")} {item?.title}
        </div>
        <div className={cl.icon}>
          <Icon name="download" />
        </div>
      </div>
    </div>
  );
};
