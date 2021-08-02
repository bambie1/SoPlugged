import React from "react";

const PaginationBar = ({ totalCount, pageLimit, handleClick }) => {
  let pageCount = Math.ceil(totalCount / pageLimit);
  return <p>Pagination</p>;
};

export default PaginationBar;
