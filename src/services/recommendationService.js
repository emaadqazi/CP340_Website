import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { products } from '../data/products';

// Get all reviews from Firebase and calculate product stats
export async function getAllProductStats() {
  try {
    const reviewsRef = collection(db, 'reviews');
    const querySnapshot = await getDocs(reviewsRef);
    
    const productStats = {};
    
    // Aggregate reviews by product
    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const productId = review.productId;
      
      if (!productStats[productId]) {
        productStats[productId] = {
          productId,
          totalReviews: 0,
          totalRating: 0,
          averageRating: 0,
          latestReviewDate: null
        };
      }
      
      productStats[productId].totalReviews += 1;
      productStats[productId].totalRating += review.rating;
      
      // Track latest review date
      if (review.date && (!productStats[productId].latestReviewDate || 
          review.date.seconds > productStats[productId].latestReviewDate.seconds)) {
        productStats[productId].latestReviewDate = review.date;
      }
    });
    
    // Calculate averages
    Object.keys(productStats).forEach(productId => {
      const stats = productStats[productId];
      stats.averageRating = parseFloat((stats.totalRating / stats.totalReviews).toFixed(1));
    });
    
    return productStats;
  } catch (error) {
    console.error('Error fetching all product stats:', error);
    return {};
  }
}

// Get most reviewed products
export async function getMostReviewedProducts(limit = 6) {
  const stats = await getAllProductStats();
  
  // Convert to array and sort by review count
  const sortedProducts = Object.values(stats)
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, limit)
    .map(stat => products.find(p => p.id === stat.productId))
    .filter(p => p !== undefined);
  
  return sortedProducts;
}

// Get highest rated products (minimum 2 reviews for credibility)
export async function getHighestRatedProducts(limit = 6, minReviews = 2) {
  const stats = await getAllProductStats();
  
  // Filter products with minimum reviews, then sort by rating
  const sortedProducts = Object.values(stats)
    .filter(stat => stat.totalReviews >= minReviews)
    .sort((a, b) => {
      // Sort by rating first, then by review count as tiebreaker
      if (b.averageRating === a.averageRating) {
        return b.totalReviews - a.totalReviews;
      }
      return b.averageRating - a.averageRating;
    })
    .slice(0, limit)
    .map(stat => products.find(p => p.id === stat.productId))
    .filter(p => p !== undefined);
  
  return sortedProducts;
}

// Get trending products (recent reviews + high ratings)
export async function getTrendingProducts(limit = 6) {
  const stats = await getAllProductStats();
  
  // Calculate trending score: (average rating * 20) + (total reviews * 10) + recency bonus
  const now = Date.now() / 1000; // Current time in seconds
  
  const scoredProducts = Object.values(stats).map(stat => {
    let score = (stat.averageRating * 20) + (stat.totalReviews * 10);
    
    // Add recency bonus if reviewed in last week
    if (stat.latestReviewDate) {
      const daysSinceReview = (now - stat.latestReviewDate.seconds) / (24 * 60 * 60);
      if (daysSinceReview <= 7) {
        score += 50; // Boost for recent reviews
      }
    }
    
    return { ...stat, trendingScore: score };
  });
  
  const trendingProducts = scoredProducts
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit)
    .map(stat => products.find(p => p.id === stat.productId))
    .filter(p => p !== undefined);
  
  return trendingProducts;
}

// Get related products (same category, excluding current product)
export function getRelatedProducts(currentProduct, limit = 4) {
  return products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, limit);
}