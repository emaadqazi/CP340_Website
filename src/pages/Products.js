import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS, generateProductStructuredData } from '../utils/seoUtils';
import '../styles/Products.css';

const Products = () => {
  const structuredData = generateProductStructuredData(products);
  
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
        <h1>Technology Products & Electronics Store</h1>
        <p className="products-intro">Discover our curated collection of premium technology products, electronics, and gadgets. From wireless headphones to smart devices, we offer quality technology products at competitive prices.</p>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Products;
