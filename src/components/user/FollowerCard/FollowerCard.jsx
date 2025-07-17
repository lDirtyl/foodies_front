import { useDispatch } from 'react-redux';
import { toggleFollow } from '../../../redux/slices/userSlice';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ user, showFollowButton = true }) => {
  const dispatch = useDispatch();

  const handleFollowToggle = () => {
    if (showFollowButton) {
      dispatch(toggleFollow());
    }
  };

  const handleViewProfile = () => {
    // Navigate to user profile
    console.log('View profile:', user.id);
  };

  if (!user) return null;

  return (
    <div className={styles.followerCard}>
      <div className={styles.userInfo}>
        <Avatar src={user.avatar} alt={user.name} size="follower" />

        <div className={styles.details}>
          <h4 className={styles.userName}>{user.name}</h4>
          <p className={styles.recipeCount}>
            Own recipes: {user.recipesCount || 0}
          </p>
          {showFollowButton && (
            <Button small onClick={handleFollowToggle} variant="secondary">
              {user.isFollowing ? 'FOLLOWING' : 'FOLLOW'}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <ButtonIcon
          icon={<img src="/icons/arrow-up-right.svg" alt="View profile" />}
          onClick={handleViewProfile}
          title="View profile"
          variant="light"
        />
      </div>
    </div>
  );
};

export default FollowerCard;
