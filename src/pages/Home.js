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
          <h1>Welcome to ShopCP340</h1>
          <p>Discover the perfect technology tools and gadgets designed to boost your academic performance and study productivity</p>
          <Link to="/products" className="cta-button">Shop Student Tech</Link>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose Our Store?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Student-Focused Technology</h3>
              <p>We curate technology products specifically designed to enhance your studying experience and academic productivity.</p>
            </div>
            <div className="feature">
              <h3>Fast & Free Shipping</h3>
              <p>Get your study essentials delivered quickly to your dorm or apartment with our express shipping options.</p>
            </div>
            <div className="feature">
              <h3>Student Technology Experts</h3>
              <p>Our team understands student needs and helps you choose the perfect tech tools for your academic success.</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;