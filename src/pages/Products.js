import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/Products.css';

const Products = () => {
  return (
    <div className="products">
      <div className="container">
        <h1>Our Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
