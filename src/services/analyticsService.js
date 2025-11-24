import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Track page views
export const trackPageView = (pageName, pageUrl) => {
    if (analytics) {
        logEvent(analytics, 'page_view', {
            page_title: pageName,
            page_location: pageUrl,
            page_path: window.location.pathname
        });
        console.log('Analytics: Page view tracked -', pageName);
    }
};

// Track product views
export const trackProductView = (product) => {
    if (analytics) {
        logEvent(analytics, 'view_item', {
            currency: 'USD',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                price: product.price
            }]
        });
        console.log('Analytics: Product view -', product.name);
    }
};

// Track add to cart
export const trackAddToCart = (product, quantity = 1) => {
    if (analytics) {
        logEvent(analytics, 'add_to_cart', {
            currency: 'USD',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                price: product.price,
                quantity: quantity
            }]
        });
        console.log('Analytics: Add to cart -', product.name);
    }
};

// Track checkout initiation
export const trackBeginCheckout = (cartItems, totalValue) => {
  if (analytics) {
    logEvent(analytics, 'begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
    console.log('📊 Analytics: Checkout started -', totalValue);
  }
};

// Track purchase (mock for your Stripe mock)
export const trackPurchase = (cartItems, totalValue, orderId) => {
  if (analytics) {
    logEvent(analytics, 'purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: totalValue,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
    console.log('📊 Analytics: Purchase completed -', orderId);
  }
};

// Track search
export const trackSearch = (searchTerm) => {
  if (analytics) {
    logEvent(analytics, 'search', {
      search_term: searchTerm
    });
    console.log('📊 Analytics: Search -', searchTerm);
  }
};

// Track review submission
export const trackReviewSubmission = (productId, rating) => {
  if (analytics) {
    logEvent(analytics, 'review_submitted', {
      product_id: productId,
      rating: rating
    });
    console.log('📊 Analytics: Review submitted -', productId, rating);
  }
};

// Track chat widget interaction
export const trackChatInteraction = (action) => {
  if (analytics) {
    logEvent(analytics, 'chat_interaction', {
      action: action // 'opened', 'closed', 'message_sent'
    });
    console.log('📊 Analytics: Chat interaction -', action);
  }
};