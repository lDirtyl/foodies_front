import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../redux/slices/recipesSlice';
import styles from './TabBar.module.css';

const TabBar = ({ tabs = ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'] }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.recipes.activeTab);

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
