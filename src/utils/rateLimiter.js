/**
 * ============================================
 * RATE LIMITER UTILITY
 * ============================================
 * 
 * Security Feature: Login Attempt Limits
 * 
 * This utility implements client-side rate limiting to prevent:
 * - Brute force attacks on login
 * - Password guessing attempts
 * - Automated bot attacks
 * 
 * HOW IT WORKS:
 * 1. Tracks failed login attempts per email address
 * 2. After MAX_ATTEMPTS (5) failures, locks account for LOCKOUT_DURATION (15 min)
 * 3. Successful login resets the attempt counter
 * 4. Data stored in localStorage (persists across page refreshes)
 * 
 * SECURITY BENEFITS:
 * - Slows down attackers trying to guess passwords
 * - Protects user accounts from unauthorized access
 * - Provides clear feedback to legitimate users
 * 
 * NOTE: Firebase also has built-in rate limiting (auth/too-many-requests)
 * This provides an additional layer of protection on the client side
 */

// Configuration constants
const MAX_ATTEMPTS = 5;                    // Number of failed attempts before lockout
const LOCKOUT_DURATION = 15 * 60 * 1000;   // 15 minutes in milliseconds
const STORAGE_KEY = 'loginAttempts';       // localStorage key

/**
 * Get login attempts data from localStorage
 * @returns {Object} Map of email -> { attempts, lockoutUntil }
 */
function getAttemptsData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Error reading rate limit data:', e);
        return {};
    }
}

/**
 * Save login attempts data to localStorage
 * @param {Object} data - The attempts data to save
 */
function saveAttemptsData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving rate limit data:', e);
    }
}

/**
 * Check if an email address is currently locked out
 * @param {string} email - The email to check
 * @returns {Object} { isLocked: boolean, remainingTime: number (ms), attemptsLeft: number }
 */
export function checkRateLimit(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const attemptsData = getAttemptsData();
    const userAttempts = attemptsData[normalizedEmail];
    
    // No previous attempts recorded
    if (!userAttempts) {
        return {
            isLocked: false,
            remainingTime: 0,
            attemptsLeft: MAX_ATTEMPTS
        };
    }
    
    const now = Date.now();
    
    // Check if lockout period has expired
    if (userAttempts.lockoutUntil && now < userAttempts.lockoutUntil) {
        return {
            isLocked: true,
            remainingTime: userAttempts.lockoutUntil - now,
            attemptsLeft: 0
        };
    }
    
    // Lockout expired, reset attempts
    if (userAttempts.lockoutUntil && now >= userAttempts.lockoutUntil) {
        delete attemptsData[normalizedEmail];
        saveAttemptsData(attemptsData);
        return {
            isLocked: false,
            remainingTime: 0,
            attemptsLeft: MAX_ATTEMPTS
        };
    }
    
    // Return current status
    return {
        isLocked: false,
        remainingTime: 0,
        attemptsLeft: MAX_ATTEMPTS - (userAttempts.attempts || 0)
    };
}

/**
 * Record a failed login attempt
 * @param {string} email - The email that failed to login
 * @returns {Object} { isNowLocked: boolean, remainingTime: number, attemptsLeft: number }
 */
export function recordFailedAttempt(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const attemptsData = getAttemptsData();
    
    // Initialize or increment attempts
    if (!attemptsData[normalizedEmail]) {
        attemptsData[normalizedEmail] = { attempts: 1, lockoutUntil: null };
    } else {
        attemptsData[normalizedEmail].attempts += 1;
    }
    
    const currentAttempts = attemptsData[normalizedEmail].attempts;
    
    // Check if we need to trigger a lockout
    if (currentAttempts >= MAX_ATTEMPTS) {
        attemptsData[normalizedEmail].lockoutUntil = Date.now() + LOCKOUT_DURATION;
        saveAttemptsData(attemptsData);
        
        return {
            isNowLocked: true,
            remainingTime: LOCKOUT_DURATION,
            attemptsLeft: 0
        };
    }
    
    saveAttemptsData(attemptsData);
    
    return {
        isNowLocked: false,
        remainingTime: 0,
        attemptsLeft: MAX_ATTEMPTS - currentAttempts
    };
}

/**
 * Clear login attempts after successful login
 * @param {string} email - The email that successfully logged in
 */
export function clearAttempts(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const attemptsData = getAttemptsData();
    
    if (attemptsData[normalizedEmail]) {
        delete attemptsData[normalizedEmail];
        saveAttemptsData(attemptsData);
    }
}

/**
 * Format remaining lockout time for display
 * @param {number} ms - Remaining time in milliseconds
 * @returns {string} Formatted time string (e.g., "14 minutes 30 seconds")
 */
export function formatLockoutTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (minutes > 0) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

/**
 * Get rate limit configuration (for display purposes)
 * @returns {Object} { maxAttempts, lockoutDuration }
 */
export function getRateLimitConfig() {
    return {
        maxAttempts: MAX_ATTEMPTS,
        lockoutDurationMinutes: LOCKOUT_DURATION / 60000
    };
}
