import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { useMediaQuery } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import { ROUTERS, THEMES } from '../../const';
import { Logo } from '../Logo/Logo';

import stylesNavigation from '../styles/navigation.module.css';
import styles from './Nav.module.css';

const buildClassName = ({ isActive }) => {
  return clsx(stylesNavigation.link, isActive && stylesNavigation.active);
};

const Nav = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const className = clsx(
    stylesNavigation.wrapper,
    theme && stylesNavigation[theme]
  );

  const handleOnMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.remove('mobile-open');
    } else {
      if (isOpen) {
        document.body.classList.add('mobile-open');
      } else {
        document.body.classList.remove('mobile-open');
      }
    }
  }, [isMobile, isOpen]);

  return (
    <div className={className}>
      <button
        className={clsx(
          stylesNavigation.menuButton,
          stylesNavigation.menuButtonOpen
        )}
        type="button"
        aria-label="Open menu"
        onClick={handleOnMenuClick}
      >
        <IoMdMenu />
      </button>
      <div
        className={clsx(
          stylesNavigation.mobileMenuContainer,
          isOpen && stylesNavigation.isOpen,
          !isOpen && stylesNavigation.isClose
        )}
      >
        <div className={stylesNavigation.mobileMenuOverlay} />
        <div className={stylesNavigation.mobileMenu}>
          <div className={stylesNavigation.mobileMenuHeader}>
            <Logo theme={THEMES.DARK} />
            <button
              className={clsx(
                stylesNavigation.menuButton,
                stylesNavigation.menuButtonClose
              )}
              type="button"
              aria-label="Close menu"
              onClick={handleOnCloseClick}
            >
              <IoClose />
            </button>
          </div>
          <nav className={stylesNavigation.nav}>
            <NavLink
              onClick={handleOnCloseClick}
              className={buildClassName}
              to={ROUTERS.HOME}
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleOnCloseClick}
              className={buildClassName}
              to={ROUTERS.ADD_RECIPE}
            >
              Add recipe
            </NavLink>
          </nav>

          <div className={stylesNavigation.mobileMenuFooter}>
            <img
              srcSet="
              /images/hero/hero-dish2-1x.png 1x,
              /images/hero/hero-dish2-2x.png 2x"
              src="/images/hero/hero-dish2-1x.png"
              alt="Meat pie"
              className={styles.imgSmall}
            />
            <img
              srcSet="
              /images/hero/hero-dish1-1x.png 1x,
              /images/hero/hero-dish1-2x.png 2x"
              src="/images/hero/hero-dish1-1x.png"
              alt="Chocolate pudding"
              className={styles.imgLarge}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
