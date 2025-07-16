import SignInForm from '../SignInForm/SignInForm';
import Modal from '../Modal/Modal';

import styles from '../styles/modal.module.css';

const SignInModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>SIGN IN</h2>
        <SignInForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default SignInModal;
