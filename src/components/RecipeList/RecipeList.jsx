import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleFavoriteThunk } from '../../redux/recipes';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import RecipePagination from '../RecipePagination/RecipePagination';

import RecipeListItem from './RecipeListItem';

import styles from './RecipeList.module.css';

const RecipeList = ({ recipes = [], isLoading = false, error = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleFavorite = recipe => {
    dispatch(
      toggleFavoriteThunk({
        id: recipe.id,
        isFavorite: recipe.isFavorite,
      })
    );
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
    const errorMessage = typeof error === 'string' ? error : error?.message || 'An unknown error occurred';
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
      {recipes.map(recipe => (
        <RecipeListItem
          key={recipe.id}
          recipe={recipe}
          isFavorite={recipe.isFavorite}
          onFavoriteToggle={() => handleToggleFavorite(recipe)}
          onAuthorClick={() => handleAuthorClick(recipe.author)}
          onViewRecipe={() => handleViewRecipe(recipe)}
        />
      ))}
    </ul>
  );
};

export default RecipeList;
