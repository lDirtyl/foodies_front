import Container from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { SocialNetworks } from '../SocialNetworks/SocialNetworks';
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
        <Copyright />
      </Container>
    </footer>
  );
}
