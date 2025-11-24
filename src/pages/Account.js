import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Firestore imports for fetching order history
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

import '../styles/Auth.css';

function Account() {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    // Orders array - will hold user's order history
    const [orders, setOrders] = useState([]);
    
    // Loading state for orders fetch
    const [ordersLoading, setOrdersLoading] = useState(true);
    
    // Error state for logout or fetch failures
    const [error, setError] = useState('');

    // ============================================
    // HOOKS
    // ============================================
    
    // Get user object and logout function from AuthContext
    // user.email, user.uid are the properties we'll use
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // ============================================
    // REDIRECT IF NOT LOGGED IN
    // ============================================
    
    // This is a "protected route" pattern
    // If someone navigates to /account without being logged in, send them to login
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // ============================================
    // FETCH ORDER HISTORY
    // ============================================
    
    useEffect(() => {
        // Only fetch if user is logged in
        if (!user) return;

        async function fetchOrders() {
            try {
                // Build a Firestore query:
                // 1. collection(db, 'orders') - target the 'orders' collection
                // 2. where('userId', '==', user.uid) - only get THIS user's orders
                // 3. orderBy('date', 'desc') - newest first
                
                // Note: We use just where() without orderBy() to avoid needing a composite index
                // Then sort client-side instead
                const ordersQuery = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid)
                );

                // Execute the query
                const querySnapshot = await getDocs(ordersQuery);

                // Transform Firestore documents into usable objects
                // doc.id = auto-generated document ID
                // doc.data() = the actual data we stored
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort client-side (newest first) to avoid needing composite index
                ordersData.sort((a, b) => {
                    const dateA = a.date?.seconds || 0;
                    const dateB = b.date?.seconds || 0;
                    return dateB - dateA;
                });

                setOrders(ordersData);
            } catch (err) {
                console.error('Error fetching orders:', err);
                // Don't show error for index not found - just means no orders yet
                // Firebase sometimes requires composite indexes for complex queries
            } finally {
                setOrdersLoading(false);
            }
        }

        fetchOrders();
    }, [user]); // Re-run if user changes

    // ============================================
    // LOGOUT HANDLER
    // ============================================
    
    async function handleLogout() {
        try {
            setError('');
            
            // Call Firebase signOut via our context
            // This clears the user session
            await logout();
            
            // Redirect to home page after logout
            navigate('/');
            
        } catch (err) {
            console.error('Logout error:', err);
            setError('Failed to log out. Please try again.');
        }
    }

    // ============================================
    // HELPER FUNCTION: Format Date
    // ============================================
    
    // Firestore stores dates as Timestamp objects
    // We need to convert them to readable strings
    function formatDate(timestamp) {
        if (!timestamp) return 'Unknown date';
        
        // Firestore Timestamp has a toDate() method
        // that converts to JavaScript Date object
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        
        // Format as "Nov 24, 2025"
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // ============================================
    // RENDER - LOADING/NOT LOGGED IN STATE
    // ============================================
    
    // Don't render anything if not logged in (redirect is happening)
    if (!user) {
        return null;
    }

    // ============================================
    // RENDER - MAIN CONTENT
    // ============================================
    
    return (
        <div className="auth-page">
            <div className="account-container">
                
                {/* Account Header */}
                <div className="account-header">
                    <h1>My Account</h1>
                    <button 
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>
                </div>
                
                {error && <div className="auth-error">{error}</div>}
                
                {/* User Info Section */}
                <div className="account-section">
                    <h2>Account Details</h2>
                    <div className="account-info">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Member since:</strong> {user.metadata?.creationTime ? 
                            new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }) : 'Unknown'}</p>
                    </div>
                </div>
                
                {/* Order History Section */}
                <div className="account-section">
                    <h2>Order History</h2>
                    
                    {ordersLoading ? (
                        // Loading state while fetching orders
                        <p className="loading-text">Loading your orders...</p>
                    ) : orders.length === 0 ? (
                        // Empty state - no orders yet
                        <div className="empty-orders">
                            <p>You haven't placed any orders yet.</p>
                            <Link to="/products" className="shop-link">Start Shopping</Link>
                        </div>
                    ) : (
                        // Orders list
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <span className="order-date">
                                            {formatDate(order.date)}
                                        </span>
                                        <span className={`order-status status-${order.status}`}>
                                            {order.status || 'Confirmed'}
                                        </span>
                                    </div>
                                    
                                    {/* Order Items */}
                                    <div className="order-items">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <span className="item-name">
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="item-price">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Order Total */}
                                    <div className="order-footer">
                                        <span className="order-total-label">Total:</span>
                                        <span className="order-total">
                                            ${order.total?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Account;
