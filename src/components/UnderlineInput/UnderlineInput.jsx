import styles from './UnderlineInput.module.css';
import clsx from 'clsx';

export const UnderlineInput = ({ placeholder = '', className, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        {...props}
      />
      <span className={styles.underline}></span>
    </div>
  );
};
