import React from 'react';
import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import styles from './RecipePage.module.css';

export default function RecipePage() {
  return (
    <div className={styles.recipePage}>
      <PathInfo currentPageName="RECIPE" />
      <RecipeInfo />
      <PopularRecipes />
    </div>
  );
}
