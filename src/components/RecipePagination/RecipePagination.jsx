import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/recipesSlice';

const RecipePagination = ({ currentPage = 1, totalPages = 1 }) => {
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="page-btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="page-btn"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="recipe-pagination">
      <div className="pagination-container">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="nav-btn prev-btn"
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" className="nav-icon">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          Previous
        </button>

        {/* Page Numbers */}
        <div className="page-numbers">
          {renderPageNumbers()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="nav-btn next-btn"
          aria-label="Next page"
        >
          Next
          <svg viewBox="0 0 24 24" className="nav-icon">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>

      {/* Page Info */}
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default RecipePagination;
