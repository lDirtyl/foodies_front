import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../../components/user/RecipeCard/RecipeCard';
import ListItems from '../../../components/ListItems/ListItems';
import { setCurrentPage as setFavoritesCurrentPage } from '../../../redux/slices/userRecipesSlice';

const MyFavorites = () => {
  const dispatch = useDispatch();
  const { favorites, currentPage, totalPages, isLoading } = useSelector(
    state => state.userRecipes
  );

  const handlePageChange = page => {
    dispatch(setFavoritesCurrentPage(page));
  };

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage="You haven't favorited any recipes yet. Browse recipes and add some favorites!"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {favorites.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isOwner={false}
          showActions={true}
        />
      ))}
    </ListItems>
  );
};

export default MyFavorites; 