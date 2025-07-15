import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant = 'dark',
  size = 'medium',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button, 
        styles[variant] || '', 
        styles[size] || '',
        fullWidth && styles.fullWidth
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;