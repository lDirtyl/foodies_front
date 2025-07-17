import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { TYPES, VARIANTS } from './const';

import styles from './Button.module.css';

const Button = ({
  onClick,
  children,
  href,
  to,
  variant,
  className,
  isLoading,
  type = TYPES.BUTTON,
  disabled = false,
  small = false,
  fullWidth = false,
}) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(
    styles.button,
    variant && styles[variant],
    small && styles.small,
    fullWidth && styles.fullWidth,
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {isLoading ? <FiLoader className={styles.iconLoading} /> : children}
    </button>
  );
};

Button.variants = Object.assign({}, VARIANTS);
Button.types = Object.assign({}, TYPES);

export default Button;
