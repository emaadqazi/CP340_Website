# Assignment 3 Implementation Plan
## Epic 1: User Engagement Features - Firebase Implementation

---

## Overview
This document outlines the implementation plan for Assignment 3, focusing on three core user engagement features:
1. Live Chat Bot with FAQ
2. Customer Review System (Firebase-powered)
3. Personalized Recommendations (3 types)

**Estimated Total Time:** 4-5 hours
**Due Date:** November 23, 2025
**Current Tech Stack:** React 18.2.0, React Router, Stripe (mock), GitHub Pages

---

## Task 1: Live Chat Bot with FAQ (Tidio Widget)

### Implementation Steps
1. **Sign up for Tidio**
   - Go to [tidio.com](https://www.tidio.com)
   - Create free account
   - Access dashboard

2. **Get Installation Script**
   - Navigate to Settings → Channels → Live Chat
   - Copy the JavaScript widget code

3. **Add to Project**
   - Open `public/index.html`
   - Paste Tidio script before closing `</body>` tag
   - Save and test in development mode

4. **Configure FAQ Bot**
   - In Tidio dashboard: Go to Chatbots → Build Your Bot
   - Create FAQ bot with answers to:
     - "What are your shipping options?"
     - "What is your return policy?"
     - "What payment methods do you accept?"
     - "How do I track my order?"
     - "Do you offer warranty on products?"
     - "How do I contact customer support?"

5. **Set Auto-Greeting**
   - Configure greeting message: "Hi! How can we help you today? Check out our FAQ or chat with us!"
   - Set trigger: Appears after 3 seconds on page load

6. **Testing**
   - Test widget visibility on:
     - Home page (/)
     - Products page (/products)
     - Cart page (/cart)
     - Checkout page (/checkout)

7. **Documentation**
   - Screenshot 1: Chat widget open on homepage
   - Screenshot 2: Tidio dashboard showing FAQ configuration
   - Screenshot 3: Auto-greeting settings

**Estimated Time:** 15-20 minutes

---

## Task 2: Firebase Review System

### 2.1 Firebase Setup

**Installation**
```bash
npm install firebase
```

**Create Firebase Project**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project"
3. Name: `shopcp340-reviews` (or similar)
4. Disable Google Analytics (optional for this project)
5. Create project

**Enable Firestore**
1. In Firebase Console → Build → Firestore Database
2. Click "Create database"
3. Start in **test mode** (for development)
4. Select region: `us-central1` or closest to you
5. Enable

**Get Firebase Config**
1. Project Settings → General → Your apps
2. Click Web app icon (</>)
3. Register app: "ShopCP340 Web"
4. Copy the config object (firebaseConfig)

**Create Firebase Config File**
- File: `src/config/firebase.js`
- Content:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### 2.2 Firestore Database Structure

**Collection: `reviews`**

Each review document contains:
```javascript
{
  productId: string,        // Matches product.id from products.js
  userName: string,         // Reviewer's name
  rating: number,           // 1-5 stars
  comment: string,          // Review text
  date: timestamp,          // Firestore timestamp
  helpful: number,          // (Optional) helpful votes
}
```

**Firestore Rules (for testing)**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{review} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```
(Apply in Firebase Console → Firestore → Rules)

---

### 2.3 Create Review Service

**File:** `src/services/reviewService.js`

Functions to implement:
```javascript
// Add a new review
export async function addReview(reviewData)

// Get all reviews for a product
export async function getReviewsByProduct(productId)

// Get review statistics (average rating, count)
export async function getReviewStats(productId)

// (Optional) Delete a review
export async function deleteReview(reviewId)
```

**Implementation:**
- Use Firestore methods: `addDoc`, `collection`, `query`, `where`, `getDocs`, `orderBy`
- Handle errors with try-catch
- Return promises

---

### 2.4 Build Review Components

#### **Component 1: ReviewForm.js**
**Location:** `src/components/ReviewForm.js`

**Features:**
- Star rating selector (1-5 stars, clickable)
- Text input for reviewer name
- Textarea for review comment
- Submit button
- Loading state during submission
- Success/error messages (using react-toastify)

**Props:**
- `productId` - ID of product being reviewed

**Styling:**
- Create `src/styles/ReviewForm.module.css`
- Match existing site design (same color scheme, fonts)

---

#### **Component 2: ReviewsList.js**
**Location:** `src/components/ReviewsList.js`

**Features:**
- Fetches reviews from Firestore for specific product
- Displays each review with:
  - Reviewer name
  - Star rating (visual stars, not just number)
  - Review text
  - Date posted (formatted: "January 15, 2025")
- Empty state: "No reviews yet. Be the first to review!"
- Loading state while fetching

**Props:**
- `productId` - ID of product

**Styling:**
- Create `src/styles/ReviewsList.module.css`
- List layout with borders between reviews

---

#### **Component 3: ReviewSummary.js**
**Location:** `src/components/ReviewSummary.js`

**Features:**
- Display average rating (e.g., "4.5 out of 5 stars")
- Show total review count (e.g., "Based on 12 reviews")
- Visual star representation of average
- Fetches review stats from Firestore

**Props:**
- `productId` - ID of product

**Styling:**
- Create `src/styles/ReviewSummary.module.css`
- Compact, prominent display

---

### 2.5 Integration with Products Page

**Update:** `src/pages/Products.js`

**Changes:**
1. Import review components
2. Add review section below product details
3. Layout:
   ```
   [Product Image] [Product Details]
   [Product Description]
   ---------------------------
   [ReviewSummary]
   [ReviewForm]
   [ReviewsList]
   ```

**Conditional rendering:**
- Only show reviews section when viewing a single product (if applicable)
- For now, add to all product displays or create a ProductDetail page

---

### 2.6 Add Test Reviews

**Method 1: Use ReviewForm**
- Submit 3-5 reviews through the UI form
- Vary ratings (3, 4, 5 stars)
- Different reviewer names
- Meaningful comments

**Method 2: Firestore Console**
- Navigate to Firestore Database in Firebase Console
- Manually add documents to `reviews` collection
- Ensure productId matches actual product IDs from `src/data/products.js`

**Test Reviews Needed:**
- At least 1 review for products in different categories (Monitor, Laptop, Headphones, Accessories)
- Mix of ratings (not all 5 stars)

---

### 2.7 Documentation & Screenshots

**Screenshot 1:** Review form on product page (empty state)
**Screenshot 2:** Submitted reviews displaying on product page
**Screenshot 3:** Firebase Console showing reviews collection with data
**Screenshot 4:** ReviewSummary showing average rating

**Estimated Time:** 1.5-2 hours

---

## Task 3: Personalized Recommendations

### 3.1 Related Products Component

**File:** `src/components/RelatedProducts.js`

**Purpose:** Show products from the same category

**Implementation:**
```javascript
// Props: currentProduct
// Logic:
// 1. Filter all products where category === currentProduct.category
// 2. Exclude current product (id !== currentProduct.id)
// 3. Limit to 4 products
// 4. Display in grid layout
```

**Features:**
- Heading: "Related Products" or "You May Also Like"
- Product cards (reuse existing ProductCard component if available)
- Click to navigate to that product

**Styling:**
- Create `src/styles/RelatedProducts.module.css`
- Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile

**Integration:**
- Add to Products page below product details
- OR create a dedicated ProductDetail page if not already existing

**Estimated Time:** 30 minutes

---

### 3.2 Most Popular Section

**File:** `src/components/MostPopular.js`

**Purpose:** Showcase top/featured products on homepage

**Data Setup:**
1. Update `src/data/products.js`
2. Add `popularity` field to each product:
   ```javascript
   {
     id: 1,
     name: "Product Name",
     category: "Monitors",
     price: 299,
     popularity: 95, // Add this (1-100 scale)
     // ... other fields
   }
   ```

**Implementation:**
```javascript
// Logic:
// 1. Import products from data/products.js
// 2. Sort by popularity (highest first)
// 3. Take top 6 products
// 4. Display in grid
```

**Features:**
- Section heading: "Most Popular Products" or "Trending Now"
- Grid of 6 product cards
- Each card shows: image, name, price, rating (if available)
- Click to view product

**Styling:**
- Create `src/styles/MostPopular.module.css`
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Match homepage design aesthetic

**Integration:**
- Add to `src/pages/Home.js`
- Place below hero section, above other content

**Estimated Time:** 30 minutes

---

### 3.3 Cart-Based Recommendations

**File:** `src/components/RecommendedForCart.js`

**Purpose:** Suggest complementary products based on cart contents

**Complementary Product Mapping:**
Define in component or separate config file:
```javascript
const complementaryProducts = {
  'Monitors': ['Keyboards', 'Accessories'], // If cart has monitor, suggest these
  'Laptops': ['Accessories', 'Headphones'],
  'Headphones': ['Accessories'],
  'Accessories': ['Monitors', 'Laptops']
};
```

**Implementation:**
```javascript
// Props: cartItems (from CartContext)
// Logic:
// 1. Get categories of all items in cart
// 2. Find complementary categories
// 3. Filter products from those categories
// 4. Exclude products already in cart
// 5. Show 3-4 recommendations
```

**Features:**
- Section heading: "Complete Your Setup" or "You Might Also Need"
- Display 3-4 product cards
- "Add to Cart" button on each card
- Show only if cart has items (hide on empty cart)

**Styling:**
- Create `src/styles/RecommendedForCart.module.css`
- Horizontal scroll on mobile, grid on desktop
- Distinct visual separation from cart items

**Integration:**
- Add to `src/pages/Cart.js`
- Place below cart items, above checkout button

**Estimated Time:** 45 minutes

---

## Implementation Checklist

### Setup & Dependencies
- [ ] Install Firebase: `npm install firebase`
- [ ] Create Firebase project
- [ ] Enable Firestore Database
- [ ] Create `src/config/firebase.js`
- [ ] Sign up for Tidio account

### Task 1: Live Chat
- [ ] Add Tidio script to `public/index.html`
- [ ] Configure FAQ bot (6+ questions)
- [ ] Set auto-greeting message
- [ ] Test on all pages
- [ ] Capture 3 screenshots

### Task 2: Reviews System
- [ ] Create `src/services/reviewService.js`
- [ ] Create `src/components/ReviewForm.js`
- [ ] Create `src/components/ReviewsList.js`
- [ ] Create `src/components/ReviewSummary.js`
- [ ] Create CSS modules for review components
- [ ] Integrate reviews into Products page
- [ ] Add 3+ test reviews
- [ ] Capture 4 screenshots

### Task 3: Personalization
- [ ] Create `src/components/RelatedProducts.js`
- [ ] Add to Products page
- [ ] Create `src/components/MostPopular.js`
- [ ] Add `popularity` field to products data
- [ ] Add to Home page
- [ ] Create `src/components/RecommendedForCart.js`
- [ ] Add to Cart page
- [ ] Test all recommendation logic
- [ ] Capture screenshots of each feature

### Testing & Documentation
- [ ] Test all features in development
- [ ] Build production version: `npm run build`
- [ ] Test deployed version on GitHub Pages
- [ ] Organize all screenshots
- [ ] Document any issues/workarounds

---

## Technical Notes

### Firebase Security (Production)
For production deployment, update Firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{review} {
      allow read: if true;
      allow create: if request.resource.data.rating >= 1
                    && request.resource.data.rating <= 5
                    && request.resource.data.userName.size() > 0;
      allow update, delete: if false; // Prevent edits for now
    }
  }
}
```

### Environment Variables (Optional)
To hide Firebase config:
1. Create `.env` file in root (add to .gitignore)
2. Add Firebase config as env variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   // etc.
   ```
3. Reference in `firebase.js`: `process.env.REACT_APP_FIREBASE_API_KEY`

### Git Commits
Commit after each major task:
- "Add Tidio live chat widget with FAQ bot"
- "Implement Firebase review system with form and display"
- "Add personalized recommendations (Related Products, Most Popular, Cart-based)"

---

## Troubleshooting

### Firebase Issues
- **Error: Firebase not initialized**: Check firebase.js config and imports
- **Reviews not appearing**: Check Firestore rules (should allow read)
- **Can't submit review**: Check network tab for errors, verify collection name

### Tidio Issues
- **Widget not showing**: Verify script is in index.html, check browser console
- **FAQ not working**: Ensure bot is published in Tidio dashboard

### Recommendation Issues
- **No related products**: Check product category matching (case-sensitive)
- **Cart recommendations empty**: Verify complementary mapping logic

---

## Next Steps (Assignment 3 Continuation)

After completing Epic 1, remaining tasks:
- **Epic 2:** Google Analytics integration
- **Epic 3:** Security enhancements (2 features)
- **Epic 4:** Sustainability page + supplier research
- **Epic 5:** Trend analysis (2 trends)
- **Epic 6-7:** Analytics & security documentation
- **Epic 8:** Final PDF report (3-4 pages + appendix)
- **Epic 9:** Video walkthrough (5-7 minutes, all members speak)

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs/web/setup)
- [Firestore Queries](https://firebase.google.com/docs/firestore/query-data/queries)
- [Tidio Setup Guide](https://www.tidio.com/docs/)
- [React Context API](https://react.dev/reference/react/useContext) (for cart access)

---

**Last Updated:** November 23, 2025
**Project:** ShopCP340 E-Commerce Website
**Assignment:** CP340 Assignment 3 - User Engagement Features
