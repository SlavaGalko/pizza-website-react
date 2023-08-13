import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className={styles.paginationRoot}
      />
    </>
  );
};

export default Pagination;
