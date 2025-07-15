import { useSelector } from 'react-redux';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import UserInfo from '../../components/user/UserInfo/UserInfo';
import TabBar from '../../components/TabBar/TabBar';
import RecipeCard from '../../components/user/RecipeCard/RecipeCard';
import FollowerCard from '../../components/user/FollowerCard/FollowerCard';
import ListItems from '../../components/ListItems/ListItems';
import styles from './UserPage.module.css';

const UserPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const { userRecipes, favorites, activeTab, isLoading } = useSelector(state => state.recipes);

  // Mock followers/following data
  const mockFollowers = [
    {
      id: '2',
      name: 'NADIA',
      email: 'nadia28682@gmail.com',
      avatar: '/images/users/nadia.jpg',
      isFollowing: false,
    },
    {
      id: '3', 
      name: 'ALEX',
      email: 'alex.chef@gmail.com',
      avatar: '/images/users/alex.jpg',
      isFollowing: true,
    },
    {
      id: '4',
      name: 'MARIE',
      email: 'marie.cuisine@gmail.com', 
      avatar: '/images/users/marie.jpg',
      isFollowing: false,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'MY RECIPES':
        return (
          <ListItems isLoading={isLoading} emptyMessage="You haven't added any recipes yet. Create your first recipe!">
            {userRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                isOwner={true}
                showActions={true}
              />
            ))} 
          </ListItems>
        );
        
      case 'MY FAVORITES':
        return (
          <ListItems isLoading={isLoading} emptyMessage="You haven't favorited any recipes yet. Browse recipes and add some favorites!">
            {favorites.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe} 
                isOwner={false}
                showActions={true}
              />
            ))}
          </ListItems>
        );
        
      case 'FOLLOWERS':
        return (
          <ListItems 
            isLoading={isLoading} 
            emptyMessage="You don't have any followers yet. Share your amazing recipes to attract followers!"
            showPagination={true}
          >
            {mockFollowers.map(follower => (
              <FollowerCard 
                key={follower.id} 
                user={follower} 
                showFollowButton={true}
              />
            ))}
          </ListItems>
        );
        
      case 'FOLLOWING':
        return (
          <ListItems 
            isLoading={isLoading} 
            emptyMessage="You're not following anyone yet. Find interesting chefs to follow!"
            showPagination={true}
          >
            {mockFollowers.filter(user => user.isFollowing).map(user => (
              <FollowerCard 
                key={user.id} 
                user={user} 
                showFollowButton={true}
              />
            ))}
          </ListItems>
        );
        
      default:
        return null;
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
        { label: 'PROFILE', path: `/user/${currentUser.id}` }
      ]}
    >
      <div className={styles.container}>
        <UserInfo isOwnProfile={true} />
        <div className={styles.content}>
          <TabBar tabs={['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING']} />
          {renderContent()}
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserPage;
