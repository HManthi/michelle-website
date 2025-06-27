import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link from react-router-dom
import './css/Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="site-header">
      <div className="logo">Michelle</div>

      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>        
        <Link to="/social-work" onClick={toggleMenu}>Social Work</Link>
        <Link to="/dramas-movies" onClick={toggleMenu}>Dramas & Movies</Link>   
        <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>     
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
}

export default Header;
