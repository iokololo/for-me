import React, { useEffect, useState } from "react";
import cl from "./Verify.module.css";
import { LOGIN } from "../../../redux/actions/AuthActions";
import { Icon } from "../../../components/UI/Icon/Icon";
import { Link } from "react-router-dom";
import { Button } from "../../../components/UI/Button/Button";
import { Loader } from "../../../components/UI/Loader/Loader";
import { Quiz } from "../../../modules/Quiz/Quiz.jsx";
import { ConfirmPhone } from "../../../modules/ConfirmPhone/ConfirmPhone.jsx";
import { useTimer } from "react-timer-hook";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../../service/AuthService";
import bg from "../../../assets/images/background.jpeg";
import validate from "../../../utils/validate";
import OTPInput from "react-otp-input";

export const Verify = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(!true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDoesntMatch, setPasswordDoesntMatch] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResendActive, setIsResendActive] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  let time = new Date();

  const timerReset = () => {
    setIsResendActive(true);
  };
  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: timerReset,
  });
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changePhone = (e) => setPhone(e.target.value);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const resendCode = () => {
    if (!isResendActive) return;
    setIsResendActive(false);
    const time = new Date();
    restart(time.setSeconds(time.getSeconds() + 59));
  };
  const handleRegister = async () => {
    if (!validatePassword()) {
      setPasswordError(true);
      return;
    }
    if (!validateConfirmPassword()) {
      setPasswordDoesntMatch(true);
      return;
    }
    try {
      setIsLoading(true);
      const registerData = await AuthService.addPassword({
        code: token,
        password,
      });
      if (registerData) {
        setIsLoading(false);
        setCurrentState(1);
        return;
      }
      setIsLoading(false);
      setPasswordError(true);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleConfirmPhone = async () => {
    if (!validatePhone()) {
      setPhoneError(true);
      return;
    }
    try {
      setIsLoading(true);
      const registerData = await AuthService.verifyPhone({
        code: token,
        phone,
      });
      if (registerData) {
        setIsLoading(false);
        setCurrentState(2);
        const time = new Date();
        restart(time.setSeconds(time.getSeconds() + 59));
        return registerData;
      }
      setIsLoading(false);
      setPasswordError(true);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError(false);
      return false;
    }

    setPasswordError(!validate.password(password));
    return validate.password(password);
  };

  const validateConfirmPassword = () => {
    if (confirmPassword.length === 0) {
      setPasswordDoesntMatch(false);
      return false;
    }
    setPasswordDoesntMatch(
      !validate.confirmPassword(password, confirmPassword)
    );
    return validate.confirmPassword(password, confirmPassword);
  };

  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError(false);
      return false;
    }
    setPhoneError(!validate.phone(phone));
    return validate.phone(phone);
  };

  const handleConfirmCode = async () => {
    try {
      setIsLoading(true);
      const req = await AuthService.verifyUser({
        verificationCode: token,
        phoneVerificationCode: otp,
      });
      if (req) {
        dispatch({ type: LOGIN, payload: req });
        setCurrentState(3);
        setIsLoading(false);
        window.location.reload();
        return;
      }
      alert("Не удалось подтвердить код");
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    setCurrentState(1);
  };

  const loadData = () => {
    pause();
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    validatePassword();
    validateConfirmPassword();
    validatePhone();
  }, [password, confirmPassword, phone]);

  return (
    <div
      className={cl.root}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className={cl.shadow}></div>
      <div className='wrapper'>
        <div className={cl.wrapper}>
          <div className={cl.side}>
          </div>
          <div className={cl.right}>
            {isLoading ? (
              <div className={cl.loader}>
                <Loader />
              </div>
            ) : currentState === 0 ? (
              <div className={cl.form}>
                <div className={cl.formTitle}>{t("auth.register.title")}</div>
                <div className={cl.steps}>
                  {t("auth.register.step")} 2 {t("auth.register.of")} 4
                </div>
                <div className={cl.form__fields}>
                  <div className={cl.field}>
                    <label htmlFor='password' className={cl.label}>
                      {t("auth.register.password.concoct")}
                    </label>
                    <div
                      className={`${cl.password} ${
                        passwordError && cl.inputError
                      }`}
                    >
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id='password'
                        className={cl.passwordInput}
                        placeholder={t("auth.register.password.placeholder")}
                        value={password}
                        onChange={changePassword}
                      />
                      {isPasswordVisible ? (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name='eyeVisible' />
                        </div>
                      ) : (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name='eyeInvisible' />
                        </div>
                      )}
                    </div>
                    {passwordError && (
                      <div className={cl.error}>{t("auth.invalid")}</div>
                    )}
                  </div>
                  <div className={cl.passwordReq}>
                    <div className={cl.passwordTitle}>
                      {t("auth.register.password.requirements.title")}
                      <ul className={cl.ul}>
                        <li className={cl.passLi}>
                          {t("auth.register.password.requirements.letter")}
                        </li>
                        <li className={cl.passLi}>
                          {t("auth.register.password.requirements.length")}
                        </li>
                        <li className={cl.passLi}>
                          {" "}
                          {t("auth.register.password.requirements.uppercase")}
                        </li>
                        <li className={cl.passLi}>
                          {t("auth.register.password.requirements.lowercase")}
                        </li>
                        <li className={cl.passLi}>
                          {t("auth.register.password.requirements.number")}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={cl.field}>
                    <label htmlFor='password' className={cl.label}>
                      {t("auth.register.password.confirm")}
                    </label>
                    <div
                      className={`${cl.password} ${
                        passwordDoesntMatch && cl.inputError
                      }`}
                    >
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id='confirmPassword'
                        className={cl.passwordInput}
                        placeholder={t("auth.register.password.placeholder")}
                        value={confirmPassword}
                        onChange={changeConfirmPassword}
                      />
                      {isPasswordVisible ? (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name='eyeVisible' />
                        </div>
                      ) : (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name='eyeInvisible' />
                        </div>
                      )}
                    </div>
                    {passwordDoesntMatch && (
                      <div className={cl.error}>
                        {t("auth.forgot.doesntMatch")}
                      </div>
                    )}
                  </div>
                </div>
                <Button className={cl.submit} onClick={handleRegister}>
                  {t("auth.register.button")}
                </Button>
              </div>
            ) : currentState === 1 ? (
              <div>
                <ConfirmPhone
                  phone={phone}
                  changePhone={changePhone}
                  phoneError={phoneError}
                >
                  <div className={cl.formTitle}>{t("auth.register.title")}</div>
                  <div className={cl.steps}>
                    {t("auth.register.step")} 3 {t("auth.register.of")} 4
                  </div>
                </ConfirmPhone>
                <Button
                  className={cl.secondSubmit}
                  onClick={handleConfirmPhone}
                >
                  {t("auth.register.button")}
                </Button>
              </div>
            ) : currentState === 2 ? (
              <div className={cl.formCode}>
                <div className={cl.formTitle}>{t("auth.register.title")}</div>
                <div className={cl.steps}>
                  {t("auth.register.step")} 3 {t("auth.register.of")} 4
                </div>
                <div className={cl.field}>
                  <label htmlFor='code' className={cl.label}>
                    {t("auth.register.code.label")}
                  </label>
                  <div className={cl.inputCode}>
                    <div className={cl.code}>
                      <OTPInput
                        onChange={setOtp}
                        value={otp}
                        numInputs={4}
                        containerStyle={{ gap: 4 }}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{ padding: 20 }}
                            className={cl.aba}
                          />
                        )}
                      />
                    </div>
                    <div className={cl.timer}>
                      <div className={cl.resend}>
                        <div
                          onClick={resendCode}
                          className={`${cl.resendButton} ${
                            isResendActive === true ? cl.resendActive : null
                          }`}
                        >
                          {t("auth.register.code.resend")}
                        </div>
                      </div>
                      <div className={cl.time}>
                        {!isResendActive && (
                          <div>00:{seconds > 9 ? seconds : `0${seconds}`}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className={`${cl.submit} ${cl.mb}`}
                  onClick={handleConfirmCode}
                >
                  {t("auth.register.button")}
                </Button>
                <Button className={`${cl.back}`} onClick={handleBackButton}>
                  {t("auth.register.back")}
                </Button>
              </div>
            ) : (
              <Quiz />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
