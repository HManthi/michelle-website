import './css/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-blend">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Michelle Dilhara</h2>
          <p>Actress | Public Figure | Change Maker</p>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>            
            <li><Link to="/social-work">Social Work</Link></li>
            <li><Link to="/dramas-movies">Dramas & Movies</Link></li>  
            <li><Link to="/gallery">Gallery</Link></li>          
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow</h3>
          <div className="icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Michelle Dilhara. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
