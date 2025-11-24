import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ReviewSummary from './ReviewSummary';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import ProductRating from './ProductRating';
import RelatedProducts from '../components/RelatedProducts';
import { trackProductView, trackAddToCart } from "../services/analyticsService";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(0);

  const handleAddToCart = () => {
    addToCart(product);
    trackAddToCart(product, 1); // Track add to cart
    toast.success(`Successfully added ${product.name} to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/cart');
  };

  const handleViewDetails = () => {
    trackProductView(product); // Track when modal opens
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleReviewAdded = () => {
    setRefreshReviews(prev => prev + 1);
  };

  return (
    <>
      <div className="product-card">
        <img 
          src={product.image} 
          alt={`${product.name} - ${product.description.substring(0, 60)}...`}
          title={product.name}
          onClick={handleViewDetails}
          style={{ cursor: 'pointer' }}
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <ProductRating productId={product.id} />
          <p>{product.description}</p>
          <div className="product-price">${product.price}</div>
          <div className="product-actions">
            <button className="view-details" onClick={handleViewDetails}>
              View Details & Reviews
            </button>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="product-modal-overlay" onClick={handleCloseModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <div className="modal-content">
              <div className="modal-product-header">
                <img src={product.image} alt={product.name} />
                <div className="modal-product-info">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="modal-price">${product.price}</div>
                  <button className="modal-add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="modal-reviews-section">
                <ReviewSummary productId={product.id} />
                <ReviewForm productId={product.id} onReviewAdded={handleReviewAdded} />
                <ReviewsList productId={product.id} refreshTrigger={refreshReviews} />
                <RelatedProducts currentProduct={product}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;