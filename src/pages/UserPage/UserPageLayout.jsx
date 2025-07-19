import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyRecipes from './components/MyRecipes';
import MyFavorites from './components/MyFavorites';
import Followers from './components/Followers';
import Following from './components/Following';
import { selectIsOwnProfile } from '../../redux/user/userProfile';

const UserPageLayout = () => {
  const location = useLocation();
  const isOwnProfile = useSelector(selectIsOwnProfile);

  const renderComponent = () => {
    const path = location.pathname;

    if (path.includes('/recipes')) {
      return <MyRecipes />;
    }

    // Only show favorites for own profile
    if (path.includes('/favorites') && isOwnProfile) {
      return <MyFavorites />;
    }

    if (path.includes('/followers')) {
      return <Followers />;
    }

    // Only show following for own profile
    if (path.includes('/following') && isOwnProfile) {
      return <Following />;
    }

    // Default to recipes
    return <MyRecipes />;
  };

  return renderComponent();
};

export default UserPageLayout;
