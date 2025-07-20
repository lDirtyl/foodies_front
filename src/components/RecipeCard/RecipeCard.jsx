import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';

const RecipeCard = ({
  recipe,
  author,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  if (!recipe) return null;

  const { image, title, description } = recipe;

  const handleFavoriteToggle = () => {
    console.log('Favorite button clicked for recipe:', recipe.id, 'isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      onToggleFavorite(recipe.id);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleAuthorClick = () => {
    if (isAuthenticated) {
      navigate(`/user/${author.id}`);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleNavigateToRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${image || '/images/default-recipe.jpg'})` }}
        />
        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.author}>
              <button onClick={handleAuthorClick} className={styles.authorButton}>
                <div 
                  className={styles.authorImage}
                  style={{ 
                    backgroundImage: author.avatar ? `url(${author.avatar})` : 'url(/images/default-avatar.jpg)' 
                  }}
                />
                <span className={styles.authorName}>{author.name}</span>
              </button>
            </div>
            <div className={styles.actions}>
              <button
                onClick={handleFavoriteToggle}
                className={`${styles.iconButton} ${styles.favoriteButton} ${
                  isFavorite ? styles.isFavorite : ''
                }`}
                title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
              >
                <img src="/icons/heart.svg" alt="Favorite" className={styles.icon} />
              </button>
              <button
                onClick={handleNavigateToRecipe}
                className={`${styles.iconButton} ${styles.viewButton}`}
                title="Переглянути рецепт"
              >
                <img src="/icons/arrow-up-right.svg" alt="Go to recipe" className={styles.icon} />
              </button>
            </div>
          </div>
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

export default RecipeCard;
