import React, { useState, useEffect } from 'react';
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

    // Get auth functions from context
    const { signup, loginWithGoogle, continueAsGuest, user, isGuest } = useAuth();
    const navigate = useNavigate();

    // ============================================
    // REDIRECT IF ALREADY LOGGED IN
    // ============================================
    useEffect(() => {
        // If user is logged in (and not a guest), redirect to home
        if (user && !isGuest) {
            navigate('/home');
        }
    }, [user, isGuest, navigate]);

    // ============================================
    // GOOGLE SIGN-IN HANDLER
    // ============================================
    
    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/home');
        } catch (err) {
            console.error('Google sign-in error:', err.code, err.message);
            
            // Handle popup-specific errors
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Sign-in cancelled. Please try again.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('Popup was blocked. Please allow popups for this site.');
            } else {
                setError('Failed to sign in with Google. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    // ============================================
    // GUEST CONTINUE HANDLER
    // ============================================
    
    function handleGuestContinue() {
        continueAsGuest();
        navigate('/home');
    }

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
        <div className="auth-page-standalone">
            {/* Animated background lines */}
            <div className="auth-bg-animation">
                <div className="auth-line auth-line-1"></div>
                <div className="auth-line auth-line-2"></div>
                <div className="auth-line auth-line-3"></div>
                <div className="auth-line auth-line-4"></div>
            </div>
            
            <div className="auth-container">
                {/* Logo */}
                <div className="auth-logo">
                    <span>ShopCP340</span>
                </div>
                
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
                
                {/* Divider */}
                <div className="auth-divider">
                    <span>or</span>
                </div>
                
                {/* Google Sign-In Button */}
                <button 
                    type="button"
                    className="google-button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.48 0 2.438 2.017.956 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
                    </svg>
                    Continue with Google
                </button>
                
                {/* Link to Login */}
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                
                {/* Guest Option */}
                <div className="guest-option">
                    <button 
                        type="button"
                        className="guest-button"
                        onClick={handleGuestContinue}
                    >
                        Continue as Guest
                    </button>
                    <small className="guest-note">Browse products without an account</small>
                </div>
            </div>
        </div>
    );
}

export default Signup;
