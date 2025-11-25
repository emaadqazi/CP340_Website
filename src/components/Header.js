import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();
  
  // Get user, guest status, and logout from AuthContext
  const { user, isGuest, logout } = useAuth();
  
  // State for settings dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle logout
  async function handleLogout() {
    try {
      await logout();
      setDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/home">ShopCP340</Link>
        </div>
        <div className="header-right">
          <nav className="nav">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/products">Products</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/security">Security</Link>
          </nav>
          
          {/* Cart Icon */}
          <Link to="/cart" className="cart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5H5.21L4.27 3H1V2ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z" fill="currentColor"/>
            </svg>
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
          
          {/* Settings Dropdown - Far right */}
          <div className="settings-dropdown" ref={dropdownRef}>
            {user ? (
              // Logged in - Show Settings with dropdown
              <>
                <button 
                  className="settings-button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                  </svg>
                  Settings
                  <svg className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/account" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                      </svg>
                      Account
                    </Link>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Not logged in - Show Login link
              <Link to="/login" className="login-link">
                {isGuest ? 'Sign In' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;