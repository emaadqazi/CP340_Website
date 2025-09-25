import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">TechStore</Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/products">Products</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
