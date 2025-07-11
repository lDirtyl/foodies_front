import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({ icon, ...rest }) => {
  return (
    <button className={styles.iconButton} {...rest}>
      {icon}
    </button>
  );
};
