import React, { useEffect, useState } from "react";
import cl from "./Login.module.css";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../components/UI/Icon/Icon";
import { Link } from "react-router-dom";
import { Button } from "../../../components/UI/Button/Button";
import { Loader } from "../../../components/UI/Loader/Loader";
import AuthService from "../../../service/AuthService";
import validate from "../../../utils/validate";
import { useDispatch } from "react-redux";
import bg from "../../../assets/images/background.jpeg";
import { LOGIN } from "../../../redux/actions/AuthActions";

export const Login = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async () => {
    if (!validateEmail()) {
      setEmailError(true);
      return;
    }
    try {
      setIsLoading(true);
      const loginData = await AuthService.login(email, password).then((res) => {
        if (res) {
          setIsLoading(false);
          console.log(res);
          dispatch({ type: LOGIN, payload: res });
          window.location.reload();
        } else {
          console.log("error", res);
        }
      });
    } catch (e) {
      setPasswordError(true);
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

  useEffect(() => {
    validateEmail();
  }, [email]);

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
            <div className={cl.title}>
              {/* <Icon name="inlot1" />
              <Icon name="inlot2" />
              <Icon name="inlot3" /> */}
            </div>
          </div>
          <div className={cl.right}>
            {isLoading ? (
              <div className={cl.loader}>
                <Loader />
              </div>
            ) : (
              <div className={cl.form}>
                <div className={cl.formTitle}>{t("auth.login.title")}</div>
                <div className={cl.form__fields}>
                  <div className={cl.field}>
                    <label htmlFor="email" className={cl.label}>
                      {t("auth.login.email.label")}
                    </label>
                    <div className={cl.inputView}>
                      <input
                        type="email"
                        className={`${cl.inputEmail} ${emailError && cl.inputError}`}
                        placeholder={t("auth.login.email.placeholder")}
                        value={email}
                        id="email"
                        onChange={changeEmail}
                      />
                      {emailError && (
                        <div className={cl.error}>{t("auth.invalid")}</div>
                      )}
                    </div>
                  </div>
                  <div className={cl.field}>
                    <label htmlFor="password" className={cl.label}>
                      {t("auth.login.password.label")}
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
                        placeholder={t("auth.login.password.placeholder")}
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
                        {t("auth.login.password.error")}
                      </div>
                    )}
                  </div>
                </div>
                <div className={cl.forgot}>
                  <Link to="/forgotPassword">{t("auth.login.forgot")}</Link>
                </div>

                <Button className={cl.submit} onClick={handleLogin}>
                  {t("auth.login.button")}
                </Button>
                <div className={cl.registerText}>
                  {t("auth.login.register")}
                  <Link to="/register" className={cl.link}>
                    {t("auth.login.link")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
