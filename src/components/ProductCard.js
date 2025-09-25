import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
