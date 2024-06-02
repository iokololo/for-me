import React from "react";
import cl from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon.jsx";
import { useTranslation } from "react-i18next";

export const Breadcrumbs = ({ path, name }) => {
  const { t } = useTranslation();
  return (
    <div className={cl.path}>
      <Link to="/" className={cl.mainLink}>
        {t("path.main")}
      </Link>
      {Object.values(path).map((item, index) => (
        <React.Fragment key={index}>
          <div className={cl.arrow}>
            <Icon name="arrowRight" />
          </div>
          <Link className={cl.mainLink} to={`/${item}`}>
            {name[index]}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
