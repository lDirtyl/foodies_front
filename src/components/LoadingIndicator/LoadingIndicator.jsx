import styles from './LoadingIndicator.module.css';

const LoadingIndicator = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.loadingContainer} ${styles[size]} ${className}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingIndicator;
