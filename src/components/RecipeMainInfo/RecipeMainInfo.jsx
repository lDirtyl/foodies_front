import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';
import styles from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  if (!recipe) return null;

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`/user/${recipe.author?.id || recipe.user?.id}`);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const authorName = recipe.author?.name || recipe.user?.name || 'Unknown Author';
  const authorAvatar = recipe.author?.avatar || recipe.user?.avatar;

  return (
    <>
      <div className={styles.recipeMainInfo}>
        <div className={styles.imageContainer}>
          <img
            src={recipe.thumb || recipe.image || '/images/default-recipe.jpg'}
            alt={recipe.title}
            className={styles.recipeImage}
          />
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>{recipe.title}</h1>
          
          <div className={styles.category}>
            <span className={styles.categoryLabel}>Category:</span>
            <span className={styles.categoryValue}>{recipe.category}</span>
          </div>
          
          <p className={styles.description}>{recipe.description}</p>
          
          <div className={styles.authorSection}>
            <span className={styles.authorLabel}>Recipe by:</span>
            <button 
              onClick={handleAuthorClick}
              className={styles.authorButton}
            >
              <div className={styles.authorInfo}>
                <div 
                  className={styles.authorAvatar}
                  style={{ 
                    backgroundImage: authorAvatar 
                      ? `url(${authorAvatar})` 
                      : 'url(/images/default-avatar.jpg)' 
                  }}
                />
                <span className={styles.authorName}>{authorName}</span>
              </div>
            </button>
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

export default RecipeMainInfo;
