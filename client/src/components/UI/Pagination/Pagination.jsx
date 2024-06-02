import React, { useState } from "react";
import cl from "./Pagination.module.css";
import { Icon } from "../Icon/Icon.jsx";

export const Pagination = ({ totalPages, page, setPage }) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    const middleEllipsisStart = page - Math.floor(maxVisiblePages / 2);
    const middleEllipsisEnd = page + Math.floor(maxVisiblePages / 2);
    const lastPage = totalPages;

    if (middleEllipsisStart > 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(middleEllipsisStart, 2);
      i <= Math.min(middleEllipsisEnd, lastPage - 1);
      i++
    ) {
      pages.push(i);
    }

    if (middleEllipsisEnd < lastPage - 1) {
      pages.push("...");
    }

    pages.push(lastPage);
    return pages;
  };

  const previousPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  return (
    <div className={cl.pagination}>
      {totalPages !== 1 && (
        <>
          <div
            onClick={previousPage}
            className={`${cl.arrow} ${page === 1 && cl.disabled}`}
          >
            <Icon name="arrow-left" />
          </div>
          {getPageNumbers().map((item) => (
            <div
              key={item}
              className={`${cl.paginationItem} ${
                page === item ? cl.active : ""
              } ${item === "..." && cl.ellipsis} `}
              onClick={() => handlePageClick(item)}
            >
              {item}
            </div>
          ))}
          <div
            onClick={nextPage}
            className={`${cl.arrow} ${page === totalPages && cl.disabled}`}
          >
            <Icon name="arrow-right" />
          </div>
        </>
      )}
    </div>
  );
};
