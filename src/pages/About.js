import React from 'react';
import SEO from '../components/SEO';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS, generateOrganizationStructuredData } from '../utils/seoUtils';
import '../styles/About.css';

const About = () => {
  const structuredData = generateOrganizationStructuredData();
  
  return (
    <>
      <SEO
        title="About Us"
        description={DEFAULT_DESCRIPTIONS.about}
        keywords={SEO_KEYWORDS.about}
        url="/about"
        type="website"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="about">
      <div className="container">
        <h1>About ShopCP340</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, ShopCP340 emerged from a passion for making cutting-edge technology 
              accessible to students everywhere. We firmly believe that the right technology can make a significant 
              impact on your academic performance and productivity, and our carefully curated selection reflects this philosophy.
            </p>
            <p>
              Our team consists of 4 Computer Science students from Wilfrid Laurier University, who are committed 
              to enhancing your productivity and academic success. We provide the best customer service with the latest 
              and greatest tech products designed specifically for students. From powerful laptops and ultrawide monitors 
              to noise-cancelling headphones and essential accessories, we have everything you need to excel in your studies 
              and maximize your academic performance.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              To empower students by democratizing access to innovative technology that enhances productivity and academic performance. 
              We provide high-quality products, expert guidance, and exceptional customer service specifically tailored for student needs. 
              We're not just selling products; we're building a community of student tech enthusiasts committed to academic excellence 
              and enhanced productivity.
            </p>
            
            <h2>Our Values</h2>
            <ul>
              <li><strong>Student Success:</strong> We're committed to enhancing your productivity and academic performance</li>
              <li><strong>Innovation:</strong> We constantly seek the latest technological advances for student needs</li>
              <li><strong>Quality:</strong> Every product meets our rigorous standards for student productivity</li>
              <li><strong>Student Focus:</strong> Your academic success and satisfaction is our top priority</li>
              <li><strong>Sustainability:</strong> We promote eco-friendly tech solutions for the next generation</li>
            </ul>
            
            <h2>Our Commitment to Sustainability</h2>
            <p>
              At ShopCP340, sustainability isn't just an optional feature. It's a core part of how we operate. 
              As an e-commerce business, we understand the significant environmental impact that non-reusable, 
              unethical packaging can have. That's why we've taken meaningful steps to ensure our practices 
              are as eco-friendly as possible.
            </p>
            <p>
              One of the most impactful ways we support sustainability is through our packaging. We've partnered 
              with trusted suppliers including <strong>Pulp Shred</strong>, <strong>EcoEnclose</strong>, and 
              <strong> Better Packaging Co.</strong>; all of whom share our commitment to environmental responsibility. 
              Each supplier provides recyclable, compostable, or biodegradable packaging materials, ensuring that 
              every order we ship reflects our dedication to reducing waste.
            </p>
            <p>
              We believe that even small changes can create a lasting impact. By choosing suppliers who align 
              with our values, we're not just delivering products... We're contributing to a greener future. 
              ShopCP340 is proud to promote eco-friendly practices and demonstrate to our customers that 
              sustainability and quality can go hand in hand.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default About;