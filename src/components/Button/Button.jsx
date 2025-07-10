import clsx from 'clsx';
import * as styles from './Button.module.css';

/**
 * @param {"dark"|"light"} variant - button color
 * @param {string} className - additional styles
 * @param {React.ReactNode} children - button content
 * @param {() => void} onClick
 */
export const Button = ({
  variant = 'dark',
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
