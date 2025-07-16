import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import { logout } from '../../redux/auth/operations';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';

import stylesModal from '../styles/modal.module.css';

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const title = isMobile ? 'LOG OUT' : 'ARE YOU LOGGING OUT?';

  const onSubmit = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={stylesModal.wrapper}>
        <h2 className={clsx(stylesModal.title, styles.title)}>{title}</h2>
        <div className={styles.wrapper}>
          <p className={styles.description}>
            You can always log back in at my time.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" onClick={onSubmit}>
              LOG OUT
            </Button>
            <Button variant="secondary" onClick={onClose}>
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
