import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.wrapper} aria-label="Page not found">
      <img
        src="/images/notFoundPage/PageNotFound.webp"
        alt="Page not found"
        className={styles.image}
        width={360}
        height={180}
        loading="lazy"
      />
      <p className={styles.description}>
        Well, that didn’t taste right… Better head back to the homepage!
      </p>
      <nav aria-label="Go to home">
        <Link to="/" className={styles.homeBtn}>
          Go to the Home page
        </Link>
      </nav>
    </section>
  );
};

export default NotFoundPage;
