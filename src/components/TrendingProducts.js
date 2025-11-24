import React from 'react';
import { getRelatedProducts } from '../services/recommendationService';
import ProductCard from './ProductCard';
import '../styles/RelatedProducts.css';

function RelatedProducts({ currentProduct }) {
  const relatedProducts = getRelatedProducts(currentProduct, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section">
      <h3>You May Also Like</h3>
      <p className="related-subtitle">Other {currentProduct.category.toLowerCase()} you might enjoy</p>
      <div className="related-products-grid">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;