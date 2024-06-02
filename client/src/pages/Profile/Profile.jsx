import React, { useEffect, useState } from "react";
import cl from "./Profile.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useSelector } from "react-redux";
import { EditModalForm } from "../../modules/EditModalForm/EditModalForm.jsx";
import { ProfileFavorites } from "../../modules/ProfileFavorites/ProfileFavorites";
import { BuyHistory } from "../../modules/BuyHistory/BuyHistory";
import { useLocation } from "react-router-dom";
import { FilesHistory } from "../../modules/FilesHistory/FilesHistory";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location?.state?.url === "history" ? "history" : "favorites"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.userData);

  const [isDocumentEmpty, setIsDocumentEmpty] = useState(
    user.iin === undefined ||
      user.address === undefined ||
      user.numberOfDocument === undefined
  );
  const [editTab, setEditTab] = useState("profile");
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isDocumentHovered, setIsDocumentHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "";

    const namesArray = name.split(" ");
    return (
      namesArray[0].charAt(0).toUpperCase() +
      (namesArray.length > 1 ? namesArray[1].charAt(0).toUpperCase() : "")
    );
  };

  useEffect(() => {
    setIsLoading(true);
  }, [activeTab]);

  return (
    <div className={cl.root}>
      <div className={cl.bg} />
      <div className='wrapper'>
        <div className={cl.wrapper}>
          <div className={cl.main}>
            <div className={cl.leftSide}>
              <div className={cl.block}>
                <div className={cl.avatar}>
                  <div className={cl.iconText}>{getInitials(user?.name)}</div>
                </div>

                <div className={cl.name}>{user?.name}</div>

                <div className={cl.email}>
                  <div className={cl.leftProfile}>
                    <div className={cl.icon}>
                      <Icon name='email' />
                    </div>
                    <div className={cl.text}>{user?.email}</div>
                  </div>
                </div>

                <div className={cl.phone}>
                  <div className={cl.leftProfile}>
                    <div className={cl.icon}>
                      <Icon name='phone' />
                    </div>
                    <div className={cl.text}>{user?.phone}</div>
                  </div>

                  <div
                    className={cl.edit}
                    onMouseEnter={() => setIsPhoneHovered(true)}
                    onMouseLeave={() => setIsPhoneHovered(false)}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setEditTab("profile");
                    }}
                  >
                    <Icon name={isPhoneHovered ? "whiteEdit" : "blackEdit"} />
                  </div>
                </div>
              </div>
              <div className={cl.block2}>
                <div className={cl.aboutDocuments}>
                  <div className={cl.aboutDocumentsText}>
                    {t("profile.document")}
                  </div>
                  <div
                    className={cl.edit}
                    onMouseEnter={() => setIsDocumentHovered(true)}
                    onMouseLeave={() => setIsDocumentHovered(false)}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setEditTab("document");
                    }}
                  >
                    <Icon
                      name={isDocumentHovered ? "whiteEdit" : "blackEdit"}
                    />
                  </div>
                </div>

                {isDocumentEmpty ? (
                  <div className={cl.noDocument}>
                    <div className={cl.noDocumentIcon}>
                      <Icon name='noDocument' />
                    </div>
                    <div className={cl.noDocumentText}>
                      {t("profile.noData")}
                    </div>
                    <div
                      className={cl.noDocumentFill}
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setEditTab("document");
                      }}
                    >
                      {t("profilie.fill")}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={cl.documentNumber}>
                      <div className={cl.top}>
                        {t("profile.numberOfDocument")}
                      </div>
                      <div className={cl.text}>{user?.numberOfDocument}</div>
                    </div>

                    <div className={cl.iin}>
                      <div className={cl.top}>{t("profile.iin")}</div>
                      <div className={cl.text}>{user?.iin}</div>
                    </div>

                    <div className={cl.address}>
                      <div className={cl.top}>{t("profile.address")}</div>
                      <div className={cl.text}>{user?.address}</div>
                    </div>
                  </>
                )}
              </div>

              {isDocumentEmpty && (
                <div
                  className={cl.editButton}
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditTab("document");
                  }}
                >
                  <div className={cl.editIcon}>
                    <Icon name='edit' />
                  </div>
                  <div className={cl.editText}>{t("profile.edit")}</div>
                </div>
              )}

              {isEditModalOpen && (
                <EditModalForm
                  onClose={() => {
                    setIsEditModalOpen(false);
                  }}
                  tab={editTab}
                />
              )}
            </div>
            <div className={cl.rightSide}>
              <div className={cl.switch}>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "favorites" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  {t("profile.favorite")}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "history" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  {t("profile.history")}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "files" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("files")}
                >
                  {t("profile.files")}
                </div>
              </div>
              <div className={cl.line} />

              {activeTab === "favorites" && (
                <div className={cl.favorite}>
                  <ProfileFavorites
                    activeTab={activeTab}
                    isCLoading={isLoading}
                  />
                </div>
              )}
              {activeTab === "history" && (
                <div className={cl.history}>
                  <BuyHistory activeTab={activeTab} isCLoading={isLoading} />
                </div>
              )}
              {activeTab === "files" && (
                <div className={cl.history}>
                  <FilesHistory activeTab={activeTab} isCLoading={isLoading} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
