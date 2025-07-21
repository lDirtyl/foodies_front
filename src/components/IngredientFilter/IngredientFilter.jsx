import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader';
import styles from './IngredientFilter.module.css';

const IngredientFilter = ({ options = [], value = '', onChange, availableOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const wrapperRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    setDisplayValue(selectedOption ? selectedOption.label : '');
  }, [selectedOption]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = option => {
    onChange({ ingredient: option.value });
    setSearchTerm(''); // Clear search term
    setIsOpen(false);
  };

  const filteredOptions = options
    .filter(opt => opt.value && opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const isAAvailable = !availableOptions || availableOptions.includes(a.value);
      const isBAvailable = !availableOptions || availableOptions.includes(b.value);
      if (isAAvailable && !isBAvailable) return -1;
      if (!isAAvailable && isBAvailable) return 1;
      return 0;
    });

  const availableIngredientsToDisplay = options.filter(opt => 
    opt.value && (!availableOptions || availableOptions.includes(opt.value))
  );

  const handleWheelScroll = e => {
    if (scrollContainerRef.current) {
      // The horizontal scroll logic
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = 'auto';
  };

  // Effect to clean up scroll lock when the component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Effect to clean up scroll lock when the dropdown is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {isOpen && (
        <div className={styles.imagePreviewContainer}>
          <div 
            className={styles.imageScrollWrapper} 
            ref={scrollContainerRef} 
            onWheel={handleWheelScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {availableIngredientsToDisplay.map(ing => (
              <ImageWithLoader key={ing.value} src={ing.thumb} alt={ing.label} className={styles.previewThumb} />
            ))}
          </div>
        </div>
      )}
      <div className={styles.toggle} onClick={() => inputRef.current.focus()}>
        <input
          ref={inputRef}
          type="text"
          placeholder="All ingredients"
          value={isOpen ? searchTerm : displayValue}
          onChange={e => {
            setSearchTerm(e.target.value);
            setDisplayValue(e.target.value);
          }}
          onFocus={() => {
            setIsOpen(true);
            setDisplayValue('');
            setSearchTerm('');
          }}
          className={styles.input}
        />
        <img
          src="/icons/chevron-down.svg"
          alt="toggle"
          className={clsx(styles.icon, isOpen && styles.rotate)}
        />
      </div>

      {isOpen && (
        <ul className={styles.menu}>
          {filteredOptions.map(opt => {
            const isAvailable = !availableOptions || availableOptions.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={clsx(styles.item, !isAvailable && styles.disabled)}
                onClick={() => isAvailable && handleSelect(opt)}
              >
                <ImageWithLoader src={opt.thumb} alt={opt.label} className={styles.thumb} />
                <span>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IngredientFilter;
