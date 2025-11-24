import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from 'firebase/auth';
import { auth } from '../config/firebase'; // importing auth instance

const AuthContext = createContext();

// Google Auth Provider instance
const googleProvider = new GoogleAuthProvider();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Guest mode state - allows users to browse without account
    const [isGuest, setIsGuest] = useState(false);

    // ============================================
    // EMAIL/PASSWORD SIGNUP
    // Creates account and sends verification email (2FA)
    // ============================================
    async function signup(email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Send verification email for 2FA
        // User must verify email before accessing certain features
        await sendEmailVerification(userCredential.user);
        
        return userCredential;
    }

    // ============================================
    // EMAIL/PASSWORD LOGIN
    // ============================================
    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ============================================
    // GOOGLE SIGN-IN
    // Opens Google popup for authentication
    // ============================================
    async function loginWithGoogle() {
        // signInWithPopup opens a popup window for Google login
        // User selects their Google account
        // Firebase handles all OAuth complexity
        return signInWithPopup(auth, googleProvider);
    }

    // ============================================
    // LOGOUT
    // Signs out from Firebase (works for both email and Google)
    // ============================================
    async function logout() {
        setIsGuest(false); // Clear guest mode on logout
        return signOut(auth);
    }

    // ============================================
    // CONTINUE AS GUEST
    // Allows browsing without creating an account
    // ============================================
    function continueAsGuest() {
        setIsGuest(true);
    }

    // ============================================
    // RESEND VERIFICATION EMAIL
    // For users who didn't receive or lost their verification email
    // ============================================
    async function resendVerificationEmail() {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            return sendEmailVerification(auth.currentUser);
        }
        throw new Error('No user to verify or already verified');
    }

    // ============================================
    // CHECK IF EMAIL IS VERIFIED
    // Returns true if user verified their email (2FA complete)
    // ============================================
    function isEmailVerified() {
        return auth.currentUser?.emailVerified || false;
    }

    // ============================================
    // AUTH STATE LISTENER
    // Runs whenever authentication state changes
    // ============================================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
            // If user logs in, clear guest mode
            if (currentUser) {
                setIsGuest(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        user, 
        loading,
        isGuest,
        signup,
        login,
        loginWithGoogle,
        logout,
        continueAsGuest,
        resendVerificationEmail,
        isEmailVerified
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 