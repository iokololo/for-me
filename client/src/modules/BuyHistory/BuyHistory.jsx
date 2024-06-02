import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/UI/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import ProductService from "../../service/ProductService";
import cl from "./BuyHistory.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { Pagination } from "../../components/UI/Pagination/Pagination.jsx";
import { useTranslation } from "react-i18next";

export const BuyHistory = ({ activeTab, isCLoading }) => {
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(isCLoading);
  const [items, setItems] = useState([]);
  const [isBuyHistoryEmpty, setIsBuyHistoryEmpty] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const loadData = async () => {
    const buyHistory = await ProductService.getBuyHistory(userData._id);
    const buyHistoryLength = buyHistory?.data?.bought?.length;
    setItems(
      await Promise.all(
        buyHistory?.data?.bought?.map(async (item) => {
          const res = await ProductService.getProduct(item.product);
          return res.data;
        })
      )
    );
    setIsLoading(false);
    setIsBuyHistoryEmpty(buyHistoryLength === 0);
    setTotalPages(Math.ceil(buyHistoryLength / 6));
  };

  useEffect(() => {
    setIsLoading(true);
  }, [activeTab]);

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [page]);

  return (
    <div className={cl.wrapper}>
      {isBuyHistoryEmpty ? (
        <div className={cl.empty}>
          <div className={cl.emptyIcon}>
            <Icon name='empty' />
          </div>
          <div className={cl.emptyText}>{t("history.empty")}</div>
        </div>
      ) : (
        <>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCard
                className={cl.card}
                key={index}
                customWidth={275}
                timer={false}
              />
            ))
          ) : (
            <>
              <div div className={cl.items}>
                {items?.map((item) => (
                  <div className={cl.item}>
                    <ProductCard
                      key={item._id}
                      customWidth={275}
                      timer={false}
                      item={item}
                      className={cl.card}
                    />
                  </div>
                ))}
              </div>
              <div className={cl.pagination}>
                <Pagination
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
