import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/UI/ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import cl from "./AuthorProducts.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { Pagination } from "../../components/UI/Pagination/Pagination.jsx";
import { useTranslation } from "react-i18next";

export const AuthorProducts = ({ products }) => {
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isFavoriteEmpty, setIsFavoriteEmpty] = useState(
    userData?.favorites?.items?.length === 0
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log("Products: ", products)
  console.log("Is Loading: ", isLoading)

  useEffect(() => {
    if (products) {
      setItems(products);
      setIsLoading(false);
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);

  return (
    <div className={cl.wrapper}>
      {isFavoriteEmpty ? (
        <div className={cl.empty}>
          <div className={cl.emptyIcon}>
            <Icon name='empty' />
          </div>
          <div className={cl.emptyText}>{t("history.empty")}</div>
        </div>
      ) : (
        <div className={cl.items}>
          {(
            <>
              {items.slice(startIndex, endIndex).map((item) => (
                <div className={cl.item}>
                  <ProductCard
                    key={item._id}
                    className={`${cl.card}`}
                    timer={false}
                    item={item}
                  />
                </div>
              ))}
              <div className={cl.pagination}>
                <Pagination
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
