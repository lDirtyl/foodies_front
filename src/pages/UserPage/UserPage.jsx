import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import UserInfo from '../../components/user/UserInfo/UserInfo';
import TabBar from '../../components/TabBar/TabBar';
import { selectUser } from '../../redux/auth/selectors';
import styles from './UserPage.module.css';

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/recipes')) return 'MY RECIPES';
    if (path.includes('/favorites')) return 'MY FAVORITES';
    if (path.includes('/followers')) return 'FOLLOWERS';
    if (path.includes('/following')) return 'FOLLOWING';
    return 'MY RECIPES';
  };

  const handleTabClick = tab => {
    const userId = currentUser?.id || '1';
    switch (tab) {
      case 'MY RECIPES':
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

  if (!currentUser) {
    return (
      <PageWrapper
        title="PROFILE"
        description="Please log in to view your profile."
      >
        <p>Please log in to view your profile.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="PROFILE"
      description="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us."
      breadcrumbItems={[
        { label: 'HOME', path: '/' },
        { label: 'PROFILE', path: `/user/${currentUser.id}` },
      ]}
    >
      <div className={styles.container}>
        <UserInfo isOwnProfile={true} />
        <div className={styles.content}>
          <TabBar
            tabs={['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING']}
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
