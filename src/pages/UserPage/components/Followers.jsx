import { useDispatch, useSelector } from 'react-redux';
import FollowerCard from '../../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectActiveUser, selectIsOwnProfile } from '../../../redux/user/userProfile';
import { selectFollowers, selectCurrentPage, selectTotalPages, selectIsLoading, changeFollowersPage } from '../../../redux/user/userFollowers';
import { fetchFollowers } from '../../../redux/user/userFollowers/operations';
import { useEffect } from 'react';

const Followers = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectActiveUser);
  const isOwnProfile = useSelector(selectIsOwnProfile);
  const followers = useSelector(selectFollowers);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeFollowersPage(page));
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFollowers({ page: currentPage, userId: user.id }));
    }
  }, [currentPage, user?.id, dispatch]);

  const getEmptyMessage = () => {
    if (isOwnProfile) {
      return "You don't have any followers yet. Share your amazing recipes to attract followers!";
    } else {
      return `${user?.name || 'This user'} doesn't have any followers yet.`;
    }
  };

  return (
    <ListItems
      isLoading={isLoading}
      emptyMessage={getEmptyMessage()}
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
          showFollowButton={!isOwnProfile} // Only show follow button when viewing other user's followers
          recipes={follower.recipes}
          actionType="follow"
        />
      ))}
    </ListItems>
  );
};

export default Followers;
