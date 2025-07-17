import { useDispatch, useSelector } from 'react-redux';
import FollowerCard from '../../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../../components/ListItems/ListItems';
import { setCurrentPage as setFollowersCurrentPage } from '../../../redux/slices/userFollowersSlice';

const Followers = () => {
  const dispatch = useDispatch();
  const { followers, currentPage, totalPages, isLoading } = useSelector(
    state => state.userFollowers
  );

  const handlePageChange = page => {
    dispatch(setFollowersCurrentPage(page));
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
      emptyMessage="You don't have any followers yet. Share your amazing recipes to attract followers!"
      showPagination={true}
      separator={true}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      {followers.map(follower => (
        <FollowerCard
          key={follower.id}
          user={follower}
          showFollowButton={true}
          recipes={mockRecipes}
        />
      ))}
    </ListItems>
  );
};

export default Followers; 