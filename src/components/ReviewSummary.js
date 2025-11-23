import React, { useState, useEffect } from 'react';
import { getReviewStats } from '../services/reviewService';
import styles from '../styles/ReviewSummary.module.css';

function ReviewSummary({ productId }) {
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const fetchedStats = await getReviewStats(productId);
      setStats(fetchedStats);
      setLoading(false);
    };
    
    fetchStats();
  }, [productId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            return <span key={star} className={styles.filled}>★</span>;
          } else if (star === fullStars + 1 && hasHalfStar) {
            return <span key={star} className={styles.half}>★</span>;
          } else {
            return <span key={star}>★</span>;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (stats.totalReviews === 0) {
    return (
      <div className={styles.reviewSummary}>
        <p>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewSummary}>
      <div className={styles.ratingDisplay}>
        <span className={styles.averageRating}>{stats.averageRating}</span>
        <div>
          {renderStars(stats.averageRating)}
          <p className={styles.reviewCount}>Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewSummary;
