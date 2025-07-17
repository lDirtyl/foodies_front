import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilters,
  clearFilters,
  fetchCategories,
  fetchAreas,
} from '../../redux/slices/recipesSlice';
import { Dropdown } from '../Dropdown/Dropdown';

const RecipeFilters = () => {
  const dispatch = useDispatch();
  const { filters, categories, areas } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
  }, [dispatch]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name,
      id: category.id,
      thumb: category.thumb,
    })),
  ];

  const areaOptions = [
    { value: '', label: 'All Areas' },
    ...areas.map(area => ({
      value: area.id,
      label: area.name,
      id: area.id,
    })),
  ];

  const handleCategoryChange = selectedOption => {
    dispatch(setFilters({ category: selectedOption.value }));
  };

  const handleAreaChange = selectedOption => {
    dispatch(setFilters({ area: selectedOption.value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="recipe-filters">
      <Dropdown
        options={categoryOptions}
        placeholder="All Categories"
        value={filters.category}
        onChange={handleCategoryChange}
      />

      <Dropdown
        options={areaOptions}
        placeholder="All Areas"
        value={filters.area}
        onChange={handleAreaChange}
      />

      {(filters.category || filters.area) && (
        <button onClick={handleClearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default RecipeFilters;
