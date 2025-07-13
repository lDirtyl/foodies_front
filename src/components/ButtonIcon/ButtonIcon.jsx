import clsx from 'clsx';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
  icon,
  variant = 'dark',
  size = 'large',
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size])}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};
