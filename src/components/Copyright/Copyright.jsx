import styles from './Copyright.module.css';

export const Copyright = () => {
  return (
    <p className={styles.text}>
      &copy; {new Date().getFullYear()} Foodies. All rights reserved.
    </p>
  );
};
