import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useFormContext } from 'react-hook-form';

import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import ErrorField from '../ErrorField/ErrorField';

import styles from '../Fields.module.css';

const FieldCount = ({
  label,
  name,
  strong,
  onChange,
  error,
  value,
  step = 10,
  className = '',
}) => {
  const [count, setCount] = useState(value);
  const { getValues } = useFormContext();
  const fieldId = useId();
  const values = getValues();

  const handleOnChange = value => () => {
    const currentValue = count + value;
    if (currentValue > 0) {
      onChange(currentValue);
      setCount(currentValue);
    }
  };

  useEffect(() => {
    if (count !== values[name]) {
      setCount(values[name]);
    }
  }, [count, name, values]);

  return (
    <div
      className={clsx(
        styles.field,
        className,
        strong && styles.strong,
        error && styles.error
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={clsx(styles.inputCountWrapper)}>
        <ButtonIcon onClick={handleOnChange(-step)}>
          <FaMinus />
        </ButtonIcon>
        <div className={styles.step}>{count} min</div>
        <ButtonIcon onClick={handleOnChange(step)}>
          <FaPlus />
        </ButtonIcon>
      </div>

      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};

export default FieldCount;
