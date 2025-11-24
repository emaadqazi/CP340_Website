import React, { useState, useEffect } from 'react';
import { getHighestRatedProducts } from '../services/recommendationService';
import ProductCard from './ProductCard';
import '../styles/TopRated.css';

function TopRatedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {
    setLoading(true);
    const topProducts = await getHighestRatedProducts(6, 2);
    setProducts(topProducts);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="top-rated-section">
        <div className="container">
          <h2>⭐ Top Rated by Students</h2>
          <p className="section-subtitle">Highly recommended by our student community</p>
          <div className="loading-message">Loading top rated products...</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="top-rated-section">
      <div className="container">
        <h2>⭐ Top Rated by Students</h2>
        <p className="section-subtitle">Highly recommended by our student community</p>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopRatedProducts;