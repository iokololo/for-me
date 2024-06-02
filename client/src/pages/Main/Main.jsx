import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Filters } from "../../modules/Filters/Filters";
import { Button } from "../../components/UI/Button/Button";
import { Icon } from "../../components/UI/Icon/Icon";
import { ProductCard } from "../../components/UI/ProductCard/ProductCard";
import { GalleryItem } from "../../components/UI/GalleryItem/GalleryItem";
import { CategoryCard } from "../../components/UI/CategoryCard/CategoryCard";
import city1 from "../../assets/images/city.jpeg";
import categoryImage1 from "../../assets/images/category1.jpg";
import categoryImage2 from "../../assets/images/category2.jpg";
import categoryImage3 from "../../assets/images/category3.jpg";
import categoryImage4 from "../../assets/images/category4.jpg";
import categoryImage5 from "../../assets/images/category5.jpg";
import deviderImg from "../../assets/images/devider1.jpg";
import ProductService from "../../service/ProductService";
import cl from "./Main.module.css";
import { CitiesGallery } from "../../modules/CitiesGallery/CitiesGallery";
import { CountriesGallery } from "../../modules/CountriesGallery/CountriesGallery.jsx";
import { ReviewsGallery } from "../../modules/ReviewsGallery/ReviewsGallery.jsx";
import { TedExGallery } from "../../modules/TedExGalllery/TedExGallery.jsx";

export const Main = () => {
  const navigate = useNavigate();

  // const { t, i18n } = useTranslation();
  // get current language from useTranslation
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [business, setBusiness] = useState([]);
  const [invest, setInvest] = useState([]);
  const settings = useSelector((state) => state.settings);

  const loadData = async () => {
    const sales = await ProductService.getCourses(1, 5, true);
    const auctions = await ProductService.getBooks(1, 5, true);
    const business = await ProductService.getBusinesses(1, 5, true);
    const invest = await ProductService.getInvestOffers(1, 5, true);

    console.log(11, sales)

    setSales(sales.data);
    setAuctions(auctions.data);
    setBusiness(business.data);
    setInvest(invest.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={cl.root}>
      <header
        className={cl.header}
      >
        <div className={cl.bg} />
        <div className='wrapper'>
          <div className={cl.texts}>
            <div className={cl.headerTitle}>
              {settings?.mainPageTitle
                ? settings?.mainPageTitle[
                    i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                  ]
                : null}
            </div>
            <div className={cl.headerSubTitle}>
              {settings?.mainPageSubtitle
                ? settings?.mainPageSubtitle[
                    i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                  ]
                : null}
            </div>
          </div>
        </div>
      </header>

      <main className={cl.main}>
        <section className={cl.section}>
          <div className='wrapper'>
            <div className={cl.mainTitle}>{t("section1")}</div>
            <div className='filters'>
              <Filters />
            </div>
            <div className={cl.categories}>
              <CategoryCard
                text={t("categoryCards.card1")}
                image={categoryImage1}
                onClick={() =>
                  navigate("/search", {
                    state: { propertyType: ["Книги"] },
                  })
                }
              />
              <CategoryCard
                text={t("categoryCards.card2")}
                image={categoryImage2}
                onClick={() =>
                  navigate("/search", {
                    state: { propertyType: ["Курсы"] },
                  })
                }
              />
              <CategoryCard
                text={t("categoryCards.card3")}
                image={categoryImage3}
                onClick={() =>
                  navigate("/search", {
                    state: { propertyType: ["Менторы"] },
                  })
                }
              />
              <CategoryCard
                text={t("categoryCards.card4")}
                image={categoryImage4}
                onClick={() => navigate("/search")}
              />
              <CategoryCard
                text={t("categoryCards.card5")}
                image={categoryImage5}
                onClick={() => navigate("/search")}
              />
            </div>
          </div>

          <div className={cl.devider}>
            <div className={cl.left}>
              <div className={cl.deviderText}>
                <div className={cl.d_title}>
                  {settings?.mainPageBannerText
                    ? settings?.mainPageBannerText[
                        i18n.language == "en"
                          ? 0
                          : i18n.language == "ru"
                          ? 1
                          : 2
                      ]
                    : ""}
                </div>
                <div className={cl.d_subtitle}>
                  {settings?.mainPageBannerText
                    ? settings?.mainPageBannerTextSubtitle[
                        i18n.language == "en"
                          ? 0
                          : i18n.language == "ru"
                          ? 1
                          : 2
                      ]
                    : ""}
                </div>
                <div className={cl.btn}>
                  <Button
                    onClick={() => window.open('https://leetcode.com/#', '_blank')}
                    type='fill'
                    className={cl.button}
                  >
                    <div className='text-md'>{t("devider.button")}</div>
                  </Button>
                </div>
              </div>
            </div>
            <div className={cl.right}>
              <img src={deviderImg} className={cl.image} />
            </div>
            <div className={cl.btnDev}>
              <Button
                type='fill'
                className={`${cl.button} ${cl.buttonDevider}`}
              >
                <div className='text-md'>{t("devider.button")}</div>
              </Button>
            </div>
          </div>
        </section>

        <section className={cl.sellSection}>
          <div className='wrapper'>
            <div className={cl.sells}>
              <div className={cl.items__block}>
                <div className={cl.items__top}>
                  <div className={cl.leftText}>
                    <div className='icon'>
                      <Icon name='salesStart' />
                    </div>
                    <div className={cl.topTitleText}>
                      {t("section2.title1")}
                    </div>
                  </div>
                  <Link className={`${cl.more} title_md`} to='/all/courses'>
                    {t("section2.more")}
                  </Link>
                </div>

                <div className={cl.items}>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <ProductCard key={`${i} auction skeleton`} />
                      ))
                    : sales?.map((item) => (
                        <ProductCard item={item} key={`${item._id} sales`} />
                      ))}
                </div>
              </div>

              <div className={cl.items__block}>
                <div className={cl.items__top}>
                  <div className={cl.leftText}>
                    <div className='icon'>
                      <Icon name='auction' />
                    </div>
                    <div className={cl.topTitleText}>
                      {t("section2.title2")}
                    </div>
                  </div>
                  <Link className={`${cl.more} title_md`} to='/all/books'>
                    {t("section2.more")}
                  </Link>
                </div>

                <div className={cl.items}>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <ProductCard key={`${i} auction skeleton`} />
                      ))
                    : auctions?.map((item) => (
                        <ProductCard item={item} key={`${item._id} sales`} />
                      ))}
                </div>
              </div>

              <div className={cl.items__block}>
                <div className={cl.items__top}>
                  <div className={cl.leftText}>
                    <div className='icon'>
                      <Icon name='buisness' />
                    </div>
                    <div className={cl.topTitleText}>
                      {t("section2.title3")}
                    </div>
                  </div>
                </div>

                <div className={cl.gallery}>
            <TedExGallery />
          </div>

                <div className={cl.items}>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <ProductCard key={`${i} auction skeleton`} />
                      ))
                    : business?.map((item) => (
                        <ProductCard item={item} key={`${item._id} sales`} />
                      ))}
                </div>
              </div>

              <div className={cl.items__block}>
                <div className={cl.items__top}>
                  <div className={cl.leftText}>
                    <div className='icon'>
                      <Icon name='investDeals' />
                    </div>
                    <div className={cl.topTitleText}>
                      {t("section2.title4")}
                    </div>
                  </div>
                  <Link
                    className={`${cl.more} title_md`}
                    to='/reviews'
                  >
                    {t("section2.more")}
                  </Link>
                </div>

                <div className={cl.items}>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <ProductCard key={`${i} auction skeleton`} />
                      ))
                    : invest?.map((item) => (
                        <ProductCard item={item} key={`${item._id} sales`} />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cl.gallery__section}>
          <div className={cl.sectionTitle}>
            <Icon name='city' />
            <div className={cl.titleText}>{t("section3.city")}</div>
          </div>
          <div className={cl.gallery}>
            <CitiesGallery />
          </div>
          <div className={cl.gallery__devide} />
          <div className={cl.sectionTitle}>
            <Icon name='country' />
            <div className={cl.titleText}>{t("section3.country")}</div>
          </div>
          <div className={cl.gallery}>
            <CountriesGallery />
          </div>
        </section>
      </main>
    </div>
  );
};
