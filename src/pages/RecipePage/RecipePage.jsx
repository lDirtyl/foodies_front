import PageWrapper from '../../components/PageWrapper/PageWrapper';

export default function RecipePage() {
  return (
    <PageWrapper 
      showHeader={false}
      breadcrumbItems={[
        { label: 'HOME', path: '/' },
        { label: 'RECIPES', path: '/recipes' },
        { label: 'RECIPE NAME', path: '/recipe/1' }
      ]}
      breadcrumbSeparator=">"
    >
      {/* Recipe Hero Section */}
      <section>
        <div style={{ 
          height: '400px', 
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#050505' }}>
            RECIPE NAME
          </h1>
        </div>
      </section>

      {/* Recipe Details */}
      <section>
        <h2>Ingredients</h2>
        <ul style={{ lineHeight: '1.8', color: '#666' }}>
          <li>2 cups flour</li>
          <li>1 cup sugar</li>
          <li>3 eggs</li>
          <li>1/2 cup butter</li>
        </ul>

        <h2 style={{ marginTop: '40px' }}>Instructions</h2>
        <ol style={{ lineHeight: '1.8', color: '#666' }}>
          <li>Preheat oven to 350°F</li>
          <li>Mix dry ingredients in a bowl</li>
          <li>Add wet ingredients and stir until combined</li>
          <li>Bake for 25-30 minutes</li>
        </ol>
      </section>

      {/* Related Recipes */}
      <section className="related-recipes">
        <h2>Related Recipes</h2>
        <p>Discover more delicious recipes you might like...</p>
      </section>
    </PageWrapper>
  );
}
