import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ImageWithLoader.module.css';

const ImageWithLoader = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const placeholderSrc = '/images/placeholder.svg'; // Path to your placeholder image

  return (
    <div className={clsx(styles.wrapper, className)}>
      {loading && <div className={styles.skeleton}></div>}
      <img
        src={error ? placeholderSrc : src}
        alt={alt}
        className={clsx(styles.image, (loading || error) && styles.hidden)}
        onLoad={handleLoad}
        onError={handleError}
      />
      {error && 
        <img 
          src={placeholderSrc} 
          alt="placeholder" 
          className={clsx(styles.image, styles.placeholder)} 
        />
      }
    </div>
  );
};

export default ImageWithLoader;
