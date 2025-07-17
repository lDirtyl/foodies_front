import SignInForm from '../SignInForm/SignInForm';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/common/slice';
import { MODALS } from '../../const';

import styles from '../styles/modal.module.css';

const SignInModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    onClose();
    dispatch(showModal(MODALS.SIGN_UP));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>SIGN IN</h2>
        <SignInForm onSuccess={onClose} />
        <div className={styles.createAccount}>
          <button
            type="button"
            onClick={handleCreateAccount}
            className={styles.createAccountButton}
          >
            Create an account
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
