import React, { useState } from 'react';
import { seedReviews } from '../utils/seedReviews';

function SeedReviewsButton() {
  const [seeding, setSeeding] = useState(false);
  const [result, setResult] = useState(null);

  const handleSeed = async () => {
    if (window.confirm('This will add 15+ sample reviews to your database. Continue?')) {
      setSeeding(true);
      setResult(null);
      
      try {
        const seedResult = await seedReviews();
        setResult(seedResult);
      } catch (error) {
        console.error('Error seeding reviews:', error);
        setResult({ error: error.message });
      } finally {
        setSeeding(false);
      }
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 9999,
      background: '#FFD700',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      <button
        onClick={handleSeed}
        disabled={seeding}
        style={{
          background: '#000',
          color: '#FFD700',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: seeding ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        {seeding ? 'Seeding Reviews...' : '🌱 Seed Sample Reviews'}
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '0.5rem', 
          fontSize: '0.9rem',
          color: result.error ? '#dc3545' : '#155724'
        }}>
          {result.error 
            ? `Error: ${result.error}`
            : `✓ Added ${result.successCount}/${result.total} reviews!`
          }
        </div>
      )}
    </div>
  );
}

export default SeedReviewsButton;
