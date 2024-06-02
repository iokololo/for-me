import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import { Button } from "../../components/UI/Button/Button";
import cl from "./MapView.module.css";
import ProductService from "../../service/ProductService";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../../components/UI/Icon/Icon";
import { ProductCard } from "../../components/UI/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import { Modal } from "../../components/UI/Modal/Modal.jsx";
import RangeSlider from "react-range-slider-input";
import validate from "../../utils/validate.js";
import { SelectionBox } from "../../components/UI/SelectionBox/SelectionBox.jsx";

export const MapView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const [isModal, setIsModal] = useState(false);
  const [minPriceAmount, setMinPriceAmount] = useState("0");
  const [maxPriceAmount, setMaxPriceAmount] = useState("999999");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [currentSort, setCurrentSort] = useState("priceAscending");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [numberOfProperties, setNumberOfProperties] = useState(0);
  const clusterRef = React.useRef(null);

  const [filters, setFilters] = useState({
    propertyType: [],
    buyOptions: [],
    price: "",
    area: "",
    isCompleted: [],
    city: "",
  });
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(1000);
  const [minAreaPlaceholder, setMinAreaPlaceholder] = useState("");
  const [maxAreaPlaceholder, setMaxAreaPlaceholder] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [properties, setProperties] = useState({
    propertyType: [
      {
        id: 1,
        text: "Книги",
        value: null,
        isChecked: false,
        name: "residentialProduct",
      },
      {
        id: 2,
        text: "Менторы",
        value: null,
        isChecked: false,
        name: "commercialProduct",
      },
      {
        id: 3,
        text: "Курсы",
        value: null,
        isChecked: false,
        name: "landPlot",
      },
    ],
    strategy: [
      {
        id: 1,
        text: "Выгодная перепродажа",
        value: null,
        isChecked: false,
        name: "resale",
      },
      {
        id: 2,
        text: "Флиппинг",
        value: null,
        isChecked: false,
        name: "flipping",
      },
      {
        id: 3,
        text: "Сдача в аренду",
        value: null,
        isChecked: false,
        name: "rental",
      },
    ],
    status: [
      {
        id: 1,
        text: "Строится",
        value: null,
        isChecked: false,
        name: "isNotCompleted",
      },
      {
        id: 2,
        text: "Дом сдан",
        value: null,
        isChecked: false,
        name: "isCompleted",
      },
    ],
  });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const validateArea = (area) => {
    return validate.area(area);
  };
  const validatePrice = (price) => {
    return validate.price(price);
  };
  const addFilter = (filterName, filterValue) => {
    if (filterName === "city") {
      setSelectedCity(filterValue);
      setFilters((prevState) => {
        return {
          ...prevState,
          [filterName]: filterValue,
        };
      });
    } else {
      setFilters((prevState) => {
        return {
          ...prevState,
          [filterName]: filterValue,
        };
      });
    }
  };

  const handlePriceChangeAmount = (values) => {
    setMinPriceAmount(values[0]);
    setMaxPriceAmount(values[1]);
  };

  const handleMinPriceAmount = (e) => {
    if (!validatePrice(e.target.value)) {
      return;
    }
    setMinPriceAmount(e.target.value);
  };

  const handleMaxPriceAmount = (e) => {
    if (!validatePrice(e.target.value)) {
      return;
    }
    setMaxPriceAmount(e.target.value);
  };
  const handleMinAreaChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!validateArea(newValue)) {
      return;
    }

    if (!isNaN(newValue)) {
      if (newValue > maxArea) {
        return;
      }
      setMinAreaPlaceholder(e.target.value);
      setMinArea(newValue);
    } else {
      setMinAreaPlaceholder("");
      setMinArea(0);
    }
  };
  const handleMaxAreaChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!validateArea(newValue)) {
      return;
    }
    if (!isNaN(newValue)) {
      if (newValue < minArea) {
        return;
      }
      setMaxAreaPlaceholder(e.target.value);
      setMaxArea(newValue);
    } else {
      setMaxAreaPlaceholder("");
      setMaxArea(1000);
    }
  };
  const isFilterEmpty = () => {
    return (
      filters?.propertyType?.length === 0 &&
      filters?.buyOptions?.length === 0 &&
      filters?.price === "" &&
      filters?.area === "" &&
      filters?.isCompleted?.length === 0
    );
  };
  const loadData = async () => {
    if (!isFilterEmpty()) {
      const req = await ProductService.getFilteredProperties(
        filters,
        currentSort,
        page,
        12
      );
      setItems(req.data);
      console.log(req.data);
      setFilteredProperties(req.data);
      setIsLoading(false);
      setTotalPages(Math.ceil(req.headers["x-total-count"] / 12));
      setNumberOfProperties(req.headers["x-total-count"]);
    } else {
      const req = await ProductService.getAllProperties(page, 12, currentSort);
      setFilteredProperties(req.data);
      setTotalPages(Math.ceil(req.headers["x-total-count"] / 12));
      setNumberOfProperties(req.headers["x-total-count"]);
    }
    setIsLoading(false);
  };

  const getCoords = async () => {
    if (location.state) {
      const response = await ProductService.getProduct(location.state);
      return [response.data.coords.lat, response.data.coords.lng];
    }
    return [43.2263647, 76.9501065];
  };

  const handleModalBack = () => {
    history.back();
  };
  const loadCountProperties = async () => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      propertyType: prevProperties.propertyType.map((type) => {
        if (type.text === location.state?.propertyType?.[0]) {
          return { ...type, isChecked: true };
        }
        return type;
      }),
      strategy: prevProperties.strategy.map((str) => {
        if (str.text === location.state?.buyOptions?.[0]) {
          return { ...str, isChecked: true };
        }
        return str;
      }),
    }));
    const propertiesCount = await ProductService.getCountProperties(filters);
    setProperties((prevProperties) => ({
      ...prevProperties,
      propertyType: [
        {
          ...prevProperties.propertyType[0],
          value: propertiesCount?.count.residentialProduct,
        },
        {
          ...prevProperties.propertyType[1],
          value: propertiesCount?.count.commercialProduct,
        },
        {
          ...prevProperties.propertyType[2],
          value: propertiesCount?.count.landProduct,
        },
      ],
      strategy: [
        {
          ...prevProperties.strategy[0],
          value: propertiesCount?.count.resale,
        },
        {
          ...prevProperties.strategy[1],
          value: propertiesCount?.count.flipping,
        },
        {
          ...prevProperties.strategy[2],
          value: propertiesCount?.count.rental,
        },
      ],
      status: [
        {
          ...prevProperties.status[0],
          value: propertiesCount?.count.completed,
        },
        {
          ...prevProperties.status[1],
          value: propertiesCount?.count.notCompleted,
        },
      ],
    }));
  };
  const loadCities = async () => {
    try {
      const city = await ProductService.getCities();
      setCities(city.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSubmitButton = () => {
    setIsModal(false);
    setPage(1);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [filters, page, currentSort]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      addFilter("price", `${minPriceAmount * 1000} - ${maxPriceAmount * 1000}`);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [minPriceAmount, maxPriceAmount]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      addFilter("area", `${minArea} - ${maxArea}`);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [minArea, maxArea]);

  useEffect(() => {
    loadCountProperties();
    loadCities();
  }, [filters]);
  return (
    <YMaps>
      <div className={cl.root}>
        <Map
          defaultState={
            items.length === 1
              ? {
                  center: [items[0]?.coords?.lat, items[0]?.coords?.lng],
                  zoom: 13,
                }
              : {
                  center: [43.2263647, 76.9501065],
                  zoom: 13,
                }
          }
          className={cl.map}
        >
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
            instanceRef={clusterRef}
            onClick={(e) => {
              // console.log(clusterRef.current.getGeoObjects());
              // get all item ids which are in cluster
              // const geoObjects = clusterRef.current.getGeoObjects();
              // // get all items from state
              // const displayedItems = geoObjects.filter(
              //   (geoObject) =>
              //     clusterRef.current.getObjectState(geoObject).isShown
              // );
              // const coords = displayedItems.map(
              //   (geo) => geo.geometry._coordinates
              // );
              // //filter items bt coords
              // const filteredItems = items.filter((item) =>
              //   coords.some(
              //     (coord) =>
              //       coord[0] === item.coords.lat && coord[1] === item.coords.lng
              //   )
              // );
            }}
          >
            {filteredProperties?.map((property, index) => (
              <Placemark
                key={index}
                defaultGeometry={[property?.coords?.lat, property?.coords?.lng]}
                onClick={(e) => {
                  navigate(`/product/${property._id}`);
                }}
                options={{
                  hasBalloon: true,
                  hasHint: true,
                  openHintOnHover: true,
                }}
              />
            ))}
          </Clusterer>

          <div className={cl.modalBack} onClick={handleModalBack}>
            <Icon name='arrowLeft' />
            <div className={cl.modalBackText}>{t("map.back")}</div>
          </div>
          <div
            className={`${cl.modal} ${isActive && cl.modalOpen}`}
            id='modal'
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <div className={cl.line}>
              <div className={cl.bg}></div>
            </div>
            <div className={cl.modalWrapper}>
              <div className={cl.geo} onClick={(e) => e.stopPropagation()}>
                <div className={cl.title}>{t("map.geo")}</div>
                <div className={cl.top}>
                  <div className={cl.search}>
                    <div className={cl.searchIcon}>
                      <Icon name='searchIcon' />
                    </div>
                    <input
                      type='text'
                      placeholder={t("map.search")}
                      onChange={(e) => console.log(e.target.value)}
                      className={cl.searchInput}
                    />
                  </div>
                  <div className={cl.selectors}>
                    <select className={cl.select}>
                      <option value='' disabled defaultValue>
                        {t("map.country")}
                      </option>
                      <option value='otherCountry'>Казахстан</option>
                      <option value='otherCountry'>Китай</option>
                    </select>
                    <select className={cl.select}>
                      <option value='' disabled defaultValue>
                        {t("map.city")}
                      </option>
                      {cities?.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={cl.btn} onClick={() => setIsModal(true)}>
                  <Icon name={"propertyActive"} />
                  <div className={cl.btnTxt}>Расширенный фильтр</div>
                </div>
                <div className={cl.values}>
                  <div className={cl.valueBlock}>
                    <div className={cl.valueTitle}>{t("map.value.1")}</div>
                    <div className={cl.percent}>15%</div>
                  </div>
                  <div className={cl.valueBlock}>
                    <div className={cl.valueTitle}>{t("map.value.2")}</div>
                    <div className={cl.percent}>15%</div>
                  </div>
                  <div className={cl.valueBlock}>
                    <div className={cl.valueTitle}>{t("map.value.3")}</div>
                    <div className={cl.percent}>15%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cl.fullAnalysis}>
              <div className={cl.fullAnalysisTitle}>
                {t("map.fullAnalysis")}
              </div>
              <div className={cl.fullAnalysisValues}>
                <div className={cl.superValues}>
                  <div className={cl.superValueBlock}>
                    <div className={cl.superValueTitle}>
                      {t("map.superValue.super")}
                      <br />
                      {t("map.superValue.1")}
                    </div>
                    <div className={cl.blur}>{t("map.superPercent")}</div>
                  </div>
                  <div className={cl.superValueBlock}>
                    <div className={cl.superValueTitle}>
                      {t("map.superValue.super")}
                      <br />
                      {t("map.superValue.2")}
                    </div>
                    <div className={cl.blur}>{t("map.superPercent")}</div>
                  </div>
                  <div className={cl.superValueBlock}>
                    <div className={cl.superValueTitle}>
                      {t("map.superValue.super")}
                      <br />
                      {t("map.superValue.3")}
                    </div>
                    <div className={cl.blur}>{t("map.superPercent")}</div>
                  </div>
                </div>

                <Button type={"fill"} className={cl.button}>
                  {t("map.order")}
                </Button>
              </div>
            </div>
            <div className={cl.modalWrapper}>
              <div className={cl.propertiesBlock}>
                <div className={cl.propertiesBlockTitle}>
                  {items?.length} {t("map.deal")}
                </div>
                <div className={cl.propertyCards}>
                  {items?.map((item) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      className={cl.cardProduct}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Map>
      </div>
      {isModal && (
        <Modal onClick={() => setIsModal(false)}>
          <div
            className={cl.modalFiltersWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cl.modalTop}>
              <div className={cl.modalTitle}>Расширенный фильтр</div>
              <div className='icon' onClick={() => setIsModal(false)}>
                <Icon name={"close"} />
              </div>
            </div>
            <div className={cl.modalBody}>
              <div className={cl.inputView}>
                <select className={cl.inputSelect}>
                  <option value='Страна' disabled defaultValue>
                    Страна
                  </option>
                  <option value='Страна'>Казахстан</option>
                  <option value='Страна'>Страна2</option>
                  <option value='Страна'>Страна3</option>
                </select>
              </div>
              <div className={cl.inputView}>
                <select className={cl.inputSelect}>
                  <option value='Город' disabled defaultValue>
                    Город
                  </option>
                  <option value='Город'>Almaty</option>
                  <option value='Город'>Город2</option>
                  <option value='Город'>Город3</option>
                </select>
              </div>

              <div className={cl.inputGroup}>
                <div className={cl.inputSubtitile}>Тип недвижимости</div>
                {Object.values(properties.propertyType).map((item) => (
                  <SelectionBox
                    id={`propertyType-${item.id}`}
                    key={item.id}
                    title={item.text}
                    value={item.value}
                    isChecked={item.isChecked}
                    onCheckboxChange={(e) => {
                      setProperties((prevState) => ({
                        ...prevState,
                        propertyType: prevState.propertyType.map((type) => {
                          if (type.id === item.id) {
                            return { ...type, isChecked: e.target.checked };
                          }
                          return type;
                        }),
                      }));
                      if (e.target.checked) {
                        addFilter("propertyType", [
                          ...filters.propertyType,
                          item.text,
                        ]);
                      } else {
                        setFilters((prevState) => ({
                          ...prevState,
                          propertyType: prevState.propertyType.filter(
                            (type) => type !== item.text
                          ),
                        }));
                      }
                    }}
                  />
                ))}
              </div>

              <div className={cl.inputGroup}>
                <div className={cl.inputSubtitile}>Стратегия</div>
                {Object.values(properties.strategy).map((item) => (
                  <SelectionBox
                    id={`strategy-${item.id}`}
                    key={item.id}
                    title={item.text}
                    value={item.value}
                    isChecked={item.isChecked}
                    onCheckboxChange={(e) => {
                      setProperties((prevState) => ({
                        ...prevState,
                        strategy: prevState.strategy.map((type) => {
                          if (type.id === item.id) {
                            return { ...type, isChecked: e.target.checked };
                          }
                          return type;
                        }),
                      }));
                      if (e.target.checked) {
                        addFilter("buyOptions", [
                          ...filters.buyOptions,
                          item.text,
                        ]);
                      } else {
                        setFilters((prevState) => ({
                          ...prevState,
                          buyOptions: prevState.buyOptions.filter(
                            (option) => option !== item.text
                          ),
                        }));
                      }
                    }}
                  />
                ))}
              </div>

              <div className={cl.inputGroup}>
                <div className={cl.inputSubtitile}>Общая сумма сделки</div>
                <div className={cl.slider}>
                  <RangeSlider
                    min={minPrice}
                    max={maxPrice}
                    step={1000}
                    value={[minPriceAmount, maxPriceAmount]}
                    onInput={handlePriceChangeAmount}
                  />
                </div>
                <div className={cl.inputs}>
                  <div className={cl.inputTop}>
                    <div className={cl.inputTitle}>{t("search.from")}</div>
                    <div className={cl.inputTitle}>{t("search.to")}</div>
                  </div>
                  <div className={cl.inputBottom}>
                    <div className={cl.inputArea}>
                      <input
                        placeholder='0'
                        className={cl.fontArea}
                        type='number'
                        value={minPriceAmount === "0" ? "" : minPriceAmount}
                        onChange={handleMinPriceAmount}
                        maxLength={6}
                      />
                      <div className={cl.k}>K</div>
                    </div>
                    <div className={cl.inputArea}>
                      <input
                        placeholder='999999'
                        className={cl.fontArea}
                        type='number'
                        value={
                          maxPriceAmount === "999999" ? "" : maxPriceAmount
                        }
                        onChange={handleMaxPriceAmount}
                        maxLength={6}
                      />
                      <div className={cl.k}>K</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cl.inputGroup}>
                <div className={cl.inputSubtitile}>Дата</div>
                <div className={cl.inputs}>
                  <div className={cl.inputTop}>
                    <div className={cl.inputTitle}>{t("search.from")}</div>
                    <div className={cl.inputTitle}>{t("search.to")}</div>
                  </div>
                  <div className={cl.inputBottom}>
                    <div className={cl.inputArea}>
                      <input
                        placeholder='0'
                        className={cl.fontArea}
                        type='number'
                        value={minAreaPlaceholder}
                        onChange={handleMinAreaChange}
                        maxLength={4}
                      />
                      <div className={cl.k}>м²</div>
                    </div>
                    <div className={cl.inputArea}>
                      <input
                        placeholder='1000'
                        className={cl.fontArea}
                        type='number'
                        value={maxAreaPlaceholder}
                        onChange={handleMaxAreaChange}
                        maxLength={4}
                      />
                      <div className={cl.k}>м²</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cl.inputGroup}>
                <div className={cl.inputSubtitile}>Статус колла</div>
                {Object.values(properties.status).map((item) => (
                  <SelectionBox
                    id={`status-${item.id}`}
                    key={item.id}
                    title={item.text}
                    value={item.value}
                    isChecked={item.isChecked}
                    onCheckboxChange={(e) => {
                      setProperties((prevState) => ({
                        ...prevState,
                        status: prevState.status.map((type) => {
                          if (type.id === item.id) {
                            return { ...type, isChecked: e.target.checked };
                          }
                          return type;
                        }),
                      }));
                      if (e.target.checked) {
                        addFilter("isCompleted", [
                          ...filters.isCompleted,
                          item.text === "Дом сдан",
                        ]);
                      } else {
                        setFilters((prevState) => ({
                          ...prevState,
                          isCompleted: prevState.isCompleted.filter(
                            (option) => option !== (item.text === "Дом сдан")
                          ),
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={cl.SubmitButton} onClick={handleSubmitButton}>
              Показать {numberOfProperties} лотов(-а)
            </div>
          </div>
        </Modal>
      )}
    </YMaps>
  );
};
