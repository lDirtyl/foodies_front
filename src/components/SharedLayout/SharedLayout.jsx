import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ShowModal from '../ShowModal/ShowModal';
import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  const location = useLocation();

  const needsContrast =
    location.pathname === '/' || location.pathname === '/categories';

  const isHomePage = location.pathname === '/';
  const theme = isHomePage ? 'dark' : null;

  return (
    <>
      <Header theme={theme} contrast={needsContrast} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ShowModal />
      <Footer />
    </>
  );
}
