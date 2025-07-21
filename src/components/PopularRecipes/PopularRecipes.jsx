import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularRecipes } from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './PopularRecipes.module.css';

const PopularRecipes = () => {
  const dispatch = useDispatch();
  const { popularRecipes, isLoadingPopular, error } = useSelector(state => state.recipes);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPopularRecipes(4));
  }, [dispatch]);

  const handleToggleFavorite = (recipeId) => {
    // This will be handled by RecipeCard
    console.log('Toggle favorite for recipe:', recipeId);
  };

  if (isLoadingPopular && popularRecipes.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
      </div>
    );
  }

  if (error && popularRecipes.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load popular recipes</p>
      </div>
    );
  }

  if (!popularRecipes || popularRecipes.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No popular recipes available</p>
      </div>
    );
  }

  return (
    <div className={styles.popularRecipes}>
      <h2 className={styles.title}>Other Popular Recipes</h2>
      
      <div className={styles.recipesGrid}>
        {popularRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            author={recipe.author || recipe.user}
            isAuthenticated={!!user}
            isFavorite={recipe.isFavorite || false}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
