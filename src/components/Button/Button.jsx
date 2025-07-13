import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant = 'dark',
  size = 'medium',
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant] || '', styles[size] || '')}
      {...props}
    >
      {children}
    </button>
  );
};
