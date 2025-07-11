import styles from './Dropdown.module.css';

export const Dropdown = ({ options = [] }) => {
  return (
    <select className={styles.select}>
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
