import React, { useState, useEffect } from 'react';
import { getReviewStats } from '../services/reviewService';
import styles from '../styles/ProductRating.module.css';

function ProductRating({ productId }) {
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      console.log('🔍 ProductRating: Fetching reviews for productId:', productId, 'Type:', typeof productId);
      setLoading(true);
      const fetchedStats = await getReviewStats(productId);
      console.log('📊 ProductRating: Stats received:', fetchedStats);
      setStats(fetchedStats);
      setLoading(false);
    };
    
    fetchStats();
  }, [productId]);

  const renderStars = (rating) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= Math.floor(rating)) {
            return <span key={star} className={styles.filled}>★</span>;
          } else if (star === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
            return <span key={star} className={styles.half}>★</span>;
          } else {
            return <span key={star}>★</span>;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return null; // Don't show while loading
  }

  if (stats.totalReviews === 0) {
    return (
      <div className={styles.productRating}>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>★</span>
          ))}
        </div>
        <span className={styles.noReviewsText}>No reviews yet</span>
      </div>
    );
  }

  return (
    <div className={styles.productRating}>
      {renderStars(stats.averageRating)}
      <span className={styles.ratingText}>
        {stats.averageRating} ({stats.totalReviews})
      </span>
    </div>
  );
}

export default ProductRating;
