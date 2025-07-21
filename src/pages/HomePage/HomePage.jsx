import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Categories from '../../components/Categories/Categories';
import Testimonials from '../../components/Testimonials/Testimonials';
import Reciepes from '../../components/Reciepes/Reciepes';
import Hero from '../../components/Hero/Hero.jsx';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    const paginationAnchor = document.getElementById('paginationAnchor');
    if (paginationAnchor) {
      paginationAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <PageWrapper showBreadcrumbs={false}>
      {/* Hero Section */}
      <section style={{ marginBottom: '60px' }}>
        <Hero />
      </section>

      {/* Categories Section */}
      <section style={{ marginTop: '60px' }} id="paginationAnchor">
        {!selectedCategory ? (
          <Categories onCategorySelect={handleCategorySelect} />
        ) : (
          <Reciepes category={selectedCategory} onBack={handleBackToCategories} />
        )}
      </section>

      {/* Latest Recipes */}
      <section style={{ marginTop: '60px' }}>
        <h3>Latest Recipes</h3>
        <p>Check out the newest additions to our recipe collection...</p>
      </section>

      <Testimonials />
    </PageWrapper>
  );
}
