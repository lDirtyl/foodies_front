import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../redux/recipes/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PathInfo from '../../components/PathInfo/PathInfo';
import Container from '../../components/Container/Container';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './RecipesPage.module.css';

export default function RecipesPage() {
  const dispatch = useDispatch();
  const { recipes, isLoading, error, favorites } = useSelector(state => state.recipes);
  const isAuthenticated = useSelector(selectIsLoggedIn);

  useEffect(() => {
    console.log('RecipesPage: fetching recipes...');
    dispatch(fetchRecipes({}));
  }, [dispatch]);

  console.log('RecipesPage render:', { recipesCount: recipes.length, isLoading, error });

  const handleToggleFavorite = (recipeId) => {
    // Тут буде логіка додавання/видалення з улюблених
    console.log('Toggle favorite for recipe:', recipeId);
  };

  if (isLoading && recipes.length === 0) {
    return (
      <PageWrapper>
        <Container>
          <LoadingIndicator />
        </Container>
      </PageWrapper>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <PageWrapper>
        <Container>
          <div className={styles.errorContainer}>
            <h2>Error loading recipes</h2>
            <p>{error}</p>
          </div>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <PathInfo currentPageName="RECIPES" />
        <div className={styles.recipesPage}>
          <h1 className={styles.title}>All Recipes</h1>
          
          {recipes.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No recipes found</p>
            </div>
          ) : (
            <div className={styles.recipesGrid}>
              {recipes.map(recipe => {
                // Перевіряємо чи рецепт є в улюблених
                const isFavorite = favorites.some(fav => fav.id === recipe.id);
                
                return (
                  <RecipeCard
                    key={recipe.id}
                    recipe={{
                      id: recipe.id,
                      title: recipe.title,
                      description: recipe.description,
                      image: recipe.thumb || recipe.image || '/images/default-recipe.jpg'
                    }}
                    author={recipe.author || recipe.user || {
                      id: 'unknown',
                      name: 'Unknown Author',
                      avatar: '/images/default-avatar.jpg'
                    }}
                    isAuthenticated={isAuthenticated}
                    isFavorite={isFavorite}
                    onToggleFavorite={handleToggleFavorite}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </PageWrapper>
  );
}
