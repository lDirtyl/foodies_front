import { useSelector, useDispatch } from 'react-redux';
import { toggleFollow } from '../../../redux/slices/userSlice';
import { logout } from '../../../redux/auth/operations';
import { selectUser } from '../../../redux/auth/selectors';
import Avatar from '../../Avatar/Avatar';
import styles from './UserInfo.module.css';
import Button from '../../Button/Button';

const UserInfo = ({ isOwnProfile = true }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const { viewedUser } = useSelector(state => state.user);

  const user = isOwnProfile ? currentUser : viewedUser;

  const handleFollowToggle = () => {
    if (!isOwnProfile) {
      dispatch(toggleFollow());
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
            <p className={styles.favorites}>
              <span>Favorites:</span> {user.favorites || 0}
            </p>
            <p className={styles.followers}>
              <span>Followers:</span> {user.followers || 0}
            </p>
            <p className={styles.following}>
              <span>Following:</span> {user.following || 0}
            </p>
          </div>
        </div>
      </div>
      {isOwnProfile ? (
        <Button onClick={handleLogout} variant='primary' fullWidth>
          LOG OUT
        </Button>
      ) : (
        <Button onClick={handleFollowToggle} variant='primary' fullWidth>
          {user.isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </Button>
      )}
    </div>
  );
};

export default UserInfo;
