import styles from './SocialNetworks.module.css';
import clsx from 'clsx';

const socialLinks = [
  {
    href: 'https://www.facebook.com/goITclub/',
    id: 'facebook',
    label: 'Facebook',
    iconSrc: '/icons/facebook.svg',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    id: 'instagram',
    label: 'Instagram',
    iconSrc: '/icons/instagram.svg',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    id: 'youtube',
    label: 'YouTube',
    iconSrc: '/icons/youtube.svg',
  },
];

export const SocialNetworks = () => {
  return (
    <ul className={styles.list}>
      {socialLinks.map(({ href, id, label, iconSrc }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={clsx(styles.light, styles.link)}
          >
            <img src={iconSrc} alt={label} />
          </a>
        </li>
      ))}
    </ul>
  );
};
