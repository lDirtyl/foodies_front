import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../../components/user/RecipeCard/RecipeCard';
import ListItems from '../../../components/ListItems/ListItems';
import { setCurrentPage as setRecipesCurrentPage } from '../../../redux/slices/userRecipesSlice';

const MyRecipes = () => {
  const dispatch = useDispatch();
  const { userRecipes, currentPage, totalPages, isLoading } = useSelector(
    state => state.userRecipes
  );

  const handlePageChange = page => {
    dispatch(setRecipesCurrentPage(page));
  };

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage="You haven't added any recipes yet. Create your first recipe!"
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