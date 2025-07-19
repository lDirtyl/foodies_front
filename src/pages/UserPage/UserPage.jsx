import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import UserInfo from '../../components/user/UserInfo/UserInfo';
import TabBar from '../../components/TabBar/TabBar';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { 
  selectActiveUser, 
  selectUserTabs, 
  selectIsOwnProfile, 
  selectIsLoading, 
  selectError 
} from '../../redux/user/userProfile';
import { fetchUserProfileData } from '../../redux/user/userProfile/operations';
import styles from './UserPage.module.css';
import Button from '../../components/Button/Button';

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(selectActiveUser);
  const tabs = useSelector(selectUserTabs);
  const isOwnProfile = useSelector(selectIsOwnProfile);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfileData(userId));
    }
  }, [userId, dispatch]);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/recipes')) return isOwnProfile ? 'MY RECIPES' : 'RECIPES';
    if (path.includes('/favorites')) return 'MY FAVORITES';
    if (path.includes('/followers')) return 'FOLLOWERS';
    if (path.includes('/following')) return 'FOLLOWING';
    return isOwnProfile ? 'MY RECIPES' : 'RECIPES';
  };

  const handleTabClick = tab => {
    if (!user) return;
    
    const userId = user.id;
    switch (tab) {
      case 'MY RECIPES':
      case 'RECIPES':
        navigate(`/user/${userId}/recipes`);
        break;
      case 'MY FAVORITES':
        navigate(`/user/${userId}/favorites`);
        break;
      case 'FOLLOWERS':
        navigate(`/user/${userId}/followers`);
        break;
      case 'FOLLOWING':
        navigate(`/user/${userId}/following`);
        break; 
      default:
        navigate(`/user/${userId}/recipes`);
    }
  };

  if (isLoading) {
    return (
      <PageWrapper
        title="PROFILE"
        description="Loading user profile..."
      >
        <LoadingIndicator />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper
        title="PROFILE"
        description="Error loading profile."
      >
        <div className={styles.error}>
          <p>Error: {error}</p>
          <Button onClick={() => dispatch(fetchUserProfileData(userId))}>
            Try Again
          </Button>
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper
        title="PROFILE"
        description="User not found."
      >
        <p>User not found.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="PROFILE"
      description="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us."
      breadcrumbItems={[
        { label: 'HOME', path: '/' },
        { label: 'PROFILE', path: `/user/${user.id}` },
      ]}
    >
      <div className={styles.container}>
        <UserInfo user={user} isOwnProfile={isOwnProfile} />
        <div className={styles.content}>
          <TabBar
            tabs={tabs}
            activeTab={getActiveTab()}
            onTabClick={handleTabClick}
          />
          <Outlet />
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserPage;
