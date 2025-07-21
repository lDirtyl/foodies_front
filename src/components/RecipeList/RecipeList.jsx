import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleFavoriteThunk, fetchFavorites } from '../../redux/recipes';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectFavoriteIdsSet } from '../../redux/recipes/selectors';
import { showModal } from '../../redux/common/slice';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { MODALS, FORM_TYPES } from '../../const';

import RecipeListItem from './RecipeListItem';

import styles from './RecipeList.module.css';

const RecipeList = ({ recipes = [], isLoading = false, error = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteIds = useSelector(selectFavoriteIdsSet);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites({ page: 1, limit: 100 }));
    }
  }, [dispatch, isLoggedIn]);

  const handleToggleFavorite = recipe => {
    if (isLoggedIn) {
      dispatch(
        toggleFavoriteThunk({
          id: recipe.id,
          isFavorite: favoriteIds.has(recipe.id),
        })
      );
    } else {
      dispatch(
        showModal({ modal: MODALS.AUTH, defaultValue: FORM_TYPES.SIGN_IN })
      );
    }
  };

  const handleAuthorClick = author => {
    if (author?.id) {
      navigate(`/users/${author.id}`);
    } else {
      console.log('Author information not available:', author);
    }
  };

  const handleViewRecipe = recipe => {
    if (recipe?.id) {
      navigate(`/recipes/${recipe.id}`);
    } else {
      console.log('Recipe ID not available:', recipe);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error?.message || 'An unknown error occurred';
    return (
      <div className="error-message">
        <p>Error loading recipes: {errorMessage}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <ul className={styles.wrapper}>
      {recipes.map(recipe => {
        const isFavorite = isLoggedIn && favoriteIds.has(recipe.id);
        
        return (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            isFavorite={isFavorite}
            onFavoriteToggle={() => handleToggleFavorite(recipe)}
            onAuthorClick={() => handleAuthorClick(recipe.author)}
            onViewRecipe={() => handleViewRecipe(recipe)}
          />
        );
      })}
    </ul>
  );
};

export default RecipeList;
