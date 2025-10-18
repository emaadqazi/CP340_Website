import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';
import OrderConfirmation from '../components/OrderConfirmation';
import { stripePromise } from '../utils/stripeConfig';
import '../styles/Checkout.css';
import '../styles/StripePayment.css';
import '../styles/OrderConfirmation.css';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSuccess = (paymentIntentData) => {
    setPaymentIntent(paymentIntentData);
    setOrderDetails({
      items: items,
      total: total,
      shippingInfo: formData
    });
    setPaymentSuccess(true);
    clearCart();
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Error handling is done in the StripePaymentForm component
  };

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
                    required
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
                    required
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
                  required
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
                  required
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
                  required
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
                    required
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
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <Elements stripe={stripePromise}>
                <StripePaymentForm 
                  totalAmount={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </Elements>
            </div>

            <div className="privacy-agreement">
              <label className="checkbox-label">
                <input type="checkbox" required />
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
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
