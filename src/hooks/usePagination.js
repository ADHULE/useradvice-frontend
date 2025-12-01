import { useState } from "react";

const usePagination = (items = [], itemsPerPage = 10) => {
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentData = () => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const next = () => setPage((p) => Math.min(p + 1, maxPage));
  const prev = () => setPage((p) => Math.max(p - 1, 1));
  const jump = (pageNumber) =>
    setPage(Math.min(Math.max(1, pageNumber), maxPage));

  return { page, maxPage, currentData, next, prev, jump };
};

export default usePagination;
