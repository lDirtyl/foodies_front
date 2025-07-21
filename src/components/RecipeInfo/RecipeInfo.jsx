import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../redux/recipes/operations';
import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './RecipeInfo.module.css';

const RecipeInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentRecipe, isLoadingRecipe, error, favorites } = useSelector(state => state.recipes);

  useEffect(() => {
    if (id && (!currentRecipe || currentRecipe.id !== id)) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id, currentRecipe]);

  if (isLoadingRecipe && !currentRecipe) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
      </div>
    );
  }

  if (error && !currentRecipe) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading recipe</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!currentRecipe) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Recipe not found</h2>
        <p>The requested recipe could not be found.</p>
      </div>
    );
  }

  // Перевіряємо, чи завантажений рецепт відповідає поточному ID
  if (currentRecipe.id !== id) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
      </div>
    );
  }

  // Check if recipe is in favorites
  const isFavorite = favorites.some(fav => fav.id === currentRecipe.id);

  return (
    <div className={styles.recipeInfo}>
      <RecipeMainInfo recipe={currentRecipe} />
      <RecipeIngredients ingredients={currentRecipe.ingredients} />
      <RecipePreparation 
        recipe={currentRecipe} 
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default RecipeInfo;
