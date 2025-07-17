import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../../components/user/RecipeCard/RecipeCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectUserRecipes, selectCurrentPage, selectTotalPages, selectIsLoading, changeUserRecipesPage } from '../../../redux/user/userRecipes';
import { fetchUserRecipes } from '../../../redux/user/userRecipes/operations';
import { useEffect } from 'react';

const MyRecipes = () => {
  const dispatch = useDispatch();
  const userRecipes = useSelector(selectUserRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeUserRecipesPage(page));
  };

  useEffect(() => {
    dispatch(fetchUserRecipes({ page: currentPage }));
  }, [currentPage, dispatch]);

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage="Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future."
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {userRecipes.map(recipe => (
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

export default MyRecipes; 