import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ShopCP340</h3>
            <p>Your premier destination for cutting-edge technology products.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@shopcp340.com</p>
            <p>Phone: 1-800-SHOP-CP340</p>
            <div className="social-media">
              <Link to="/" className="social-icon" onClick={scrollToTop}>
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link to="/" className="social-icon" onClick={scrollToTop}>
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="/" className="social-icon" onClick={scrollToTop}>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/" className="social-icon" onClick={scrollToTop}>
                <i className="fab fa-facebook"></i>
              </Link>
              <Link to="/" className="social-icon" onClick={scrollToTop}>
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ShopCP340. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;