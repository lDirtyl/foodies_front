import SignUpForm from '../SignUpForm/SignUpForm';
import Modal from '../Modal/Modal';

import styles from '../styles/modal.module.css';

const SignUpModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>SIGN UP</h2>
        <SignUpForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default SignUpModal;
