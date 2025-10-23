import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS, generateProductStructuredData } from '../utils/seoUtils';
import '../styles/Products.css';

const Products = () => {
  const structuredData = generateProductStructuredData(products);
  
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  
  // Define category display names
  const categoryNames = {
    'Monitors': 'Displays',
    'Laptops': 'Laptops',
    'Headphones': 'Headphones',
    'Accessories': 'Accessories'
  };
  
  return (
    <>
      <SEO
        title="Products"
        description={DEFAULT_DESCRIPTIONS.products}
        keywords={SEO_KEYWORDS.products}
        url="/products"
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="products">
        <div className="container">
          <h1>Student Technology & Productivity Store</h1>
          
          {Object.keys(productsByCategory).map(category => (
            <div key={category} className="category-section">
              <h2 className="category-heading">{categoryNames[category]}:</h2>
              <div className="products-grid">
                {productsByCategory[category].map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
