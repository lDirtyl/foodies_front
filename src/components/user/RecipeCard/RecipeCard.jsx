import { useDispatch } from 'react-redux';
import { removeRecipeFromFavorites } from '../../../redux/user/userFavoriteRecipes';
import { deleteUserRecipe } from '../../../redux/user/userRecipes';
import styles from './RecipeCard.module.css';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({
  recipe,
  showActions = true,
  isOwner = false,
  isFavorite = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      // Remove from favorites
      dispatch(removeRecipeFromFavorites(recipe.id));
    } else {
      // Add to favorites - this would typically be handled by a different action
      // For now, we'll just log it
      console.log('Add to favorites:', recipe.id);
    }
  };

  const handleDeleteClick = () => {
    if (isOwner) {
      dispatch(deleteUserRecipe(recipe.id));
    } else if (isFavorite) {
      dispatch(removeRecipeFromFavorites(recipe.id));
    }
  };

  const handleShowDetails = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  if (!recipe) return null;

  return (
    <div className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <img
          src={recipe.thumb && recipe.thumb.startsWith('http') ? recipe.thumb : '/images/add_recepi.png'}
          alt={recipe.title}
          className={styles.recipeImage}
        />
      </div>

      <div className={styles.recipeInfo}>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <p className={styles.recipeDescription}>{recipe.description}</p>
      </div>

      {showActions && (
        <div className={styles.actions}>
          {isOwner ? (
            <>
              <ButtonIcon
                icon={<img src="/icons/arrow-up-right.svg" alt="Edit" />}
                onClick={handleShowDetails}
                title="Show recipe details"
                variant="light"
              />
              <ButtonIcon
                icon={<img src="/icons/trash.svg" alt="Delete" />}
                onClick={handleDeleteClick}
                title="Delete recipe"
                variant="light"
              />
            </>
          ) : (
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="Favorite" />}
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              variant="light"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
