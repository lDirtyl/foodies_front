import clsx from 'clsx';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
  icon,
  variant = 'dark',
  size = 'large',
  classNames = [],
  noBorder = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        noBorder && styles.noBorder,
        ...classNames
      )}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

export default ButtonIcon;
