import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/operations';
import { toggleFollowUser } from '../../../redux/user/userProfile/operations';
import {
  selectCanFollow,
  selectIsFollowing,
  selectIsButtonLoading,
} from '../../../redux/user/userProfile';
import Avatar from '../../Avatar/Avatar';
import styles from './UserInfo.module.css';
import Button from '../../Button/Button';

const UserInfo = ({ user, isOwnProfile = true }) => {
  const dispatch = useDispatch();
  const canFollow = useSelector(selectCanFollow);
  const isFollowing = useSelector(selectIsFollowing);
  const isButtonLoading = useSelector(selectIsButtonLoading);

  const handleFollowToggle = () => {
    console.log('handleFollowToggle', isOwnProfile, user);
    if (!isOwnProfile && user) {
      dispatch(toggleFollowUser(user.id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <Avatar
          src={user.avatarURL}
          alt={user.name}
          size="large"
          showEditButton={isOwnProfile}
          onEditClick={() => {}}
        />

        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{user.name}</h1>

          <div className={styles.userDetails}>
            <p className={styles.email}>
              <span>Email:</span> {user.email}
            </p>
            <p className={styles.addedRecipes}>
              <span>Added recipes:</span> {user.recipesCount || 0}
            </p>
            <p className={styles.followers}>
              <span>Followers:</span> {user.followersCount || 0}
            </p>

            {/* Show favorites and following only for own profile */}
            {isOwnProfile && (
              <>
                <p className={styles.favorites}>
                  <span>Favorites:</span> {user.favoritesCount || 0}
                </p>
                <p className={styles.following}>
                  <span>Following:</span> {user.followingsCount || 0}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile ? (
        <Button
          onClick={handleLogout}
          variant="primary"
          isLoading={isButtonLoading}
          fullWidth
        >
          LOG OUT
        </Button>
      ) : canFollow ? (
        <Button
          onClick={handleFollowToggle}
          variant="primary"
          isLoading={isButtonLoading}
          fullWidth
        >
          {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
        </Button>
      ) : null}
    </div>
  );
};

export default UserInfo;
