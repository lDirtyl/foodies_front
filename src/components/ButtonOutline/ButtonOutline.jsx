import styles from './ButtonOutline.module.css';
import clsx from 'clsx';

export const ButtonOutline = ({
  children,
  icon = null,
  variant = 'outline',
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], icon && styles.withIcon)}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};
