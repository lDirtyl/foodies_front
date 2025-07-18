import { useLocation } from 'react-router-dom';
import MyRecipes from './components/MyRecipes';
import MyFavorites from './components/MyFavorites';
import Followers from './components/Followers';
import Following from './components/Following';

const UserPageLayout = () => {
  const location = useLocation();

  const renderComponent = () => {
    const path = location.pathname;

    if (path.includes('/recipes')) {
      return <MyRecipes />;
    }

    if (path.includes('/favorites')) {
      return <MyFavorites />;
    }

    if (path.includes('/followers')) {
      return <Followers />;
    }

    if (path.includes('/following')) {
      return <Following />;
    }

    // Default to MyRecipes
    return <MyRecipes />;
  };

  return renderComponent();
};

export default UserPageLayout;
