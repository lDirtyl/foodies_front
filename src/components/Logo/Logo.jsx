import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './Logo.module.css';

export const Logo = ({ theme, contrast = false }) => {
  const classNames = clsx(
    styles.navLink,
    styles.logo,
    styles.logoWhite,
    theme && styles[theme],
    contrast && styles.contrast
  );

  return (
    <NavLink className={classNames} to="/" aria-label="Logo Foodies">
      Foodies
    </NavLink>
  );
};
