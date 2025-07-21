import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../../redux/user/userRecipes/operations';
import api from '../../../api/api';
import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import styles from './United_ui_ux.module.css';

// --------- Helper Components (previously separate files) ---------

const Input = ({ placeholder = '', className, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        {...props}
      />
      <span className={styles.underline}></span>
    </div>
  );
};

const Dropdown = ({ options = [], placeholder = 'Select an option', value = '', onChange }) => {
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

const UnderlineInput = ({ placeholder = '', className, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        {...props}
      />
      <span className={styles.underline}></span>
    </div>
  );
};

const ButtonOutline = ({ children, icon = null, variant = 'outline', ...props }) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], icon && styles.withIcon)}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

const ButtonIcon = ({ icon, variant = 'dark', size = 'large', classNames = [], noBorder = false, ...props }) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        noBorder && styles.noBorder,
        ...classNames
      )}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

const Button = ({
  onClick,
  children,
  href,
  to,
  variant,
  className,
  isLoading,
  type = 'button',
  disabled = false,
  small = false,
  fullWidth = false,
}) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(
    styles.button,
    variant && styles[variant],
    small && styles.small,
    fullWidth && styles.fullWidth,
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {isLoading ? <FiLoader className={styles.iconLoading} /> : children}
    </button>
  );
};

// Mock icons - replace with actual icon components
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22">
    <path
      d="M11 5v12M5 11h12"
      stroke="#050505"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const MinusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M5 12h14"
      stroke="#050505"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M4 12L12 4M4 4L12 12"
      stroke="#050505"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


// --------- Main Combined Component ---------

const UnitedAddRecipeForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    time: '40',
    ingredients: [],
    instructions: '',
    thumb: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState({
    id: '',
    measure: '',
  });
  const [recipeData, setRecipeData] = useState({
    categories: [],
    ingredients: [],
  });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await api.get('/recipes/creation-data');
        setRecipeData(response.data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };
    fetchRecipeData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumb: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTimeChange = amount => {
    setFormData(prev => {
      const newTime = Math.max(5, parseInt(prev.time || 0) + amount);
      return { ...prev, time: newTime.toString() };
    });
  };

  const addIngredient = () => {
    if (!currentIngredient.id || !currentIngredient.measure) return;
    const ingredientDetails = recipeData.ingredients.find(
      ing => ing.id.toString() === currentIngredient.id
    );
    if (!ingredientDetails) return;
    setFormData(prev => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: ingredientDetails.id, measure: currentIngredient.measure, name: ingredientDetails.name, thumb: ingredientDetails.thumb },
      ],
    }));
    setCurrentIngredient({ id: '', measure: '' });
  };

  const removeIngredient = idToRemove => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== idToRemove),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let imageUrl = '';
    if (formData.thumb) {
      const imageFormData = new FormData();
      imageFormData.append('image', formData.thumb);
      try {
        const imageResponse = await api.post('/users/upload-image', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error('Failed to upload image:', error.response?.data || error.message);
        alert(`Error uploading image: ${error.response?.data?.message || 'An unexpected error occurred.'}`);
        return;
      }
    }

    const recipePayload = {
      ...formData,
      thumb: imageUrl,
      ingredients: formData.ingredients.map(ing => ({ id: ing.id, measure: ing.measure })),
    };

    try {
      await dispatch(createRecipe(recipePayload)).unwrap();
      alert('Recipe published successfully!');
    } catch (error) {
      console.error('Failed to publish recipe:', error);
      alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.imageUploader}>
            <input
              type="file"
              id="thumb"
              name="thumb"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="thumb" className={styles.imageLabel}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Recipe preview"
                  className={styles.imagePreview}
                />
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.icon}></span>
                  <span>Upload a photo</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label className={styles.recipeTitleLabel}>THE NAME OF THE RECIPE</label>
              <div className={styles.inputWrapper}>
                <UnderlineInput
                  name="title"
                  placeholder="Enter a description of the dish"
                  value={formData.title}
                  onChange={handleChange}
                />
                <span className={styles.charCounter}>{formData.title.length}/200</span>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>CATEGORY</label>
                <Dropdown
                  options={recipeData.categories.map(cat => ({ value: cat.id, label: cat.name }))}
                  value={formData.categoryId}
                  onChange={option => setFormData(prev => ({ ...prev, categoryId: option.value }))}
                  placeholder="Select a category"
                />
              </div>
              <div className={styles.formGroup}>
                <label>COOKING TIME</label>
                <div className={styles.timeSelector}>
                  <button type="button" onClick={() => handleTimeChange(-5)}><MinusIcon /></button>
                  <span>{formData.time} min</span>
                  <button type="button" onClick={() => handleTimeChange(5)}><PlusIcon /></button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.sectionTitle}>Ingredients</label>
            <div className={styles.row}>
              <Dropdown
                options={recipeData.ingredients.map(ing => ({ value: ing.id, label: ing.name }))}
                value={currentIngredient.id}
                onChange={option => setCurrentIngredient(p => ({ ...p, id: option.value }))}
                placeholder="Add the ingredient"
              />
              <UnderlineInput
                name="measure"
                placeholder="Enter quantity"
                value={currentIngredient.measure}
                onChange={e => setCurrentIngredient(p => ({ ...p, measure: e.target.value }))}
              />
            </div>
            <ButtonOutline type="button" onClick={addIngredient} icon={<PlusIcon />}>
              Add ingredient
            </ButtonOutline>
            <div className={styles.ingredientsList}>
              {formData.ingredients.map(ing => (
                <div key={ing.id} className={styles.ingredientItem}>
                  <div className={styles.ingredientInfo}>
                    <div className={styles.ingredientImage}>
                      <img src={ing.thumb} alt={ing.name} />
                    </div>
                    <div className={styles.ingredientDetails}>
                      <span>{ing.name}</span>
                      <small>{ing.measure}</small>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeIngredient(ing.id)}>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className={styles.sectionTitle}>RECIPE PREPARATION</label>
          <div className={styles.formSection}>
            <UnderlineInput
              type="textarea"
              name="instructions"
              label="Recipe Preparation"
              placeholder="Enter recipe"
              value={formData.instructions}
              onChange={handleChange}
              maxLength={2000}
            />
             <span className={styles.charCounter}>{formData.instructions.length}/2000</span>
          </div>

          <div className={styles.actionButtons}>
            <ButtonIcon
              icon={<img src="/icons/trash.svg" alt="Delete" />}
              variant="transparent"
              type="button"
            />
            <Button type="submit" variant="primary">
              Publish
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UnitedAddRecipeForm;


/*
================================================================================
========================= ORIGINAL COMPONENT SOURCES =========================
================================================================================
*/

/*
--- Original file: src/components/AddRecipeForm/AddRecipeForm.jsx ---

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../redux/user/userRecipes/operations';
import api from '../../api/api';
import styles from './AddRecipeForm.module.css';
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';
import { UnderlineInput } from '../UnderlineInput/UnderlineInput';
import { ButtonOutline } from '../ButtonOutline/ButtonOutline';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';

// Mock icons - replace with actual icon components
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22">
    <path
      d="M11 5v12M5 11h12"
      stroke="#050505"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const MinusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M5 12h14"
      stroke="#050505"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M4 12L12 4M4 4L12 12"
      stroke="#050505"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <path
      d="M6.666 15.833V8.333M10 15.833V8.333M13.333 15.833V8.333M2.5 5h15M15.833 5V3.333a1.667 1.667 0 00-1.666-1.666H5.833a1.667 1.667 0 00-1.666 1.666V5m2.5 0v12.5a1.667 1.667 0 001.667 1.667h5a1.667 1.667 0 001.667-1.667V5"
      stroke="#1A1A1A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    time: '40',
    ingredients: [],
    instructions: '',
    thumb: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState({
    id: '',
    measure: '',
  });
  const [recipeData, setRecipeData] = useState({
    categories: [],
    ingredients: [],
  });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await api.get('/recipes/creation-data');
        setRecipeData(response.data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };
    fetchRecipeData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumb: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTimeChange = amount => {
    setFormData(prev => {
      const newTime = Math.max(5, parseInt(prev.time || 0) + amount);
      return { ...prev, time: newTime.toString() };
    });
  };

  const addIngredient = () => {
    if (!currentIngredient.id || !currentIngredient.measure) return;
    const ingredientDetails = recipeData.ingredients.find(
      ing => ing.id.toString() === currentIngredient.id
    );
    if (!ingredientDetails) return;
    setFormData(prev => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: ingredientDetails.id, measure: currentIngredient.measure },
      ],
    }));
    setCurrentIngredient({ id: '', measure: '' });
  };

  const removeIngredient = idToRemove => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== idToRemove),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let imageUrl = '';
    // Step 1: Upload image if present
    if (formData.thumb) {
      const imageFormData = new FormData();
      imageFormData.append('image', formData.thumb);
      try {
        const imageResponse = await api.post(
          '/users/upload-image',
          imageFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error(
          'Failed to upload image:',
          error.response?.data || error.message
        );
        alert(
          `Error uploading image: ${
            error.response?.data?.message || 'An unexpected error occurred.'
          }`
        );
        return; // Stop if image upload fails
      }
    }

    // Step 2: Prepare and submit recipe data
    const recipePayload = {
      ...formData,
      thumb: imageUrl, // Use the URL from the uploaded image
      ingredients: formData.ingredients.map(ing => ({
        id: ing.id,
        measure: ing.measure,
      })),
    };

    try {
      await dispatch(createRecipe(recipePayload)).unwrap();
      alert('Recipe published successfully!');
      // Optionally, redirect or clear form here
    } catch (error) {
      console.error('Failed to publish recipe:', error);
      alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.imageUploader}>
            <input
              type="file"
              id="thumb"
              name="thumb"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="thumb" className={styles.imageLabel}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Recipe preview"
                  className={styles.imagePreview}
                />
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.icon}></span>
                  <span>Upload a photo</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label className={styles.recipeTitleLabel}>
                THE NAME OF THE RECIPE
              </label>

              <div className={styles.inputWrapper}>
                <UnderlineInput
                  name="title"
                  placeholder="Enter a description of the dish"
                  value={formData.title}
                  onChange={handleChange}
                />

                <span className={styles.charCounter}>
                  {formData.title.length}/200
                </span>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>CATEGORY</label>
                <Dropdown
                  options={recipeData.categories.map(cat => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  value={formData.categoryId}
                  onChange={option =>
                    setFormData(prev => ({ ...prev, categoryId: option.value }))
                  }
                  placeholder="Select a category"
                />
              </div>
              <div className={styles.formGroup}>
                <label>COOKING TIME</label>
                <div className={styles.timeSelector}>
                  <button type="button" onClick={() => handleTimeChange(-5)}>
                    <MinusIcon />
                  </button>
                  <span>{formData.time} min</span>
                  <button type="button" onClick={() => handleTimeChange(5)}>
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.sectionTitle}>Ingredients</label>
            <div className={styles.row}>
              <Dropdown
                options={recipeData.ingredients.map(ing => ({
                  value: ing.id,
                  label: ing.name,
                }))}
                value={currentIngredient.id}
                onChange={option =>
                  setCurrentIngredient(p => ({ ...p, id: option.value }))
                }
                placeholder="Add the ingredient"
              />
              <UnderlineInput
                name="measure"
                placeholder="Enter quantity"
                value={currentIngredient.measure}
                onChange={e =>
                  setCurrentIngredient(p => ({ ...p, measure: e.target.value }))
                }
              />
            </div>
            <ButtonOutline
              type="button"
              onClick={addIngredient}
              icon={<PlusIcon />}
            >
              Add ingredient
            </ButtonOutline>
            <div className={styles.ingredientsList}>
              {formData.ingredients.map(ing => (
                <div key={ing.id} className={styles.ingredientItem}>
                  <div className={styles.ingredientInfo}>
                    <div className={styles.ingredientImage}>
                      <img src={ing.thumb} alt={ing.name} />
                    </div>
                    <div className={styles.ingredientDetails}>
                      <span>{ing.name}</span>
                      <small>{ing.measure}</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(ing.id)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className={styles.sectionTitle}>RECIPE PREPARATION</label>
          <div className={styles.formSection}>
            <UnderlineInput
              type="textarea"
              name="instructions"
              label="Recipe Preparation"
              placeholder="Enter recipe"
              value={formData.instructions}
              onChange={handleChange}
              maxLength={2000}
              counter={formData.instructions.length}
              counterMax={2000}
            />
          </div>

          <div className={styles.actionButtons}>
            <ButtonIcon
              icon={<img src="/icons/trash.svg" alt="Delete" />}
              variant="transparent"
              type="button"
            />

            <Button type="submit" variant="primary">
              Publish
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;

*/

/*
--- Original file: src/components/Input/Input.jsx ---

import styles from './Input.module.css';
import clsx from 'clsx';

export const Input = ({ placeholder = '', className, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        {...props}
      />
      <span className={styles.underline}></span>
    </div>
  );
};

*/

/*
--- Original file: src/components/Dropdown/Dropdown.jsx ---

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

*/

/*
--- Original file: src/components/UnderlineInput/UnderlineInput.jsx ---

import styles from './UnderlineInput.module.css';
import clsx from 'clsx';

export const UnderlineInput = ({ placeholder = '', className, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className)}
        placeholder={placeholder}
        {...props}
      />
      <span className={styles.underline}></span>
    </div>
  );
};

*/

/*
--- Original file: src/components/ButtonOutline/ButtonOutline.jsx ---

import styles from './ButtonOutline.module.css';
import clsx from 'clsx';

export const ButtonOutline = ({
  children,
  icon = null,
  variant = 'outline',
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], icon && styles.withIcon)}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

*/

/*
--- Original file: src/components/ButtonIcon/ButtonIcon.jsx ---

import clsx from 'clsx';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
  icon,
  variant = 'dark',
  size = 'large',
  classNames = [],
  noBorder = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        noBorder && styles.noBorder,
        ...classNames
      )}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

export default ButtonIcon;

*/

/*
--- Original file: src/components/Button/Button.jsx ---

import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { TYPES, VARIANTS } from './const';

import styles from './Button.module.css';

const Button = ({
  onClick,
  children,
  href,
  to,
  variant,
  className,
  isLoading,
  type = TYPES.BUTTON,
  disabled = false,
  small = false,
  fullWidth = false,
}) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(
    styles.button,
    variant && styles[variant],
    small && styles.small,
    fullWidth && styles.fullWidth,
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {isLoading ? <FiLoader className={styles.iconLoading} /> : children}
    </button>
  );
};

Button.variants = Object.assign({}, VARIANTS);
Button.types = Object.assign({}, TYPES);

export default Button;

*/
