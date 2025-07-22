import React from 'react';
import { useSelector } from 'react-redux';
import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

export default function RecipePage() {
  const { currentRecipe } = useSelector(state => state.recipes);

  // Формуємо кастомний breadcrumb
  const breadcrumbItems = [{ label: 'HOME', path: '/' }];
  if (currentRecipe?.category) {
    breadcrumbItems.push({
      label: currentRecipe.category.toUpperCase(),
      path: `/categories/${currentRecipe.category.toLowerCase()}`,
    });
  }
  if (currentRecipe?.title) {
    breadcrumbItems.push({ label: currentRecipe.title });
  }

  return (
    <PageWrapper showHeader={false}>
      <PathInfo items={breadcrumbItems} />
      <RecipeInfo />
      <PopularRecipes />
    </PageWrapper>
  );
}
