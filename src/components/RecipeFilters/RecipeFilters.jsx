import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Dropdown } from '../Dropdown/Dropdown';
import IngredientFilter from '../IngredientFilter/IngredientFilter';
import styles from './RecipeFilters.module.css';

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

const RecipeFilters = ({ ingredients, areas, onFilterChange, currentFilters, availableIngredients, availableAreas }) => {

  const ingredientOptions = [
    { value: '', label: 'All ingredients' },
    ...(ingredients || []).map(ing => ({
      value: ing.id,
      label: ing.name,
      thumb: ing.thumb,
    })),
  ];

  const areaOptions = [
    { value: '', label: 'All Areas' },
    ...(areas || []).map(area => {
      const countryCode = nationalityToCountryCode[area.name];
      return {
        value: area.id,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {countryCode && <ReactCountryFlag countryCode={countryCode} svg />}
            <span>{area.name}</span>
          </div>
        ),
        searchLabel: area.name, // for searching
      };
    }),
  ];

  const handleIngredientChange = selectedOption => {
    onFilterChange({ ingredient: selectedOption.value });
  };

  const handleAreaChange = selectedOption => {
    onFilterChange({ area: selectedOption.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ ingredient: '', area: '' });
  };

  return (
    <div className={styles.wrapper}>
      <IngredientFilter
        options={ingredientOptions}
        value={currentFilters.ingredient}
        onChange={handleIngredientChange}
        availableOptions={availableIngredients}
      />

      <Dropdown
        options={areaOptions}
        placeholder="All Areas"
        value={currentFilters.area}
        onChange={handleAreaChange}
        availableOptions={availableAreas}
      />

      {(currentFilters.ingredient || currentFilters.area) && (
        <button onClick={handleClearFilters} className={styles.clearButton}>
          Reset
        </button>
      )}
    </div>
  );
};

export default RecipeFilters;
