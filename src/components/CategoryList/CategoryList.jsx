import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesService } from '../../services/api';
import styles from './CategoryList.module.css';

const CategoryList = ({ categories }) => (
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
          <span className={styles.arrow}>&#8599;</span>
        </div>
      </Link>
    ))}
  </div>
);

export default CategoryList;