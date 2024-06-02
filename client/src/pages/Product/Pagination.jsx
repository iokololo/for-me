import React from 'react';
import cl from './Product.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={cl.pagination}>
      <button
        className={cl.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className={cl.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
