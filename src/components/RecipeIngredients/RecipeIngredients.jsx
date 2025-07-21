import React from 'react';
import styles from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients = [] }) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className={styles.recipeIngredients}>
        <h2 className={styles.title}>Ingredients</h2>
        <p className={styles.noIngredients}>No ingredients available</p>
      </div>
    );
  }

  return (
    <div className={styles.recipeIngredients}>
      <h2 className={styles.title}>Ingredients</h2>
      <ul className={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id || index} className={styles.ingredientItem}>
            <div className={styles.ingredientImageContainer}>
              <img
                src={ingredient.thumb || ingredient.image || '/images/default-ingredient.jpg'}
                alt={ingredient.name}
                className={styles.ingredientImage}
                onError={(e) => {
                  e.target.src = '/images/default-ingredient.jpg';
                }}
              />
            </div>
            <div className={styles.ingredientInfo}>
              <span className={styles.ingredientName}>{ingredient.name}</span>
              <span className={styles.ingredientMeasure}>
                {ingredient.measure || ingredient.quantity || '1 piece'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
