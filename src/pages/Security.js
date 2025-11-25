import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getRateLimitConfig } from '../utils/rateLimiter';
import '../styles/Security.css';

/**
 * ============================================
 * SECURITY FEATURES PAGE
 * ============================================
 * 
 * This page documents all implemented security features
 * for the E-Commerce Security Enhancement requirement.
 * 
 * Implemented Security Measures:
 * 1. Two-Factor Authentication (Email Verification)
 * 2. Login Attempt Limits (Rate Limiting)
 * 3. SSL Certificate (GitHub Pages HTTPS)
 * 4. Firebase Security Rules
 */

function Security() {
    const { user, isEmailVerified } = useAuth();
    const rateLimitConfig = getRateLimitConfig();

    return (
        <div className="security-page">
            <div className="container">
                <h1>Security Features</h1>
                <p className="security-intro">
                    ShopCP340 implements multiple layers of security to protect your account and data.
                </p>

                {/* Security Features Grid */}
                <div className="security-grid">
                    
                    {/* 1. Two-Factor Authentication */}
                    <div className="security-card">
                        <div className="security-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2>Two-Factor Authentication</h2>
                        <p className="security-description">
                            Email verification is required for all new accounts. When you sign up, 
                            a verification email is sent to confirm your identity before accessing 
                            account features.
                        </p>
                        <div className="security-status">
                            <strong>Your Status:</strong>
                            {user ? (
                                isEmailVerified() ? (
                                    <span className="status-verified">✓ Email Verified</span>
                                ) : (
                                    <span className="status-pending">⚠ Verification Pending</span>
                                )
                            ) : (
                                <span className="status-na">Not logged in</span>
                            )}
                        </div>
                        <ul className="security-details">
                            <li>Firebase Authentication handles email verification</li>
                            <li>Verification links expire after 24 hours</li>
                            <li>Users can request new verification emails</li>
                        </ul>
                    </div>

                    {/* 2. Login Attempt Limits */}
                    <div className="security-card">
                        <div className="security-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2>Login Attempt Limits</h2>
                        <p className="security-description">
                            To prevent brute force attacks, login attempts are limited. After multiple 
                            failed attempts, the account is temporarily locked.
                        </p>
                        <div className="security-config">
                            <div className="config-item">
                                <span className="config-label">Max Attempts:</span>
                                <span className="config-value">{rateLimitConfig.maxAttempts}</span>
                            </div>
                            <div className="config-item">
                                <span className="config-label">Lockout Duration:</span>
                                <span className="config-value">{rateLimitConfig.lockoutDurationMinutes} minutes</span>
                            </div>
                        </div>
                        <ul className="security-details">
                            <li>Client-side rate limiting tracks failed attempts</li>
                            <li>Firebase provides additional server-side protection</li>
                            <li>Successful login resets the attempt counter</li>
                            <li>Protects against automated password guessing</li>
                        </ul>
                    </div>

                    {/* 3. SSL/HTTPS */}
                    <div className="security-card">
                        <div className="security-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2>SSL Certificate (HTTPS)</h2>
                        <p className="security-description">
                            All connections to ShopCP340 are encrypted using SSL/TLS certificates 
                            provided by GitHub Pages, ensuring data privacy during transmission.
                        </p>
                        <div className="security-status">
                            <strong>Connection:</strong>
                            <span className="status-verified">✓ Secure (HTTPS)</span>
                        </div>
                        <ul className="security-details">
                            <li>GitHub Pages enforces HTTPS by default</li>
                            <li>All data encrypted in transit</li>
                            <li>Prevents man-in-the-middle attacks</li>
                            <li>Browser shows secure padlock icon</li>
                        </ul>
                    </div>

                    {/* 4. Firebase Security */}
                    <div className="security-card">
                        <div className="security-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2>Firebase Security Rules</h2>
                        <p className="security-description">
                            Firestore database access is controlled by security rules that ensure 
                            users can only access their own data.
                        </p>
                        <ul className="security-details">
                            <li>Users can only read/write their own orders</li>
                            <li>Reviews require authentication to submit</li>
                            <li>Server-side validation of all operations</li>
                            <li>Protection against unauthorized data access</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Security;
