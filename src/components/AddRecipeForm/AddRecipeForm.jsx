import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../redux/user/userRecipes/operations';
import api from '../../api/api';
import styles from './AddRecipeForm.module.css';

// Mock icons - replace with actual icon components
const PlusIcon = () => <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 5v12M5 11h12" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MinusIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CloseIcon = () => <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 12L12 4M4 4L12 12" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const TrashIcon = () => <svg width="20" height="20" viewBox="0 0 20 20"><path d="M6.666 15.833V8.333M10 15.833V8.333M13.333 15.833V8.333M2.5 5h15M15.833 5V3.333a1.667 1.667 0 00-1.666-1.666H5.833a1.667 1.667 0 00-1.666 1.666V5m2.5 0v12.5a1.667 1.667 0 001.667 1.667h5a1.667 1.667 0 001.667-1.667V5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

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
  const [currentIngredient, setCurrentIngredient] = useState({ id: '', measure: '' });
  const [recipeData, setRecipeData] = useState({ categories: [], ingredients: [] });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumb: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTimeChange = (amount) => {
    setFormData(prev => {
      const newTime = Math.max(5, parseInt(prev.time || 0) + amount);
      return { ...prev, time: newTime.toString() };
    });
  };

  const addIngredient = () => {
    if (!currentIngredient.id || !currentIngredient.measure) return;
    const ingredientDetails = recipeData.ingredients.find(ing => ing.id.toString() === currentIngredient.id);
    if (!ingredientDetails) return;
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: ingredientDetails.id, measure: currentIngredient.measure }]
    }));
    setCurrentIngredient({ id: '', measure: '' });
  };

  const removeIngredient = (idToRemove) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== idToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    // Step 1: Upload image if present
    if (formData.thumb) {
      const imageFormData = new FormData();
      imageFormData.append('image', formData.thumb);
      try {
        const imageResponse = await api.post('/users/upload-image', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error('Failed to upload image:', error.response?.data || error.message);
        alert(`Error uploading image: ${error.response?.data?.message || 'An unexpected error occurred.'}`);
        return; // Stop if image upload fails
      }
    }

    // Step 2: Prepare and submit recipe data
    const recipePayload = {
      ...formData,
      thumb: imageUrl, // Use the URL from the uploaded image
      ingredients: formData.ingredients.map(ing => ({ id: ing.id, measure: ing.measure }))
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
            <input type="file" id="thumb" name="thumb" onChange={handleFileChange} style={{ display: 'none' }} />
            <label htmlFor="thumb" className={styles.imageLabel}>
              {imagePreview ? <img src={imagePreview} alt="Recipe preview" className={styles.imagePreview} /> : <div className={styles.placeholder}></div>}
            </label>
          </div>
          <label htmlFor="thumb" className={styles.uploadLink}>Upload another photo</label>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.formSection}>
            <input
              type="text"
              name="title"
              placeholder="Enter item title"
              value={formData.title}
              onChange={handleChange}
              className={styles.inputField}
            />
            <div className={styles.textareaContainer}>
              <textarea
                name="description"
                placeholder="Enter about recipe"
                value={formData.description}
                onChange={handleChange}
                className={`${styles.textareaField} ${styles.description}`}
                maxLength="200"
              />
              <span className={styles.charCounter}>{formData.description.length}/200</span>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>CATEGORY</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} className={styles.selectField}>
                  <option value="" disabled>Select a category</option>
                  {recipeData.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
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
                <select name="id" value={currentIngredient.id} onChange={(e) => setCurrentIngredient(p => ({...p, id: e.target.value}))} className={`${styles.selectField} ${styles.ingredientSelect}`}>
                  <option value="" disabled>Select an ingredient</option>
                  {recipeData.ingredients.map(ing => <option key={ing.id} value={ing.id}>{ing.name}</option>)}
                </select>
                <input type="text" name="measure" placeholder="400 g" value={currentIngredient.measure} onChange={(e) => setCurrentIngredient(p => ({...p, measure: e.target.value}))} className={styles.measureInput} />
            </div>
            <button type="button" onClick={addIngredient} className={styles.addIngredientBtn}><PlusIcon/> Add ingredient</button>
            <div className={styles.ingredientsList}>
              {formData.ingredients.map(ing => (
                <div key={ing.id} className={styles.ingredientItem}>
                  <div className={styles.ingredientInfo}>
                    <div className={styles.ingredientImage}><img src={ing.thumb} alt={ing.name} /></div>
                    <div className={styles.ingredientDetails}>
                      <span>{ing.name}</span>
                      <small>{ing.measure}</small>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeIngredient(ing.id)}><CloseIcon /></button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.sectionTitle}>Recipe Preparation</label>
            <div className={styles.textareaContainer}>
              <textarea
                name="instructions"
                placeholder="Enter recipe"
                value={formData.instructions}
                onChange={handleChange}
                className={`${styles.textareaField} ${styles.instructions}`}
                maxLength="2000"
              />
              <span className={styles.charCounter}>{formData.instructions.length}/2000</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button type="button" className={styles.deleteButton}><TrashIcon /></button>
            <button type="submit" className={styles.publishButton}>Publish</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
