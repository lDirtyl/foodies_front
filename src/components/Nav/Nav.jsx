import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { useMediaQuery } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTERS, THEMES, MODALS } from '../../const';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';
import { Logo } from '../Logo/Logo';

import stylesNavigation from '../styles/navigation.module.css';
import styles from './Nav.module.css';

const buildClassName = ({ isActive }, contrast = false) => {
  return clsx(
    stylesNavigation.link,
    isActive && stylesNavigation.active,
    contrast && stylesNavigation.contrast,
    isActive && contrast && stylesNavigation.activeContrast
  );
};

const Nav = ({ theme, contrast = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

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

  const handleAddRecipeClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      dispatch(
        showModal({
          modal: MODALS.AUTH,
          defaultValue: 'signIn',
          onClose: () => navigate(ROUTERS.ADD_RECIPE.replace(':id', user.id)),
        })
      );
    } else {
      navigate(ROUTERS.ADD_RECIPE.replace(':id', user.id));
    }
    handleOnCloseClick();
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
              className={props => buildClassName(props, contrast)}
              to={ROUTERS.HOME}
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleAddRecipeClick}
              className={props => buildClassName(props, contrast)}
              to={ROUTERS.ADD_RECIPE.replace(':id', user.id)}
            >
              Add recipe
            </NavLink>
          </nav>

          <div className={stylesNavigation.mobileMenuFooter}>
            <img
              srcSet="
              /images/hero/tiramisu@1.webp 1x,
              /images/hero/tiramisu@2.webp 2x"
              src="/images/hero/tiramisu@1.webp"
              alt="Tiramisu dessert"
              className={styles.imgSmall}
            />
            <img
              srcSet="
              /images/hero/sliced_beef@1.webp 1x,
              /images/hero/sliced_beef@2.webp 2x"
              src="/images/hero/sliced_beef@1.webp"
              alt="Sliced beef dish"
              className={styles.imgLarge}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
