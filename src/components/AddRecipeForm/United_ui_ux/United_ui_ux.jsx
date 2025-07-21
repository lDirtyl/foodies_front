import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../../redux/user/userRecipes/operations';
import api from '../../../api/api';
import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import styles from './United_ui_ux.module.css';



// --- Компоненты --- 

// Компонент для загрузки изображения
const RecipeImageUploader = ({ image, onImageChange }) => (
  <div className={styles.imageUploader}>
    <label htmlFor="file-upload" className={styles.imageLabel}>
      {image ? (
        <img src={image} alt="Recipe preview" className={styles.imagePreview} />
      ) : (
        <div className={styles.uploadPlaceholder}>
          <span className={styles.uploadIcon}>📷</span>
          <span>Upload a photo</span>
        </div>
      )}
    </label>
    <input id="file-upload" type="file" accept="image/*" onChange={onImageChange} style={{ display: 'none' }} />
    {image && (
        <button type="button" onClick={() => onImageChange({ target: { files: [] }})} className={styles.removeImageButton}>
            Upload another photo
        </button>
    )}
  </div>
);

// Компонент поля ввода с валидацией и счетчиком
const ValidatedInput = ({ value, onChange, placeholder, maxLength, id, isValid }) => (
  <div className={styles.inputWrapper}>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`${styles.inputField} ${value ? (isValid ? styles.valid : styles.invalid) : ''}`}
    />
    <span className={styles.charCounter}>{value.length}/{maxLength}</span>
    {!isValid && value.length > 0 && <p className={styles.errorMessage}>This field is required</p>}
  </div>
);

// Компонент выпадающего списка
const CustomSelect = ({ options, value, onChange, placeholder, id, isValid }) => (
    <div className={styles.selectWrapper}>
        <select 
            id={id} 
            value={value} 
            onChange={onChange} 
            className={`${styles.selectField} ${value ? (isValid ? styles.valid : styles.invalid) : ''}`}>
            <option value="" disabled>{placeholder}</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        {!isValid && value && <p className={styles.errorMessage}>Please select a category</p>}
    </div>
);

// Компонент для выбора времени приготовления
const CookingTimeSelector = ({ time, setTime }) => {
    const increment = () => setTime(prev => prev + 5);
    const decrement = () => setTime(prev => Math.max(5, prev - 5));

    return (
        <div className={styles.cookingTimeSelector}>
            <button type="button" onClick={decrement} className={styles.timeButton}>-</button>
            <span className={styles.timeValue}>{time} min</span>
            <button type="button" onClick={increment} className={styles.timeButton}>+</button>
        </div>
    );
};

// Компонент для добавления ингредиентов
const IngredientsManager = ({ ingredients, setIngredients, allIngredients = [], isLoading }) => {
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const searchWrapperRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        if (searchTerm) {
            const filtered = allIngredients.filter(ing => 
                ing.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
            setIsSuggestionsVisible(true);
        } else {
            if (isFocused) {
                setSuggestions(allIngredients);
                setIsSuggestionsVisible(true);
            } else {
                setSuggestions([]);
                setIsSuggestionsVisible(false);
            }
        }
    }, [searchTerm, isFocused, allIngredients]);

    useEffect(() => {
        const container = imageContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            // If there's no horizontal overflow, do nothing
            if (container.scrollWidth <= container.clientWidth) return;

            // Prevent the default vertical scroll
            e.preventDefault();
            // Adjust the horizontal scroll position
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isSuggestionsVisible]); // Re-attach if visibility changes

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setIsSuggestionsVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchWrapperRef]);

    const handleAddIngredient = () => {
        if (currentIngredient && quantity) {
            const newIngredient = { ...currentIngredient, quantity };
            if (!ingredients.some(ing => ing.id === newIngredient.id)) {
                 setIngredients([...ingredients, newIngredient]);
            }
            setCurrentIngredient(null);
            setSearchTerm('');
            setQuantity('');
            setIsSuggestionsVisible(false);
        }
    };

    const handleRemoveIngredient = (id) => {
        setIngredients(ingredients.filter(ing => ing.id !== id));
    };

    const handleSelectIngredient = (ingredient) => {
        setCurrentIngredient(ingredient);
        setSearchTerm(ingredient.name);
        setIsSuggestionsVisible(false);
    };

    return (
        <div className={styles.ingredientsSection}>
            <div className={styles.ingredientsControls} ref={searchWrapperRef}>
                <div className={styles.ingredientSearchWrapper}>
                    {isSuggestionsVisible && suggestions.length > 0 && (
                        <div className={styles.suggestionsImageContainer} ref={imageContainerRef}>
                            {suggestions.map(ing => (
                                <img
                                    key={`${ing.id}-image`}
                                    src={ing.thumb}
                                    alt={ing.name}
                                    className={styles.suggestionImage}
                                    onClick={() => handleSelectIngredient(ing)}
                                    title={ing.name} // Add tooltip for accessibility
                                />
                            ))}
                        </div>
                    )}
                    <input 
                        type="text"
                        placeholder={isLoading ? "Loading ingredients..." : "Add the ingredient"}
                        value={searchTerm}
                        disabled={isLoading}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            // Delay hiding suggestions to allow click on a suggestion
                            setTimeout(() => {
                                setIsFocused(false);
                            }, 200);
                        }}
                        className={styles.inputField}
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
                <input 
                    type="text"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`${styles.inputField} ${styles.quantityInput}`}
                />
                <button type="button" onClick={handleAddIngredient} className={styles.addButton}>Add Ingredient +</button>
            </div>

            {ingredients.length > 0 && (
                <ul className={styles.ingredientChipList}>
                    {ingredients.map(ing => (
                        <li key={ing.id} className={styles.ingredientChip}>
                            <img src={ing.thumb} alt={ing.name} className={styles.chipImage}/>
                            <span className={styles.chipName}>{ing.name}</span>
                            <span className={styles.chipQuantity}>{ing.quantity}</span>
                            <button type="button" onClick={() => handleRemoveIngredient(ing.id)} className={styles.chipRemoveButton}>×</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Основной компонент формы
const AddRecipeForm = () => {
        const [recipeData, setRecipeData] = useState({ categories: [], ingredients: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                // Предполагается, что у вас есть такой эндпоинт
                const response = await api.get('/recipes/creation-data'); 
                setRecipeData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching recipe data:', error);
                setIsLoading(false);
                // Здесь можно установить какие-то моковые данные или показать ошибку
            }
        };
        fetchRecipeData();
    }, []);
    const [recipeImage, setRecipeImage] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [category, setCategory] = useState('');
    const [cookingTime, setCookingTime] = useState(30);
    const [ingredients, setIngredients] = useState([]);
    const [recipePreparation, setRecipePreparation] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setRecipeImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setRecipeImage(null);
        }
    };

    const isFormValid = 
        recipeImage && 
        recipeName.length > 2 && 
        recipeDescription.length > 10 && 
        category && 
        ingredients.length > 0 && 
        recipePreparation.length > 20;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const recipeData = {
                image: recipeImage,
                name: recipeName,
                description: recipeDescription,
                category,
                time: cookingTime,
                ingredients,
                instructions: recipePreparation,
            };
            console.log('Recipe Submitted:', recipeData);
            // Здесь будет логика отправки данных на сервер
            alert('Recipe submitted successfully!');
        } else {
            alert('Please fill all fields correctly.');
        }
    };
    
    const handleReset = () => {
        setRecipeImage(null);
        setRecipeName('');
        setRecipeDescription('');
        setCategory('');
        setCookingTime(30);
        setIngredients([]);
        setRecipePreparation('');
    }

    return (
        <div className={styles.addRecipePage}>
            <h1 className={styles.title}>Add Recipe</h1>
            <p className={styles.subtitle}>Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.mainContent}>
                    <RecipeImageUploader image={recipeImage} onImageChange={handleImageChange} />
                    <div className={styles.fieldsColumn}>
                        <ValidatedInput 
                            id="recipe-name"
                            placeholder="The name of the recipe"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            maxLength={100}
                            isValid={recipeName.length > 2}
                        />
                        <ValidatedInput 
                            id="recipe-description"
                            placeholder="Enter a description of the dish"
                            value={recipeDescription}
                            onChange={(e) => setRecipeDescription(e.target.value)}
                            maxLength={200}
                            isValid={recipeDescription.length > 10}
                        />
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label htmlFor="category" className={styles.label}>Category</label>
                                <CustomSelect 
                                    id="category"
                                    options={recipeData.categories.map(c => c.name)}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Select a category"
                                    isValid={!!category}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Cooking Time</label>
                                <CookingTimeSelector time={cookingTime} setTime={setCookingTime} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Ingredients</label>
                    <IngredientsManager ingredients={ingredients} setIngredients={setIngredients} allIngredients={recipeData.ingredients} isLoading={isLoading} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="preparation" className={styles.label}>Recipe Preparation</label>
                     <div className={styles.textareaWrapper}>
                        <textarea
                            id="preparation"
                            value={recipePreparation}
                            onChange={(e) => setRecipePreparation(e.target.value)}
                            placeholder="Enter recipe"
                            maxLength={500}
                            className={`${styles.textareaField} ${recipePreparation ? (recipePreparation.length > 20 ? styles.valid : styles.invalid) : ''}`}
                        />
                        <span className={styles.charCounter}>{recipePreparation.length}/500</span>
                        {recipePreparation && recipePreparation.length <= 20 && <p className={styles.errorMessage}>Description must be longer than 20 characters.</p>}
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button type="button" className={styles.resetButton} onClick={handleReset}>🗑️</button>
                    <button type="submit" className={styles.publishButton} disabled={!isFormValid}>Publish</button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipeForm;
