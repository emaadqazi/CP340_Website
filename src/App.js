import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SeedReviewsButton from './components/SeedReviewsButton';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Privacy from './pages/Privacy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
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

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router basename="/CP340_Website">
          <AnalyticsTracker />
          <div className="App">
            <Header />
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
              </Routes>
            </main>
            <Footer />
            <SeedReviewsButton />
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
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;