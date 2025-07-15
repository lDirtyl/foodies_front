import PageWrapper from '../../components/PageWrapper/PageWrapper';

export default function AddRecipePage() {
  return (
    <PageWrapper 
      title="ADD RECIPE"
      description="Share your culinary creation with the world"
      containerSize="narrow"
      breadcrumbItems={[
        { label: 'HOME', path: '/' },
        { label: 'RECIPES', path: '/recipes' },
        { label: 'ADD RECIPE', path: '/recipe/add' }
      ]}
    >
      <form>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="title">Recipe Title</label>
          <input 
            type="text" 
            id="title" 
            placeholder="Enter recipe title..."
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              marginTop: '8px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            placeholder="Describe your recipe..."
            rows="4"
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              marginTop: '8px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            background: '#050505',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '30px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          SAVE RECIPE
        </button>
      </form>
    </PageWrapper>
  );
}
