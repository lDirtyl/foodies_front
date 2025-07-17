import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchRecipes, setFilters, setCurrentPage } from '../../redux/recipes';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';

import styles from './Reciepes.module.css';

const Reciepes = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const { recipes, isLoading, error, currentPage, totalPages, filters } =
    useSelector(state => state.recipes);

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const categoryFilter = category || searchParams.get('category') || '';
    const area = searchParams.get('area') || '';

    dispatch(setCurrentPage(page));
    dispatch(setFilters({ category: categoryFilter, area }));

    dispatch(
      fetchRecipes({
        page,
        limit: 10,
        category: categoryFilter,
        area,
      })
    );
  }, [dispatch, category, searchParams]);

  useEffect(() => {
    dispatch(
      fetchRecipes({
        page: currentPage,
        limit: 10,
        category: filters.category,
        area: filters.area,
      })
    );
  }, [dispatch, currentPage, filters.category, filters.area]);

  const getCategoryTitle = () => {
    if (filters.category) {
      return filters.category.toUpperCase();
    }
    return 'ALL RECIPES';
  };

  const getCategorySubtitle = () => {
    if (filters.category === 'desserts') {
      return 'Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.';
    }
    if (filters.category === 'seafood') {
      return 'Dive into the ocean of flavors with our exquisite seafood collection, where every dish tells a story of freshness and culinary mastery.';
    }
    return 'Discover amazing recipes from around the world, crafted with love and attention to detail.';
  };

  return (
    <div className={styles.wrapper} id="paginationAnchor">
      <div className={styles.topSection}>
        <button
          className={styles.backButton}
          onClick={() => console.log('Back button clicked')}
        >
          <img src="/icons/arrow-left.svg" alt="back icon" />
          BACK
        </button>
        <MainTitle title={getCategoryTitle()} />
        <Subtitle subTitle={getCategorySubtitle()} />
      </div>

      <div className={styles.filtersSection}>
        <RecipeFilters />
        <div>
          <RecipeList recipes={recipes} isLoading={isLoading} error={error} />
          <RecipePagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Reciepes;
