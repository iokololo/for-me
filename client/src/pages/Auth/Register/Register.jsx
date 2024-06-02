import React, { useEffect, useState } from "react";
import cl from "./Register.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../../../components/UI/Button/Button";
import { Loader } from "../../../components/UI/Loader/Loader";
import bg from "../../../assets/images/background.jpeg";
import AuthService from "../../../service/AuthService";
import validate from "../../../utils/validate";
import { ConfirmEmail } from "../../../modules/ConfirmEmail/ConfirmEmail.jsx";
import {Icon} from "../../../components/UI/Icon/Icon.jsx";

export const Register = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student"); 

  const changeEmail = (e) => setEmail(e.target.value);
  const changeName = (e) => setName(e.target.value);

  const handleRegister = async () => {
    if (!validateEmail()) {
      setEmailError(true);
      return;
    }
    try {
      setIsLoading(true);
      const registerData = await AuthService.register({ email, name, role });
      if (registerData != null && registerData?.data?.status != 400) {
        console.log("registerData", registerData);
        console.log("registerData");
        setCurrentState(1);
        setIsLoading(false);
        return;
      }
      console.log("registerData", registerData);
      setIsLoading(false);
      setIsEmailExist(true);
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
            ) : currentState === 0 ? (
              <div className={cl.form}>
                <div className={cl.formTitle}>{t("auth.register.title")}</div>
                <div className={cl.steps}>
                  {t("auth.register.step")} 1 {t("auth.register.of")} 4
                </div>
                <div className={cl.form__fields}>
                  <div className={cl.field}>
                    <label htmlFor="name" className={cl.label}>
                      {t("auth.register.name.label")}
                    </label>
                    <div className={cl.inputView}>
                      <input
                        type="text"
                        className={`${cl.input}`}
                        placeholder={t("auth.register.name.placeholder")}
                        value={name}
                        id="name"
                        onChange={changeName}
                      />
                    </div>
                  </div>
                  <div className={cl.field}>
                    <label htmlFor="email" className={cl.label}>
                      {t("auth.register.email.label")}
                    </label>
                    <div className={cl.inputView}>
                      <input
                        type="email"
                        className={`${cl.input} ${emailError && cl.inputError}`}
                        placeholder={t("auth.register.email.placeholder")}
                        value={email}
                        id="email"
                        onChange={changeEmail}
                      />
                      {emailError && (
                        <div className={cl.error}>{t("auth.invalid")}</div>
                      )}
                      {isEmailExist && (
                        <div className={cl.error}>
                          {t("auth.register.email.exist")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={cl.field}>
                  <label htmlFor="role" className={cl.label}>{t("auth.register.role.label")}</label>
                  <div className={cl.inputView}>
                    <div>
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="Student"
                        checked={role === "Student"}
                        onChange={() => setRole("Student")}
                      />
                      <label htmlFor="student">{t("auth.register.role.student")}</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="teacher"
                        name="role"
                        value="Teacher"
                        checked={role === "Teacher"}
                        onChange={() => setRole("Teacher")}
                      />
                      <label htmlFor="teacher">{t("auth.register.role.teacher")}</label>
                    </div>
                  </div>
                </div>
                </div>
                <Button className={cl.submit} onClick={handleRegister}>
                  {t("auth.register.button")}
                </Button>
                <div className={cl.registerText}>
                  {t("auth.register.login")}
                  <Link to="/login" className={cl.link}>
                    {t("auth.register.link")}
                  </Link>
                </div>
              </div>
            ) : (
              <ConfirmEmail email={email} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
