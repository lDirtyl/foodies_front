import { Link, useLocation } from 'react-router-dom';
import styles from './PathInfo.module.css';

const PathInfo = ({ items = null, separator = '/' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs = [
      { label: 'HOME', path: '/' }
    ];

    // Map common paths to readable labels
    const pathLabels = {
      'user': 'PROFILE',
      'recipe': 'RECIPE',
      'add': 'ADD RECIPE',
      'edit': 'EDIT',
      'favorites': 'FAVORITES',
      'following': 'FOLLOWING',
      'followers': 'FOLLOWERS'
    };

    let currentPath = '';
    pathnames.forEach((pathname) => {
      currentPath += `/${pathname}`;
      const label = pathLabels[pathname] || pathname.toUpperCase();
      
      // Don't add numeric IDs as breadcrumb labels
      if (!/^\d+$/.test(pathname)) {
        breadcrumbs.push({
          label,
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (!breadcrumbItems || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className={styles.breadcrumbItem}>
            {index < breadcrumbItems.length - 1 ? (
              <>
                <Link 
                  to={item.path} 
                  className={styles.breadcrumbLink}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </Link>
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              </>
            ) : (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default PathInfo; 