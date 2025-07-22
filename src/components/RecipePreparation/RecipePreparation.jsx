import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { toggleFavoriteThunk } from '../../redux/recipes/operations';
import { showModal } from '../../redux/common/slice';
import { MODALS, FORM_TYPES } from '../../const';
import Button from '../Button/Button';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({
  recipe,
  isFavorite: initialIsFavorite = false,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      dispatch(
        showModal({ modal: MODALS.AUTH, defaultValue: FORM_TYPES.SIGN_IN })
      );
      return;
    }

    if (!recipe?.id) return;

    try {
      setIsLoading(true);
      await dispatch(
        toggleFavoriteThunk({
          id: recipe.id,
          isFavorite: isFavorite,
        })
      ).unwrap();
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!recipe) return null;

  const instructions =
    recipe.instructions ||
    recipe.preparation ||
    'No preparation instructions available.';

  return (
    <div className={styles.recipePreparation}>
      <h2 className={styles.title}>Recipe Preparation</h2>
      <div className={styles.instructionsContainer}>
        <p className={styles.instructions}>{instructions}</p>
      </div>
      <div className={styles.actionContainer}>
        <Button
          onClick={handleToggleFavorite}
          variant={isFavorite ? 'secondary' : 'primary'}
          isLoading={isLoading}
          disabled={isLoading}
          className={styles.favoriteButton}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </div>
    </div>
  );
};

export default RecipePreparation;
