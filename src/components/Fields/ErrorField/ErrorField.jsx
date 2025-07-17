import styles from '../Fields.module.css';

const ErrorField = ({ children }) => {
  return (
    <p className={styles.errorMessage} role="alert">
      {children}
    </p>
  );
};

export default ErrorField;
