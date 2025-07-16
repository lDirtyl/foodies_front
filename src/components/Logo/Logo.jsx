import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <NavLink
      className={clsx(styles.navLink, styles.logo, styles.logoWhite)}
      to="/"
      aria-label="Logo Foodies"
    >
      Foodies
    </NavLink>
  );
};
