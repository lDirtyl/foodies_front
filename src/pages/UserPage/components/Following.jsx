import { useDispatch, useSelector } from 'react-redux';
import FollowerCard from '../../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../../components/ListItems/ListItems';
import { setCurrentPage as setFollowingCurrentPage } from '../../../redux/slices/userFollowersSlice';

const Following = () => {
  const dispatch = useDispatch();
  const { following, currentPage, totalPages, isLoading } = useSelector(
    state => state.userFollowers
  );

  const handlePageChange = page => {
    dispatch(setFollowingCurrentPage(page));
  };

  // Mock recipe data for followers
  const mockRecipes = [
    {
      id: '1',
      title: 'Chocolate Cake',
      image: '/images/recipes/chocolate-cake.jpg',
    },
    {
      id: '2',
      title: 'Pasta Carbonara',
      image: '/images/recipes/pasta-carbonara.jpg',
    },
    {
      id: '3',
      title: 'Green Soup',
      image: '/images/recipes/green-soup.jpg',
    },
    {
      id: '4',
      title: 'Vanilla Pudding',
      image: '/images/recipes/vanilla-pudding.jpg',
    },
  ];

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage="You're not following anyone yet. Find interesting chefs to follow!"
      showPagination={true}
      separator={true}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {following.map(user => (
        <FollowerCard
          key={user.id}
          user={user}
          showFollowButton={true}
          recipes={mockRecipes}
        />
      ))}
    </ListItems>
  );
};

export default Following; 