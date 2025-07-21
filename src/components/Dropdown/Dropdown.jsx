import styles from './Dropdown.module.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export const Dropdown = ({
  options = [],
  placeholder = 'Select an option',
  value = '',
  onChange,
  availableOptions,
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
        <div>{selected ? (selected.searchLabel || selected.label) : placeholder}</div>
        <img
          src="/icons/chevron-down.svg"
          alt="toggle"
          className={clsx(styles.icon, isOpen && styles.rotate)}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(opt => {
            const isAvailable = !availableOptions || !opt.value || availableOptions.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={clsx(styles.item, !isAvailable && styles.disabled)}
                onClick={() => isAvailable && handleSelect(opt)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
