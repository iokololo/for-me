import React from "react";
import cl from "./OTPcode.module.css";
import { Button } from "../Button/Button.jsx";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";
export const OTPcode = (props) => {
  const { t } = useTranslation();

  const resendCode = () => {
    if (!props.isResendActive) return;
    props.setIsResendActive(false);
    const time = new Date();
    props.restart(time.setSeconds(time.getSeconds() + 10));
  };

  return (
    <>
      <div className={cl.field}>
        <label htmlFor="code" className={cl.label}>
          {t("auth.register.code.label")}
        </label>
        <div className={cl.inputCode}>
          <div className={cl.code}>
            <OTPInput
              onChange={props.setOtp}
              value={props.otp}
              numInputs={4}
              containerStyle={{ gap: 4 }}
              renderInput={(props) => (
                <input {...props} style={{ padding: 20 }} className={cl.aba} />
              )}
            />
          </div>
          <div className={cl.timer}>
            <div className={cl.resend}>
              <div
                onClick={resendCode}
                className={`${cl.resendButton} ${
                  props.isResendActive === true && cl.resendActive
                }`}
              >
                {t("auth.register.code.resend")}
              </div>
            </div>
            <div className={cl.time}>
              {!props.isResendActive && (
                <div>
                  00:{props.seconds > 9 ? props.seconds : `0${props.seconds}`}
                </div>
              )}
            </div>
          </div>
          {props.codeError && (
            <div className={cl.error}>{t("auth.forgot.password.error")}</div>
          )}
        </div>
      </div>
      <div className={cl.btn}>
        <Button className={cl.submit} onClick={props.onClick}>
          {t("auth.register.button")}
        </Button>
      </div>
    </>
  );
};
