import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesService } from '../../services/api';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './Categories.module.css';

const MAX_CATEGORIES = 11;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoriesService.getAll();
        const categoriesArray = Array.isArray(data) ? data : data.categories || [];
        setCategories(categoriesArray.slice(0, MAX_CATEGORIES));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setError('Failed to load categories');
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <div className={styles.categoriesHeader}>
        <h2 className={styles.categoriesHeading}>CATEGORIES</h2>
        <p className={styles.categoriesSubheading}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
        </p>
      </div>
      <div className={styles.categoriesGrid}>
        {categories.map(category => (
          <Link
            to={`/categories/${category.id}`}
            key={category.id}
            className={styles.categoryCard}
            style={{
              backgroundImage: `url(${categoriesService.getImageUrl(category.thumb)})`
            }}
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
          </Link>
        ))}
        <Link to="/categories" className={`${styles.categoryCard} ${styles.allCategories}`}>
          <div>
            <span>
              All categories
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
