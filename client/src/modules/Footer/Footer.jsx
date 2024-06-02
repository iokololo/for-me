import React from "react";
import cl from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../components/UI/Icon/Icon";

export const Footer = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handlefirstClick = () => {
    const propertyType = [t(`mainPageFilters.type.options.option1`)];
    const filters = {
      propertyType,
    };
    navigate("/search", { state: filters });
  };

  const handlesecondClick = () => {
    const propertyType = [t(`mainPageFilters.type.options.option2`)];
    const filters = {
      propertyType,
    };
    navigate("/search", { state: filters });
  };

  const handlethirdClick = () => {
    const propertyType = [t(`mainPageFilters.type.options.option3`)];
    const filters = {
      propertyType,
    };
    navigate("/search", { state: filters });
  };
  return (
    <div className={cl.root}>
      <div className='wrapper'>
        <div className={cl.footer}>
          <div className={`${cl.footer} ${cl.footerLeft}`}>
            <div className={cl.block}>
              <div className={cl.title}>{t("footer.left.title")}</div>
              <div
                className={`${cl.link}  headline`}
                onClick={handlefirstClick}
              >
                {t("footer.left.1")}
              </div>
              <div
                className={`${cl.link}  headline`}
                onClick={handlesecondClick}
              >
                {t("footer.left.2")}
              </div>
              <div
                className={`${cl.link}  headline`}
                onClick={handlethirdClick}
              >
                {t("footer.left.3")}
              </div>
              <Link className={`${cl.link}  headline`} to='/search'>
                {t("footer.left.4")}
              </Link>
            </div>
            <div className={cl.block}>
              <div className={cl.title}>{t("footer.center.title")}</div>
              {/* <Link className={`${cl.link}  headline`} to='/'>
                {t("footer.center.1")}
              </Link> */}
              <Link
                className={`${cl.link}  headline`}
                to={""}
                target='_blank'
              >
                {t("footer.center.2")}
              </Link>
            </div>
          </div>
          <div className={`${cl.block} ${cl.r}`}>
            <div className={cl.title}>{t("footer.right.title")}</div>

            <Link className={`${cl.link}  headline`}>
              {t("footer.right.1")}
            </Link>
            <Link className={`${cl.link}  headline`} to='/'>
              {t("footer.right.2")}
            </Link>
            <Link className={`${cl.link}  headline`} to='/faq'>
              {t("footer.right.3")}
            </Link>
          </div>
          <div className={cl.block}>
            <div className={cl.title}>{t("footer.social.title")}</div>

            <div className={cl.socials}>
              <Link to='/' className={cl.social}>
                <Icon name='facebook' />
              </Link>
              <Link
                to='https://www.instagram.com/ai._.yu/'
                className={cl.social}
                target='_blank'
              >
                <Icon name='instagram' />
              </Link>
              <Link to='/' className={cl.social}>
                <Icon name='youtube' />
              </Link>
            </div>
          </div>
        </div>
        <div className={cl.credent}>
          <div className={cl.mainTitle}>InnIT</div>
          <div className={cl.gray}>© 2024</div>
        </div>
      </div>
    </div>
  );
};
