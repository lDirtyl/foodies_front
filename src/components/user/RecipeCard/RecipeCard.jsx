import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../../redux/slices/userRecipesSlice';
import styles from './RecipeCard.module.css';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';

const RecipeCard = ({ recipe, showActions = true, isOwner = false }) => {
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  const handleDeleteClick = () => {
    // dispatch(openDeleteConfirm(recipe.id));
  };

  const handleEdit = () => {
    // Navigate to edit page
    console.log('Edit recipe:', recipe.id);
  };

  if (!recipe) return null;

  return (
    <div className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <img
          src={recipe.image || '/images/default-recipe.jpg'}
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
                onClick={handleEdit}
                title="Edit recipe"
                variant='light'
              />
              <ButtonIcon
                icon={<img src="/icons/trash.svg" alt="Delete" />}
                onClick={handleDeleteClick}
                title="Delete recipe"
                variant='light'
              />
            </>
          ) : (
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="Favorite" />}
              onClick={handleToggleFavorite}
              title={
                recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              variant='light'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
