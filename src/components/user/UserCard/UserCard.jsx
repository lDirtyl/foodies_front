import { useDispatch } from 'react-redux';
import { toggleFollow } from '../../../redux/slices/userSlice';
import Avatar from '../../Avatar/Avatar';
import styles from './UserCard.module.css';

const UserCard = ({ user, showFollowButton = true }) => {
  const dispatch = useDispatch();

  const handleFollowToggle = () => {
    if (showFollowButton) {
      dispatch(toggleFollow());
    }
  };

  if (!user) return null;

  return (
    <div className={styles.userCard}>
      <Avatar 
        src={user.avatar}
        alt={user.name}
        size="medium"
      />
      
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userEmail}>{user.email}</p>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.recipesCount || 0}</span>
            <span className={styles.statLabel}>recipes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.followers || 0}</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.following || 0}</span>
            <span className={styles.statLabel}>following</span>
          </div>
        </div>
      </div>
      
      {showFollowButton && (
        <button 
          className={`${styles.followButton} ${user.isFollowing ? styles.following : ''}`}
          onClick={handleFollowToggle}
        >
          {user.isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </button>
      )}
    </div>
  );
};

export default UserCard;
