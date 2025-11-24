import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Privacy from './pages/Privacy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Security from './pages/Security';
import './styles/App.css';
import './styles/Toast.css';
import 'react-toastify/dist/ReactToastify.css';
import { trackPageView } from './services/analyticsService';

// Separate component to use useLocation hook inside Router
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Home' :
                     location.pathname.replace('/', '').charAt(0).toUpperCase() + 
                     location.pathname.slice(2);
    trackPageView(pageName, window.location.href);
  }, [location]);

  return null;
}

// Layout component that conditionally renders Header/Footer
function AppLayout() {
  const location = useLocation();
  
  // Check if current route is an auth page (no header/footer)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <div className="App">
      {!isAuthPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router basename="/CP340_Website">
          <AuthProvider>
            <AnalyticsTracker />
            <AppLayout />
          </AuthProvider>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;