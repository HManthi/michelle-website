// src/components/DashboardHome.jsx
import './css/DashboardHome.css';
import { FaTrophy, FaUser, FaChartLine } from 'react-icons/fa';

export default function DashboardHome() {
  return (
    <div className="dashboard-home">
      <h2>Welcome to the Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <FaTrophy />
          <div>
            <h3>12</h3>
            <p>Awards</p>
          </div>
        </div>
        <div className="card">
          <FaUser />
          <div>
            <h3>1</h3>
            <p>Admins</p>
          </div>
        </div>
        <div className="card">
          <FaChartLine />
          <div>
            <h3>1240</h3>
            <p>Site Visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
