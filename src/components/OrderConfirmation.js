import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ orderDetails, paymentIntent }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-header">
            <div className="success-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p className="success-message">
              Thank you for your purchase! Your order has been successfully processed and confirmed.
            </p>
          </div>

          <div className="order-details">
            <div className="order-info-card">
              <h2>Order Information</h2>
              <div className="order-info-grid">
                <div className="info-item">
                  <label>Order Number:</label>
                  <span className="order-number">
                    #{paymentIntent?.id?.substring(3, 15) || 'ORD-' + Date.now()}
                  </span>
                </div>
                <div className="info-item">
                  <label>Order Date:</label>
                  <span>{formatDate(new Date())}</span>
                </div>
                <div className="info-item">
                  <label>Payment Status:</label>
                  <span className="payment-status success">
                    {paymentIntent?.status === 'succeeded' ? 'Paid' : 'Confirmed'}
                  </span>
                </div>
                <div className="info-item">
                  <label>Payment Method:</label>
                  <span>Credit Card ending in ****{paymentIntent?.charges?.data?.[0]?.payment_method_details?.card?.last4 || '4242'}</span>
                </div>
                <div className="info-item">
                  <label>Total Amount:</label>
                  <span className="total-amount">
                    ${((paymentIntent?.amount || orderDetails?.total || 0) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="order-items-card">
              <h2>Order Items</h2>
              <div className="items-list">
                {orderDetails?.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="item-quantity">Quantity: {item.quantity}</div>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shipping-info-card">
              <h2>Shipping Information</h2>
              <div className="shipping-details">
                <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                <p><strong>Shipping Method:</strong> Standard Shipping (FREE)</p>
                <p><strong>Tracking:</strong> You will receive a tracking number via email once your order ships.</p>
              </div>
            </div>

            <div className="next-steps-card">
              <h2>What's Next?</h2>
              <div className="next-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Order Processing</h3>
                    <p>We'll prepare your order for shipment within 1-2 business days.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Shipping Notification</h3>
                    <p>You'll receive an email with tracking information when your order ships.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Delivery</h3>
                    <p>Your order will arrive within 3-5 business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <Link to="/blog" className="blog-link">
              Read Our Blog
            </Link>
          </div>

          <div className="support-info">
            <h3>Need Help?</h3>
            <p>
              If you have any questions about your order, please contact our customer support team.
            </p>
            <div className="contact-info">
              <span>📧 support@shopcp340.com</span>
              <span>📞 1-800-SHOP-CP340</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
