import { useState } from 'react';
import { FaAward, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import AwardsAdmin from './AwardsAdmin';
import './css/AdminDashboard.css';

export default function AdminDashboard() {
  const [active, setActive] = useState('awards');

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={active === 'awards' ? 'active' : ''} onClick={() => setActive('awards')}>
            <FaAward /> Awards
          </li>
          {/* Future: Add more menu links here */}
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        {active === 'awards' && <AwardsAdmin />}
        {/* Add more sections here as needed */}
      </main>
    </div>
  );
}
