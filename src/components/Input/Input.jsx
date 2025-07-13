import styles from './Input.module.css';
import clsx from 'clsx';

export const Input = ({ placeholder = '', ...props }) => {
  return (
    <input
      type="text"
      className={clsx(styles.input)}
      placeholder={placeholder}
      {...props}
    />
  );
};
