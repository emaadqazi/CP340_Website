import { loadStripe } from '@stripe/stripe-js';

// Stripe Test Mode Configuration
export const STRIPE_CONFIG = {
  // Stripe Test Mode Publishable Key
  // This is a test key that starts with 'pk_test_'
  publishableKey: 'pk_test_51234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz',
  
  // Stripe Test Mode Options
  options: {
    mode: 'payment',
    currency: 'usd',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#6366f1',
        colorBackground: '#1f2937',
        colorText: '#ffffff',
        colorDanger: '#ef4444',
        fontFamily: 'Lato, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  }
};

// Initialize Stripe with the publishable key
export const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

// Test card numbers for Stripe Test Mode
export const TEST_CARDS = {
  success: '4242424242424242',
  decline: '4000000000000002',
  insufficientFunds: '4000000000009995',
  expired: '4000000000000069',
  processingError: '4000000000000119',
  // Visa
  visa: '4242424242424242',
  // Mastercard
  mastercard: '5555555555554444',
  // American Express
  amex: '378282246310005',
  // Discover
  discover: '6011111111111117'
};

// Test card details
export const TEST_CARD_DETAILS = {
  visa: {
    number: '4242424242424242',
    expiry: '12/25',
    cvc: '123',
    name: 'Test User'
  },
  mastercard: {
    number: '5555555555554444',
    expiry: '12/25',
    cvc: '123',
    name: 'Test User'
  },
  amex: {
    number: '378282246310005',
    expiry: '12/25',
    cvc: '1234',
    name: 'Test User'
  }
};
