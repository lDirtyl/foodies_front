import styles from './Checkbox.module.css';

export const Checkbox = ({ checked, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.custom}></span>
    </label>
  );
};
