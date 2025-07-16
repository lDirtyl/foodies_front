import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Logo } from '../Logo/Logo';
import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';

import styles from './Header.module.css';

const Header = ({ theme }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const className = clsx(styles.header, theme && styles[theme]);

  return (
    <header className={className}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.brand}>
            <Logo theme={theme} />
          </div>

          {isLoggedIn ? (
            <>
              <Nav theme={theme} />
              <UserBar theme={theme} />
            </>
          ) : (
            <AuthBar theme={theme} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
