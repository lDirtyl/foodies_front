import Container from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { SocialNetworks } from '../SocialNetworks/SocialNetworks';
import { Link } from 'react-router-dom';
import { Copyright } from '../Copyright/Copyright';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />
          <SocialNetworks />
        </div>
      </Container>
      <div className={styles.separator}></div>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Copyright />
          <Link to="/testpage_add_recepi" style={{ color: 'inherit', textDecoration: 'none' }}>Test Add Recipe Page</Link>
        </div>
      </Container>
    </footer>
  );
}
