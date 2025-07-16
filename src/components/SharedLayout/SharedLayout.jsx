import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ShowModal from '../ShowModal/ShowModal';
import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ShowModal />
      <Footer />
    </>
  );
}
