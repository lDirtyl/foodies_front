import React, { useEffect, useRef } from 'react';
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
  const { currentRecipe, isLoadingRecipe, error } = useSelector(state => state.recipes);
  const { favorites } = useSelector(state => state.recipes);
  const lastFetchedId = useRef(null);

  console.log('=== RecipeInfo render ===');
  console.log('ID:', id);
  console.log('currentRecipe:', currentRecipe?.id);
  console.log('isLoadingRecipe:', isLoadingRecipe);
  console.log('error:', error);
  console.log('lastFetchedId:', lastFetchedId.current);

  useEffect(() => {
    console.log('RecipeInfo useEffect triggered');
    
    if (id && id !== lastFetchedId.current) {
      console.log('Fetching recipe for ID:', id);
      lastFetchedId.current = id;
      dispatch(fetchRecipeById(id));
    }
    
    return () => {
      console.log('RecipeInfo cleanup');
    };
  }, [dispatch, id]);

  // Якщо завантажується і ще немає рецепту
  if (isLoadingRecipe && !currentRecipe) {
    console.log('Showing loading...');
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
      </div>
    );
  }

  if (error && !currentRecipe) {
    console.log('Showing error...');
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading recipe</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!currentRecipe) {
    console.log('No recipe found...');
    return (
      <div className={styles.notFoundContainer}>
        <h2>Recipe not found</h2>
        <p>The requested recipe could not be found.</p>
      </div>
    );
  }

  // Перевіряємо, чи завантажений рецепт відповідає поточному ID
  if (currentRecipe.id !== id) {
    console.log('Recipe ID mismatch, showing loading...');
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
      </div>
    );
  }

  console.log('Rendering recipe:', currentRecipe.title);

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
