import React, { useState, useEffect } from 'react';
import { getReviewsByProduct } from '../services/reviewService';
import styles from '../styles/ReviewsList.module.css';

function ReviewsList({ productId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const fetchedReviews = await getReviewsByProduct(productId);
      setReviews(fetchedReviews);
      setLoading(false);
    };
    
    fetchReviews();
  }, [productId, refreshTrigger]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? styles.filled : ''}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsList}>
      <h3>Customer Reviews ({reviews.length})</h3>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div>
              <h4>{review.userName}</h4>
              {renderStars(review.rating)}
            </div>
            <span className={styles.date}>{formatDate(review.date)}</span>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
