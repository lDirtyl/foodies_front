import { useDispatch, useSelector } from 'react-redux';
import FollowerCard from '../../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../../components/ListItems/ListItems';
import { selectFollowing, selectCurrentPage, selectTotalPages, selectIsLoading, changeFollowingPage } from '../../../redux/user/userFollowing';
import { fetchFollowing } from '../../../redux/user/userFollowing/operations';
import { useEffect } from 'react';

const Following = () => {
  const dispatch = useDispatch();
  const following = useSelector(selectFollowing);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = page => {
    dispatch(changeFollowingPage(page));
  };

  useEffect(() => {
    dispatch(fetchFollowing({ page: currentPage }));
  }, [currentPage, dispatch]);

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
          recipes={user.recipes}
          actionType="unfollow"
        />
      ))}
    </ListItems>
  );
};

export default Following; 