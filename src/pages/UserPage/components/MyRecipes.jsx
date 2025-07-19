import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../../components/user/RecipeCard/RecipeCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectActiveUser, selectIsOwnProfile } from '../../../redux/user/userProfile';
import { selectUserRecipes, selectCurrentPage, selectTotalPages, selectIsLoading, changeUserRecipesPage } from '../../../redux/user/userRecipes';
import { fetchUserRecipes } from '../../../redux/user/userRecipes/operations';
import { useEffect } from 'react';

const MyRecipes = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectActiveUser);
  const isOwnProfile = useSelector(selectIsOwnProfile);
  const userRecipes = useSelector(selectUserRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeUserRecipesPage(page));
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRecipes({ page: currentPage, userId: user.id }));
    }
  }, [currentPage, user?.id, dispatch]);

  const getEmptyMessage = () => {
    if (isOwnProfile) {
      return "Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.";
    } else {
      return `${user?.name || 'This user'} hasn't added any recipes yet.`;
    }
  };

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage={getEmptyMessage()}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {userRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isOwner={isOwnProfile}
          showActions={isOwnProfile}
        />
      ))}
    </ListItems>
  );
};

export default MyRecipes; 