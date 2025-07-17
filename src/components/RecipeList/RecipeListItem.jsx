import React from 'react';
import { Link } from 'react-router-dom';

import { recipesService } from '../../services/api';

import ButtonIcon from '../ButtonIcon/ButtonIcon';

import styles from './RecipeListItem.module.css';

const DEFAULT_IMAGE_URL = 'https://d33wubrfki0l68.cloudfront.net/2b3f027405ee07fb69921b5de0710bb844882662/e937b/img/fallback.png';
const DEFAULT_AVATAR_URL = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740';

const RecipeListItem = ({
  recipe,
  isFavorite,
  onFavoriteToggle,
  onAuthorClick,
  onViewRecipe,
}) => {
  if (!recipe) return null;

  const avatarUrl = recipe.user?.avatar?.startsWith('http')
    ? recipe.user.avatar
    : DEFAULT_AVATAR_URL;

  const recipeId = recipe.id || recipe._id;

  const handleFavoriteClick = e => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  return (
    <li className={styles.card}>
      <Link to={`/recipes/${recipeId}`} className={styles.imageLink}>
        <img src={recipesService.getImageUrl(recipe.thumb)} alt={recipe.title} className={styles.image} onError={e => {
          e.target.onerror = null; 
          e.target.src = DEFAULT_IMAGE_URL;
        }} />
      </Link>
      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.wrapper}>
          <button
            type="button"
            className={styles.author}
            onClick={onAuthorClick}
          >
            <img
              src={avatarUrl}
              alt={recipe.user?.name || 'Anonymous'}
              className={styles.avatar}
              onError={e => {
                e.target.onerror = null; 
                e.target.src = DEFAULT_AVATAR_URL;
              }}
            />
            {recipe.user?.name || 'Anonymous'}
          </button>
          <div className={styles.wrap}>
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="Favorite" />}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              variant="light"
            />

            <ButtonIcon
              icon={<img src="/icons/arrow-up-right.svg" alt="View profile" />}
              onClick={onViewRecipe}
              title="View profile"
              variant="light"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default React.memo(RecipeListItem);
