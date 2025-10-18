// Mock Payment Service for Demo Purposes

export const createMockPaymentIntent = async (amount) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock payment intent response
  const mockPaymentIntent = {
    id: `pi_mock_${Date.now()}`,
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    status: 'succeeded',
    client_secret: `pi_mock_${Date.now()}_secret_mock`,
    charges: {
      data: [{
        id: `ch_mock_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: 'usd',
        status: 'succeeded',
        payment_method_details: {
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          }
        },
        created: Math.floor(Date.now() / 1000)
      }]
    },
    created: Math.floor(Date.now() / 1000),
    metadata: {
      order_id: `order_${Date.now()}`,
      customer_email: 'demo@shopcp340.com'
    }
  };
  
  return mockPaymentIntent;
};

export const simulatePaymentProcessing = async (paymentMethodData) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate successful payment for demo purposes
  // In real implementation, this would validate the payment method
  return {
    success: true,
    paymentIntent: await createMockPaymentIntent(paymentMethodData.amount),
    error: null
  };
};

export const validatePaymentMethod = (paymentMethodData) => {
  const errors = [];
  
  // Basic validation for demo
  if (!paymentMethodData.cardNumber || paymentMethodData.cardNumber.length < 13) {
    errors.push('Invalid card number');
  }
  
  if (!paymentMethodData.expiryDate || !paymentMethodData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
    errors.push('Invalid expiry date format (MM/YY)');
  }
  
  if (!paymentMethodData.cvc || paymentMethodData.cvc.length < 3) {
    errors.push('Invalid CVC');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Test card numbers for demo
export const TEST_CARD_NUMBERS = {
  SUCCESS: '4242424242424242',
  DECLINE: '4000000000000002',
  INSUFFICIENT_FUNDS: '4000000000009995',
  EXPIRED: '4000000000000069',
  PROCESSING_ERROR: '4000000000000119'
};

// Helper function to format amount for display
export const formatAmount = (amount) => {
  return (amount / 100).toFixed(2);
};

// Helper function to generate order number
export const generateOrderNumber = () => {
  return `ORD-${Date.now().toString().substring(5)}`;
};
