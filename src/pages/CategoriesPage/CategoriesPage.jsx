import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import CategoryList from '../../components/CategoryList/CategoryList';
import { categoriesService } from '../../services/api';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoriesService.getAll();
        const categoriesArray = Array.isArray(data) ? data : data.categories || [];
        console.log('Fetched categories count:', categoriesArray.length); // <-- Log count
        setCategories(categoriesArray);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <PageWrapper
      title="ALL CATEGORIES"
      description="Browse our complete collection of food categories"
    >
      <CategoryList categories={categories} />
    </PageWrapper>
  );
};

export default CategoriesPage;