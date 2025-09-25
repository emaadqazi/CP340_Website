import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TechStore</h1>
          <p>Discover the latest in technology and innovation</p>
          <a href="/my-ecommerce-site/products" className="cta-button">Shop Now</a>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose TechStore?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Quality Products</h3>
              <p>We offer only the highest quality tech products from trusted brands.</p>
            </div>
            <div className="feature">
              <h3>Fast Shipping</h3>
              <p>Get your orders delivered quickly with our express shipping options.</p>
            </div>
            <div className="feature">
              <h3>Expert Support</h3>
              <p>Our tech experts are here to help you make the right choice.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
