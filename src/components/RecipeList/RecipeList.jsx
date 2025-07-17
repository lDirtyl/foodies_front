import { useDispatch } from 'react-redux';
import { toggleFavoriteThunk } from '../../redux/slices/recipesSlice';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const RecipeList = ({ recipes = [], isLoading = false, error = null }) => {
  const dispatch = useDispatch();

  const handleToggleFavorite = (recipe) => {
    dispatch(toggleFavoriteThunk({
      id: recipe.id,
      isFavorite: recipe.isFavorite
    }));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading recipes: {error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
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
    <div className="recipe-list">
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image-container">
              <img 
                src={recipe.image || '/images/default-recipe.jpg'} 
                alt={recipe.title}
                className="recipe-image"
              />
              <button 
                className={`favorite-btn ${recipe.isFavorite ? 'favorited' : ''}`}
                onClick={() => handleToggleFavorite(recipe)}
                aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="heart-icon" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
            
            <div className="recipe-content">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">
                {recipe.description?.length > 100 
                  ? `${recipe.description.substring(0, 100)}...`
                  : recipe.description
                }
              </p>
              
              <div className="recipe-meta">
                <span className="recipe-category">{recipe.category}</span>
                <span className="recipe-time">{recipe.prepTime} min</span>
              </div>
              
              {recipe.author && (
                <div className="recipe-author">
                  <img 
                    src={recipe.author.avatar || '/images/default-avatar.jpg'} 
                    alt={recipe.author.name}
                    className="author-avatar"
                  />
                  <span className="author-name">{recipe.author.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
