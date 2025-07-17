import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../../components/user/RecipeCard/RecipeCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectFavoriteRecipes, selectCurrentPage, selectTotalPages, selectIsLoading, changeFavoriteRecipesPage } from '../../../redux/user/userFavoriteRecipes';
import { fetchFavoriteRecipes } from '../../../redux/user/userFavoriteRecipes/operations';
import { useEffect } from 'react';

const MyFavorites = () => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeFavoriteRecipesPage(page));
  };

  useEffect(() => {
    dispatch(fetchFavoriteRecipes({ page: currentPage }));
  }, [currentPage, dispatch]);

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage="Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future."
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {favoriteRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isOwner={true}
          showActions={true}
        />
      ))}
    </ListItems>
  );
};

export default MyFavorites; 