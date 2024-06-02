import React, { useState } from "react";
import cl from "./ForgotPassword.module.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/UI/Button/Button";
import { Loader } from "../../../components/UI/Loader/Loader";
import AuthService from "../../../service/AuthService";
import validate from "../../../utils/validate";
import bg from "../../../assets/images/background.jpeg";
import OTPInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import { Icon } from "../../../components/UI/Icon/Icon.jsx";

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [otp, setOtp] = useState("");
  const [isResendActive, setIsResendActive] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDoesntMatch, setPasswordDoesntMatch] = useState(false);
  const navigate = useNavigate();
  const changePassword = (e) => setPassword(e.target.value);
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
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
      const registerData = await AuthService.newPassword(email, password);
      if (registerData) {
        console.log("registerData", registerData);
        navigate("/login");
        setIsLoading(false);
        return;
      }
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
    if (password !== confirmPassword) {
      setPasswordDoesntMatch(true);
      return false;
    }
    setPasswordDoesntMatch(false);
    return true;
  };

  let time = new Date();
  const timerReset = () => {
    setIsResendActive(true);
    console.log("timerReset");
  };
  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: timerReset,
  });
  const changeEmail = (e) => setEmail(e.target.value);
  const handleForgotPassword = async () => {
    if (!validateEmail()) {
      setEmailError(true);
      return;
    }
    try {
      setIsLoading(true);
      const forgotPasswordData = await AuthService.forgotPassword(email);
      if (forgotPasswordData) {
        console.log("forgotPasswordData", forgotPasswordData);
        setCurrentState(1);
        setIsLoading(false);
        return;
      }
      setEmailError(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError(false);
      return false;
    }
    setEmailError(!validate.email(email));
    return validate.email(email);
  };
  const resendCode = () => {
    if (!isResendActive) return;
    setIsResendActive(false);
    const time = new Date();
    restart(time.setSeconds(time.getSeconds() + 590));
  };

  const handleConfirmCode = async () => {
    try {
      setIsLoading(true);
      const confirmCodeData = await AuthService.verifyEmail(email, otp);
      console.log("confirmCodeData", confirmCodeData);
      if (confirmCodeData) {
        console.log("confirmCodeData", confirmCodeData);
        setCurrentState(2);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cl.root}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className={cl.shadow}></div>
      <div className="wrapper">
        <div className={cl.wrapper}>
          <div className={cl.side}>
            <div className={cl.title}>Inlot</div>
          </div>
          <div className={cl.right}>
            {isLoading ? (
              <div className={cl.loader}>
                <Loader />
              </div>
            ) : currentState === 0 ? (
              <div className={cl.form}>
                <div className={cl.formTitle}>{t("auth.forgot.title")}</div>
                <div className={cl.form__fields}>
                  <div className={cl.field}>
                    <label htmlFor="email" className={cl.label}>
                      {t("auth.forgot.email.label")}
                    </label>
                    <div className={cl.inputView}>
                      <input
                        type="email"
                        className={`${cl.input} ${emailError && cl.inputError}`}
                        placeholder={t("auth.forgot.email.placeholder")}
                        value={email}
                        id="email"
                        onChange={changeEmail}
                      />
                      {emailError && (
                        <div className={cl.error}>{t("auth.invalid")}</div>
                      )}
                    </div>
                  </div>
                </div>
                <Button className={cl.submit} onClick={handleForgotPassword}>
                  {t("auth.forgot.button")}
                </Button>
                <div className={cl.backToLogin}>
                  <Link to="/login" className={cl.link}>
                    {t("auth.forgot.backToLogin")}
                  </Link>
                </div>
              </div>
            ) : currentState === 1 ? (
              <div className={cl.formCode}>
                <div className={cl.formTitle}>{t("auth.forgot.title")}</div>
                <div className={cl.field}>
                  <label htmlFor="code" className={cl.label}>
                    {t("auth.register.code.label")}
                  </label>
                  <div className={cl.inputCode}>
                    <div className={cl.code}>
                      <OTPInput
                        onChange={setOtp}
                        value={otp}
                        numInputs={8}
                        containerStyle={cl.abad}
                        // containerStyle={{ gap: 4 }}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{ padding: 20 }}
                            // className={cl.aba}
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
              </div>
            ) : (
              <div className={cl.form}>
                <div className={cl.formTitle}>{t("auth.forgot.title")}</div>
                <div className={cl.password__fields}>
                  <div className={cl.field}>
                    <label htmlFor="password" className={cl.label}>
                      {t("auth.register.password.concoct")}
                    </label>
                    <div
                      className={`${cl.password} ${
                        passwordError && cl.inputError
                      }`}
                    >
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
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
                          <Icon name="eyeVisible" />
                        </div>
                      ) : (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name="eyeInvisible" />
                        </div>
                      )}
                    </div>
                    {passwordError && (
                      <div className={cl.error}>
                        {t("auth.forgot.password.error")}
                      </div>
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
                    <label htmlFor="password" className={cl.label}>
                      {t("auth.register.password.confirm")}
                    </label>
                    <div
                      className={`${cl.password} ${
                        passwordDoesntMatch && cl.inputError
                      }`}
                    >
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="confirmPassword"
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
                          <Icon name="eyeVisible" />
                        </div>
                      ) : (
                        <div
                          className={cl.icon}
                          onClick={togglePasswordVisibility}
                        >
                          <Icon name="eyeInvisible" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
