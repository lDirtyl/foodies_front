import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Categories from '../../components/Categories/Categories';
import Testimonials from '../../components/Testimonials/Testimonials';
import Hero from '../../components/Hero/Hero.jsx'
import Reciepes from '../../components/Reciepes/Reciepes';

export default function HomePage() {
  return (
    <PageWrapper
      showBreadcrumbs={false}
    >
      {/* Hero Section */}
      <section style={{ marginBottom: '60px' }}>
        <Hero />
      </section>

      {/* Categories Section */}
      <section style={{ marginTop: '60px' }}>
        <Categories />
        {/*<Reciepes />*/}
      </section>

      <Testimonials />
    </PageWrapper>
  );
}
