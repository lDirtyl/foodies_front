import { useState } from 'react';
import styles from './Avatar.module.css';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const Avatar = ({ 
  src, 
  alt = 'User avatar', 
  size = 'medium',
  className = '',
  showEditButton = false,
  onEditClick = null
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleEditButtonClick = () => {
    if (onEditClick) {
      onEditClick();
    }
  };

  // Корректно формируем className для корневого контейнера
  const rootClassName = [
    styles.avatarContainer,
    styles.avatar_userbar,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <div 
        className={[styles.avatar, className].filter(Boolean).join(' ')}
        style={{
          backgroundImage: hasError || !src 
            ? 'url(/images/default-avatar.jpg)' 
            : undefined
        }}
      >
        {!hasError && src && (
          <img
            src={src}
            alt={alt}
            className={styles.avatarImage}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        )}
      </div>
      
      {showEditButton && (
        <ButtonIcon 
          onClick={handleEditButtonClick}
          variant='dark'
          aria-label="Edit avatar"
          icon={<img src="/icons/plus.svg" alt="Edit" />}
          classNames={[styles.editButton]}
        />
      )}
    </div>
  );
};

export default Avatar; 