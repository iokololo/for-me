import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../components/UI/Icon/Icon";
import cl from "./ConfirmEmail.module.css";

export const ConfirmEmail = ({email}) => {
    const { t } = useTranslation();
    return (
        <div className={cl.formConfirm}>
            <div className={cl.formTitle}>{t("auth.register.confirm")}</div>
            <div className={cl.confirm}>
                <div className={cl.confirmText}>
                    {t("auth.register.confirmText")} <br />
                    <span className={`bold ${cl.email}`}>{email}</span>
                </div>
                <div className={cl.image}>
                    <Icon name='emailImage' />
                </div>
            </div>
        </div>
    );
}