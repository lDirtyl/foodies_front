import { Box, Modal as ModalComponent } from '@mui/material';
import styles from './Modal.module.css';

const Modal = ({ children, open, onClose }) => {
  return (
    <ModalComponent open={open} onClose={onClose} className={styles.overlay}>
      <Box className={styles.modal}>
        <div className={styles.header}>
          <img
            src="/icons/x.svg"
            alt="Close"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </Box>
    </ModalComponent>
  );
};

export default Modal;
