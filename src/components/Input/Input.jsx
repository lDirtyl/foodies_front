import styles from './Input.module.css';

export const Input = ({ type = 'text', placeholder }) => {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} />
  );
};
