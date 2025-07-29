import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo">Michelle</div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/awards-page" onClick={closeMenu}>Awards</Link>
          <Link to="/social-work" onClick={closeMenu}>Social Work</Link>
          <Link to="/education-outreach" onClick={closeMenu}>Education Outreach</Link>
          <Link to="/dramas-movies" onClick={closeMenu}>Dramas & Movies</Link>
          <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
        </nav>
      </aside>
    </>
  );
}

export default Header;
