import styles from './ButtonOutline.module.css';

export const ButtonOutline = ({ children }) => {
  return <button className={styles.outline}>{children}</button>;
};
