import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './ListItems.module.css';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import clsx from 'clsx';

const ListItems = ({
  children,
  isLoading = false,
  emptyMessage = 'Nothing has been added to your list yet.',
  showPagination = true,
  separator = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (isLoading) {
    return <LoadingIndicator size="large" />;
  }

  if (!children || (Array.isArray(children) && children.length === 0)) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.pagingList}>
      <div className={styles.content}>{children.map((child, index) => (
        <div key={index} className={clsx(separator && index !== 0 && styles.separator)}>
          {child}
        </div>
      ))}</div>

      {showPagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.pageNumbers}>
            {generatePageNumbers().map(page => (
              <ButtonIcon
                key={page}
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? 'light' : 'transparent'}
                noBorder={currentPage !== page}
                icon={<p>{page}</p>}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItems;
