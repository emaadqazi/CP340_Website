import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { collection, addDoc, query, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/Reviews.css';

const Reviews = () => {
  const [platformReviews, setPlatformReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    rating: 0,
    comment: '',
    category: 'overall'
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPlatformReviews();
  }, []);

  const fetchPlatformReviews = async () => {
    try {
      setLoading(true);
      const reviewsRef = collection(db, 'platformReviews');
      const q = query(reviewsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setPlatformReviews(reviews);
    } catch (error) {
      console.error('Error fetching platform reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userName.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' });
      return;
    }
    if (formData.rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' });
      return;
    }
    if (!formData.comment.trim()) {
      setMessage({ type: 'error', text: 'Please write a review' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const reviewsRef = collection(db, 'platformReviews');
      await addDoc(reviewsRef, {
        ...formData,
        userName: formData.userName.trim(),
        comment: formData.comment.trim(),
        date: Timestamp.now()
      });

      setMessage({ type: 'success', text: 'Thank you for your review!' });
      setFormData({ userName: '', rating: 0, comment: '', category: 'overall' });
      setHoveredRating(0);
      fetchPlatformReviews(); // Refresh reviews
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= (interactive ? (hoveredRating || formData.rating) : rating) ? 'filled' : ''}`}
        onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
        onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
        onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        ★
      </span>
    ));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateOverallRating = () => {
    if (platformReviews.length === 0) return 0;
    const totalRating = platformReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / platformReviews.length).toFixed(1);
  };

  const getCategoryName = (category) => {
    const categories = {
      overall: 'Overall Experience',
      shipping: 'Shipping & Delivery',
      service: 'Customer Service',
      website: 'Website Experience',
      quality: 'Product Quality'
    };
    return categories[category] || 'General';
  };

  return (
    <>
      <SEO
        title="Customer Reviews"
        description="Read what students are saying about ShopCP340. Share your experience with our technology products and services."
        keywords="ShopCP340 reviews, customer testimonials, student technology reviews"
        url="/reviews"
        type="website"
      />
      <Helmet>
        <title>Customer Reviews - ShopCP340</title>
      </Helmet>
      
      <div className="reviews-page">
        <div className="container">
          <h1>Customer Reviews</h1>
          <p className="subtitle">See what students are saying about ShopCP340</p>

          {platformReviews.length > 0 && (
            <div className="overall-rating">
              <div className="rating-score">{calculateOverallRating()}</div>
              <div className="rating-details">
                <div className="stars-display">
                  {renderStars(parseFloat(calculateOverallRating()))}
                </div>
                <p>Based on {platformReviews.length} {platformReviews.length === 1 ? 'review' : 'reviews'}</p>
              </div>
            </div>
          )}

          <div className="reviews-content">
            <div className="review-form-section">
              <h2>Share Your Experience</h2>
              <form onSubmit={handleSubmit} className="platform-review-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="Enter your name"
                    maxLength={50}
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating">{renderStars(formData.rating, true)}</div>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="overall">Overall Experience</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="service">Customer Service</option>
                    <option value="website">Website Experience</option>
                    <option value="quality">Product Quality</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Tell us about your experience with ShopCP340..."
                    rows={5}
                    maxLength={500}
                  />
                  <small>{formData.comment.length}/500 characters</small>
                </div>

                {message.text && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>

            <div className="reviews-list-section">
              <h2>Customer Testimonials</h2>
              
              {loading ? (
                <div className="loading">Loading reviews...</div>
              ) : platformReviews.length === 0 ? (
                <div className="empty-state">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="platform-reviews-list">
                  {platformReviews.map((review) => (
                    <div key={review.id} className="platform-review-card">
                      <div className="review-header">
                        <div>
                          <h4>{review.userName}</h4>
                          <div className="stars-display">{renderStars(review.rating)}</div>
                          <span className="category-badge">{getCategoryName(review.category)}</span>
                        </div>
                        <span className="review-date">{formatDate(review.date)}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
