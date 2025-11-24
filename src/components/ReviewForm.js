import React, { useState } from 'react';
import { addReview } from '../services/reviewService';
import styles from '../styles/ReviewForm.module.css';
import { trackReviewSubmission } from '../services/analyticsService';

function ReviewForm({ productId, onReviewAdded }) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!userName.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' });
      return;
    }
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' });
      return;
    }
    if (!comment.trim()) {
      setMessage({ type: 'error', text: 'Please write a review' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const reviewData = {
      productId,
      userName: userName.trim(),
      rating,
      comment: comment.trim()
    };

    const result = await addReview(reviewData);

    if (result.success) {
      trackReviewSubmission(productId, rating); // Track review
      setMessage({ type: 'success', text: 'Review submitted successfully!' });
      setUserName('');
      setRating(0);
      setComment('');
      if (onReviewAdded) onReviewAdded(); // Callback to refresh reviews
    } else {
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    }

    setLoading(false);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`${styles.star} ${
          star <= (hoveredRating || rating) ? styles.filled : ''
        }`}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Rating</label>
          <div className={styles.starRating}>{renderStars()}</div>
        </div>

        <div className={styles.formGroup}>
          <label>Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
            maxLength={500}
          />
          <small>{comment.length}/500 characters</small>
        </div>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
