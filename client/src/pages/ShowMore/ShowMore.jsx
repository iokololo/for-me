import React, { useEffect, useState } from "react";
import cl from "./ShowMore.module.css";
import { useTimer } from "react-timer-hook";
import { Icon } from "../../components/UI/Icon/Icon";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../../components/UI/Breadcrumbs/Breadcrumbs";
import bg from "../../assets/images/background.jpeg";
import { Advertisement } from "../../components/UI/Advertisement/Advertisement";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../service/ProductService";
import { ProductCard } from "../../components/UI/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Modal } from "../../components/UI/Modal/Modal";

export const ShowMore = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("conditionsOfParticipation");
  const { t, i18n } = useTranslation();
  const time = new Date();
  const { days, hours, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });
  const settings = useSelector((state) => state.settings);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const [properties, setProperties] = useState(null);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);


  const loadBooks = async () => {
    const req = await ProductService.getBooks(10, page, false);
    console.log(req);
    setProperties(req.data);
    setName("Books");
  };

  const loadCourses = async () => {
    const req = await ProductService.getCourses(10, page, false);
    setProperties(req.data);
    setName("Courses");
  };

  const loadData = async () => {
    switch (category) {
      case "books":
        await loadBooks();
        break;
      case "courses":
        await loadCourses();
        break;
      default:
        await loadCourses();
        break;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [category]);

  return (
    <div>
      <div className='wrapper'>
        <Breadcrumbs
          path={[`all/${category}`]}
          name={[`${name}`]}
        />
        <div className={cl.top}>
          <div className={cl.left}>
            <div className={cl.title}>{name}</div>
          </div>
          <div className={cl.right}>
            <div className={cl.flatButtons}>
              <div
                className={cl.button}
                onClick={() => {
                  setIsModalOpen(true);
                  setActiveTab("conditionsOfParticipation");
                }}
              >
                <div className={cl.btnIcon}>
                  <Icon name='conditions' />
                </div>
                <div className={cl.btnText}>{t("showMore.terms")}</div>
              </div>
              <div className={cl.devider} />
              <div
                className={cl.button}
                onClick={() => {
                  setIsModalOpen(true);
                  setActiveTab("howItWorks");
                }}
              >
                <div className={cl.btnIcon}>
                  <Icon name='infoBTN' />
                </div>
                <div className={cl.btnText}>{t("showMore.howItWorks")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cl.header}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className={cl.bg} />

        <div className='wrapper'>
          <div className={cl.headerInner}>
            <div className={cl.headerLeft}>
              <div className={cl.leftTopTile}>
                <div className={cl.icon}>
                  <Icon name={"salesStart"} />
                </div>
                <div className={cl.headerIconTitle}>
                  {t("showMore.closestLot")}
                </div>
              </div>
              <div className={cl.leftTopMid}>
                {properties
                  ? properties[0]?.title[
                      i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                    ]
                  : null}{" "}
              </div>


              <div
                className={cl.leftTopButton}
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default action
                  e.stopPropagation(); // Stop the event from bubbling up
                  window.open('https://meet.google.com/yex-nqwz-fhg', '_blank'); // Open in new tab
                }}
              >
               Подробнее
              </div>

            </div>
            <div className={cl.headerRight}>
              <div className={cl.card}>
                <div className={cl.cardContent}>
                Sign up for a free webinar and find out which course is more suitable for you.
                  <div
                    className={cl.RightTopButton}
                    // onClick={() => navigate(`/product/${properties[0]._id}`)}
                    onClick={() => {
                      setIsModalOpen(true);
                      setActiveTab("conditionsOfParticipation");
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cl.add}>
        <Advertisement
          type={"full"}
          title={
            settings.showMorePageBannerText
              ? settings.showMorePageBannerText[
                  i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                ]
              : null
          }
          subtitle={
            settings.showMorePageBannerTextSubtitle
              ? settings.showMorePageBannerTextSubtitle[
                  i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                ]
              : null
          }
          link={settings.showMorePageBannerLink}
        />
      </div>
      <div className='wrapper'>
        <div className={cl.items}>
          {isLoading
            ? Array.from({ length: 20 }).map((i) => (
                <ProductCard
                  key={`${i} ${Math.random() * 100000000000000000}`}
                  className={cl.productCard}
                  item={null}
                />
              ))
            : properties?.map((item) => (
                <ProductCard
                  key={item._id}
                  className={cl.productCard}
                  item={item}
                />
              ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal className={cl.modal}>
          <div className={cl.modalHead}>
            <div className={cl.modalTitle}>{t("showMore.title")}</div>
            <div
              className={cl.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              <Icon name='close' />
            </div>
          </div>
          <div
            className='modalRoot'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={cl.topModal}>
              <div
                className={`${cl.modalItem} ${
                  activeTab === "conditionsOfParticipation" &&
                  cl.modalItemActive
                }`}
                onClick={() => setActiveTab("conditionsOfParticipation")}
              >
                {t("showMore.terms")}
              </div>
              <div
                className={`${cl.modalItem} ${
                  activeTab === "howItWorks" && cl.modalItemActive
                }`}
                onClick={() => setActiveTab("howItWorks")}
              >
                {t("showMore.howItWorks")}
              </div>
            </div>
            <div className={cl.sections}>
              {activeTab === "conditionsOfParticipation" ? (
                <div className={cl.modalSection}>
                  <div className={cl.sectionTitle}>
                  Для участия в нашем бесплатном вебинаре вам необходимо выполнить несколько простых шагов:
                  </div>
                  <div className={cl.sectionText}>
                  <ul> 1. Регистрация: </ul> <ul>Заполните регистрационную форму на нашем сайте, указав своё имя и электронную почту. После регистрации вы получите электронное подтверждение и дальнейшие инструкции на указанную почту. </ul>
                  <ul> 2. Технические требования: </ul> <ul> Проверьте, соответствует ли ваше устройство техническим требованиям для подключения к вебинару. Обеспечьте стабильное интернет-соединение и наличие необходимых аудио и видео средств.</ul>
                  </div>
                </div>
              ) : (
                <div className={cl.modalSection}>
                  <div className={cl.sectionTitle}>
                  Участие в вебинаре абсолютно бесплатно, и каждый участник получит электронный сертификат по окончании мероприятия.
                  </div>
                  <div className={cl.sectionText}>
                  <ul> 1. Подключение к вебинару: </ul> <ul> За неделю до начала вебинара на вашу электронную почту придет ссылка для подключения, вместе с точной датой и временем проведения мероприятия. Рекомендуем заранее проверить работоспособность ссылки и технические возможности вашего устройства. </ul>
                  <ul> 2. Участие и взаимодействие: </ul> <ul> Во время вебинара вы сможете активно участвовать в обсуждениях, задавать вопросы и обмениваться мнениями с преподавателями и другими участниками через систему чата.</ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
