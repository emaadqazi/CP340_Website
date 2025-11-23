import { addReview } from '../services/reviewService';

// Sample reviews to seed the database
const sampleReviews = [
  // LG 34" Ultrawide Monitor
  { productId: 1, userName: "Alex Chen", rating: 5, comment: "Absolutely love this monitor! Perfect for multitasking during my CS assignments. I can have my IDE, documentation, and browser open simultaneously. Best purchase for my dorm setup!" },
  { productId: 1, userName: "Sarah Mitchell", rating: 4, comment: "Great monitor for the price. The ultrawide display is a game-changer for productivity. Only wish it had built-in speakers, but overall very happy with it." },
  
  // Dell 27" 4K Monitor
  { productId: 2, userName: "Michael Brown", rating: 5, comment: "Crystal clear display! As a design student, color accuracy is crucial. This monitor delivers amazing 4K quality. Highly recommend for anyone in creative fields." },
  { productId: 2, userName: "Emily Rodriguez", rating: 4, comment: "Excellent monitor for coding and reading documentation. The 4K resolution makes text incredibly sharp. Setup was easy and it fits perfectly on my desk." },
  
  // ASUS Portable Monitor
  { productId: 3, userName: "David Kim", rating: 5, comment: "Perfect for studying in different locations! I take it to the library, coffee shops, and back home. Super lightweight and the USB-C connection is so convenient." },
  { productId: 3, userName: "Jessica Taylor", rating: 5, comment: "This portable monitor has been a lifesaver for group projects. Easy to carry in my backpack and the display quality is surprisingly good for the size!" },
  
  // MacBook Air M2
  { productId: 4, userName: "Ryan Johnson", rating: 5, comment: "Best laptop for programming! The M2 chip handles Xcode, VS Code, and multiple browsers without breaking a sweat. Battery lasts through all my classes and study sessions. Worth every penny!" },
  { productId: 4, userName: "Amanda Lee", rating: 5, comment: "Lightweight, powerful, and beautiful. Perfect for taking notes in lectures and coding projects. The battery life is incredible - I rarely need to charge it during the day." },
  
  // Dell XPS 13
  { productId: 5, userName: "Chris Anderson", rating: 4, comment: "Solid Windows laptop for engineering coursework. Runs CAD software smoothly and the build quality feels premium. Only complaint is the fan gets a bit loud under heavy load." },
  { productId: 5, userName: "Nicole Garcia", rating: 5, comment: "Excellent laptop for students! Compact yet powerful. The keyboard is comfortable for long typing sessions and the screen is gorgeous. Highly recommend!" },
  
  // Sony WH-1000XM4
  { productId: 6, userName: "Brandon Wilson", rating: 5, comment: "These headphones are a must-have for dorm life! Noise cancellation blocks out my roommate completely. Sound quality is amazing for music and video lectures." },
  { productId: 6, userName: "Sophia Martinez", rating: 5, comment: "Best investment for studying in noisy environments. The library can get loud but these headphones create perfect silence. Battery life lasts for days!" },
  
  // AirPods Pro 2
  { productId: 7, userName: "Daniel Thompson", rating: 4, comment: "Great for commuting to campus. Noise cancellation works well on the bus. Convenient for quick calls between classes. Wish the battery lasted longer though." },
  
  // Logitech MX Master 3S
  { productId: 8, userName: "Rachel Green", rating: 5, comment: "Ergonomic and precise! After long coding sessions, my wrist doesn't hurt anymore. The customizable buttons are perfect for productivity. Best mouse I've ever used." },
  
  // Keychron K2
  { productId: 9, userName: "Kevin Martinez", rating: 5, comment: "Mechanical keyboards make such a difference! Typing feels so satisfying and the backlighting is perfect for late-night coding. Compact size fits perfectly on my desk." },
  { productId: 9, userName: "Lauren Davis", rating: 4, comment: "Love the typing experience! The mechanical switches are tactile and responsive. Can be a bit loud in quiet study spaces, but otherwise perfect for programming." }
];

// Function to seed reviews into Firebase
export async function seedReviews() {
  console.log('Starting to seed reviews...');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const review of sampleReviews) {
    try {
      const result = await addReview(review);
      if (result.success) {
        successCount++;
        console.log(`✓ Added review for product ${review.productId} by ${review.userName}`);
      } else {
        failCount++;
        console.error(`✗ Failed to add review for product ${review.productId}:`, result.error);
      }
      
      // Add a small delay to avoid overwhelming Firebase
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      failCount++;
      console.error(`✗ Error adding review for product ${review.productId}:`, error);
    }
  }
  
  console.log(`\nSeeding complete! Success: ${successCount}, Failed: ${failCount}`);
  return { successCount, failCount, total: sampleReviews.length };
}

// Export individual reviews for manual testing
export { sampleReviews };
