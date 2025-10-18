import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS } from '../utils/seoUtils';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description={DEFAULT_DESCRIPTIONS.home}
        keywords={SEO_KEYWORDS.home}
        url="/"
        type="website"
      />
      <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopCP340 - Your Trusted Technology Products Store</h1>
          <p>Discover the latest technology products, electronics, and innovative gadgets at affordable prices</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose Our Technology Products Store?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Premium Quality Electronics</h3>
              <p>We offer only the highest quality technology products and electronics from trusted brands.</p>
            </div>
            <div className="feature">
              <h3>Fast & Free Shipping</h3>
              <p>Get your technology products and electronics delivered quickly with our express shipping options.</p>
            </div>
            <div className="feature">
              <h3>Expert Technology Support</h3>
              <p>Our technology experts are here to help you make the right choice for all your electronics needs.</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;