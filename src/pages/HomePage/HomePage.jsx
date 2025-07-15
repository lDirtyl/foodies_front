import PageWrapper from '../../components/PageWrapper/PageWrapper';

export default function HomePage() {
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
        <h3>Popular Categories</h3>
        <p>Browse recipes by category...</p>
      </section>

      {/* Latest Recipes */}
      <section style={{ marginTop: '60px' }}>
        <h3>Latest Recipes</h3>
        <p>Check out the newest additions to our recipe collection...</p>
      </section>
    </PageWrapper>
  );
}
