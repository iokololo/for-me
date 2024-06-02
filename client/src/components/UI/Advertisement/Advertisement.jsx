import React from "react";
import cl from "./Advertisement.module.css";
import { Button } from "../Button/Button.jsx";
import { useTranslation } from "react-i18next";
import deviderImg from "../../../assets/images/devider1.jpg";
import { useNavigate } from "react-router-dom";

export const Advertisement = ({ type, title, subtitle, link = "#", image }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (type === "full") {
    return (
      <div className={cl.devider}>
        <div className={cl.left}>
          <div className={cl.deviderText}>
            <div className={cl.d_title}>{title || t("devider.title")}</div>
            <div className={cl.d_subtitle}>
              {subtitle || t("devider.subtitle")}
            </div>
            <div className={cl.btn}>
              <Button
                type='fill'
                className={cl.button}
                onClick={() => window.open('https://drive.google.com/file/d/1fhSzWrzfPZcgpjPBwu2k3omMMOKZEDAR/view?usp=sharing', '_blank')}
                >
                <div className='text-md'>{t("devider.button")}</div>
              </Button>
            </div>

          </div>
        </div>
        <div className={cl.right}>
          <img src={deviderImg} className={cl.image} />
        </div>
      </div>
    );
  }
  return (
    <div className={cl.advertisement}>
      <div className={cl.adTitle}>{title}</div>
      <div className={cl.adText}>{subtitle}</div>
      {image ? (
        <div className={cl.imgView}>
          <img
            className={cl.img}
            src={image}
          />
        </div>
      ) : (
        <div className={cl.adImage} />
      )}
      <div className={cl.adButton}>
        <Button
          onClick={() => window.open(link, '_blank')}
          className={cl.adBut}
          text='Webinar'
          type='fill'
        />
      </div>
    </div>
  );
};
