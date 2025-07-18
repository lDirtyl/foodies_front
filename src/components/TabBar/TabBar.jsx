import styles from './TabBar.module.css';

const TabBar = ({ 
  tabs = ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'],
  activeTab = 'MY RECIPES',
  onTabClick
}) => {
  const handleTabClick = (tab) => {
    if (onTabClick) {
      onTabClick(tab);
    }
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
