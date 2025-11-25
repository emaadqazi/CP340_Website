import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    checkRateLimit, 
    recordFailedAttempt, 
    clearAttempts, 
    formatLockoutTime 
} from '../utils/rateLimiter';
import '../styles/Auth.css'; // Styling

function Login() {
    // State Management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Rate limiting state
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutTime, setLockoutTime] = useState(0);
    const [attemptsLeft, setAttemptsLeft] = useState(5);

    // Hooks
    const { login, loginWithGoogle, continueAsGuest, user, isGuest } = useAuth();
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
    // RATE LIMIT TIMER
    // Updates countdown every second when locked out
    // ============================================
    useEffect(() => {
        let timer;
        if (isLocked && lockoutTime > 0) {
            timer = setInterval(() => {
                setLockoutTime(prev => {
                    if (prev <= 1000) {
                        setIsLocked(false);
                        setAttemptsLeft(5);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLocked, lockoutTime]);

    // ============================================
    // CHECK RATE LIMIT ON EMAIL CHANGE
    // ============================================
    useEffect(() => {
        if (email) {
            const status = checkRateLimit(email);
            setIsLocked(status.isLocked);
            setLockoutTime(status.remainingTime);
            setAttemptsLeft(status.attemptsLeft);
        }
    }, [email]);

    // ============================================
    // EMAIL/PASSWORD LOGIN WITH RATE LIMITING
    // ============================================
    async function handleSubmit(e) {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return; // Stop execution & do not try to log user in
        }

        // Check rate limit before attempting login
        const rateLimitStatus = checkRateLimit(email);
        if (rateLimitStatus.isLocked) {
            setIsLocked(true);
            setLockoutTime(rateLimitStatus.remainingTime);
            setError(`Too many failed attempts. Please try again in ${formatLockoutTime(rateLimitStatus.remainingTime)}.`);
            return;
        }

        try {
            setError(''); // Clear previous errors 
            setLoading(true);
            await login(email, password); // Call Firebase login via AuthContext
            
            // Clear rate limit attempts on successful login
            clearAttempts(email);

            navigate('/home'); // Redirect user to home page if they succeed
        } catch (err) {
            console.log("Login error:", err.code, err.message);
            
            // Record failed attempt for rate limiting
            const result = recordFailedAttempt(email);
            setAttemptsLeft(result.attemptsLeft);
            
            if (result.isNowLocked) {
                setIsLocked(true);
                setLockoutTime(result.remainingTime);
                setError(`Account locked due to too many failed attempts. Please try again in ${formatLockoutTime(result.remainingTime)}.`);
                return;
            }
            
            // Show attempts remaining warning
            const attemptsWarning = result.attemptsLeft <= 2 
                ? ` (${result.attemptsLeft} attempt${result.attemptsLeft !== 1 ? 's' : ''} remaining)`
                : '';
            
            switch (err.code) {
                case 'auth/user-not-found':
                    setError(`No account found with this email.${attemptsWarning}`);
                    break;
                case 'auth/wrong-password':
                    setError(`Incorrect password.${attemptsWarning}`);
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                case 'auth/too-many-requests':
                    // Firebase's built-in rate limiting kicked in
                    setError('Too many failed attempts. Please try again later.');
                    break;
                case 'auth/invalid-credential':
                    setError(`Invalid email or password.${attemptsWarning}`);
                    break;
                default:
                    // Fallback for any other errors
                    setError(`Failed to log in.${attemptsWarning}`);
            }
        } finally {
            setLoading(false);
        }
    }

    // ============================================
    // GOOGLE SIGN-IN
    // ============================================
    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/home'); // Redirect to home after Google login
        } catch (err) {
            console.log("Google sign-in error:", err.code, err.message);
            switch (err.code) {
                case 'auth/popup-closed-by-user':
                    setError('Sign-in cancelled. Please try again.');
                    break;
                case 'auth/popup-blocked':
                    setError('Popup was blocked. Please allow popups for this site.');
                    break;
                default:
                    setError('Failed to sign in with Google. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    // ============================================
    // CONTINUE AS GUEST
    // ============================================
    function handleGuestContinue() {
        continueAsGuest();
        navigate('/home'); // Redirect to home as guest
    }

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
                
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">Sign in to access your account</p>

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
                            placeholder="Enter your password"
                            required
                            disabled={loading}                        
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="auth-button"
                        disabled={loading || isLocked}
                    >
                        {loading ? 'Logging in...' : isLocked ? `Locked (${formatLockoutTime(lockoutTime)})` : 'Login'}
                    </button>
                </form>

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
                    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>

                {/* Link to Signup */}
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>

                {/* Guest Option */}
                <div className="guest-option">
                    <button 
                        type="button"
                        className="guest-button"
                        onClick={handleGuestContinue}
                        disabled={loading}
                    >
                        Continue as Guest
                    </button>
                    <p className="guest-note">Browse products without an account</p>
                </div>
            </div>
        </div>
    );
}

export default Login;