import { useState } from "react";

export const usePagination = (quantity: number, divisor: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(quantity / divisor);

  const prevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const hasPrevPage = currentPage !== 0;
  const hasNextPage = currentPage !== totalPages - 1 && totalPages !== 0;

  return { currentPage, nextPage, prevPage, hasPrevPage, hasNextPage };
};
