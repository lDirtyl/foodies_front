import React from 'react';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import styles from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span>Home</span> / <span>Add recipe</span>
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>Add recipe</h1>
        <p className={styles.description}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </div>
      <AddRecipeForm />
    </main>
  );
};

export default AddRecipePage;

