import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, setFilters, setCurrentPage } from '../../redux/recipes';
import { ingredientsService, areasService } from '../../services/api';
import MainTitle from '../MainTitle/MainTitle';
import SubTitle from '../SubTitle/SubTitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';

import useWindowWidth from '../../hooks/useWindowWidth';
import styles from './Reciepes.module.css';

const Reciepes = ({ category, onBack }) => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const {
    recipes,
    isLoading,
    error,
    currentPage,
    totalPages,
    filters,
    availableIngredients,
    availableAreas,
  } = useSelector(state => state.recipes);

  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const limit = windowWidth < 768 ? 8 : 12;
  const isClientPaginated = !!(filters.area || filters.ingredient);

  // Effect to fetch dropdown data when the component mounts
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [ingredientsData, areasData] = await Promise.all([ingredientsService.getAll(), areasService.getAll()]);
        setIngredients(Array.isArray(ingredientsData) ? ingredientsData : []);
        setAreas(Array.isArray(areasData) ? areasData : []);
      } catch (e) {
        console.error('Failed to load filter data:', e);
      }
    };
    fetchFilterData();
  }, []); // Runs only once

  // Unified effect for data fetching that handles all cases
  useEffect(() => {
    const categoryId = category.id === 'all' ? '' : category.id;

    if (isClientPaginated) {
      // If filters (area/ingredient) are active, fetch all recipes for that category.
      dispatch(fetchRecipes({ category: categoryId, area: filters.area, ingredient: filters.ingredient, page: 1, limit: 1000 }));
    } else {
      // If no filters are active, perform server-side pagination for the current category.
      dispatch(fetchRecipes({ category: categoryId, page: currentPage, limit }));
    }
  }, [dispatch, category.id, filters.area, filters.ingredient, currentPage, limit]);

  // When filters change, we must reset the page to 1.
  // This is now handled in handleFilterChange.
  const handleFilterChange = filter => {
    const currentCategory = category.id === 'all' ? '' : category.id;
    dispatch(setCurrentPage(1));
    dispatch(setFilters({ category: currentCategory, ...filter }));
  };

  // Memoize calculations for client-side pagination
  const clientPagedData = useMemo(() => {
    if (!isClientPaginated) {
      return { pagedRecipes: recipes, totalPages };
    }
    const total = recipes.length;
    const totalPgs = Math.ceil(total / limit);
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const paged = recipes.slice(start, end);
    return { pagedRecipes: paged, totalPages: totalPgs };
  }, [recipes, currentPage, limit, isClientPaginated, totalPages]);



  const handlePageChange = page => {
    dispatch(setCurrentPage(page));
    const anchor = document.getElementById('paginationAnchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryTitle = () => (category ? category.name.toUpperCase() : 'ALL RECIPES');

  const getCategorySubtitle = () =>
    `Discover amazing ${category ? category.name.toLowerCase() : ''} recipes from around the world, crafted with love and attention to detail.`;

  return (
    <div className={styles.wrapper} id="paginationAnchor">
      <div className={styles.topSection}>
        <button className={styles.backButton} onClick={onBack}>
          <img src="/icons/arrow-left.svg" alt="back icon" />
          BACK
        </button>
        <MainTitle title={getCategoryTitle()} />
        <SubTitle subTitle={getCategorySubtitle()} />
      </div>

      <div className={styles.filtersSection}>
        <RecipeFilters ingredients={ingredients} areas={areas} onFilterChange={handleFilterChange} currentFilters={filters} availableIngredients={availableIngredients} availableAreas={availableAreas} />
        <div className={styles.listWrapper}>
          <RecipeList recipes={clientPagedData.pagedRecipes} isLoading={isLoading} error={error} />
          {clientPagedData.totalPages > 1 && (
            <RecipePagination
              currentPage={currentPage}
              totalPages={clientPagedData.totalPages}
              onPageChange={handlePageChange}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Reciepes;
