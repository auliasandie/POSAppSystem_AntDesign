import React from "react";
import "../CSS/pagination.css"

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination" style={{ paddingLeft: 10 }}>
      {/* <a href="#">&laquo;</a> */}
      {pageNumbers.map(number => (
        <a
          onClick={() => paginate(number)}
        
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </a>
      ))}
      {/* <a href="#">&raquo;</a> */}
    </div>
  );
};

export default Pagination;