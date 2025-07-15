import PathInfo from '../PathInfo/PathInfo';
import styles from './PageWrapper.module.css';

const PageWrapper = ({
  children,
  title,
  description,
  showHeader = true,
  showBreadcrumbs = true,
  breadcrumbItems = null,
  breadcrumbSeparator = '/',
  className = '',
}) => {
  return (
    <div className={`${styles.pageWrapper} ${className}`}>
      {showHeader && (title || description) && (
        <div className={styles.header}>
          {showBreadcrumbs && (
            <PathInfo
              items={breadcrumbItems}
              separator={breadcrumbSeparator}
            />
          )}
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageWrapper;
