import React, { useEffect, useState } from "react";
import cl from "./EditProfile.module.css";
import bg from "../../assets/images/editProfile.jpg";
import { EditDocument } from "../../components/UI/EditDocument/EditDocument.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useTranslation } from "react-i18next";

export const EditProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(true);

  useEffect(() => {
    if (!isFilled) {
      setTimeout(() => {
        navigate(`/payment/${id}`);
      }, 3000);
    }
  }, [isFilled]);

  return (
    <div className={cl.root} style={{ backgroundImage: `url(${bg})` }}>
      <div className='wrapper'>
        {isFilled ? (
          <div className={cl.block}>
            <div className={cl.title}>
              <div className={cl.firstText}>{t("edit.continue")}</div>
              <div className={cl.secondText}>{t("edit.fill")}</div>
            </div>
            <EditDocument type={"page"} setIsFilled={setIsFilled} />
          </div>
        ) : (
          <div className={cl.success}>
            <div className={cl.secondText}>{t("edit.saved")}</div>
            <div className={cl.main}>
              <div className={cl.checkmark}>
                <Icon name='bigCheckmark' />
              </div>
              <div className={cl.thirdText}>{t("edit.transfer")}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
