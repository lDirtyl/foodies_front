import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Categories from '../../components/Categories/Categories';
import Testimonials from '../../components/Testimonials/Testimonials';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export default function HomePage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const handleToggleFavorite = (recipeId) => {
    setFavoriteRecipes(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };
  return (
    <PageWrapper
      title="FOODIES"
      description="Discover amazing recipes from talented chefs around the world"
      containerSize="wide"
      showBreadcrumbs={false}
    >
      {/* Hero Section */}
      <section style={{ marginBottom: '60px' }}>
        <h3>Featured Recipes</h3>
        <p>Explore our collection of delicious recipes...</p>
      </section>

      {/* Categories Section */}
      <section style={{ marginTop: '60px' }}>
        {/* <h3>Popular Categories</h3>
        <p>Browse recipes by category...</p> */}
        <Categories />
      </section>

      {/* Latest Recipes */}
      <section style={{ marginTop: '60px' }}>
        <h3>Latest Recipes</h3>
        <p>Check out the newest additions to our recipe collection...</p>

        {/* Тимчасово додаємо RecipeCard для тестування */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 342px))',
          gap: '30px',
          marginTop: '20px',
          justifyContent: 'center'
        }}>
          <RecipeCard
            recipe={{
              id: 1,
              title: "Spaghetti Carbonara",
              description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper",
              image: "/images/categories/pasta@1x.webp"
            }}
            author={{
              id: 1,
              name: "Chef Mario"
            }}
            isAuthenticated={true}
            isFavorite={favoriteRecipes.includes(1)}
            onToggleFavorite={handleToggleFavorite}
          />
          <RecipeCard
            recipe={{
              id: 2,
              title: "Beef Steak",
              description: "Juicy grilled beef steak with herbs and garlic",
              image: "/images/categories/beef@1x.webp"
            }}
            author={{
              id: 2,
              name: "Chef Anna"
            }}
            isAuthenticated={true}
            isFavorite={favoriteRecipes.includes(2)}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </section>

      <Testimonials />
    </PageWrapper>
  );
}
