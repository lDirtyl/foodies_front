import React from 'react';
import PathInfo from '../../components/PathInfo/PathInfo';
// import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo-separate';
import styles from './RecipePage.module.css';

export default function RecipePage() {
  console.log('RecipePage rendering');
  return (
    <div className={styles.recipePage}>
      <PathInfo currentPageName="RECIPE" />
      <RecipeInfo />
      {/* Тимчасово вимкнено для діагностики */}
      {/* <PopularRecipes /> */}
    </div>
  );
}
