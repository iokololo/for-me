import React, { useEffect, useState } from "react";
import cl from "./EditDocument.module.css";
import validate from "../../../utils/validate.js";
import AuthService from "../../../service/AuthService.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const EditDocument = ({ onClose, type, setIsFilled }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [numberOfDocument, setNumberOfDocument] = useState("");
  const [iin, setIin] = useState("");
  const [address, setAddress] = useState("");
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);
  const [numberOfDocumentError, setNumberOfDocumentError] = useState(false);
  const [iinError, setIinError] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const validateNumberOfDocument = () => {
    if (numberOfDocument.length === 0) {
      setNumberOfDocumentError(false);
      return false;
    }
    setNumberOfDocumentError(!validate.numberOfDocument(numberOfDocument));
    return validate.numberOfDocument(numberOfDocument);
  };
  const validateIin = () => {
    if (iin.length === 0) {
      setIinError(false);
      return false;
    }
    setIinError(!validate.iin(iin));
    return validate.iin(iin);
  };

  const handleSaveButton = async () => {
    if (!validateNumberOfDocument()) {
      return;
    }
    if (!validateIin()) {
      return;
    }
    try {
      const editData = await AuthService.updateProfile({
        name: name === "" ? user.name : name,
        email: user.email,
        numberOfDocument:
          numberOfDocument === "" ? user.numberOfDocument : numberOfDocument,
        iin: iin === "" ? user.iin : iin,
        address: address === "" ? user.address : address,
      });
    } catch (e) {
      console.log(e);
    }
    if (onClose) {
      onClose();
    }
    if (type === "page") {
      setIsFilled(false);
    } else {
      window.location.reload();
    }
  };

  const handleFieldsChange = (e) => {
    const filled =
      name.trim() !== "" &&
      validateNumberOfDocument() &&
      validateIin() &&
      address.trim() !== "";
    setIsFieldsFilled(filled);
  };

  useEffect(() => {
    handleFieldsChange();
  }, [name, numberOfDocument, iin, address]);

  useEffect(() => {
    validateNumberOfDocument();
    validateIin();
  }, [numberOfDocument, iin]);

  return (
    <div className={cl.content}>
      <div className={cl.block}>
        <div className={cl.blockTitle}>{t("profile.fullName")}</div>
        <div className={cl.blockInput}>
          <input
            type="text"
            className={`${cl.input}`}
            placeholder="Введите"
            value={name}
            id={"name"}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={cl.block}>
        <div className={cl.blockTitle}>{t("profile.numberOfDocument")}</div>
        <div className={cl.blockInput}>
          <input
            type="text"
            className={`${cl.input} ${numberOfDocumentError && cl.inputError}`}
            placeholder="Введите"
            value={numberOfDocument}
            id={"numberOfDocument"}
            onChange={(e) => setNumberOfDocument(e.target.value)}
          />
          {numberOfDocumentError && (
            <div className={cl.error}>{t("profile.error")}</div>
          )}
        </div>
      </div>
      <div className={cl.block}>
        <div className={cl.blockTitle}>{t("profile.iin")}</div>
        <div className={cl.blockInput}>
          <input
            type="text"
            className={`${cl.input} ${iinError && cl.inputError}`}
            placeholder="Введите"
            value={iin}
            id={"iin"}
            onChange={(e) => setIin(e.target.value)}
          />
          {iinError && <div className={cl.error}>{t("profile.error")}</div>}
        </div>
      </div>
      <div className={cl.block}>
        <div className={cl.blockTitle}>{t("profile.address")}</div>
        <div className={cl.blockInput}>
          <input
            type="text"
            className={`${cl.input}`}
            placeholder="Введите"
            value={address}
            id={"address"}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className={cl.saveButton}>
        <div
          className={`${cl.button} ${
            isFieldsFilled ? cl.enabledButton : cl.disabledButton
          }
              }`}
          onClick={handleSaveButton}
        >
          {t("profile.save")}
        </div>
      </div>
    </div>
  );
};
