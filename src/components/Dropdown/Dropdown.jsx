import styles from './Dropdown.module.css';
import clsx from 'clsx';
import { useState } from 'react';

export const Dropdown = ({
  options = [],
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selected?.label || placeholder}</span>
        <img
          src="/icons/chevron-down.svg"
          alt="toggle"
          className={clsx(styles.icon, isOpen && styles.rotate)}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={styles.item}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
