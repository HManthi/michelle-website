import { Link, Outlet, useLocation } from 'react-router-dom';
import './css/AdminLayout.css';
import {
  FaTachometerAlt,
  FaTrophy,
  FaSignOutAlt,
  FaGraduationCap,
  FaHandsHelping,
  FaImages,
  FaVideo,
  FaUsers,
  FaEnvelope
} from 'react-icons/fa';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li className={location.pathname === '/admin' ? 'active' : ''}>
            <Link to="/admin">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

            <li className={location.pathname === '/admin/awards' ? 'active' : ''}>
              <Link to="/admin/awards">
                <FaTrophy /> About
              </Link>
            </li>
            <li className={location.pathname === '/admin/awards-page' ? 'active' : ''}>
              <Link to="/admin/awards-page">
                <FaGraduationCap /> Awards
              </Link>
            </li>
            <li className={location.pathname === '/admin/education' ? 'active' : ''}>
              <Link to="/admin/education">
                <FaGraduationCap /> Education Outreach
              </Link>
            </li>
            <li className={location.pathname === '/admin/social-work' ? 'active' : ''}>
              <Link to="/admin/social-work">
                <FaHandsHelping /> Social Work
              </Link>
            </li>
            <li className={location.pathname === '/admin/videos' ? 'active' : ''}>
              <Link to="/admin/videos">
                <FaVideo /> Dramas & Movies
              </Link>
            </li>
            <li className={location.pathname === '/admin/gallery' ? 'active' : ''}>
              <Link to="/admin/gallery">
                <FaImages /> Gallery
              </Link>
            </li>
            <li className={location.pathname === '/admin/users' ? 'active' : ''}>
              <Link to="/admin/users">
                <FaUsers /> Users
              </Link>
            </li>
            <li className={location.pathname === '/admin/contact-settings' ? 'active' : ''}>
              <Link to="/admin/contact-settings">
                <FaEnvelope /> Contact Messages
              </Link>
            </li>
            

            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('auth');
                  window.location.href = '/login';
                }}
                className="logout-button"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content site-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
