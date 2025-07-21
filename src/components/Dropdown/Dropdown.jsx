import styles from './Dropdown.module.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export const Dropdown = ({
  options = [],
  placeholder = 'Select an option',
  value = '',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value);
    setSelected(selectedOption || null);
  }, [value, options]);

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div>{selected ? selected.label : placeholder}</div>
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
