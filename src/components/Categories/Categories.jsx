import React, { useEffect, useState } from 'react';

import { categoriesService } from '../../services/api';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './Categories.module.css';

const DESKTOP_LIMIT = 11;
const MOBILE_LIMIT = 8;

const Categories = ({ onCategorySelect }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoriesService.getAll();
        const categoriesArray = Array.isArray(data) ? data : data.categories || [];
        setAllCategories(categoriesArray);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;

  const limit = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT;
  const displayedCategories = showAll ? allCategories : allCategories.slice(0, limit);

  return (
    <div>
      <div className={styles.categoriesHeader}>
        <h2 className={styles.categoriesHeading}>CATEGORIES</h2>
        <p className={styles.categoriesSubheading}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
        </p>
      </div>
      <div className={styles.categoriesGrid}>
        {displayedCategories.map(category => (
          <div
            key={category.id}
            className={styles.categoryCard}
            style={{
              backgroundImage: `url(${categoriesService.getImageUrl(category.thumb)})`
            }}
            onClick={() => onCategorySelect(category)}
          >
            <div className={styles.categoryOverlay}>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.arrowWrapper}>
                <img
                  src="/icons/arrow-up-right-white.svg"
                  alt="arrow"
                  className={styles.arrow}
                />
                <img
                  src="/icons/arrow-up-right.svg"
                  alt="arrow-hover"
                  className={`${styles.arrow} ${styles.arrowHover}`}
                />
              </span>
            </div>
          </div>
        ))}

        {showAll ? (
          <div 
            className={`${styles.categoryCard} ${styles.allCategories} ${styles.ShowAllRecepi}`}
            onClick={() => onCategorySelect({ id: 'all', name: 'All categories' })}
          >
            <div>
              <span>SHOW ALL RECEPI</span>
            </div>
          </div>
        ) : (
          <div 
            className={`${styles.categoryCard} ${styles.allCategories}`}
            onClick={() => setShowAll(true)}
          >
            <div>
              <span>All categories</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
