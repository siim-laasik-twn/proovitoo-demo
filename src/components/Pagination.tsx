import React, { useMemo } from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const pageNumbers: (number | string)[] = [];
    const displayThreshold = 5; // Show all pages if total is 5 or less

    if (totalPages <= displayThreshold) {

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {

      pageNumbers.push(1);
      pageNumbers.push(2);
      pageNumbers.push(3);
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  }, [totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
      
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
            &laquo;
          </button>
        </li>

        {pages.map((page, index) => {

          if (typeof page === 'string') {
            return (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link ellipsis">{page}</span>
              </li>
            );
          }
          
          return (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;