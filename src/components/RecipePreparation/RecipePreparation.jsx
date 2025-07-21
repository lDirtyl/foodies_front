import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { toggleFavoriteThunk } from '../../redux/recipes/operations';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe, isFavorite: initialIsFavorite = false }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      setIsSignInModalOpen(true);
      return;
    }

    if (!recipe?.id) return;

    try {
      setIsLoading(true);
      await dispatch(toggleFavoriteThunk({
        id: recipe.id,
        isFavorite: isFavorite
      })).unwrap();
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!recipe) return null;

  const instructions = recipe.instructions || recipe.preparation || 'No preparation instructions available.';

  return (
    <>
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

      {isSignInModalOpen && (
        <Modal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)}>
          <SignInModal />
        </Modal>
      )}
    </>
  );
};

export default RecipePreparation;
