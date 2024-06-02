import React from "react";
import { useTranslation } from "react-i18next";
import cl from "./ConfirmPhone.module.css";

export const ConfirmPhone = (props) => {
  const { t } = useTranslation();

  return (
    <div className={cl.formPhone}>
      {props.children}
      <div className={cl.field}>
        <label htmlFor="phone" className={cl.label}>
          {t("auth.register.phone.label")}
        </label>
        <div className={cl.phone}>
          <select className={cl.phoneCode}>
            <option defaultValue="+7">+7</option>
            <option value="8">8</option>
          </select>
          <input
            type="text"
            className={`${cl.phoneInput}`}
            placeholder={t("auth.register.phone.placeholder")}
            value={props.phone}
            id="phone"
            onChange={props.changePhone}
          />
        </div>
        {props.phoneError && (
          <div className={cl.error}>{t("auth.register.phone.error")}</div>
        )}
      </div>
    </div>
  );
};
