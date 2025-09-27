import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>About ShopCP340</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, ShopCP340 emerged from a passion for making cutting-edge technology 
              accessible to everyone. We believe that innovation should enhance lives, and our 
              carefully curated selection reflects this philosophy.
            </p>
            <p>
              Our team consists of technology enthusiasts and industry experts who are dedicated 
              to providing you with the latest and greatest in tech products. From smartphones 
              to smart home devices, we've got everything you need to stay connected and productive.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              To democratize access to innovative technology by providing high-quality products, 
              expert guidance, and exceptional customer service. We're not just selling products; 
              we're building a community of tech enthusiasts.
            </p>
            
            <h2>Our Values</h2>
            <ul>
              <li><strong>Innovation:</strong> We constantly seek the latest technological advances</li>
              <li><strong>Quality:</strong> Every product meets our rigorous standards</li>
              <li><strong>Customer Focus:</strong> Your satisfaction is our top priority</li>
              <li><strong>Sustainability:</strong> We promote eco-friendly tech solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;