import React from 'react';
import { getCurrentDate } from '../utils/dateUtils';
import '../styles/Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy">
      <div className="container">
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <p><strong>Last Updated:</strong> September 28th, 2025</p>
          
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:</p>
          <ul>
            <li>Personal identification information (name, email address, phone number)</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely through encrypted channels)</li>
            <li>Purchase history and preferences</li>
            <li>Communication records and support interactions</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and fulfill orders</li>
            <li>Communicate with you about your orders and our services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Analyze website usage and improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:</p>
          <ul>
            <li>Payment processors for transaction processing</li>
            <li>Shipping companies for order fulfillment</li>
            <li>Service providers who assist in website operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
          
          <h2>Payment Security Settings</h2>
          <p>We take payment security seriously and implement multiple layers of protection:</p>
          <ul>
            <li><strong>SSL Encryption:</strong> All payment data is transmitted using 256-bit SSL encryption</li>
            <li><strong>PCI Compliance:</strong> We follow Payment Card Industry (PCI) security standards</li>
            <li><strong>Tokenization:</strong> Sensitive payment information is tokenized and never stored in plain text</li>
            <li><strong>Fraud Detection:</strong> Advanced fraud detection systems monitor all transactions</li>
            <li><strong>Secure Processing:</strong> Payment processing is handled by certified third-party providers</li>
            <li><strong>Data Minimization:</strong> We only collect payment information necessary for transaction processing</li>
          </ul>
          
          <h2>Privacy Policies for Offered Items</h2>
          <p>Our product offerings include various electronics and accessories. For each product category:</p>
          <ul>
            <li><strong>Product Data:</strong> We collect and store product specifications, images, and descriptions</li>
            <li><strong>Inventory Tracking:</strong> Stock levels and availability are monitored for accurate fulfillment</li>
            <li><strong>Product Reviews:</strong> Customer reviews and ratings are collected with consent</li>
            <li><strong>Warranty Information:</strong> Product warranty details are maintained for customer support</li>
            <li><strong>Return/Exchange Data:</strong> Return and exchange information is tracked for quality assurance</li>
          </ul>
          
          <h2>Data Security</h2>
          <p>We implement comprehensive security measures to protect your personal information:</p>
          <ul>
            <li>Encrypted data transmission and storage</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication protocols</li>
            <li>Secure server infrastructure</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
          </ul>
          
          <h2>Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Enhance your browsing experience</li>
            <li>Remember your preferences and settings</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Provide personalized content and recommendations</li>
          </ul>
          <p>You can control cookie settings in your browser, though some features may not function properly if cookies are disabled.</p>
          
          <h2>External Data References</h2>
          <p>This website may reference external data sources and materials:</p>
          <ul>
            <li><strong>Product Images:</strong> Product images are sourced from manufacturers and suppliers</li>
            <li><strong>Technical Specifications:</strong> Product specifications are based on manufacturer data</li>
            <li><strong>Third-party APIs:</strong> We may use external APIs for enhanced functionality</li>
            <li><strong>Fonts and Icons:</strong> Google Fonts and other external resources are used for design</li>
          </ul>
          <p>All external data sources are properly attributed and used in accordance with their respective licenses and terms of use.</p>
          
          <h2>Rights Reserved for Public Publication</h2>
          <p>If this website is published publicly, the following rights are reserved:</p>
          <ul>
            <li><strong>Intellectual Property:</strong> All original content, design, and code remain the property of the website owner</li>
            <li><strong>Commercial Use:</strong> The website design and functionality may not be used for commercial purposes without permission</li>
            <li><strong>Attribution:</strong> Any use of this website's design or code must include proper attribution</li>
            <li><strong>Modification Rights:</strong> The owner reserves the right to modify or remove content at any time</li>
            <li><strong>Privacy Compliance:</strong> Users must comply with all privacy policies and terms of use</li>
          </ul>
          
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, your data rights, or our privacy practices, please contact us at:</p>
          <ul>
            <li>Email: privacy@shopcp340.com</li>
            <li>Phone: 1-800-SHOP-CP340</li>
            <li>Address: ShopCP340 Privacy Department, 123 Commerce Street, Tech City, TC 12345</li>
          </ul>
          
          <h2>Policy Updates</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;