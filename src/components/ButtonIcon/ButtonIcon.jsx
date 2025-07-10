import clsx from 'clsx';
import * as styles from './ButtonIcon.module.css';

/**
 * @param {"dark"|"light"} variant - кольорова схема
 * @param {"small"|"medium"} size - розмір кнопки
 * @param {React.ReactNode} icon - SVG-іконка
 * @param {string} className - додаткові класи
 * @param {() => void} onClick
 */
export const ButtonIcon = ({
  variant = 'dark',
  size = 'medium',
  icon,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size], className)}
      onClick={onClick}
      {...props}
    >
      {icon}
    </button>
  );
};
