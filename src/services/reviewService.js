import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Add a new review
export async function addReview(reviewData) {
  try {
    const reviewsRef = collection(db, 'reviews');
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      date: Timestamp.now(), // Add current timestamp
      helpful: 0 // Initialize helpful votes
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
}

// Get all reviews for a specific product
export async function getReviewsByProduct(productId) {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef, 
      where('productId', '==', productId),
      orderBy('date', 'desc') // Most recent first
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// Get review statistics (average rating, total count)
export async function getReviewStats(productId) {
  try {
    const reviews = await getReviewsByProduct(productId);
    
    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    
    return {
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length
    };
  } catch (error) {
    console.error('Error calculating review stats:', error);
    return { averageRating: 0, totalReviews: 0 };
  }
}

// Optional: Delete a review (for admin purposes)
export async function deleteReview(reviewId) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }
}
