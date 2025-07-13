import styles from './Checkbox.module.css';

export const Checkbox = ({ checked = false, onChange }) => {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.box} />
    </label>
  );
};
