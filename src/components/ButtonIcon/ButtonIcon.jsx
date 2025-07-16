import clsx from 'clsx';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
  icon,
  variant = 'dark',
  size = 'large',
  classNames = [],
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        ...classNames
      )}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

export default ButtonIcon;
