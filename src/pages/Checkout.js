import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';
import OrderConfirmation from '../components/OrderConfirmation';
import { stripePromise } from '../utils/stripeConfig';
import { trackBeginCheckout, trackPurchase } from '../services/analyticsService';
import { toast } from 'react-toastify';
// Firestore imports for saving orders
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/Checkout.css';
import '../styles/StripePayment.css';
import '../styles/OrderConfirmation.css';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth(); // Get current user for saving orders
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    shippingMethod: 'standard', // Default shipping method
    ecoPackaging: false, // Default eco-packaging option
    privacyPolicy: false // Privacy policy agreement
  });
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Shipping, 2 = Payment
  const [paymentFunction, setPaymentFunction] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Calculate shipping cost based on selected method
  const getShippingCost = () => {
    switch (formData.shippingMethod) {
      case 'express':
        return 9.99;
      case 'nextday':
        return 24.99;
      case 'standard':
      default:
        return 0;
    }
  };

  // Calculate total including shipping
  const subtotal = getTotalPrice();
  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSuccess = async (paymentIntentData) => {
    const orderId = `ORDER-${Date.now()}`;
    
    // Track purchase in analytics
    trackPurchase(items, total, orderId);
    
    // ============================================
    // SAVE ORDER TO FIRESTORE
    // ============================================
    // This creates a record of the order that users can view in their account
    try {
      const orderData = {
        // Link order to user (or 'guest' if not logged in)
        // user?.uid uses optional chaining - if user is null, returns undefined
        userId: user?.uid || 'guest',
        userEmail: user?.email || formData.email,
        
        // Order details - map items to only include needed fields
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category
        })),
        total: total,
        
        // Shipping information from the form
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          shippingMethod: formData.shippingMethod,
          ecoPackaging: formData.ecoPackaging
        },
        
        // Order metadata
        date: Timestamp.now(), // Firebase server timestamp
        status: 'confirmed',
        paymentId: paymentIntentData?.id || 'mock-payment'
      };
      
      // addDoc creates a new document with auto-generated ID
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('✅ Order saved with ID:', docRef.id);
      
    } catch (error) {
      // Log error but don't block success - order still went through
      console.error('Error saving order to Firestore:', error);
    }
    
    setPaymentIntent(paymentIntentData);
    setOrderDetails({
      items: items,
      total: total,
      shippingInfo: formData,
      orderId: orderId
    });
    setPaymentSuccess(true);
    clearCart();
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Error handling is done in the StripePaymentForm component
  };

  const handleProceedToPayment = (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validate all required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email ||
        !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      toast.error('Please fill out all shipping information fields before proceeding.', {
        toastId: 'shipping-validation-error',
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    // Validate privacy policy agreement
    if (!formData.privacyPolicy) {
      toast.error('Please agree to the Privacy Policy before proceeding.', {
        toastId: 'privacy-validation-error',
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    setCurrentStep(2);
  };

  const handleBackToShipping = () => {
    setCurrentStep(1);
  };

  const handlePaymentReady = (paymentFn, loading) => {
    setPaymentFunction(() => paymentFn);
    setIsPaymentLoading(loading);
  };

  const handlePayClick = async () => {
    if (paymentFunction) {
      await paymentFunction();
    }
  };

  // Track checkout start
  useEffect(() => {
    if (items.length > 0) {
      trackBeginCheckout(items, total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Redirect to products if cart is empty and not in success state
  useEffect(() => {
    if (items.length === 0 && !paymentSuccess) {
      navigate('/products');
    }
  }, [items.length, paymentSuccess, navigate]);

  // Show order confirmation if payment was successful
  if (paymentSuccess && orderDetails) {
    return <OrderConfirmation orderDetails={orderDetails} paymentIntent={paymentIntent} />;
  }

  // Show empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <h1>Checkout</h1>
          <div className="empty-checkout">
            <div className="empty-checkout-content">
              <h2>Your cart is empty</h2>
              <p>You need to add items to your cart before checkout.</p>
              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <h1>Secure Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-form">
            {currentStep === 1 && (
              <form onSubmit={handleProceedToPayment} noValidate>
              <div className="form-section">
                <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="shipping-method-section">
                <h3>Shipping Method</h3>
                <p className="shipping-subtitle">Choose your preferred delivery speed. Longer delivery times reduce carbon emissions.</p>
                
                <div className="shipping-options">
                  <label className={`shipping-option ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                    />
                    <div className="shipping-option-content">
                      <div className="shipping-header">
                        <span className="shipping-name">Standard Shipping</span>
                        <span className="shipping-price">FREE</span>
                      </div>
                      <div className="shipping-details">
                        <span className="shipping-time">7-10 business days</span>
                        <span className="eco-badge">♻️ Most Sustainable</span>
                      </div>
                    </div>
                  </label>

                  <label className={`shipping-option ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                    />
                    <div className="shipping-option-content">
                      <div className="shipping-header">
                        <span className="shipping-name">Express Shipping</span>
                        <span className="shipping-price">$9.99</span>
                      </div>
                      <div className="shipping-details">
                        <span className="shipping-time">3-5 business days</span>
                      </div>
                    </div>
                  </label>

                  <label className={`shipping-option ${formData.shippingMethod === 'nextday' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="nextday"
                      checked={formData.shippingMethod === 'nextday'}
                      onChange={handleInputChange}
                    />
                    <div className="shipping-option-content">
                      <div className="shipping-header">
                        <span className="shipping-name">Next Day Delivery</span>
                        <span className="shipping-price">$24.99</span>
                      </div>
                      <div className="shipping-details">
                        <span className="shipping-time">1-2 business days</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="eco-packaging-section">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="ecoPackaging"
                    checked={formData.ecoPackaging}
                    onChange={(e) => setFormData({...formData, ecoPackaging: e.target.checked})}
                  />
                  <span className="checkbox-label">
                    Use eco-friendly packaging (recycled materials) ♻️
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </button>
                <button type="submit" className="btn-primary">
                  Continue to Payment
                </button>
              </div>
              </div>
              </form>
            )}

            {currentStep === 2 && (
              <div className="form-section">
                <h2>Payment Information</h2>
                <button onClick={handleBackToShipping} className="back-btn">
                  ← Back to Shipping
                </button>
                      <Elements stripe={stripePromise}>
                        <StripePaymentForm
                          totalAmount={total}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                          onPaymentReady={handlePaymentReady}
                        />
                      </Elements>
              </div>
            )}

            <div className="privacy-agreement">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.privacyPolicy}
                  onChange={(e) => setFormData({...formData, privacyPolicy: e.target.checked})}
                />
                <span className="checkmark"></span>
                I agree to the <Link to="/privacy" target="_blank">Privacy Policy</Link> and understand how my data will be used and protected.
              </label>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {currentStep === 1 && (
                  <button onClick={handleProceedToPayment} className="proceed-to-payment-btn">
                    Proceed to Payment
                  </button>
                )}
                {currentStep === 2 && (
                  <button 
                    onClick={handlePayClick} 
                    disabled={isPaymentLoading || !paymentFunction}
                    className="pay-btn"
                  >
                    {isPaymentLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <span className="payment-icon">💳</span>
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
