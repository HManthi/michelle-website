import { Link, Outlet, useLocation } from 'react-router-dom';
import './css/AdminLayout.css';
import { FaTachometerAlt, FaTrophy, FaSignOutAlt } from 'react-icons/fa';

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
                <FaTrophy /> Awards
              </Link>
            </li>
            <li className={location.pathname === '/admin/users' ? 'active' : ''}>
              <Link to="/admin/users"><i className="fas fa-users"></i> Users</Link>
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
