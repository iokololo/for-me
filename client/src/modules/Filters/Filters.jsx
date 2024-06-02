import React, { useState, useEffect } from "react";
import cl from "./Filters.module.css";
import { Button } from "../../components/UI/Button/Button";
import { Icon } from "../../components/UI/Icon/Icon";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../service/ProductService.js";

export const Filters = () => {
  const navigate = useNavigate();
  const [currentFilterType, setCurrentFilterType] = useState(null);
  const [currentFilterStrategy, setCurrentFilterStrategy] = useState(null);
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState({
    propertyType: [],
    buyOptions: [],
    price: "",
    area: "",
    isCompleted: [],
  });
  const [numberOfProperties, setNumberOfProperties] = useState(0);
  const [word, setWord] = useState(
    numberOfProperties % 100 > 10 && numberOfProperties % 100 < 20
      ? "mainPageFilters.object3"
      : numberOfProperties % 10 === 1
      ? "mainPageFilters.object1"
      : numberOfProperties % 10 >= 2 && numberOfProperties % 10 <= 4
      ? "mainPageFilters.object2"
      : "mainPageFilters.object3"
  );

  useEffect(() => {
    setWord(
      numberOfProperties % 100 > 10 && numberOfProperties % 100 < 20
        ? "mainPageFilters.object3"
        : numberOfProperties % 10 === 1
        ? "mainPageFilters.object1"
        : numberOfProperties % 10 >= 2 && numberOfProperties % 10 <= 4
        ? "mainPageFilters.object2"
        : "mainPageFilters.object3"
    );
  }, [numberOfProperties]);

  const handleFilterTypeClick = (filterName) => {
    if (currentFilterType === filterName) {
      setCurrentFilterType(null);
      return;
    }
    setCurrentFilterType(filterName);
  };
  const handleFilterStrategyClick = (filterName) => {
    if (currentFilterStrategy === filterName) {
      setCurrentFilterStrategy(null);
      return;
    }
    setCurrentFilterStrategy(filterName);
  };
  const handleApplyFilters = () => {
    let propertyType = [];
    let buyOptions = [];

    if (currentFilterType === "type") {
      propertyType = [];
    } else if (currentFilterType) {
      propertyType = [t(`mainPageFilters.type.options.${currentFilterType}`)];
    }

    if (currentFilterStrategy === "strategy") {
      buyOptions = [];
    } else if (currentFilterStrategy) {
      buyOptions = [
        t(`mainPageFilters.strategy.options.${currentFilterStrategy}`),
      ];
    }

    const filters = {
      propertyType,
      buyOptions,
    };
    navigate("/search", { state: filters });
  };

  const loadData = async () => {
    const req = await ProductService.getFilteredProperties(
      filters,
      "priceAscending",
      1,
      12
    );
    setNumberOfProperties(req.headers["x-total-count"]);
  };

  useEffect(() => {
    loadData();
  }, [currentFilterType, currentFilterStrategy]);
  return (
    <div className={cl.root}>
      <div className={cl.top}>
        <div className={cl.filters}>
          <div
            className={cl.filter}
            onClick={() => {
              handleFilterTypeClick("type");
            }}
          >
            <div className={`${cl.filterText} regular`}>
              {currentFilterType
                ? t(`mainPageFilters.type.options.${currentFilterType}`)
                : t("mainPageFilters.type.options.type")}
              <div className={`${cl.icon} ${cl.inactive}`}>
                <Icon name='dropDown' />
              </div>
              <div className={`${cl.icon} ${cl.active}`}>
                <Icon name='dropDownActive' />
              </div>
            </div>
          </div>

          {/* <div
            className={cl.filter}
            onClick={() => handleFilterStrategyClick("strategy")}
          >
            <div className={`${cl.filterText} regular`}>
              {currentFilterStrategy
                ? t(`mainPageFilters.strategy.options.${currentFilterStrategy}`)
                : t("mainPageFilters.strategy.options.strategy")}
              <div className={`${cl.icon} ${cl.inactive}`}>
                <Icon name='dropDown' />
              </div>
              <div className={`${cl.icon} ${cl.active}`}>
                <Icon name='dropDownActive' />
              </div>
            </div>
          </div> */}

          <Link
            to='/search'
            style={{ textDecoration: "none" }}
            className={cl.filter}
          >
            <div className={`${cl.filterText} regular`}>
              {t("mainPageFilters.extendedFilter.title")}
              <div className={`${cl.icon} ${cl.inactive}`}>
                <Icon name='property' />
              </div>
              <div className={`${cl.icon} ${cl.active}`}>
                <Icon name='propertyActive' />
              </div>
            </div>
          </Link>
        </div>
        <div className={cl.button}>
          <Button onClick={handleApplyFilters} className={cl.btn}>
            <div className='hlsb'>
              {t("mainPageFilters.show")} {numberOfProperties} {t(word)}
            </div>
          </Button>
        </div>
      </div>
      <div className={cl.bottom}>
        <div className={cl.filters_dropDown}>
          <div className={cl.wrapp}>
            <div
              className={cl.filter_dropDown}
              style={{
                display: currentFilterType === "type" ? "block" : "none",
              }}
            >
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterTypeClick("option1");
                  setFilters((prevState) => ({
                    ...prevState,
                    propertyType: [t(`mainPageFilters.type.options.option1`)],
                  }));
                }}
              >
                {t("mainPageFilters.type.options.option1")}
              </div>
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterTypeClick("option2");
                  setFilters((prevState) => ({
                    ...prevState,
                    propertyType: [t(`mainPageFilters.type.options.option2`)],
                  }));
                }}
              >
                {t("mainPageFilters.type.options.option2")}
              </div>
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterTypeClick("option3");
                  setFilters((prevState) => ({
                    ...prevState,
                    propertyType: [t(`mainPageFilters.type.options.option3`)],
                  }));
                }}
              >
                {t("mainPageFilters.type.options.option3")}
              </div>
            </div>
          </div>
          <div className={cl.wrapp}>
            <div
              className={cl.filter_dropDown}
              style={{
                display:
                  currentFilterStrategy === "strategy" ? "block" : "none",
              }}
            >
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterStrategyClick("option1");
                  setFilters((prevState) => ({
                    ...prevState,
                    buyOptions: [t(`mainPageFilters.strategy.options.option1`)],
                  }));
                }}
              >
                {t("mainPageFilters.strategy.options.option1")}
              </div>
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterStrategyClick("option2");
                  setFilters((prevState) => ({
                    ...prevState,
                    buyOptions: [t(`mainPageFilters.strategy.options.option2`)],
                  }));
                }}
              >
                {t("mainPageFilters.strategy.options.option2")}
              </div>
              <div
                className={cl.dropDownItem}
                onClick={() => {
                  handleFilterStrategyClick("option3");
                  setFilters((prevState) => ({
                    ...prevState,
                    buyOptions: t(`mainPageFilters.strategy.options.option3`),
                  }));
                }}
              >
                {t("mainPageFilters.strategy.options.option3")}
              </div>
            </div>
          </div>
          <div className={cl.wrapp}></div>
        </div>
      </div>
    </div>
  );
};
