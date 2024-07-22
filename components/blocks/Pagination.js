
import React from 'react';
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

const Pagination = ({ total, initialPage, onChange }) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(total);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onChange(pageNumber);
    }
  };

  // Array to generate page numbers
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="m-6">
      <ul className="pagination flex justify-center items-center gap-2">
        <li>
          <button
            className={`bg-gray-300 text-black font-bold rounded-xl p-2 pagination-item ${initialPage === 1 ? 'pagination-item-disabled bg-gray-200 text-gray-500' : ''}`}
            onClick={() => handlePageChange(initialPage - 1)}
            disabled={initialPage === 1}
          >
            <MdChevronLeft />
          </button>
        </li>
        {pagesArray.map((page) => (
          <li key={page}>
            <button
              className={`bg-blue-500 text-white font-bold rounded-xl w-10 h-10 pagination-item ${initialPage === page ? 'pagination-item-active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`bg-gray-300 text-black font-bold rounded-xl p-2 pagination-item ${initialPage === totalPages ? 'pagination-item-disabled bg-gray-200 text-gray-500' : ''}`}
            onClick={() => handlePageChange(initialPage + 1)}
            disabled={initialPage === totalPages}
          >
            <MdChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;