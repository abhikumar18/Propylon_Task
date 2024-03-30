import { useState } from 'react';

type PaginationProps = {
  page?: number;
  pageLimit?: number;
};

export const usePagination = (props: PaginationProps = {}) => {
  const { page, pageLimit } = props;
  const [pageNumber, setPageNumber] = useState(page ?? 1);
  const [paginationIndex, setPaginationIndex] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 9 });
  const [pageSize, setPageSize] = useState(pageLimit ?? 10);

  return {
    pageNumber,
    pageSize,
    changePageNumber: setPageNumber,
    changePageSize: setPageSize,
    paginationIndex,
    setPaginationIndex,
  };
};
