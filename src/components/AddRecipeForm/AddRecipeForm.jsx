import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe } from '../../redux/user/userRecipes/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';
import { MODALS } from '../../const';
import api from '../../api/api';
import styles from './AddRecipeForm.module.css';
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';
import { UnderlineInput } from '../UnderlineInput/UnderlineInput';
import { ButtonOutline } from '../ButtonOutline/ButtonOutline';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';
import ReactCountryFlag from 'react-country-flag';


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

const nationalityToCountryCode = {
  American: 'US',
  British: 'GB',
  Canadian: 'CA',
  Chinese: 'CN',
  Croatian: 'HR',
  Dutch: 'NL',
  Egyptian: 'EG',
  French: 'FR',
  Greek: 'GR',
  Indian: 'IN',
  Irish: 'IE',
  Italian: 'IT',
  Jamaican: 'JM',
  Japanese: 'JP',
  Kenyan: 'KE',
  Malaysian: 'MY',
  Mexican: 'MX',
  Moroccan: 'MA',
  Polish: 'PL',
  Portuguese: 'PT',
  Spanish: 'ES',
  Thai: 'TH',
  Tunisian: 'TN',
  Turkish: 'TR',
  Ukrainian: 'UA',
  Vietnamese: 'VN',
};

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    areaId: '',
    categoryId: '',
    time: '40',
    ingredients: [],
    instructions: '',
    thumb: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [recipeData, setRecipeData] = useState({ categories: [], ingredients: [], areas: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // --- Ingredient Management State ---
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const searchWrapperRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/recipes/creation-data');
        // Assuming the response.data is { categories: [...], ingredients: [...] }
        setRecipeData(response.data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeData();
  }, []);

  // --- Ingredient Logic from United_ui_ux ---
  useEffect(() => {
    if (searchTerm) {
      const filtered = recipeData.ingredients.filter(ing =>
        ing.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setIsSuggestionsVisible(true);
    } else {
      if (isFocused) {
        setSuggestions(recipeData.ingredients);
        setIsSuggestionsVisible(true);
      } else {
        setSuggestions([]);
        setIsSuggestionsVisible(false);
      }
    }
  }, [searchTerm, isFocused, recipeData.ingredients]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (container.scrollWidth <= container.clientWidth) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isSuggestionsVisible]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setIsSuggestionsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchWrapperRef]);

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSearchTerm(ingredient.name);
    setIsSuggestionsVisible(false);
  };

  const addIngredient = () => {
    if (selectedIngredient && !quantity) {
      setQuantityError(true);
      return;
    }

    if (selectedIngredient && quantity) {
      const newIngredient = { ...selectedIngredient, measure: quantity };
      if (!formData.ingredients.some(ing => ing.id === newIngredient.id)) {
        setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, newIngredient] }));
      }
      setSelectedIngredient(null);
      setSearchTerm('');
      setQuantity('');
      setIsSuggestionsVisible(false);
      setQuantityError(false); // Reset error on success
    }
  };

  const removeIngredient = id => {
    setFormData(prev => ({ ...prev, ingredients: prev.ingredients.filter(ing => ing.id !== id) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Enter a title for the recipe.';
    if (!formData.areaId) newErrors.areaId = 'Please select an area.';
    if (!formData.categoryId) newErrors.categoryId = 'Please select a category.';
    if (!formData.time) newErrors.time = 'Specify the cooking time.';
    if (formData.ingredients.length === 0) newErrors.ingredients = 'Add at least one ingredient.';
    if (!formData.instructions.trim()) newErrors.instructions = 'Enter the recipe instructions.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isLoggedIn) {
      dispatch(showModal({ modal: MODALS.AUTH }));
      return;
    }
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

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
                  className={errors.title ? styles.invalid : ''}
                />
                {errors.title && <p className={styles.errorText}>{errors.title}</p>}

                <span className={styles.charCounter}>
                  {formData.title.length}/200
                </span>
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.areaField}`}>
                <label>AREA</label>
                <Dropdown
                  options={(recipeData.areas || []).map(area => {
                    const countryCode = nationalityToCountryCode[area.name];
                    return {
                      value: area.id,
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {countryCode && <ReactCountryFlag countryCode={countryCode} svg />}
                          <span>{area.name}</span>
                        </div>
                      ),
                    };
                  })}
                  value={formData.areaId}
                  onChange={option => setFormData(prev => ({ ...prev, areaId: option.value }))}
                  placeholder="Select an area"
                  classNameWrapper={errors.areaId ? styles.invalid : ''}
                />
                {errors.areaId && <p className={styles.errorText}>{errors.areaId}</p>}
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
                  classNameWrapper={errors.categoryId ? styles.invalid : ''}
                />
                {errors.categoryId && <p className={styles.errorText}>{errors.categoryId}</p>}
              </div>
              <div className={styles.formGroup}>
                <label>COOKING TIME</label>
                <div className={`${styles.timeSelector} ${errors.time ? styles.invalid : ''}`}>
                  <button type="button" onClick={() => handleTimeChange(-5)}>
                    <MinusIcon />
                  </button>
                  <span>{formData.time} min</span>
                  <button type="button" onClick={() => handleTimeChange(5)}>
                    <PlusIcon />
                  </button>
                </div>
                {errors.time && <p className={styles.errorText}>{errors.time}</p>}
              </div>
            </div>
          </div>

          <div className={styles.formSection} ref={searchWrapperRef}>
            <label className={styles.sectionTitle}>Ingredients</label>
            {isSuggestionsVisible && suggestions.length > 0 && (
              <div className={styles.suggestionsImageContainer} ref={imageContainerRef}>
                {suggestions.map(ing => (
                  <img
                    key={`${ing.id}-image`}
                    src={ing.thumb}
                    alt={ing.name}
                    className={styles.suggestionImage}
                    onClick={() => handleSelectIngredient(ing)}
                    title={ing.name}
                  />
                ))}
              </div>
            )}
            <div className={styles.row}>
              <div className={styles.ingredientSearchWrapper}>
                {(isSuggestionsVisible || selectedIngredient) && (
                  <div className={styles.suggestionsImageContainer} ref={imageContainerRef}>
                    {(isSuggestionsVisible ? suggestions : [selectedIngredient]).map(ing => (
                      ing && <img
                        key={`${ing.id}-image`}
                        src={ing.thumb}
                        alt={ing.name}
                        className={styles.suggestionImage}
                        onClick={() => handleSelectIngredient(ing)}
                        title={ing.name}
                      />
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  placeholder={isLoading ? "Loading..." : "Add the ingredient"}
                  value={searchTerm}
                  disabled={isLoading}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsFocused(false);
                    }, 150); // Delay to allow click event to register
                  }}
                  className={`${styles.inputField} ${errors.ingredients ? styles.invalid : ''}`}
                />
                {isSuggestionsVisible && suggestions.length > 0 && (
                  <ul className={styles.suggestionsList}>
                    {suggestions.map(ing => (
                      <li key={ing.id} onClick={() => handleSelectIngredient(ing)}>
                        <img src={ing.thumb} alt={ing.name} />
                        <span>{ing.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.quantityInputWrapper}>
                <input
                  type="text"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    if (quantityError) {
                      setQuantityError(false);
                    }
                  }}
                  onFocus={() => setIsSuggestionsVisible(false)}
                  className={`${styles.measureInput} ${quantityError ? styles.invalid : ''}`}
                />
                {quantityError && <p className={styles.errorText}>Add Quantity</p>}
              </div>
            </div>
            <ButtonOutline type="button" onClick={addIngredient} icon={<PlusIcon />}>
              Add Ingredient
            </ButtonOutline>
            {errors.ingredients && <p className={styles.errorText}>{errors.ingredients}</p>}
            <div className={styles.ingredientsList}>
              {formData.ingredients.map(ing => (
                <div key={ing.id} className={styles.ingredientItem}>
                  <div className={styles.ingredientImage}>
                    <img src={ing.thumb} alt={ing.name} />
                  </div>
                  <div className={styles.ingredientDetails}>
                    <span>{ing.name}</span>
                    <small>{ing.measure}</small>
                  </div>
                  <button
                    type="button"
                    className={styles.removeIngredientBtn}
                    onClick={() => removeIngredient(ing.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 4L12 12" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
              className={errors.instructions ? styles.invalid : ''}
            />
            {errors.instructions && <p className={styles.errorText}>{errors.instructions}</p>}
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
