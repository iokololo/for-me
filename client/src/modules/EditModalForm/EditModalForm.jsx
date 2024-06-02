import React from "react";
import { useState } from "react";
import cl from "./EditModalForm.module.css";
import validate from "../../utils/validate.js";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { Modal } from "../../components/UI/Modal/Modal.jsx";
import { useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";
import { ConfirmPhone } from "../ConfirmPhone/ConfirmPhone.jsx";
import { Button } from "../../components/UI/Button/Button.jsx";
import AuthService from "../../service/AuthService.js";
import { Loader } from "../../components/UI/Loader/Loader.jsx";
import { OTPcode } from "../../components/UI/OTPcode/OTPcode.jsx";
import { EditDocument } from "../../components/UI/EditDocument/EditDocument.jsx";
export const EditModalForm = ({ onClose, onSave, tab }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(tab);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [otp, setOtp] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [isResendActive, setIsResendActive] = useState(false);

  let time = new Date();
  const timerReset = () => {
    setIsResendActive(true);
  };

  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: timerReset,
  });
  const changePhone = (e) => setPhone(e.target.value);
  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError(false);
      return false;
    }
    setPhoneError(!validate.phone(phone));
    return validate.phone(phone);
  };
  const handleConfirmPhone = async () => {
    if (!validatePhone()) {
      setPhoneError(true);
      return;
    }
    try {
      setIsLoading(true);
      const editPhone = await AuthService.editPhone({
        phone,
      });
      if (editPhone) {
        setIsLoading(false);
        setCurrentState(1);
        const time = new Date();
        restart(time.setSeconds(time.getSeconds() + 59));
        return editPhone;
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  const handleConfirmCode = async () => {
    try {
      setIsLoading(true);
      const confirmCode = await AuthService.verifyEditedPhone({
        phone,
        code: otp,
      });
      if (confirmCode) {
        setIsLoading(false);
        return confirmCode;
      }
    } catch (e) {
      setIsLoading(false);
      setCodeError(true);
    }
  };
  return (
    <Modal>
      <div className={cl.top}>
        <div className={cl.title}>{t("profile.edit")}</div>
        <div className={cl.close} onClick={onClose}>
          <Icon name='close' />
        </div>
      </div>
      {activeTab === "profile" && (
        <div className={cl.content}>
          {isLoading ? (
            <Loader />
          ) : currentState === 0 ? (
            <div>
              <ConfirmPhone
                phone={phone}
                changePhone={changePhone}
                phoneError={phoneError}
              />
              <Button
                className={cl.secondSubmit}
                style={{ height: 44 }}
                onClick={handleConfirmPhone}
              >
                {t("auth.register.button")}
              </Button>
            </div>
          ) : (
            <OTPcode
              phone={phone}
              onClick={handleConfirmCode}
              otp={otp}
              setOtp={setOtp}
              codeError={codeError}
              isResendActive={isResendActive}
              setIsResendActive={setIsResendActive}
              seconds={seconds}
              restart={restart}
            />
          )}
        </div>
      )}
      {activeTab === "document" && <EditDocument onClose={onClose} />}
    </Modal>
  );
};
