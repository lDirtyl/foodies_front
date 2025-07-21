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
  Unknown: 'RU',
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

  const sortedAreas = (areas || []).slice().sort((a, b) => {
    // Rule 1: Ukraine always first
    if (a.name === 'Ukrainian' && b.name !== 'Ukrainian') return -1;
    if (b.name === 'Ukrainian' && a.name !== 'Ukrainian') return 1;

    // Rule 2: Unknown always last
    if (a.name === 'Unknown' && b.name !== 'Unknown') return 1;
    if (b.name === 'Unknown' && a.name !== 'Unknown') return -1;

    // Rule 3: Available before unavailable
    const isAAvailable = availableAreas && availableAreas.includes(a.id);
    const isBAvailable = availableAreas && availableAreas.includes(b.id);
    if (isAAvailable && !isBAvailable) return -1;
    if (!isAAvailable && isBAvailable) return 1;

    // Rule 4: Alphabetical fallback
    return a.name.localeCompare(b.name);
  });

  const areaOptions = [
    { value: '', label: 'All Areas' },
    ...sortedAreas.map(area => {
      const countryCode = nationalityToCountryCode[area.name];
      return {
        value: area.id,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {countryCode && <ReactCountryFlag countryCode={countryCode} svg />}
            <span>{area.name}</span>
            {area.name === 'Unknown' && <span style={{ marginRight: 'auto' }}>💩</span>}
          </div>
        ),
        searchLabel: area.name,
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
