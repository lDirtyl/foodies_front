import { useDispatch, useSelector } from 'react-redux';
import FollowerCard from '../../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectFollowers, selectCurrentPage, selectTotalPages, selectIsLoading, changeFollowersPage } from '../../../redux/user/userFollowers';
import { fetchFollowers } from '../../../redux/user/userFollowers/operations';
import { useEffect } from 'react';

const Followers = () => {
  const dispatch = useDispatch();
  const followers = useSelector(selectFollowers);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeFollowersPage(page));
  };

  useEffect(() => {
    dispatch(fetchFollowers({ page: currentPage }));
  }, [currentPage, dispatch]);

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
          recipes={follower.recipes}
        />
      ))}
    </ListItems>
  );
};

export default Followers;
