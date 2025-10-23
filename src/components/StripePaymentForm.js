import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { simulatePaymentProcessing } from '../utils/mockPaymentService';

const StripePaymentForm = ({ totalAmount, onPaymentSuccess, onPaymentError, onPaymentReady }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Expose the payment function to parent component
  const processPayment = async () => {
    setIsLoading(true);
    setPaymentError(null);

    try {
      // For demo purposes, we'll simulate the payment process
      // In a real application, you would create a payment intent on your backend
      // and then confirm it with Stripe
      
      const result = await simulatePaymentProcessing({
        amount: totalAmount
      });

      if (result.success) {
        // Payment succeeded
        onPaymentSuccess && onPaymentSuccess(result.paymentIntent);
        toast.success('Payment successful! Your order has been processed.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Payment failed
        const errorMessage = result.error || 'Payment failed';
        setPaymentError(errorMessage);
        onPaymentError && onPaymentError(result.error);
        toast.error(`Payment failed: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setPaymentError(errorMessage);
      onPaymentError && onPaymentError(err);
      toast.error(`Payment error: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Expose payment function to parent component
  React.useEffect(() => {
    if (onPaymentReady) {
      onPaymentReady(processPayment, isLoading);
    }
  }, [processPayment, isLoading]);

  return (
    <div className="stripe-payment-form">
      <div className="payment-header">
        <h3>Secure Payment</h3>
        <p>Complete your purchase using our secure payment system</p>
        <div className="security-badge">
          <span className="security-icon">🔒</span>
          <span>Secured by Stripe</span>
        </div>
      </div>

      <div className="payment-form">
        <div className="payment-element-container">
          <div className="demo-payment-notice">
            <h4>Demo Payment Form</h4>
            <p>This is a demonstration payment form. In a real application, this would be replaced with Stripe's secure PaymentElement.</p>
            <div className="demo-card-info">
              <p><strong>Test Card:</strong> 4242 4242 4242 4242</p>
              <p><strong>Expiry:</strong> Any future date (e.g., 12/25)</p>
              <p><strong>CVC:</strong> Any 3 digits (e.g., 123)</p>
            </div>
          </div>
        </div>

        {paymentError && (
          <div className="payment-error">
            <span className="error-icon">⚠️</span>
            <span>{paymentError}</span>
          </div>
        )}

        {isLoading && (
          <div className="payment-processing">
            <span className="loading-spinner"></span>
            Processing Payment...
          </div>
        )}

        <div className="payment-info">
          <p className="test-mode-notice">
            <strong>Test Mode:</strong> Use test card number 4242 4242 4242 4242 with any future expiry date and CVC.
          </p>
          <div className="accepted-cards">
            <span>We accept:</span>
            <div className="card-icons">
              <span className="card-icon">💳</span>
              <span className="card-icon">💳</span>
              <span className="card-icon">💳</span>
              <span className="card-icon">💳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentForm;
