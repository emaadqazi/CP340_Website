import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Signup() {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Confirm password - extra field to prevent typos
    // User must type password twice and they must match
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // ============================================
    // HOOKS
    // ============================================
    
    // Get signup function (not login - different operation)
    const { signup } = useAuth();
    const navigate = useNavigate();

    // ============================================
    // FORM SUBMISSION HANDLER
    // ============================================
    
    async function handleSubmit(e) {
        e.preventDefault();

        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------
        
        // Check all fields are filled
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }
        
        // PASSWORD MATCH CHECK
        // This happens client-side before we even talk to Firebase
        // Saves a network request if passwords don't match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        // PASSWORD STRENGTH CHECK (optional but good practice)
        // Firebase requires minimum 6 characters, but we can enforce more
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // ----------------------------------------
        // ATTEMPT SIGNUP
        // ----------------------------------------
        
        try {
            setError('');
            setLoading(true);
            
            // Create new user in Firebase Auth
            // This also automatically logs them in!
            // The onAuthStateChanged listener in AuthContext will detect this
            await signup(email, password);
            
            // Redirect to account page
            navigate('/account');
            
        } catch (err) {
            // ----------------------------------------
            // ERROR HANDLING
            // ----------------------------------------
            
            console.error('Signup error:', err.code, err.message);
            
            switch (err.code) {
                case 'auth/email-already-in-use':
                    // Email is unique identifier - can't have duplicates
                    setError('An account with this email already exists. Please log in.');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                case 'auth/weak-password':
                    // Firebase's built-in password strength check
                    setError('Password is too weak. Please use at least 6 characters.');
                    break;
                case 'auth/operation-not-allowed':
                    // This means Email/Password auth isn't enabled in Firebase Console
                    setError('Email/password accounts are not enabled. Contact support.');
                    break;
                default:
                    setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    // ============================================
    // RENDER
    // ============================================
    
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join ShopCP340 today</p>
                
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    
                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    {/* Confirm Password Input */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                
                {/* Link to Login */}
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
