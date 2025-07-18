import { useDispatch } from 'react-redux';
import { toggleFollowUser } from '../../../redux/user/userFollowers';
import { unfollowUser } from '../../../redux/user/userFollowing';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ 
  user, 
  showFollowButton = true, 
  recipes = [], 
  actionType = 'follow' // 'follow' or 'unfollow'
}) => {
  const dispatch = useDispatch();

  const handleAction = () => {
    if (!showFollowButton) return;

    if (actionType === 'unfollow') {
      dispatch(unfollowUser(user.id));
    } else {
      dispatch(toggleFollowUser(user.id));
    }
  };

  const handleViewProfile = () => {
    // Navigate to user profile
    console.log('View profile:', user.id);
  };

  const getButtonText = () => {
    if (actionType === 'unfollow') {
      return 'UNFOLLOW';
    }
    return user.isFollowing ? 'FOLLOWING' : 'FOLLOW';
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
            <Button small onClick={handleAction} variant="secondary">
              {getButtonText()}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.recipePreviews}>
        {recipes.map((recipe, index) => (
          <div key={recipe.id || index} className={styles.recipePreview}>
            <img
              src={recipe.image || '/images/default-recipe.jpg'}
              alt={recipe.title}
              className={styles.recipeImage}
            />
          </div>
        ))}
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
